import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/motorcycle.service';
import MotorcycleController from '../../../controllers/motorcycle.controller';
import { motorcycleMock } from '../../mocks/motorcycleMock';

describe('Car Controller', () => {
  const motorcycle = new Motorcycle()
  const motorcycleService = new MotorcycleService(motorcycle);
  const motorcycleController = new MotorcycleController(motorcycleService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('creating', () => {
    it('successfully created', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });

});