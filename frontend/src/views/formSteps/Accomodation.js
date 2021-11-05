import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, ListGroup, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addAccommodation, getCreatedItinerary } from '../../store/actions/itineraryAction';

const Accomodation = ({setStep}) => {
   const [type, setType] = useState('');
   const [value, setValue] = useState('');
   const [qntyDay, setQntyDay] = useState('');
   const [description, setDescription] = useState('');
   const [validated, setValidated] = useState(false);

   const dispatch = useDispatch();

   const { itinerary:createdItinerary } = useSelector(state => state.newItinerary);
   const itineraryId = createdItinerary._id;

   const { loading, error, itinerary } = useSelector(state => state.newItineraryComplete);

   const itineraryFormInfo = useSelector(state => state.newItineraryFormInfo);
   const { loading:loadingAccommodation, errorAccommodation, successAccommodation} = itineraryFormInfo;
   
   useEffect(() => {
      if(successAccommodation) {
         setType('');
         setValue('');
         setQntyDay('');
         setDescription('');
         dispatch(getCreatedItinerary(itineraryId))
      }
   }, [successAccommodation, dispatch, itineraryId]);
   
   const handleNewAccomodation = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === true) {
         dispatch(addAccommodation(itineraryId, {
            type, value, qntyDay, description
         }));
         
      } else {
         setValidated(true);
      }
   }

   const nextStep = () => {
      const form = document.getElementById('validateNextBtn');
      if (form.checkValidity() === true) {
         dispatch(addAccommodation(itineraryId, {
            type, value, qntyDay, description
         }));
         setStep(4);
      } else {
         setStep(4);
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
               
               <h4 className='text-uppercase mb-4'>Hospedagem</h4>
               <Button type='button' onClick={() => setStep(2)}>Voltar</Button>

               <Form noValidate validated={validated} id="validateNextBtn" onSubmit={handleNewAccomodation} className='form-wrapper form-lg mt-0'>
                  <Form.Group as={Col} md={5} controlId='type' className='mb-3'>
                     <Form.Label>Tipo</Form.Label>
                     <Form.Select as='select'
                        placeholder='Tipo' 
                        value={type} 
                        required
                        onChange={(e) => setType(e.target.value)}
                     >
                           <option value=''>Selecione</option>
                           <option value='Hotel'>Hotel</option>
                           <option value='Pousada'>Pousada</option>
                           <option value='Hostel/Albergue'>Hostel/Alguergue</option>
                           <option value='AirBnB'>AirBnB</option>
                           <option value='Aluguel de Temporada'>Aluguel de Temporada</option>
                           <option value='Outro'>Outro</option>
                     </Form.Select>
                  </Form.Group>
                  <Row>

                  <Col md={4}>
                     <Form.Group controlId='qntyDays' className='mb-3'>
                        <Form.Label>Quantidade de Diárias</Form.Label>
                        <Form.Control type='number'
                           value={qntyDay}
                           required 
                           onChange={(e) => setQntyDay(e.target.value)}
                        ></Form.Control>
                     </Form.Group>
                  </Col>
                  <Col md={4}>
                     <Form.Group controlId='value' className='mb-3'>
                        <Form.Label>Valor Total</Form.Label>
                        <InputGroup>
                           <InputGroup.Text>R$</InputGroup.Text>
                           <Form.Control type='number'
                              value={value} 
                              required
                              onChange={(e) => setValue(e.target.value)}
                           ></Form.Control>
                        </InputGroup>
                     </Form.Group>
                  </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="description">
                     <Form.Label>Descritivo</Form.Label>
                     <Form.Control as="textarea" rows={3}
                        value={description} 
                        required
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </Form.Group>
                  {errorAccommodation && <Message variant='danger' children={errorAccommodation} />}
                  <Button type='submit' variant='success'>
                     {loadingAccommodation ? <Loader /> : 'Acrescentar Hospedagem'}
                  </Button>


                  {(successAccommodation || (itinerary.accommodation.length > 0)) && (
                     <Button className='mt-3 d-block ms-auto' type='button' onClick={nextStep} variant='success'>Próximo</Button>
                  )}
               </Form>


            { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (

               itinerary.accommodation.length > 0 && (
                  <ListGroup  className='mb-4 listContent'>
                  {itinerary.accommodation.map((a, i) => (
                     <ListGroup.Item key={`${a}-${i}`} className='d-flex align-items-center justify-content-between flex-wrap'>
                        <span>{a.type}</span>
                        <span>R$ {a.value}</span>
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


export default Accomodation;   