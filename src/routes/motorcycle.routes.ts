import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycle.controller';
import Motorcycle from '../models/Motorcycle';
import MotorcycleService from '../services/motorcycle.service';

const route = Router();

const motorcycle = new Motorcycle();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.route('/')
  .post((req, res) => motorcycleController.create(req, res))
  .get((req, res) => motorcycleController.getAll(req, res));

route.route('/:id')
  .get((req, res) => motorcycleController.readOne(req, res));

export default route;