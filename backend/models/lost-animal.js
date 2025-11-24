import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const LostAnimal = sequelize.define(
  "LostAnimal",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    age: { type: DataTypes.STRING },
    last_seen_location: { type: DataTypes.STRING },
    date_time: { type: DataTypes.DATE, allowNull: false },
    images: { type: DataTypes.JSON, defaultValue: [] },
    description: { type: DataTypes.TEXT },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "lost_animals",
    timestamps: false,
  }
);

export default LostAnimal;