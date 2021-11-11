import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Tabs, Tab, Table, Button, Modal } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Transport from './Transport';
import Accommodation from './Accommodation';
import DailyItinerary from './DailyItinerary';
import { listItineraryDetail } from '../../store/actions/itineraryAction';
import './itinerary.css';
import { RESET_NEW_ITINERARY } from '../../store/constants/itineraryConstants';


const ItinerariesScreen = ({ match, history }) => {
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   
   const [deleteError, setDeleteError] = useState('');

   const itineraryDetail = useSelector(state => state.itineraryDetail);
   const { loading, error, itinerary } = itineraryDetail;
   
   const { userInfo } = useSelector(state => state.userLogin);

   useEffect(() => {
      dispatch({type: RESET_NEW_ITINERARY});
      dispatch(listItineraryDetail(match.params.id));  
   }, [dispatch, match]);


   const [key, setKey] = useState('itinerary');

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

   const deleteItinerary = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            },
         }
        await axios.delete(
            `/api/itinerary/${itinerary._id}`,
            config
         );
         history.push(`/profile`)
      } catch(error) {
         setDeleteError(error.message);
         setShow(false);
      }
   }


   return (
      <>
      { loading ? ( <Loader /> ) : 
        error ? ( <Message variant='danger' children={error} /> ) : (
         <> 
         <div id="hero" style={{background: `url(${itinerary.image})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <Container>
               <h1>{itinerary.title}</h1>
            </Container>
         </div>
         <Container className='mb-5 full-itinerary'>
            <Row>
               <Col md={10} className='mx-auto'>
            <div className='main-info mb-5'>
               <Row>
                  <Col md={8}>
                     <h4 className='title'>Descritivo:</h4>
                     <p>{itinerary.description}</p>
                  </Col>
                  <Col md={4}>
                     <h4 className='title'>Locais</h4>
                     <ul className='location-content p-0 mb-3'>
                        {itinerary.location.map(local => (
                        <li  key={local.location}>
                           {local.location.split(',')[0]} <span>({local.location.split(',')[1]} - {local.location.split(',')[2]})</span>
                        </li>
                        ))}
                     </ul>
                     <p><strong>Viajantes:</strong> {itinerary.qntyTravelers}  </p>
                     <p><strong>Criado por: </strong> {itinerary.user.name}</p>
                     
                     { userInfo && (

                     itinerary.user._id === userInfo._id && (
                        <>
                        <Button variant='light' className='btn-sm' onClick={handleShow}><i className='far fa-trash-alt'></i> Excluir roteiro </Button>
                        <Modal show={show} onHide={handleClose} centered>
                           <Modal.Header closeButton className='d-block deleteModal'>
                              <Modal.Title>Tem certeza que quer excluir este roteiro? Isso não pode ser desfeito.</Modal.Title>
                              <Button variant="danger" onClick={deleteItinerary} className='mt-4'>
                                 Excluir
                              </Button>
                              <p onClick={handleClose} className='mt-2 mb-0 cancelBtn'>
                                 Cancelar
                              </p>
                           </Modal.Header>
                        </Modal>
                        </>
                     ))}
                  </Col>
               </Row>
            </div>
            { deleteError && <Message variant='danger' children={deleteError} />}

            <div className='itinerary-description'>
            <Tabs variant='pills'
               id="itinerary-description"
               activeKey={key}
               onSelect={(k) => setKey(k)}
               className="mb-3 justify-content-center"
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
               <Table striped bordered hover>
                  <tbody>
                     <tr>
                        <td>Hospedagem</td>
                        <td>R$ {totalAccommodation},00 </td>
                     </tr>
                     <tr>
                        <td>Transporte</td>
                        <td>R$ {totalTransport},00 </td>
                     </tr>
                     <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>R$ {totalTransport + totalAccommodation},00</strong></td>
                     </tr>
                  </tbody>
                  </Table>
               </Tab>

            </Tabs>

           
               
               </div>
               </Col>
               </Row>
         </Container>
                 </>
      )}
    </>
   )
}

export default ItinerariesScreen;