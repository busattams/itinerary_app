import express from 'express';
const router = express.Router({mergeParams: true});
import { getPlaces } from '../controllers/mapBox.js';


router.route('/').get(getPlaces)

export default router;
