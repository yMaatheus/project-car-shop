import { Router } from 'express';
import car from './car.routes';
import motorcycle from './motorcycle.routes';

const route = Router();

route.use('/cars', car);
route.use('/motorcycles', motorcycle);

export default route;