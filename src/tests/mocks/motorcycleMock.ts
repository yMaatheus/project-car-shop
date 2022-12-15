import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock: IMotorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125
};

const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "639b28f9fa641e0f99a49407",
  ...motorcycleMock
};

const updateMotorcycleMock = {
  ...motorcycleMockWithId,
  color: 'black'
}

const motorcycleList: IMotorcycle[] = [motorcycleMockWithId]

export { motorcycleMock, motorcycleMockWithId, updateMotorcycleMock, motorcycleList };