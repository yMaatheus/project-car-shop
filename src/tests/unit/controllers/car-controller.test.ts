import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarService from '../../../services/car.service';
import Car from '../../../models/Car';
import CarController from '../../../controllers/car.controller';
import { carMock, carMockWithId, updateCarMock } from '../../mocks/carMock';

describe('Car Controller', () => {
  const car = new Car()
  const carService = new CarService(car);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'update').resolves(updateCarMock);
    sinon.stub(carService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('creating', () => {
    it('successfully created', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('searching by id', () => {
    it('successfully found', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('updating', () => {
    it('successfully update', async () => {
      req.params = { id: carMockWithId._id };
      req.body = { ...updateCarMock }
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updateCarMock)).to.be.true;
    });
  });

  describe('deleting', () => {
    it('successfully delete', async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });

});