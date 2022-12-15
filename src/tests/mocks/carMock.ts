import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: "Uno da Escada",
  year: 1963,
  color: "red",
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

const carMockWithId: ICar & { _id: string } = {
  _id: "632b7f30750a3886638f4980",
  ...carMock
};

const updateCarMock = {
  ...carMockWithId,
  seatsQty: 3,
  doorsQty: 3
}

const carMockList: ICar[] = [carMockWithId]

export { carMock, carMockWithId, updateCarMock, carMockList };