import mongoose from 'mongoose';

const DailyDescriptionSchema = mongoose.Schema({
   date: {
      type: Date,
      required: true
   },
   location: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true
   },
   attractions: [{
      name: { type: String },
      price: { type: Number },
      description: { type: String }
   }]
});

const DailyDescription = mongoose.model('DailyDescription', DailyDescriptionSchema);
export default DailyDescription;