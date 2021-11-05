import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './components/Message.js';
import Loader from './components/Loader.js';
import { register } from '../store/actions/userActions';

const RegisterScreen = ({ location, history }) => {
   const [ name, setName ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ password , setPassword ] = useState('');
   const [ confirmPassword , setConfirmPassword ] = useState('');
   const [ message , setMessage ] = useState(null);
   
   const dispatch = useDispatch();
   const userLogin = useSelector(state => state.userLogin);
   const { userInfo, loadingRegister, errorRegister } = userLogin;
   
   const redirect = location.search ? location.search.split('=')[1] : '/';

   useEffect(() => {
      if(userInfo) {
         history.push(redirect)
      }
   }, [history, userInfo, redirect])
 
   const submitHandlerRegister = (e) => {
      e.preventDefault();

      if(password !== confirmPassword) {
         setMessage('Senhas não estõa iguais!')
      } else {
         dispatch(register(name, email, password))
      }
   }

   return (
      <div className="form-wrapper">
         <h3 className='text-uppercase'>Crie sua conta</h3>
         {message && <Message variant='danger'>{message}</Message>}
         {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
         {loadingRegister && <Loader />}
         <Form onSubmit={submitHandlerRegister}>
            <Form.Group controlId='name'>
               <Form.Label>Name</Form.Label>
               <Form.Control type='name'
                  placeholder='Seu nome'
                  autoComplete='username' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className="my-3">
               <Form.Label>Email</Form.Label>
               <Form.Control type='email'
                  placeholder='Seu melhor email' 
                  autoComplete='email'
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'  className="my-3">
               <Form.Label>Senha</Form.Label>
               <Form.Control type='password'
                  placeholder='Senha' 
                  value={password} 
                  autoComplete='new-password'
                  onChange={(e) => setPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'  className="my-4">
               <Form.Label>Confirme a senha</Form.Label>
               <Form.Control type='password'
                  placeholder='Confirme a senha' 
                  autoComplete='new-password'
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <div className="d-grid gap-2">
            <Button  type='submit' variant='dark' >Criar Conta</Button>
            </div>
         </Form>
         <p className='text-center mt-3 mb-0'>Possui uma conta? <Link to='/login'>Entre!</Link></p>
      </div>

   )
}

export default RegisterScreen;