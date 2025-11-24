import sequelize from "../config/db.js";
import { FoundAnimal } from "../models/found-animal.js";

const dummyFoundAnimals = [
  {
    type: "Dog",
    breed: "Labrador",
    gender: "Male",
    color: "Black",
    age: 3,
    found_location: "Central Park",
    date_time: "2025-11-08 10:00:00",
    images: ["dog1.jpg"],
    description: "Friendly, wearing a red collar.",
    user_id: 1,
  },
  {
    type: "Cat",
    breed: "Siamese",
    gender: "Female",
    color: "Cream",
    age: 2,
    found_location: "5th Avenue",
    date_time: "2025-11-07 14:20:00",
    images: ["cat1.jpg"],
    description: "Looks lost, very shy.",
    user_id: 2,
  },
  {
    type: "Dog",
    breed: "Beagle",
    gender: "Male",
    color: "Brown & White",
    age: 5,
    found_location: "Riverside Park",
    date_time: "2025-11-06 09:45:00",
    images: [],
    description: "Friendly and calm.",
    user_id: 3,
  },
  {
    type: "Cat",
    breed: "Maine Coon",
    gender: "Male",
    color: "Grey",
    age: 4,
    found_location: "Downtown",
    date_time: "2025-11-05 11:30:00",
    images: ["cat2.jpg", "cat3.jpg"],
    description: "Very fluffy and gentle.",
    user_id: 1,
  },
  {
    type: "Dog",
    breed: "Poodle",
    gender: "Female",
    color: "White",
    age: 3,
    found_location: "Maple Avenue",
    date_time: "2025-11-04 16:10:00",
    images: ["dog2.jpg"],
    description: "Smart and playful.",
    user_id: 2,
  },
  {
    type: "Cat",
    breed: "Bengal",
    gender: "Male",
    color: "Orange",
    age: 1,
    found_location: "Oak Street",
    date_time: "2025-11-03 12:00:00",
    images: ["cat4.jpg"],
    description: "Curious and active.",
    user_id: 3,
  },
  {
    type: "Dog",
    breed: "Shih Tzu",
    gender: "Female",
    color: "Brown",
    age: 2,
    found_location: "Pine Street",
    date_time: "2025-11-02 09:15:00",
    images: ["dog3.jpg"],
    description: "Small and cute.",
    user_id: 1,
  },
  {
    type: "Cat",
    breed: "Persian",
    gender: "Male",
    color: "White",
    age: 3,
    found_location: "Park Lane",
    date_time: "2025-11-01 14:40:00",
    images: [],
    description: "Calm and gentle.",
    user_id: 2,
  },
  {
    type: "Dog",
    breed: "Bulldog",
    gender: "Female",
    color: "Fawn",
    age: 4,
    found_location: "Main Street",
    date_time: "2025-10-31 15:30:00",
    images: ["dog4.jpg"],
    description: "Strong and friendly.",
    user_id: 3,
  },
  {
    type: "Cat",
    breed: "Sphynx",
    gender: "Female",
    color: "Pink",
    age: 2,
    found_location: "Elm Street",
    date_time: "2025-10-30 10:50:00",
    images: ["cat5.jpg"],
    description: "Hairless cat, very friendly.",
    user_id: 1,
  },
];

async function seedFoundAnimals() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    console.log("Syncing models...");
    await sequelize.sync();
    console.log("Models synced successfully!");

    console.log("Inserting dummy found animals...");
    await FoundAnimal.bulkCreate(dummyFoundAnimals);
    console.log("Dummy found animals inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error inserting found animals:", err);
    process.exit(1);
  }
}

seedFoundAnimals();