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
   editTransport, 
   getDailyItineraries, 
   deleteDaily,
   getItineraries, 
   getItinerary,
   updatedItineraryToComplete,
   getUserItineraries
} from '../controllers/itinerary.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
   .post(protect, createItinerary)
   .get(getItineraries);

router.route('/:id')
   .get(getItinerary)
   .delete(protect, deleteItinerary)
   
router.route('/:id/edit')
   .get(protect, getItinerary)

router.route('/:id/transport')
   .post(protect, addTransport)

router.route('/:id/transport/:idtransport')
   .delete(protect, deleteTransport);

router.route('/:id/accommodation')
   .post(protect, addAccomodation)

router.route('/:id/accommodation/:idaccommodation')
   .delete(protect, deleteAccomodation)

router.route('/:id/daily')
   .get(protect, getDailyItineraries)
   .post(protect, addDaily);

router.route('/:id/daily/:iddaily')
   .delete(protect, deleteDaily)

router.route('/:id/completed')
   .patch(protect, updatedItineraryToComplete)

router.route('/user/:userId')
   .get(protect, getUserItineraries)

export default router;

