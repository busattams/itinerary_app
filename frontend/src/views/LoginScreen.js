import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './components/Message.js';
import Loader from './components/Loader.js';
import { login } from '../store/actions/userActions';

const LoginScreen = ({ location, history }) => {
   const [ email, setEmail ] = useState('');
   const [ password , setPassword ] = useState('');
   
   const dispatch = useDispatch();
   const userLogin = useSelector(state => state.userLogin);
   const { loading, error, userInfo, messageLogin } = userLogin;
   
   const redirect = location.search ? location.search.split('=')[1] : '/';

   useEffect(() => {
      if(userInfo) {
         history.push(redirect)
      }
   }, [history, userInfo, redirect])
 
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password))
   }

   return (
         <div className="form-wrapper">
            <h4 className='mb-3 text-uppercase'>Entrar</h4>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {messageLogin && <Message variant='danger'>{messageLogin}</Message>}
            <Form onSubmit={submitHandler}>
               <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email'
                     placeholder='exemplo@email.com' 
                     autoComplete='email'
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='password'  className="my-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type='password'
                     placeholder='Senha' 
                     autoComplete='current-password'
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <div className="d-grid gap-2">
                  <Button type='submit' variant='dark' >Entrar</Button>
               </div>
            </Form>
            <p className='mt-4 mb-0 text-center'>Não tem uma conta? <Link to='/register'>Cadastre-se!</Link></p>
         </div>
   )
}

export default LoginScreen;