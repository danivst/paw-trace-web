import sequelize from "../config/db.js";
import { LostAnimal } from "../models/lost-animal.js";

const dummyLostAnimals = [
  {
    name: 'Bella',
    type: 'Dog',
    breed: 'Labrador',
    gender: 'Female',
    color: 'Yellow',
    age: 3,
    last_seen_location: 'Central Park',
    date_time: '2025-11-09 10:00:00',
    images: ['bella1.jpg', 'bella2.jpg'],
    description: 'Friendly dog, very playful.',
    user_id: 1
  },
  {
    name: 'Max',
    type: 'Dog',
    breed: 'German Shepherd',
    gender: 'Male',
    color: 'Black & Tan',
    age: 4,
    last_seen_location: '5th Avenue',
    date_time: '2025-11-08 14:30:00',
    images: ['max1.jpg'],
    description: 'Very alert and protective.',
    user_id: 2
  },
  {
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    gender: 'Female',
    color: 'Cream',
    age: 2,
    last_seen_location: 'Downtown',
    date_time: '2025-11-07 09:15:00',
    images: ['luna1.jpg'],
    description: 'Shy, scared of strangers.',
    user_id: 3
  },
  {
    name: 'Charlie',
    type: 'Dog',
    breed: 'Beagle',
    gender: 'Male',
    color: 'Brown & White',
    age: 5,
    last_seen_location: 'Riverside Park',
    date_time: '2025-11-06 16:45:00',
    images: [],
    description: 'Friendly with kids.',
    user_id: 1
  },
  {
    name: 'Milo',
    type: 'Cat',
    breed: 'Maine Coon',
    gender: 'Male',
    color: 'Grey',
    age: 3,
    last_seen_location: 'Elm Street',
    date_time: '2025-11-05 11:20:00',
    images: ['milo1.jpg'],
    description: 'Big fluffy cat, loves attention.',
    user_id: 2
  },
  {
    name: 'Daisy',
    type: 'Dog',
    breed: 'Poodle',
    gender: 'Female',
    color: 'White',
    age: 4,
    last_seen_location: 'Maple Avenue',
    date_time: '2025-11-04 13:10:00',
    images: ['daisy1.jpg'],
    description: 'Very smart and playful.',
    user_id: 3
  },
  {
    name: 'Simba',
    type: 'Cat',
    breed: 'Bengal',
    gender: 'Male',
    color: 'Orange',
    age: 1,
    last_seen_location: 'Oak Street',
    date_time: '2025-11-03 17:05:00',
    images: ['simba1.jpg'],
    description: 'Very curious and active.',
    user_id: 1
  },
  {
    name: 'Coco',
    type: 'Dog',
    breed: 'Shih Tzu',
    gender: 'Female',
    color: 'Brown',
    age: 2,
    last_seen_location: 'Pine Street',
    date_time: '2025-11-02 08:50:00',
    images: ['coco1.jpg'],
    description: 'Small and very cute.',
    user_id: 2
  },
  {
    name: 'Oliver',
    type: 'Cat',
    breed: 'Persian',
    gender: 'Male',
    color: 'White',
    age: 3,
    last_seen_location: 'Park Lane',
    date_time: '2025-11-01 12:30:00',
    images: [],
    description: 'Calm and gentle.',
    user_id: 3
  },
  {
    name: 'Ruby',
    type: 'Dog',
    breed: 'Bulldog',
    gender: 'Female',
    color: 'Fawn',
    age: 4,
    last_seen_location: 'Main Street',
    date_time: '2025-10-31 15:40:00',
    images: ['ruby1.jpg'],
    description: 'Strong and friendly.',
    user_id: 1
  }
];

async function seedLostAnimals() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected!");

    console.log("Syncing models...");
    await sequelize.sync();
    console.log("Models synced!");

    console.log("Inserting lost animals...");
    await LostAnimal.bulkCreate(dummyLostAnimals);
    console.log("Lost animals inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error inserting lost animals:", err);
    process.exit(1);
  }
}

seedLostAnimals();