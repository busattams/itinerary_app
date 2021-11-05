import mongoose from 'mongoose';

const AccommodationSchema = mongoose.Schema({
   type: {
      type: String,
      required: true,
   },
   qntyDay: {
      type: Number,
      required: true
   },
   value: {
      type: Number,
      required: true
   },
   description: {type: String}
});

const Accommodation = mongoose.model('Accommodation', AccommodationSchema);
export default Accommodation;