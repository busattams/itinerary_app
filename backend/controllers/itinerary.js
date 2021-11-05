import asyncHandler from 'express-async-handler';
import Itinerary from '../models/itinerary.js';
import DailyDescription from '../models/dailyDescription.js';
import Transport from '../models/transport.js';
import Accommodation from '../models/accommodation.js';

// @desc Criar novo roteiro
// @route POST /api/itinerary
// @access Private
const createItinerary = asyncHandler(async (req, res) => {
   const { title, location, qntyTravelers, description } = req.body;
   const itinerary = new Itinerary({title, location, qntyTravelers, description});
   itinerary.user = req.user._id;
   const createdItinerary = await itinerary.save();
   res.status(201).json(createdItinerary);
});

// @desc buscar roteiros
// @route GET /api/itinerary/
// @access Public
const getItineraries = asyncHandler(async (req, res) => {
   const itineraries = await Itinerary.find({});
   res.json(itineraries);
});

// @desc Selecionar roteiro pelo ID
// @route DELETE /api/itinerary/:id
// @access Private
const getItinerary = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id)
      .populate('user', 'name')
      .populate('transport')
      .populate('accommodation')
      .populate('dailyItinerary');

   if(itinerary) {
      res.json(itinerary)
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado');
   }
});





// @desc Excluir roteiro pelo ID
// @route DELETE /api/itinerary/:id
// @access Private
const deleteItinerary = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id);
   if(itinerary) {
      await Itinerary.deleteOne(itinerary);
      await Transport.deleteMany({"_id": { $in: itinerary.transport }});
      await Accommodation.deleteMany({ "_id": { $in: itinerary.accommodation }});
      await DailyDescription.deleteMany({"_id": { $in: itinerary.dailyItinerary }});
      res.json({message: 'Roteiro Removido com sucesso!'})
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado');
   }
});


// @desc Adicionar Informações de Transporte
// @route POST /api/itinerary/:id/transport
// @access Private
const addTransport = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id);
   if(itinerary) {
      const { type, value, description } = req.body; 
      const newTransport = new Transport({type, value, description});
      itinerary.transport.push(newTransport);
      await newTransport.save();
      await itinerary.save();
      res.status(201).send("Transporte criado com sucesso.");
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado.')
   }
});

// @desc Editar Informações de Transporte
// @route POST /api/itinerary/:id/transport/:idtransport
// @access Private
const editTransport = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id);
   if(itinerary) {
      const transport = itinerary.transport.filter((t) => {
         return t._id === req.params.idtransport;
      })

      console.log(transport)
      // const { type, value, description } = req.body; 
      // itinerary.transport.push({type, value, description });
      // const updatedItinerary = await itinerary.save();
      res.json(itinerary.transport);
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado.')
   }
});






// @desc Adicionar Informações de Hospedagem
// @route POST /api/itinerary/:id/accommodation
// @access Private
const addAccomodation = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id);
   if(itinerary) {
      const { type, qntyDay, value, description } = req.body; 
      const newAccommodation = new Accommodation({type, qntyDay, value, description})
      itinerary.accommodation.push(newAccommodation);
      await newAccommodation.save();
      await itinerary.save();
      res.status(201).send('Hospedagem cadastrada com sucesso.');
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado.')
   }
});

// @desc Adicionar Dia a Dia
// @route POST /api/itinerary/:id/daily
// @access Private
const addDaily = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id);
   if(itinerary) {
      const { date, location, description } = req.body; 
      const dailyDescription = new DailyDescription({date, location, description});
      itinerary.dailyItinerary.push(dailyDescription);
      await dailyDescription.save();
      await itinerary.save();
      res.status(201).send("Dia criado com sucesso.")
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado.')
   }
});

// @desc Adicionar Dia a Dia
// @route POST /api/itinerary/:id/daily
// @access Private
const getDailyItineraries = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id).populate('dailyItinerary');
   if(itinerary) {
      res.status(201).json(itinerary.dailyItinerary);
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado.')
   }
});

// @desc Marcar como completo para postar
// @route POST /api/itinerary/:id/completed
// @access Private
const updatedItineraryToComplete = asyncHandler(async (req, res) => {
   const itinerary = await Itinerary.findById(req.params.id);
   if(itinerary) {
      itinerary.isComplete = true;
      const updatedItinerary = await itinerary.save()
      res.status(201).json(updatedItinerary);
   } else {
      res.status(404);
      throw new Error('Roteiro não encontrado.')
   }
});


export { 
   createItinerary,
   getItinerary,
   deleteItinerary, 
   addTransport, 
   editTransport,
   addAccomodation, 
   getItineraries, 
   addDaily,
   getDailyItineraries,
   updatedItineraryToComplete
};