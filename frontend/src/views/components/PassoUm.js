import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const PassoUm = () => {

   const [title, setTitle] = useState('')
   const [location, setLocation] = useState('')
   const [qntyTravelers, setQntyTravelers] = useState('')
   const [description, setDescription] = useState('')

   const submitHandler = (e) => {
      e.preventDefault();
      console.log(title, location, qntyTravelers, description);
      
   }

   return (
      <>
         <Link to='/'>Voltar</Link>
         <h1>Cadastre Roteiro</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='title' className='mb-3'>
               <Form.Label>Título</Form.Label>
               <Form.Control type='title'
                  placeholder='Título' 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='location' className='mb-3'>
               <Form.Label>Cidade ou Local</Form.Label>
               <Form.Control type='location'
                  placeholder='Cidade ou Local' 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='qntyTravelers' className='mb-3'>
               <Form.Label>Quantidade de Pessoas</Form.Label>
               <Form.Control type='number'
                  value={qntyTravelers} 
                  onChange={(e) => setQntyTravelers(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
               <Form.Label>Descritivo</Form.Label>
               <Form.Control as="textarea" rows={3}
                   value={description} 
                   onChange={(e) => setDescription(e.target.value)}
               />
            </Form.Group>
            <Button type='submit' variant='success'>Enviar</Button>
           
         </Form>
      </>
   )
}


export default PassoUm;   