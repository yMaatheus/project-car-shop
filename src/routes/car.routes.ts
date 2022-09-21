import { Router } from 'express';
import CarController from '../controllers/car.controller';
import Car from '../models/Car';
import CarService from '../services/car.service';

const route = Router();

const car = new Car();
const carService = new CarService(car);
const carController = new CarController(carService);

route.route('/')
  .post((req, res) => carController.create(req, res));

export default route;