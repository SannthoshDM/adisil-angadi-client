import React from 'react'
import EventCard from './EventCard';

const events = [1,1,1,1,1];

const Events = () => {
  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {
        events.map((item) => (
          <EventCard />
        ))
      }
    </div>
  );
}

export default Events;