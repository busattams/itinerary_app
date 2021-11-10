import mongoose from 'mongoose';

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
   image: {
      type: String,
      required: true
   },
   dateStart: { type: Date },
   dateEnd: { type: Date }, 
   description: {
      type: String,
      required: true 
   },
   location: [{
      type: refSchema,
      ref: 'Location'
   }],
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