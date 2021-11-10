import React from 'react';
import { Card } from 'react-bootstrap';

const Accommodation = ({accommodation}) => (
   <Card className='mt-3'>
      <Card.Body>
      <p className='title mb-0'>{accommodation.type}</p>
      <p className='h5'>R$ {accommodation.value}, 00 <small>({accommodation.qntyDay} diárias)</small></p>
      <p>{accommodation.description}</p>
      </Card.Body>
   </Card>
);

export default Accommodation;