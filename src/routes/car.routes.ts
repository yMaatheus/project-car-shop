import { Router } from 'express';
import CarController from '../controllers/car.controller';
import Car from '../models/Car';
import CarService from '../services/car.service';

const route = Router();

const car = new Car();
const carService = new CarService(car);
const carController = new CarController(carService);

route.route('/')
  .post((req, res) => carController.create(req, res))
  .get((req, res) => carController.getAll(req, res));

route.route('/:id')
  .get((req, res) => carController.readOne(req, res))
  .put((req, res) => carController.update(req, res));

export default route;