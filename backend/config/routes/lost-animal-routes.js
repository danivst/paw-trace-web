import express from 'express';
import {
  createLostAnimal,
  getLostAnimals,
  getLostAnimalById,
  updateLostAnimal,
  deleteLostAnimal
} from '../../controllers/lost-animal-controller.js';

const router = express.Router();

router.post('/', createLostAnimal);
router.get('/', getLostAnimals);
router.get('/:id', getLostAnimalById);
router.put('/:id', updateLostAnimal);
router.delete('/:id', deleteLostAnimal);

export default router;