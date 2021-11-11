import express from 'express';
const router = express.Router({mergeParams: true});
import { 
   addAccomodation, 
   addDaily, 
   addTransport, 
   createItinerary, 
   deleteAccomodation, 
   deleteItinerary, 
   deleteTransport, 
   getDailyItineraries, 
   deleteDaily,
   getItineraries, 
   getItinerary,
   updatedItineraryToComplete,
   getUserItineraries
} from '../controllers/itinerary.js';
import { protect, isAuthor } from '../middleware/authMiddleware.js';

router.route('/')
   .post(protect, createItinerary)
   .get(getItineraries);

router.route('/:id')
   .get(getItinerary)
   .delete(protect, isAuthor, deleteItinerary)
   
router.route('/:id/edit')
   .get(protect, isAuthor, getItinerary)

router.route('/:id/transport')
   .post(protect, isAuthor, addTransport)

router.route('/:id/transport/:idtransport')
   .delete(protect, isAuthor, deleteTransport);

router.route('/:id/accommodation')
   .post(protect, isAuthor, addAccomodation)

router.route('/:id/accommodation/:idaccommodation')
   .delete(protect, isAuthor, deleteAccomodation)

router.route('/:id/daily')
   .get(protect, isAuthor, getDailyItineraries)
   .post(protect, isAuthor, addDaily);

router.route('/:id/daily/:iddaily')
   .delete(protect, isAuthor, deleteDaily)

router.route('/:id/completed')
   .patch(protect, isAuthor, updatedItineraryToComplete)

router.route('/user/:userId')
   .get(protect, getUserItineraries)

export default router;

