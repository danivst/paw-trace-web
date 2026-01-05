import {
  createLostAnimal as createLostAnimalService,
  getLostAnimals as getLostAnimalsService,
  getLostAnimalById as getLostAnimalByIdService,
  updateLostAnimal as updateLostAnimalService,
  deleteLostAnimal as deleteLostAnimalService,
} from "../services/lost-animal-service.js";

export const createLostAnimal = async (req, res) => {
  try {
    const animal = await createLostAnimalService(req.body);
    res.status(201).json({ message: "Animal added", id: animal.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostAnimals = async (req, res) => {
  try {
    const animals = await getLostAnimalsService(req.query);
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostAnimalById = async (req, res) => {
  try {
    const animal = await getLostAnimalByIdService(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLostAnimal = async (req, res) => {
  try {
    const updated = await updateLostAnimalService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLostAnimal = async (req, res) => {
  try {
    const deleted = await deleteLostAnimalService(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};