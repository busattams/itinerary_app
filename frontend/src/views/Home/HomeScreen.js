import React from 'react';
import HomeHeader from './HomeHeader';
import Itineraries from './Itineraries';
import { Container, Row } from 'react-bootstrap';
import '../assets/css/Home.css';

const HomeScreen = () => {

  
   return (
      <>
         <HomeHeader />
         <Container id='home' className='mb-5'>
            <h1 className="h3 fw-bolder mb-4">Últimos roteiros cadastrados</h1>
            <Row>
               <Itineraries />
            </Row>
         </Container>
      </>
   );

}

export default HomeScreen;