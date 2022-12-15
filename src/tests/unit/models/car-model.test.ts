import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../models/Car';
import { carMock, carMockList, carMockWithId, updateCarMock } from '../../mocks/carMock';
import { ICar } from '../../../interfaces/ICar';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const car = new Car();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carMockList);
    sinon.stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(updateCarMock)
      .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
	});

	after(() => sinon.restore());

  describe('creating', () => {
		it('successfully created', async () => {
			const newCar = await car.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching', () => {
		it('successfully found', async () => {
			const result = await car.readOne('632b7f30750a3886638f4980');
			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('failure: _id not found', async () => {
			try {
				await car.readOne('IDERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('list all', () => {
		it('successfully list', async () => {
			const result = await car.read();
			expect(result).to.be.deep.equal(carMockList);
		});
	});


  describe('updating', () => {
		it('successfully update', async () => {
			const result = await car.update('632b7f30750a3886638f4980', updateCarMock);
			expect(result).to.be.deep.equal(updateCarMock);
		});

		it('failure: _id not found', async () => {
			try {
				await car.update('IDERRADO', {} as ICar);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('deleting', () => {
		it('successfully delete', async () => {
			const result = await car.delete('632b7f30750a3886638f4980');
			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('failure: _id not found', async () => {
			try {
				await car.delete('IDERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});