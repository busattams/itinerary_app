import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
   })
} 

// @desc   Listar usuários
// @route  GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res)=> {
   const users = await User.find({});
   res.json(users)
});

// @desc   Listar usuário por ID
// @route  GET /api/users/:id
// @access Public

const getUserById = asyncHandler(async (req, res)=> {
   const user = await User.findById(req.params.id).select('-password') // select all except password
   if(user) {
      res.json(user);
   } else {
      res.status(404);
      throw new Error('User not found');
   }
});


// @desc   Registrar novo Usuário
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   const userExist = await User.findOne({email});
   if(userExist) {
      res.status(400);
      throw new Error('Email já cadastrado.');
   }
   const user = await User.create({
      name,
      email,
      password
   });

   if(user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
      });
   } else {
      res.status(400);
      throw new Error("Dados inválidos.")
   }
});

// @desc   Autenticar usuário e pegar Token
// @route  POST /api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email })
   if(user) {
      if(await user.matchPassword(password)) {
         res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
         });
      } else {
         res.status(401);
         throw new Error("Senha Inválida");
      }
   } else {
      res.status(401);
      throw new Error("E-mail não encontrado");
   }
});




export { getUsers, getUserById, registerUser, authUser }