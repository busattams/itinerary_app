import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Itinerary from '../models/itinerary.js';

const protect = asyncHandler(async (req, res, next) => {
   let token;
   if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
   ) {
      try {
         token = req.headers.authorization.split(' ')[1];
   
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         req.user = await User.findById(decoded.id).select('-password');
         next();

      } catch (error) {
         console.error(error);
         res.status(401);
         throw new Error('Falha na autorização')
      }
   }

   if(!token) {
      res.status(401)
      throw new Error('Não autorizado.');
   }
});



const isAuthor = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const itinerary = await Itinerary.findById(id);
   if(!itinerary.user.equals(req.user._id)) {
      res.status(401);
      throw new Error("Roteiro não cadastrado pelo usuário.")
   } 
   next();
});



export { protect, isAuthor }
