import mongoose from 'mongoose';
import Transport from './transport.js';

const refSchema =  mongoose.Schema.Types.ObjectId;

const ItinerarySchema = mongoose.Schema({
   user: {
      type: refSchema,
      ref: 'User',
      required: true
   },
   title: {
      type: String,
      required: true
   },
   qntyTravelers: {
      type: Number,
      required: true
   },
   location: [{
      type: String,
      required: true
   }],
   description: {
      type: String,
      required: true 
   },
   transport: [{
      type: refSchema,
      ref: 'Transport'
   }],
   accommodation: [{
      type: refSchema ,
      ref: 'Accommodation'
   }],
   dailyItinerary: [{
      type: refSchema,
      ref: 'DailyDescription'
   }],
   isComplete: {
      type: Boolean,
      default: false
   }
}, {
   timestamps: true
});

const Itinerary = mongoose.model('Itinerary', ItinerarySchema);
export default Itinerary;