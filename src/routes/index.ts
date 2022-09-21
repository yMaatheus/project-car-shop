import { Router } from 'express';
import car from './car.routes';

const route = Router();

route.use('/cars', car);

export default route;