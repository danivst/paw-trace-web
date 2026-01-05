import LostAnimal from "../models/lost-animal.js";
import { Op } from "sequelize";

export const createLostAnimal = async (data) => {
  const animal = await LostAnimal.create(data);
  return animal;
};

export const getLostAnimals = async (filters = {}) => {
  const { type, location, date } = filters;
  const where = {};

  if (type) where.type = type;
  if (location) where.last_seen_location = { [Op.like]: `%${location}%` };
  if (date) where.date_time = date;

  const animals = await LostAnimal.findAll({
    where,
    order: [["date_time", "DESC"]],
  });

  return animals;
};

export const getLostAnimalById = async (id) => {
  const animal = await LostAnimal.findByPk(id);
  return animal;
};

export const updateLostAnimal = async (id, data) => {
  const [updated] = await LostAnimal.update(data, { where: { id } });
  return updated;
};

export const deleteLostAnimal = async (id) => {
  const deleted = await LostAnimal.destroy({ where: { id } });
  return deleted;
};

