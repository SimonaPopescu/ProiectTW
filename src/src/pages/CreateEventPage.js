// src/pages/CreateEventPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEventPage = () => {
  const history = useNavigate(); //hook pt redirectionarea utilizatorului pe alta ruta

  //straile initiale
  const [eventName, setEventName] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');

  const handleCreateEvent = async () => {
    //se declanseaza la crearea evenimentului
    try {
      console.log('Data sent to server:', {
        eventName,
        eventCode,
        eventDateTime: new Date(eventDateTime).toISOString(),
      });

      const response = await axios.post('http://localhost:3000/events', {
        eventName,
        eventCode,
        eventDate: new Date(eventDateTime).toISOString(),
        scheduledDate: new Date(eventDateTime).toISOString(),
      });

      console.log('Event created:', response.data);

      history('/events');
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form>
        <label className='event-label'>
          Event Name:
          <input
            type='text'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={{ color: '#ff6b6b' }}
          />
        </label>
        <br />
        <label className='event-label'>
          Event Code:
          <input
            type='text'
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value)}
            style={{ color: '#ff6b6b' }}
          />
        </label>
        <br />
        <label className='event-label'>
          Event Date and Time:
          <input
            type='datetime-local' //permite utilizatorului sa seteze atat data cat si ora
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)}
          />
        </label>
        <br />
        <button type='button' onClick={handleCreateEvent}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
