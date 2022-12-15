import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';
import Car from '../../../models/Car';
import CarService from '../../../services/car.service';
import { carMock, carMockWithId, updateCarMock } from '../../mocks/carMock';

describe('Car Service', () => {
  const car = new Car();
  const carService = new CarService(car);

  before(() => {
    sinon.stub(car, 'create').resolves(carMockWithId);
    sinon.stub(car, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(car, 'update').resolves(updateCarMock)
    sinon.stub(car, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves()
  })

  after(() => sinon.restore())

  describe('creating', () => {
    it('successfully created', async () => {
      const created = await carService.create(carMock);

      expect(created).to.be.deep.equal(carMockWithId);
    });

    it('failure: validation error', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('searching by id', () => {
    it('successfully found', async () => {
      const result = await carService.readOne(carMockWithId._id);

      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('failure: object not found', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });

  });

  describe('updating', () => {
    it('successfully update', async () => {
      const result = await carService.update(carMockWithId._id, updateCarMock);

      expect(result).to.be.deep.equal(updateCarMock);
    });

    it('failure: object shape invalid', async () => {
      let error;
      try {
        await carService.update(carMockWithId._id, {} as ICar);
      } catch (err: any) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('deleting', () => {
    it('successfully delete', async () => {
      let error;
      try {
        await carService.delete(carMockWithId._id);
      } catch(err: any) {
        error = err
      }

      expect(error).to.be.undefined;
    });

    it('failure: object not found', async () => {
      let error;
      try {
        await carService.delete(carMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
  });

});