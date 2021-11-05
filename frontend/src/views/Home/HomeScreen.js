import React from 'react';
import HomeHeader from './HomeHeader';
import Itineraries from './Itineraries';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/Home.css';

const HomeScreen = () => {

  
   return (
      <>
         <HomeHeader />
         <Container id='home'>
            <Row>
               <Col md={3} lg={4}>
                  <h4>Para onde você quer ir?</h4>
               </Col>
               <Col md={9} lg={8}>
                  <Itineraries />
               </Col>
            </Row>
         </Container>
      </>
   );

}

export default HomeScreen;