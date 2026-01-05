import FoundAnimal from "../models/found-animal.js";

export const createFoundAnimal = async (data) => {
  const animal = await FoundAnimal.create(data);
  return animal;
};

export const getFoundAnimals = async (filters = {}) => {
  const animals = await FoundAnimal.findAll({
    where: filters,
    order: [["date_time", "DESC"]],
  });
  return animals;
};

export const getFoundAnimalById = async (id) => {
  const animal = await FoundAnimal.findByPk(id);
  return animal;
};

export const updateFoundAnimal = async (id, data) => {
  const [updated] = await FoundAnimal.update(data, { where: { id } });
  return updated;
};

export const deleteFoundAnimal = async (id) => {
  const deleted = await FoundAnimal.destroy({ where: { id } });
  return deleted;
};

