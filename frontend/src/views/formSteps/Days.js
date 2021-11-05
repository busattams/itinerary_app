import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addDayItinerary , getCreatedItinerary, itineraryCompleted} from '../../store/actions/itineraryAction';

const Days = ({ history }) => {
   const [date, setDate] = useState('');
   const [location, setLocation] = useState('');
   const [description, setDescription] = useState('');
   const [validated, setValidated] = useState(false);

   const dispatch = useDispatch();

   const { itinerary:createdItinerary } = useSelector(state => state.newItinerary);
   let itineraryId;

   if(createdItinerary){
      itineraryId = createdItinerary._id;
   } 


   const { loading, error, itinerary } = useSelector(state => state.newItineraryComplete);

   const itineraryFormInfo = useSelector(state => state.newItineraryFormInfo);
   const { loading:loadingDailyItinerary, errorDailyItinerary, successDailyItinerary, completedItinerarySuccess} = itineraryFormInfo;

   useEffect(() => {
      if(successDailyItinerary) {
         setDate('');
         setLocation('');
         setDescription('');
         dispatch(getCreatedItinerary(itineraryId))
      }
      if(completedItinerarySuccess) {
         history.push(`/roteiro/${itineraryId}`)
      }
   }, [successDailyItinerary, itineraryId, dispatch, history, completedItinerarySuccess]);
   
   const handleNewAccomodation = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === true) {
         dispatch(addDayItinerary(itineraryId, {
            date, location, description
         }));
      } else {
         setValidated(true);
      }
   }

   const publishItinerary = () => {
      const form = document.getElementById('validateNextBtn');
      if (form.checkValidity() === true) {
         dispatch(itineraryCompleted(itineraryId));
      } else {
         dispatch(itineraryCompleted(itineraryId));
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
               <h4 className='text-uppercase mb-4'>Roteiro Dia a dia</h4>

               <Form noValidate validated={validated} id="validateNextBtn" onSubmit={handleNewAccomodation} className='form-wrapper form-lg my-0'>
                  <Row>
                     <Form.Group as={Col} md={4} controlId='type' className='mb-3'>
                        <Form.Label>Data</Form.Label>
                        <Form.Control type='text'
                           placeholder='Data' 
                           value={date} 
                           required
                           onChange={(e) => setDate(e.target.value)}
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group as={Col} md={8} controlId='qntyDays' className='mb-3'>
                        <Form.Label>Local / Cidade</Form.Label>
                        <Form.Select
                           value={location}
                           placeholder='Cidade ou Local'
                           required 
                           onChange={(e) => setLocation(e.target.value)}
                        >
                           <option value=''>Selecione</option>

                           {createdItinerary && (
                            createdItinerary.location.map(local => (
                              <option value={local} key={local}>{local}</option>
                           )))}

                        </Form.Select>
                     </Form.Group>
                  </Row>
                  <Form.Group className="mb-3" controlId="description">
                     <Form.Label>Descritivo</Form.Label>
                     <Form.Control as="textarea" rows={3}
                        value={description} 
                        required
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </Form.Group>
                  {errorDailyItinerary && <Message variant='danger' children={errorDailyItinerary} />}
                  <Button type='submit' variant='success'>
                     {loadingDailyItinerary ? <Loader /> : 'Acrescentar Dia' }
                  </Button>
                 
               </Form>
               {(successDailyItinerary || (itinerary.dailyItinerary.length > 0)) && (
                  <Row className='px-3'>
                     <Button className='my-4 d-block btn-lg' type='button' onClick={publishItinerary} variant='success'>Publicar Roteiro</Button>
                  </Row>
               )}

               { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
                itinerary.dailyItinerary.length > 0 && (
                  <ListGroup  className='mb-4 listContent dailyData'>
                  {itinerary.dailyItinerary.map((d, i) => (
                     <ListGroup.Item key={`${d}-${i}`} className='d-flex align-items-center justify-content-between flex-wrap'>
                        <span>{d.date}</span>
                        <span>{d.location}</span>
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


export default Days;   