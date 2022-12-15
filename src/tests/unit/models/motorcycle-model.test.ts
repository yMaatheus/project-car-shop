import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../errors/catalog';
import Motorcycle from '../../../models/Motorcycle';
import { motorcycleMockWithId, motorcycleList, updateMotorcycleMock, motorcycleMock } from '../../mocks/motorcycleMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';

describe('Motorcycle Model', () => {
  const motorcycle = new Motorcycle();

	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves(motorcycleList);
    sinon.stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(updateMotorcycleMock)
      .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
	});

	after(() => sinon.restore());

  describe('creating', () => {
		it('successfully created', async () => {
			const newCar = await motorcycle.create(motorcycleMock);
			expect(newCar).to.be.deep.equal(motorcycleMockWithId);
		});
	});

  describe('searching', () => {
		it('successfully found', async () => {
			const result = await motorcycle.readOne('639b28f9fa641e0f99a49407');
			expect(result).to.be.deep.equal(motorcycleMockWithId);
		});

		it('failure: _id not found', async () => {
			try {
				await motorcycle.readOne('IDERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('list all', () => {
		it('successfully list', async () => {
			const result = await motorcycle.read();
			expect(result).to.be.deep.equal(motorcycleList);
		});
	});


  describe('updating', () => {
		it('successfully update', async () => {
			const result = await motorcycle.update('639b28f9fa641e0f99a49407', updateMotorcycleMock);
			expect(result).to.be.deep.equal(updateMotorcycleMock);
		});

		it('failure: _id not found', async () => {
			try {
				await motorcycle.update('IDERRADO', {} as IMotorcycle);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('deleting', () => {
		it('successfully delete', async () => {
			const result = await motorcycle.delete('639b28f9fa641e0f99a49407');
			expect(result).to.be.deep.equal(motorcycleMockWithId);
		});

		it('failure: _id not found', async () => {
			try {
				await motorcycle.delete('IDERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});