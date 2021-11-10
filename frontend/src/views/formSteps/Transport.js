import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import NumberFormat from "react-number-format";
import { addTransport, deleteTransport, getCreatedItinerary } from '../../store/actions/itineraryAction';

const Transport = ({setStep}) => {

   const dispatch = useDispatch();

   const [type, setType] = useState('');
   const [value, setValue] = useState('');
   const [description, setDescription] = useState('');
   const [validated, setValidated] = useState(false);

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

   const removeTransport = (idtransport) => {
      dispatch(deleteTransport(itineraryId, idtransport))
   }
   return (
         <Form noValidate validated={validated} id="validateNextBtn" onSubmit={handleNewTransport} className='form-wrapper form-lg mt-0'>
            <h4 className='title my-4'>Transporte</h4>
            <Row>
               <Form.Group as={Col} md={6} controlId='type' className='mb-4'>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select required placeholder='Tipo' 
                  value={type} onChange={(e) => setType(e.target.value)}>
                     <option value=''>Selecione</option>
                     <option value='Carro'>Carro</option>
                     <option value='Avião'>Avião</option>
                     <option value='Ônibus'>Ônibus</option>
                     <option value='Trem'>Trem</option>
                     <option value='Barco/Navio'>Barco/Navio</option>
                     <option value='Outro'>Outro</option>
                  </Form.Select>
               </Form.Group>
               <Form.Group as={Col} md={6} controlId='value' className='mb-4'>
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
                  value={description}  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Fale qual a empresa, o trajeto feito e o que mais achar necessário." />
               </Form.Group>
            
            {errorTransport && <Message variant='danger' children={errorTransport} /> }

            <Button type='submit' className='btn-sm' variant='outline-primary' >
               {loadingTransport ? <Loader /> : 'Cadastrar transporte'}
            </Button>
           
            { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
               itinerary.transport.length > 0 && (
                  <div className='location-wrapper d-block mt-4'>
                  {itinerary.transport.map((t) => (
                     <div key={t._id} className='location-item'>
                        <p>{t.type}</p>
                        <p className='fw-normal ms-3'>R$ {t.value}</p>
                        <i onClick={() => removeTransport(t._id)} className='fas fa-times'></i>   
                     </div>
                  ))}
                  </div>
               )
            )}

            { itinerary && (
               itinerary.transport.length > 0 && (
                  <Button className='mt-5 d-block mx-auto' type='button' onClick={nextStep} variant='primary'>Próximo</Button>
               )
            )}
         </Form>
   )
}


export default Transport;   