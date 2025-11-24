import express from 'express';
import cors from 'cors';
import sequelize from './db.js';

import lostAnimalRoutes from '../routes/lost-animal-routes.js';
import foundAnimalRoutes from '../routes/found-animal-routes.js';
import userRoutes from '../routes/user-routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/animals', lostAnimalRoutes);
app.use('/api/animals', foundAnimalRoutes);
app.use('/api/users', userRoutes);

// connect to db
(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');

    await sequelize.sync()
    console.log('Models synced');
  } catch (err) {
    console.error('DB Error:', err);
  }
})();

app.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);