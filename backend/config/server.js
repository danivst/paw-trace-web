import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import lostRoutes from '../config/routes/lost-animal-routes.js';
import foundRoutes from '../config/routes/found-animal-routes.js';
import userRoutes from '../config/routes/user-routes.js';

// helper services used by the map page
import { getLostAnimals as getLostAnimalsService } from '../services/lost-animal-service.js';
import { getFoundAnimals as getFoundAnimalsService } from '../services/found-animal-service.js';

import adminRoutes from "../config/routes/admin-routes.js";

const app = express();
app.use("/api/admin", adminRoutes);

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '10000mb' }));
app.use(express.urlencoded({ limit: '10000mb', extended: true }));
// serve backend public assets (css, js etc)
app.use(express.static(path.join(currentDir, '../public')));

// compute a path to the frontend/views directory in an ES module
// context without relying on the nonexistent `__dirname` global.

const frontendViewsPath = path.join(currentDir, '../../frontend/views');

// also expose frontend views directory at root so that HTML pages
// and their own css/js can be fetched directly by visiting `/`.
app.use('/', express.static(frontendViewsPath));

// serve Leaflet distribution files from local installation so the map
// works even without external network access
app.use('/leaflet', express.static(path.join(currentDir, '../../frontend/node_modules/leaflet/dist')));

app.use('/api/lost', lostRoutes);
app.use('/api/found', foundRoutes);
app.use('/api/users', userRoutes);

// combined route returning both lost and found entries (for map markers)
app.get('/api/animals', async (req, res) => {
  try {
    const [lost, found] = await Promise.all([
      getLostAnimalsService(),
      getFoundAnimalsService(),
    ]);
    res.json([...lost, ...found]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ensure database tables exist (useful for sqlite or fresh install)
import sequelize from './db.js';
async function initializeDb() {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
}
initializeDb();

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
