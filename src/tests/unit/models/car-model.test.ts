import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../models/Car';
import { carMock, carMockList, carMockWithId } from '../../mocks/carMock';

describe('Car Model', () => {
  const car = new Car();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carMockList);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
	});

	after(() => sinon.restore());

  describe('creating car', () => {
		it('successfully created', async () => {
			const newCar = await car.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching car', () => {
		it('successfully found', async () => {
			const result = await car.readOne('632b7f30750a3886638f4980');
			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await car.readOne('IDERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('list all cars', () => {
		it('successfully', async () => {
			const result = await car.read();
			expect(result).to.be.deep.equal(carMockList);
		});
	});

  describe('deleting a car', () => {
		it('successfully', async () => {
			const result = await car.delete('632b7f30750a3886638f4980');
			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await car.delete('IDERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});