import React from 'react';
import { Card } from 'react-bootstrap';

const Transport = ({transport}) => (
   <Card className='mt-3'>
      <Card.Body>
      <h3>Tipo: {transport.type}</h3>
      <p>Valor: {transport.value}</p>
      <p>Valor: {transport.description}</p>
      </Card.Body>
   </Card>
);

export default Transport;