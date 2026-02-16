import express from 'express';
import cors from 'cors';

import lostRoutes from './routes/lostRoutes.js';
import foundRoutes from './routes/foundRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/lost', lostRoutes);
app.use('/api/found', foundRoutes);
app.use('/api/users', userRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
