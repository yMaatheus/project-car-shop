import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { MotorcycleSchema, IMotorcycle } from '../interfaces/IMotorcycle';

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
    console.log('Not implemented Motorcycle read');
    return await this._motorcycle.read() as IMotorcycle[];
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    console.log('Not implemented Motorcycle readOne');
    return await this._motorcycle.readOne(id) as IMotorcycle;
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