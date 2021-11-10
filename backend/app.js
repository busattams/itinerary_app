import path from 'path';
import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import connectDB from './config/database.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/user.js';
import itineraryRoutes from './routes/itinerary.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB();

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/itinerary', itineraryRoutes);


const __dirname = path.resolve(); 
if(process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/build')));
   app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
   app.get('/', (req, res) => res.send('API is running'));
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

