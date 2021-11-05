import React from 'react';
import { Card } from 'react-bootstrap';

const Accommodation = ({accommodation}) => (
   <Card className='mt-3'>
      <Card.Body>
      <h3>{accommodation.type}</h3>
      <p>Local: {accommodation.value}</p>
      <p>Local: {accommodation.qntyDay}</p>
      <p>{accommodation.description}</p>
      </Card.Body>
   </Card>
);

export default Accommodation;