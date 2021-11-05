import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { newItinerary } from '../../store/actions/itineraryAction';

const InitialSetUp = ({ setStep }) =>  {
   
   const [title, setTitle] = useState('')
   const [location, setLocation] = useState([''])
   const [qntyTravelers, setQntyTravelers] = useState('')
   const [description, setDescription] = useState('')
   const [validated, setValidated] = useState(false);
  
   const dispatch = useDispatch();

   const createdItinerary = useSelector(state => state.newItineraryFormInfo)
   const { loading, errorNewItineary, successNewItinerary } = createdItinerary;

   useEffect(() => {
      if(successNewItinerary) {
         setTitle('');
         setLocation(['']);
         setQntyTravelers('');
         setDescription('');
         setStep(2);
      }
   }, [successNewItinerary, setStep, dispatch]);

   const handleChangeLocation = (e) => {
      const index = Number(e.target.name.split('-')[1]);
      const locations = location.map((local, i) => (
         i === index ? e.target.value : local
      ));
      setLocation(locations);
   }
   
   const handleNewLocation = () => {
      setLocation([...location, ''])
   }
   
   const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
         dispatch(newItinerary({
            title, location, qntyTravelers, description
         }));
      } 
      setValidated(true);
   };
 

   return (
      <Row className="mt-4">
         <Col md={4} className='sidebar'>
            <div className='form-wrapper mt-0 position-sticky'>
               <h5>Instruções</h5>
               <p>Dicas para cadastrar o roteiro perfeito!</p>   

               <h6 className='fw-bold'>Título</h6>            
               <p>Cadastre um título relevante, que facilite a busca por outros viajantes. Por exemplo, local ou estilo da</p>
            </div>
         </Col>
         <Col md={8}>
               <Form noValidate validated={validated} onSubmit={handleSubmit} className='form-wrapper form-lg mt-0'> 
                  <h4 className='text-uppercase mb-4'>Cadastre seu Roteiro</h4>
                  <Form.Group controlId="title" className='mb-2'>
                     <Form.Label>Título</Form.Label>
                     <Form.Control
                        required
                        type="text"
                        placeholder="Título"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                     />
                  </Form.Group>
                     
                  <Form.Group as={Col} md={4} controlId='qntyTravelers' className='mb-2'>
                     <Form.Label>Quantidade de Pessoas</Form.Label>
                     <Form.Control type="number" required
                        value={qntyTravelers} 
                        onChange={(e) => setQntyTravelers(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Label>Local</Form.Label>
                  { location.map((local, i ) => (
                        <Form.Group controlId={`location-${i}`} key={`location-${i}`} className='mb-2'>
                           <Form.Control type="text" className='mb-2'
                              placeholder='Cidade, Parque Nacional' 
                              value={local} 
                              required={i === 0}
                              name={`location-${i}`}
                              onChange={handleChangeLocation}
                           />
                        </Form.Group>
                     ))
                  }
                  <Button className='btn-sm mb-3' type='button' onClick={handleNewLocation}>+ adicionar outro</Button>
                     
                  <Form.Group controlId='description' className='mb-2'>
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control as="textarea" required
                        value={description} 
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </Form.Group>
                
                  {errorNewItineary && <Message variant='danger' children={errorNewItineary} />}
                  <Button type="submit" variant='success' className='ms-auto px-5  d-block mt-3'> 
                     {loading ? <Loader /> : 'Próximo' }
                  </Button>
               </Form>
         </Col>
      </Row>
   )
}



export default InitialSetUp;   