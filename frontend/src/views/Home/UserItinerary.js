import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import '../assets/css/Home.css';
import { listUserItineraryDetail } from '../../store/actions/itineraryAction';

const UserItinerary = ({ history }) => {
   const dispatch = useDispatch();

   const { userInfo } = useSelector(state => state.userLogin);

   const itineraryList = useSelector(state => state.userItineraries);
   const { loading, error, itinerary } = itineraryList;
   
   useEffect(() => {
      if(userInfo) {
         dispatch(listUserItineraryDetail(userInfo._id));
      } else {
         history.push('/login');
      }
   }, [dispatch, userInfo, history]);

   const date = (date, output) => (
      format(new Date(date.toString()), output, { locale: pt })
   )
   return (
      <Container className='mt-5'>

         
      { loading && <Loader /> }
      { error && <Message variant='warning' children={error} /> }
      <Row>
         <h2 className='title mb-3'>Roteiros Publicados </h2>
      { itinerary && 
         itinerary.filter(itinerary => itinerary.isComplete).map(itinerary => (
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
      }

      <h2 className='title mt-5 mb-3'>Roteiros Incompletos</h2>
      { itinerary && 
         itinerary.filter(itinerary => !itinerary.isComplete).map(itinerary => (
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
      }
         </Row>


      </Container>
   )

}

export default UserItinerary;