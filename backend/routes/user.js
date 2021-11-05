import express from 'express';
const router = express.Router({mergeParams: true});
import { registerUser, authUser, getUsers, getUserById } from '../controllers/user.js';

router.route('/')
   .get(getUsers)
   .post(registerUser);

router.get('/:id', getUserById)

router.post('/login', authUser);


export default router;

