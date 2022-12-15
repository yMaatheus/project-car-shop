import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleService from '../../../services/motorcycle.service';
import Motorcycle from '../../../models/Motorcycle';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';

describe('Motorcycle Service', () => {
  const motorcycle = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycle);

  before(() => {
    sinon.stub(motorcycle, 'create').resolves(motorcycleMockWithId);
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

});