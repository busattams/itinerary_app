import React from 'react';
import { Card } from 'react-bootstrap';

const DailyItinerary = ({itinerary}) => (
   <Card className='mt-3'>
      <Card.Body>
      <h3>{itinerary.date}</h3>
      <p>Local: {itinerary.location}</p>
      <p>{itinerary.description}</p>
      </Card.Body>
   </Card>
);

export default DailyItinerary;