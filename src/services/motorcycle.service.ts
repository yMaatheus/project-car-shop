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
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const result = await this._motorcycle.update(id, obj);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async delete(id: string): Promise<void> {
    const result = await this._motorcycle.delete(id);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
  }
}

export default MotorcycleService;