import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { newItinerary } from '../../store/actions/itineraryAction';

setDefaultLocale('pt');
registerLocale('pt', pt);

const InitialSetUp = ({ setStep }) =>  {
   
   const [title, setTitle] = useState('')
   const [location, setLocation] = useState([])
   const [qntyTravelers, setQntyTravelers] = useState('')
   const [description, setDescription] = useState('')
   const [dateStart, setDateStart] = useState(new Date());
   const [dateEnd, setDateEnd] = useState(new Date());
   const [image, setImage ] = useState('');
   const [ uploading, setUploading ] = useState(false);

   const [validated, setValidated] = useState(false);
   const [locationMessage, setLocationMessage] = useState('');
   const dispatch = useDispatch();

   const createdItinerary = useSelector(state => state.newItineraryFormInfo)
   const { loading, errorNewItineary, successNewItinerary } = createdItinerary;


   // MAP/LOCATION API
   mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
   var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      language: 'pt',
      types: "district, place, locality"
   });

   geocoder.on('result', (e) => {
      let newLocation = {
         geometry: e.result.geometry,
         location: e.result.place_name
      }
      location.push(newLocation);
      setLocation([...location])
      geocoder.clear();
    });

    const cloudinary_cloud = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    // IMAGES API 
    const uploadFileHandler = async (e) => {
       setUploading(true);
       try {
         const url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud}/image/upload`;
         const file = e.target.files[0];
         const formData = new FormData();
         formData.append("file", file);
         formData.append("upload_preset", cloudinary_preset);
         axios.post(url, formData).then(res => {
            setImage(res.data.url)
         });
         setUploading(false)
      } catch(error) {
         console.error(error)
         setUploading(false)
      }
   }


   useEffect(() => {
      if(successNewItinerary) {
         setTitle('');
         setLocation(['']);
         setQntyTravelers('');
         setDescription('');
         setLocationMessage('');
         setStep(2);
      }

      geocoder.addTo("#mapboxSearch");

   }, [successNewItinerary, setStep]);

   const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if(!location.length) {
         setLocationMessage('Selecione no mínimo uma cidade')
      } else {
         if (form.checkValidity() === true) {
            dispatch(newItinerary({
               title, location, qntyTravelers, description, dateStart, dateEnd, image
            }));
            setLocationMessage('');
         } 
      }
      setValidated(true);
   };

   const deleteLocation = (local) => {
     const filteredLocation = location.filter(place => place.location !== local)
     setLocation([...filteredLocation])
   }
   return (
         <Form noValidate validated={validated} onSubmit={handleSubmit} className='form-wrapper form-lg mt-0'> 
            <h4 className='mb-5 title'>Seu Roteiro</h4>
            <Form.Group controlId="title" className='mb-4'>
               <Form.Label>Título</Form.Label>
               <Form.Control required type="text" placeholder="ex: Uma semana pela Serra Gaúcha no inverno" 
               value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            
            <Row>
               <Col md={6}>
                  <Form.Group controlId='dateStart' className='mb-4'>
                     <Form.Label>Data do Início</Form.Label>
                     <DatePicker selected={dateStart} onChange={(date) => setDateStart(date)} dateFormat='dd/MM/yyyy' locale="pt" className='form-control'/>
                  </Form.Group>
               </Col>
               <Col md={6}>
                  <Form.Group controlId='dateEnd'>
                     <Form.Label>Data do Fim</Form.Label>
                     <DatePicker selected={dateEnd} onChange={(date) => setDateEnd(date)} dateFormat='dd/MM/yyyy' locale="pt" className='form-control'/>
                  </Form.Group>
               </Col>
            </Row>
            
            <Form.Group controlId="local" className={locationMessage ? 'warning-location mb-4' : 'mb-4'}>
               <Form.Label>Cidades <span>{locationMessage}</span></Form.Label>
               <div id="mapboxSearch"></div>
               
               {location.length > 0 && (
                  <div className='location-wrapper'>
                  {location.map(local => (
                     <div key={local.location} className='location-item'>
                        <p>
                           {local.location.split(',')[0]}
                           <span>{local.location.split(',')[1]} - {local.location.split(',')[2]}</span>
                        </p>
                        <i onClick={() => deleteLocation(local.location)} className='fas fa-times'></i>   
                     </div>
                  ))}
               </div>
               )}
            </Form.Group>
            <Form.Group as={Col} md={5} controlId='qntyTravelers' className='mb-4'>
               <Form.Label>Quantos viajantes?</Form.Label>
               <Form.Control type="number" required
                  value={qntyTravelers} 
                  onChange={(e) => setQntyTravelers(e.target.value)}
               />
            </Form.Group>
            <Form.Group controlId='image' className="my-4">
                  <Form.Label>Imagem Principal</Form.Label>
                  <Form.Control type="file" required onChange={uploadFileHandler} className='p-2' />
                  {uploading && <Loader />}
                  {image && (
                     <img src={image} alt={`Imagem Roteiro`} className="d-block mx-auto mt-4" style={{width: '100%', height: '200px', objectFit: 'cover'}} />
                  )}

            </Form.Group>


            <Form.Group  controlId='description' className='mb-3 mt-4'>
               <Form.Label>Descrição</Form.Label>
               <Form.Control as="textarea" required rows={10}
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Faça um breve introdução da sua viagem. Detalhes serão acrescentados posteriormente"
               />
            </Form.Group>
            
            {errorNewItineary && <Message variant='danger' children={errorNewItineary} />}
            <Button type="submit" variant='primary' className='mx-auto d-block mt-5'> 
               {loading ? <Loader /> : 'Próximo' }
            </Button>
         </Form>
   )
}



export default InitialSetUp;   