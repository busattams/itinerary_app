import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addDayItinerary, deleteDayItinerary, getCreatedItinerary, itineraryCompleted} from '../../store/actions/itineraryAction';

setDefaultLocale('pt');
registerLocale('pt', pt);

const Days = ({ history}) => {
   const [date, setDate] = useState(new Date());
   const [location, setLocation] = useState('');
   const [description, setDescription] = useState('');
   const [validated, setValidated] = useState(false);

   const dispatch = useDispatch();

   const { itinerary:createdItinerary } = useSelector(state => state.newItinerary);
   const itineraryId = createdItinerary._id;

   const { loading, error, itinerary } = useSelector(state => state.newItineraryComplete);

   const itineraryFormInfo = useSelector(state => state.newItineraryFormInfo);
   const { loading:loadingDailyItinerary, errorDailyItinerary, successDailyItinerary, completedItinerarySuccess} = itineraryFormInfo;

   useEffect(() => {
      if(successDailyItinerary) {
         setDate(new Date());
         setLocation('');
         setDescription('');
         dispatch(getCreatedItinerary(itineraryId))
      }
      if(completedItinerarySuccess) {
         history.push(`/roteiros/${itineraryId}`)
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

   const deleteDaily = (iddaily) => {
      dispatch(deleteDayItinerary(itineraryId, iddaily))
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
      <Form noValidate validated={validated} id="validateNextBtn" onSubmit={handleNewAccomodation} className='form-wrapper form-lg my-0'>
         <h4 className='title my-5'>Roteiro Dia a dia</h4>
         <Row>
            <Form.Group as={Col} md={4} controlId='type' className='mb-4'>
               <Form.Label>Data</Form.Label>
               <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' locale="pt" className='form-control'/>
            </Form.Group>
            <Form.Group as={Col} md={8} controlId='qntyDays' className='mb-4'>
               <Form.Label>Local / Cidade</Form.Label>
               <Form.Select required
               value={location} onChange={(e) => setLocation(e.target.value)}
               placeholder='Cidade ou Local'
               >
                  <option value=''>Selecione</option>
                  {createdItinerary && (
                     createdItinerary.location.map(local => (
                     <option value={local.location} key={local.location}>{local.location}</option>
                  )))}
               </Form.Select>
            </Form.Group>
         </Row>
         <Form.Group className="mb-4" controlId="description">
            <Form.Label>Descritivo</Form.Label>
            <Form.Control as="textarea" rows={15} required
               value={description} onChange={(e) => setDescription(e.target.value)}
               placeholder="Fale como foi o seu dia, o que fez, onde comeu, quanto gastou"
            />
         </Form.Group>

         <Button type='submit' variant='outline-primary'>
            {loadingDailyItinerary ? <Loader /> : 'Acrescentar Dia' }
         </Button>

         {errorDailyItinerary && <Message variant='danger' children={errorDailyItinerary} />}

         { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
            itinerary.dailyItinerary.length > 0 && (  
            <div className='location-wrapper d-block mt-4'>
               {itinerary.dailyItinerary.map(d => (
                  <div key={d._id} className='location-item'>
                     <p>{format(new Date(d.date.toString()), "dd/MM", { locale: pt })}</p>
                     <p className='fw-normal ms-3'>{d.location}</p>
                     <i onClick={() => deleteDaily(d._id)} className='fas fa-times'></i>   
                  </div>
               ))}
            </div>
         ))}

         {itinerary && (
            (itinerary.dailyItinerary.length > 0) && (
               <Button className='my-4 w-100' type='button' onClick={publishItinerary} variant='primary'>Publicar Roteiro</Button>
            ))
         }
      </Form>

               
         
   ) 
}


export default Days;   