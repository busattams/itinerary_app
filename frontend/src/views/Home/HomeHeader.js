import React from 'react';
import { Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeHeader = () => (
   <div id="hero">
   <Container>
      <h1>Descomplique seu planejamento e viaje mais</h1>
      <h2>Encontre o roteiro perfeito para você!</h2>
      <Link className='btn btn-primary' to='/cadastro'>Cadastre seu Roteiro</Link>
   </Container>
   </div>
);

export default HomeHeader;