import express from 'express';
import { authenticate } from '../../utils/auth.js';
import { register, login, updateUser, deleteUser, getUser } from '../../controllers/user-controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// retrieve own profile
router.get('/:id', authenticate, (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You can only view your own account' });
  }
  next();
}, getUser);

router.put('/:id', authenticate, (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You can only update your own account' });
  }
  next();
}, updateUser);

router.delete('/:id', authenticate, (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You can only delete your own account' });
  }
  next();
}, deleteUser);

export default router;
