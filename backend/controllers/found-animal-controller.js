import {
  createFoundAnimal as createFoundAnimalService,
  getFoundAnimals as getFoundAnimalsService,
  getFoundAnimalById as getFoundAnimalByIdService,
  updateFoundAnimal as updateFoundAnimalService,
  deleteFoundAnimal as deleteFoundAnimalService,
} from "../services/found-animal-service.js";

export const createFoundAnimal = async (req, res) => {
  try {

    const {
      type,
      found_location,
      date_time,
      images,
      description,
      user_id,
      latitude,
      longitude
    } = req.body;

    const animal = await createFoundAnimalService({
      type,
      found_location,
      date_time,
      images,
      description,
      user_id,
      latitude,
      longitude
    });

    res.status(201).json({
      message: "Animal added",
      id: animal.id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoundAnimals = async (req, res) => {
  try {
    const animals = await getFoundAnimalsService(req.query || {});
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoundAnimalById = async (req, res) => {
  try {
    const animal = await getFoundAnimalByIdService(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFoundAnimal = async (req, res) => {
  try {
    const updated = await updateFoundAnimalService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFoundAnimal = async (req, res) => {
  try {
    const deleted = await deleteFoundAnimalService(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};