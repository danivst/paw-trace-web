import bcrypt from "bcrypt";
import sequelize from "../config/db.js";
import User from "../models/user.js";

async function seedAdmin() {

  await sequelize.sync();

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await User.create({
    name: "Admin",
    email: "admin@pawtrace.com",
    phone: "000000000",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin created");
  process.exit();
}

seedAdmin();