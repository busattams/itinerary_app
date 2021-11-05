import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Transport from './Transport';
import Accommodation from './Accommodation';
import DailyItinerary from './DailyItinerary';
import { listItineraryDetail } from '../../store/actions/itineraryAction';


const ItinerariesScreen = ({ match }) => {
   const dispatch = useDispatch();

   const itineraryDetail = useSelector(state => state.itineraryDetail);
   const { loading, error, itinerary } = itineraryDetail;
   
   useEffect(() => {
      dispatch(listItineraryDetail(match.params.id));  
   }, [dispatch, match]);


   const [key, setKey] = useState('itinerary');

   console.log(itinerary)
   
   const transportValues = [];
   let totalTransport;
   const accommodationValues = [];
   let totalAccommodation;

   const valueReducer = (value, total) => value + total;
   
   if(itinerary.transport && itinerary.transport.length) {
      itinerary.transport.map(transport => transportValues.push(transport.value));
      totalTransport = transportValues.reduce(valueReducer);
   }

   if(itinerary.accommodation && itinerary.accommodation.length) {
      itinerary.accommodation.map(accommodation => accommodationValues.push(accommodation.value));
      totalAccommodation = accommodationValues.reduce(valueReducer)
   }

   return (
      <>
      { loading ? ( <Loader /> ) : 
        error ? ( <Message variant='danger' children={error} /> ) : (
         <> 
         <div id="hero">
            <Container>
               <h1>{itinerary.title}</h1>
            </Container>
         </div>
         <Container className='mb-5'>
         <Row>
            <Col md={4}>
               <h2>Informações do Roteiro</h2>
               <ListGroup>
                  <ListGroup.Item>Viajantes: {itinerary.qntyTravelers}</ListGroup.Item>
                  <ListGroup.Item> 
                     {itinerary.location.map(local => (
                        <p key={local}>{local}</p>
                     ))}
                  </ListGroup.Item>
                  <ListGroup.Item> Descritivo: {itinerary.description}</ListGroup.Item>
                  <ListGroup.Item> Criado por: {itinerary.user.name}</ListGroup.Item>
               </ListGroup>
            </Col>

            <Col md={8} className='bg-white rounded p-2'>
            <Tabs
               id="itinerary-description"
               activeKey={key}
               onSelect={(k) => setKey(k)}
               className="mb-3 bg-white"
            >
               <Tab eventKey="itinerary" title="Itinerário">
                  {itinerary.dailyItinerary.map(itinerary => (
                     <DailyItinerary itinerary={itinerary} key={itinerary._id} />
                  ))}
               </Tab>
               <Tab eventKey="transport" title="Transporte">
                  {itinerary.transport.map(transport => (
                     <Transport transport={transport} key={transport._id} />
                  ))}
               </Tab>
               <Tab eventKey="accommodation" title="Hospedagem " >
                {itinerary.accommodation.map(accommodation => (
                     <Accommodation accommodation={accommodation} key={accommodation._id} />
                  ))}
               </Tab>
               
               <Tab eventKey="values" title="Valores">
                  <h2>Transporte:</h2>
                  R$ {totalTransport}

                  <h2>Hospedagem:</h2>
                  R$ {totalAccommodation}

                  <h2>Total: R${totalTransport + totalAccommodation} </h2>
               </Tab>

            </Tabs>

           
               
               </Col>
         </Row>
         </Container>
                 </>
      )}
    </>
   )
}

export default ItinerariesScreen;