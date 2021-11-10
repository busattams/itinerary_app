import React from 'react';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';


const DailyItinerary = ({itinerary}) => (
   <Card className='mb-4'>
      <Card.Body>
      <div className='d-flex align-items-end mb-4'>
         <div className='date'>
            {format(new Date(itinerary.date.toString()), "dd", { locale: pt })}
            <span>{format(new Date(itinerary.date.toString()), "MMM", { locale: pt })}</span>
         </div>
         <p className='title'>{itinerary.location}</p>
      </div>
         <p>{itinerary.description}</p>
      </Card.Body>
   </Card>
);

export default DailyItinerary;