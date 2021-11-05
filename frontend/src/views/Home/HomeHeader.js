import React from 'react';
import { Container, Button } from 'react-bootstrap';

const HomeHeader = () => (
   <div id="hero">
   <Container>
      <h1>Descomplique seu planejamento e viaje mais</h1>
      <h2>Encontre o roteiro perfeito para você!</h2>
      <Button className='me-2'>Veja os Roteiros</Button>
      <Button>Cadastre seu Roteiro</Button>
   </Container>
   </div>
);

export default HomeHeader;