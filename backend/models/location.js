import mongoose from 'mongoose';

const LocationSchema = mongoose.Schema({
   location: String,
   geometry: {
      type: {
         type: String,
         enum: ['Point'],
         required: true
      },
      coordinates: {
         type: [Number],
         required: true
      }
   }
});

const Location = mongoose.model('Location', LocationSchema);
export default Location;