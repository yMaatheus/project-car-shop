import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;
    
    return this._car.create(parsed.data);
  }
}

export default CarService;