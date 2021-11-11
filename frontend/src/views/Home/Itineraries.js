import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listItineraries } from '../../store/actions/itineraryAction';


const Itineraries = () => {
   const dispatch = useDispatch();

   const itineraryList = useSelector(state => state.itineraryList);
   const { loading, error, itineraries:allItineraries } = itineraryList;
  
   const itineraries = allItineraries.filter(itinerary => itinerary.isComplete)
   console.log(itineraries)
   useEffect(() => {
      dispatch(listItineraries());
   }, [dispatch]);


   const date = (date, output) => (
      format(new Date(date.toString()), output, { locale: pt })
   )
   return (
      <>
      { loading ? ( <Loader /> ) : error ? ( <Message variant='danger' children={error} /> ) : (
         itineraries.map(itinerary => (
            <Col md={4}  key={itinerary._id} className='position-relative mb-4'>
               <Link to={`/roteiros/${itinerary._id}`} className='itinerary-content'>
               <img src={itinerary.image} className="img-fluid" alt={itinerary.title}/>
                <div className='itinerary-info'>
                     <h2 className="title">{itinerary.title}</h2>
                     <span>
                         {date(itinerary.dateStart, "dd MMM yy")} - {date(itinerary.dateEnd, "dd MMM yy")}
                      </span>
                     <div className="itinerary-tags mt-2">
                     {itinerary.location.map((local) => (
                        <Badge key={local._id}> {local.location.split(',')[0]}</Badge>
                     ))}
                     </div>
                     <Badge className="itinerary-people"> <small className="fa fa-users"></small> {itinerary.qntyTravelers}</Badge>
                  </div>
               </Link>
            </Col>
         ))
      )}
    </>
   )
}

export default Itineraries;