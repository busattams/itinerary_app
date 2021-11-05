import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, ListGroup, InputGroup  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addTransport, getCreatedItinerary } from '../../store/actions/itineraryAction';

const Transport = ({setStep}) => {

   const [type, setType] = useState('');
   const [value, setValue] = useState('');
   const [description, setDescription] = useState('');
   const [validated, setValidated] = useState(false);

   const dispatch = useDispatch();

   const { itinerary:createdItinerary } = useSelector(state => state.newItinerary);
   const itineraryId = createdItinerary._id;

   const { loading, error, itinerary } = useSelector(state => state.newItineraryComplete);

   const itineraryFormInfo = useSelector(state => state.newItineraryFormInfo);
   const { loading:loadingTransport, errorTransport, successTransport } = itineraryFormInfo;

   useEffect(() => {
      if(successTransport) {
         setType('');
         setValue('');
         setDescription('');
         dispatch(getCreatedItinerary(itineraryId))
      }
   }, [successTransport, dispatch, itineraryId]);


   const handleNewTransport = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === true) {
          dispatch(addTransport(itineraryId, {
            type, value, description
         }));
         setValidated(false);
      } else {
         setValidated(true);
      }
   }

   const nextStep = () => {
      const form = document.getElementById('validateNextBtn');
      if(form.checkValidity() === true ) {
         dispatch(addTransport(itineraryId, {
            type, value, description
         }));
         setStep(3);
      } else {
         setStep(3);
      }
   }

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
               <>
                  <Form noValidate validated={validated} id="validateNextBtn" onSubmit={handleNewTransport} className='form-wrapper form-lg mt-0'>
                     <h4 className='text-uppercase mb-4'>Transporte</h4>
                     <Form.Group as={Col} md={5} controlId='type' className='mb-3'>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select as='select'
                           required
                           placeholder='Tipo' 
                           value={type} 
                           onChange={(e) => setType(e.target.value)}
                        >
                           <option value=''>Selecione</option>
                           <option value='Carro'>Carro</option>
                           <option value='Avião'>Avião</option>
                           <option value='Ônibus'>Ônibus</option>
                           <option value='Trem'>Trem</option>
                           <option value='Barco/Navio'>Barco/Navio</option>
                           <option value='Outro'>Outro</option>
                        </Form.Select>
                     </Form.Group>
                     <Form.Group as={Col} md={6} controlId='value' className='mb-3'>
                        <Form.Label>Valor</Form.Label>
                        <InputGroup>
                           <InputGroup.Text>R$</InputGroup.Text>
                           <Form.Control type='number'
                              value={value} 
                              required
                              onChange={(e) => setValue(e.target.value)}
                           ></Form.Control>
                        </InputGroup>
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descritivo</Form.Label>
                        <Form.Control as="textarea" rows={5}
                           value={description} 
                           required
                           onChange={(e) => setDescription(e.target.value)}
                        />
                     </Form.Group>
                     
                     {errorTransport && <Message variant='danger' children={errorTransport} /> }
                     <Button type='submit' variant='success' >
                        {loadingTransport ? <Loader /> : 'Cadastrar transporte'}
                     </Button>
                     <br />
                     { (successTransport || (itinerary.transport.length)) > 0 && (
                        <Button className='mt-4 d-block ms-auto px-5' type='button' onClick={nextStep} variant='success'>Próximo</Button>
                     )}
                  
                  </Form>
                  
                  { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
                     itinerary.transport.length > 0 && (
                     <ListGroup  className='mb-4 listContent'>
                        {itinerary.transport.map((t) => (
                           <ListGroup.Item key={`${t._id}`} className='d-flex align-items-center justify-content-between flex-wrap'>
                              <span>{t.type}</span>
                              <span>R$ {t.value}</span>
                              <span>
                                 <Button type='button' variant='warning' className='btn-sm me-2' >Ed</Button>
                                 <Button type='button' variant='danger' className='btn-sm' >Ex</Button>
                              </span>
                           </ListGroup.Item>
                        ))}
                     </ListGroup>
                  )
                  )}
               </>
         </Col>
      </Row>
   )
}


export default Transport;   