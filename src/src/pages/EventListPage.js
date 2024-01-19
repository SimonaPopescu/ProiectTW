//hook-uri utilizate pentru gestionarea starii și efectuarea de operatii asincrone în componentele React
//hook-uri utilizate useState, useEffectw
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import eventService from '../services/eventServices';

import ParticipantList from './ParticipantList';
import './styles.css';
import ParticipantForm from './ParticipantForm';

import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await eventService.getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await eventService.deleteEvent(eventId);
      const updatedEvents = await eventService.getAllEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  const isAdmin = Cookies.get('admin') === 'admin';
  const handleAddParticipants = async (eventId, participants) => {
    try {
      await eventService.addParticipants(eventId, participants);
      const updatedEvents = await eventService.getAllEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error adding participants:', error.message);
    }
  };
  //lista de evenimente, daca e OPEN se creeaza QRCode
  return (
    <div className='container event-item'>
      <h1>Evenimente</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong className='event-detail-label event-name-label'>
              Event Name:
            </strong>{' '}
            {event.eventName}
            <br />
            <strong className='event-detail-label event-status-label'>
              Status:
            </strong>{' '}
            {event.eventStatus}
            <br />
            <strong className='event-detail-label event-code-label'>
              Event Code:
            </strong>{' '}
            {event.eventCode}
            <br />
            <strong className='event-detail-label event-date-label'>
              Event Date:
            </strong>{' '}
            {new Date(event.eventDate).toLocaleDateString()}{' '}
            {new Date(event.eventDate).toLocaleTimeString()}
            <br />
            {event.eventStatus === 'OPEN' && (
              <div>
                <QRCode value={`http://localhost:3001/events/${event.id}`} />
              </div>
            )}
            <ParticipantList participants={event.participants} />
            {isAdmin && (
              <button onClick={() => handleDeleteEvent(event.id)}>
                Șterge Eveniment
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
