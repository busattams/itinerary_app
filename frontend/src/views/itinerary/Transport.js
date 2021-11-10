import React from 'react';
import { Card } from 'react-bootstrap';

const Transport = ({transport}) => (
   <Card className='mb-4'>
      <Card.Body>
      <p className='title mb-0'>{transport.type}</p>
      <p className='h5'>R$ {transport.value},00</p>
      <p>{transport.description}</p>
      </Card.Body>
   </Card>
);

export default Transport;