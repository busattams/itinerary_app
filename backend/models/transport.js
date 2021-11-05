import mongoose from 'mongoose';

const TransportSchema = mongoose.Schema({
   type: {
      type: String,
      required: true,
   },
   value: {
      type: Number,
      required: true
   },
   description: {type: String}
});

const Transport = mongoose.model('Transport', TransportSchema);
export default Transport;