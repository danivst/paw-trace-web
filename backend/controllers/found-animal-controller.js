import FoundAnimal from "../models/found-animal.js";

export const createFoundAnimal = async (req, res) => {
  try {
    const animal = await FoundAnimal.create(req.body);
    res.status(201).json({ message: "Animal added", id: animal.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoundAnimals = async (req, res) => {
  try {
    const animals = await FoundAnimal.findAll({
      where: req.query || {},
      order: [['date_time', 'DESC']]
    });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoundAnimalById = async (req, res) => {
  try {
    const animal = await FoundAnimal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFoundAnimal = async (req, res) => {
  try {
    const [updated] = await FoundAnimal.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFoundAnimal = async (req, res) => {
  try {
    const deleted = await FoundAnimal.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};