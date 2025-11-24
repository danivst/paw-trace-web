import User from "../models/user.js";
import LostAnimal from "../models/lost-animal.js";
import FoundAnimal from "../models/found-animal.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "phone", "role"],
      order: [["id", "DESC"]],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "phone", "role"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const lost = await LostAnimal.count();
    const found = await FoundAnimal.count();
    const total_users = await User.count();

    res.json({ lost, found, total_users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};