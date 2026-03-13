import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getStats,
} from "../../controllers/admin-controller.js";

import { getLostAnimals } from "../../controllers/lost-animal-controller.js";
import { getFoundAnimals } from "../../controllers/found-animal-controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/lost", getLostAnimals);
router.get("/found", getFoundAnimals);

router.get("/stats", getStats);

export default router;