import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const frameMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
});

class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', frameMongooseSchema)) {
    super(model);
  }

  public async update(_id: string, _obj: ICar): Promise<ICar | null> {
    console.log('Not implemented');
    this._model.find();
    return null;
  }
}

export default Car;