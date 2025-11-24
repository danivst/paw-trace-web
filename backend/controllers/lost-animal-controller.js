import LostAnimal from "../models/lost-animal.js";

export const createLostAnimal = async (req, res) => {
  try {
    const animal = await LostAnimal.create(req.body);
    res.status(201).json({ message: "Animal added", id: animal.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostAnimals = async (req, res) => {
  try {
    const { type, location, date } = req.query;
    const where = {};
    if (type) where.type = type;
    if (location) where.last_seen_location = { [Op.like]: `%${location}%` };
    if (date) where.date_time = date;

    const animals = await LostAnimal.findAll({ where, order: [['date_time', 'DESC']] });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostAnimalById = async (req, res) => {
  try {
    const animal = await LostAnimal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLostAnimal = async (req, res) => {
  try {
    const [updated] = await LostAnimal.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLostAnimal = async (req, res) => {
  try {
    const deleted = await LostAnimal.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};