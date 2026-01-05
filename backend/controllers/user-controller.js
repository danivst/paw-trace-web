import {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
} from "../services/user-service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User created", id: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await updateUserById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};