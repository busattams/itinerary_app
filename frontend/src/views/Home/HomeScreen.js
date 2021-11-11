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
            <Row>
               <Itineraries />
            </Row>
         </Container>
      </>
   );

}

export default HomeScreen;