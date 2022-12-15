import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleService from '../../../services/motorcycle.service';
import Motorcycle from '../../../models/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, updateMotorcycleMock } from '../../mocks/motorcycleMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';

describe('Motorcycle Service', () => {
  const motorcycle = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycle);

  before(() => {
    sinon.stub(motorcycle, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycle, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(motorcycle, 'update').resolves(updateMotorcycleMock)
    sinon.stub(motorcycle, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves()
  })

  after(() => sinon.restore())

  describe('creating', () => {
    it('successfully created', async () => {
      const created = await motorcycleService.create(motorcycleMock);

      expect(created).to.be.deep.equal(motorcycleMockWithId);
    });

    it('failure: validation error', async () => {
      let error;
      try {
        await motorcycleService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('searching by id', () => {
    it('successfully found', async () => {
      const result = await motorcycleService.readOne(motorcycleMockWithId._id);

      expect(result).to.be.deep.equal(motorcycleMockWithId);
    });

    it('failure: object not found', async () => {
      let error;
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });

  });

  describe('updating', () => {
    it('successfully update', async () => {
      const result = await motorcycleService.update(motorcycleMockWithId._id, updateMotorcycleMock);

      expect(result).to.be.deep.equal(updateMotorcycleMock);
    });

    it('failure: object shape invalid', async () => {
      let error;
      try {
        await motorcycleService.update(motorcycleMockWithId._id, {} as IMotorcycle);
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
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error).to.be.undefined;
    });

    it('failure: object not found', async () => {
      let error;
      try {
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
  });

});