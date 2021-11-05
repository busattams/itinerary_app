import express from 'express';
const router = express.Router({mergeParams: true});
import { 
   addAccomodation, 
   addDaily, 
   addTransport, 
   createItinerary, 
   deleteItinerary, 
   editTransport, 
   getDailyItineraries, 
   getItineraries, 
   getItinerary,
   updatedItineraryToComplete
} from '../controllers/itinerary.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
   .post(protect, createItinerary)
   .get(getItineraries);

router.route('/:id')
   .get(getItinerary)
   
router.route('/:id/edit')
   .get(protect, getItinerary)
   .delete(protect, deleteItinerary)

router.route('/:id/transport')
   .post(protect, addTransport)

router.patch('/:id/transport/:idtransport', protect, editTransport);

router.route('/:id/accomodation')
   .post(protect, addAccomodation)

router.route('/:id/daily')
   .get(protect, getDailyItineraries)
   .post(protect, addDaily);

router.route('/:id/completed')
   .patch(protect, updatedItineraryToComplete)

export default router;

