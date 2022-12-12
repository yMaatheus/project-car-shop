import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import Car from '../../../models/Car';
import CarService from '../../../services/car.service';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
  const car = new Car();
  const carService = new CarService(car);

  before(() => {
    sinon.stub(car, 'create').resolves(carMockWithId);
    sinon.stub(car, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  })

  after(() => sinon.restore())

  describe('Create Car', () => {
    it('Success', async () => {
      const created = await carService.create(carMock);

      expect(created).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      const result = await carService.readOne(carMockWithId._id);

      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Failure: Id not found', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });

    it('Failure: MongoId invalid', async () => {
      let error;
      try {
        await carService.readOne('id_invalid');
      } catch (err: any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });
});