import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listItineraries } from '../../store/actions/itineraryAction';

const Itineraries = () => {
   const dispatch = useDispatch();
   const itineraryList = useSelector(state => state.itineraryList);
   const { loading, error, itineraries } = itineraryList;
   
   useEffect(() => {
      dispatch(listItineraries());
   }, [dispatch]);


   return (
      <>
      { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
         itineraries.map(itinerary => (
            <Card className='itinerary-wrapper mb-3' key={itinerary._id}>
               <Link to={`/roteiros/${itinerary._id}`} className='itinerary-img'>
                  <img src="https://images.unsplash.com/photo-1476673160081-cf065607f449?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1172&q=80" className="img-fluid" alt="jguierhgio"/>
               </Link>
               <Card.Body>
                  <Link to={`/roteiros/${itinerary._id}`}><h3>{itinerary.title}</h3></Link>
                  <Badge bg="secondary" className='me-2'>7 dias</Badge>
                  <Badge bg="secondary">{itinerary.qntyTravelers} {itinerary.qntyTravelers === 1 ? 'pessoa' : 'pessoas'}</Badge>
                  <p>
                     Cidades: 
                     {itinerary.location.map((local, i) => (
                        <span key={local}> {local}{i === itinerary.location.length - 1 ? '' : ','} </span>
                     ))}
                  </p>
                  <Link to={`/roteiros/${itinerary._id}`}>Veja o roteiro  </Link>
               </Card.Body>
            </Card>
         ))
      )}
    </>
   )
}

export default Itineraries;