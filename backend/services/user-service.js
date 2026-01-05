import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { user: null, token: null };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return { user: null, token: null };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};

export const updateUserById = async (id, data) => {
  const { name, email, phone, password } = data;
  const updateData = { name, email, phone };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const [updated] = await User.update(updateData, { where: { id } });
  return updated;
};

export const deleteUserById = async (id) => {
  const deleted = await User.destroy({ where: { id } });
  return deleted;
};

