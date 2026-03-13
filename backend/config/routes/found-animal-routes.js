import express from 'express';
import {
  createFoundAnimal,
  getFoundAnimals,
  getFoundAnimalById,
  updateFoundAnimal,
  deleteFoundAnimal
} from '../../controllers/found-animal-controller.js';

const router = express.Router();

router.post('/', createFoundAnimal);
router.get('/', getFoundAnimals);
router.get('/:id', getFoundAnimalById);
router.put('/:id', updateFoundAnimal);
router.delete('/:id', deleteFoundAnimal);

export default router;