import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { MotorcycleSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(id);
    if (!motorcycle) throw Error(ErrorTypes.ObjectNotFound);

    return motorcycle;
  }

  public async update(id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    console.log('Not implemented Motorcycle update');
    return await this._motorcycle.update(id, obj) as IMotorcycle;
  }

  public async delete(id: string): Promise<void> {
    console.log('Not implemented Motorcycle delete');
    await this._motorcycle.delete(id);
  }
}

export default MotorcycleService;