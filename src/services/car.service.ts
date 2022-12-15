import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

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

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(id: string): Promise<ICar> {
    const car = await this._car.readOne(id);
    if (!car) throw Error(ErrorTypes.ObjectNotFound);

    return car;
  }

  public async update(id: string, obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const result = await this._car.update(id, obj);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async delete(id: string) {
    const result = await this._car.delete(id);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
  }
}

export default CarService;