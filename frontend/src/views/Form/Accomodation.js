import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from "react-number-format";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addAccommodation, deleteAccommodation, getCreatedItinerary } from '../../store/actions/itineraryAction';

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

   const removeAccommodation = (idaccommodation) => {
      dispatch(deleteAccommodation(itineraryId, idaccommodation));
   }


   return (
      <Form noValidate validated={validated} id="validateNextBtn" onSubmit={handleNewAccomodation} className='form-wrapper form-lg mt-0'>
         <h4 className='title my-4'>Hospedagem</h4>
         <Row>
            <Form.Group as={Col} md={12} controlId='type' className='mb-4'>
               <Form.Label>Tipo</Form.Label>
               <Form.Select required value={type}
               onChange={(e) => setType(e.target.value)}
               placeholder='Tipo'>
                  <option value=''>Selecione</option>
                  <option value='Hotel'>Hotel</option>
                  <option value='Pousada'>Pousada</option>
                  <option value='Hostel/Albergue'>Hostel/Alguergue</option>
                  <option value='AirBnB'>AirBnB</option>
                  <option value='Aluguel de Temporada'>Aluguel de Temporada</option>
                  <option value='Outro'>Outro</option>
               </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={5} controlId='qntyDays' className='mb-4'>
               <Form.Label>Quantidade de Diárias</Form.Label>
               <Form.Control type='number' value={qntyDay} required 
               onChange={(e) => setQntyDay(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group  as={Col} md={6} controlId='value' className='mb-4'>
               <Form.Label>Valor Total</Form.Label> 
               <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={value}
                  prefix="R$ "
                  decimalSeparator=","
                  displayType="input"
                  type="text"
                  thousandSeparator="."
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  placeholder="R$ 500,00"
                  onValueChange={(values) => {
                     const {floatValue} = values;
                     setValue(floatValue)
                  }}
               />
            </Form.Group>
         </Row>
         <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descritivo</Form.Label>
            <Form.Control as="textarea" rows={5} required
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Diga onde ficou hospedado, por onde reservou e o que mais achar necessário"
            />
         </Form.Group>
         
         <Button type='submit' variant='outline-primary'>
            {loadingAccommodation ? <Loader /> : 'Acrescentar Hospedagem'}
         </Button>

         {errorAccommodation && <Message variant='danger' children={errorAccommodation} />}


         { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
         itinerary.accommodation.length > 0 && (
            <div className='location-wrapper d-block mt-4'>
            {itinerary.accommodation.map((a, i) => (
               <div key={a._id} className='location-item'>
                  <p>{a.type}</p>
                  <p className='fw-normal ms-3'>R$ {a.value}</p>
                  <i onClick={() => removeAccommodation(a._id)} className='fas fa-times'></i>   
               </div>
            ))}
            </div>
               
         ))}
   
         {itinerary && (
            (itinerary.accommodation.length > 0) && (
               <Button className='mt-5 d-block mx-auto' type='button' onClick={nextStep} variant='primary'>Próximo</Button>
            ))
         }
      </Form>

   ) 
}


export default Accomodation;   