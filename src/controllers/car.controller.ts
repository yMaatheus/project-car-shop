import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
    
    const result = await this._service.create(car);
    return res.status(201).json(result);
  }
}