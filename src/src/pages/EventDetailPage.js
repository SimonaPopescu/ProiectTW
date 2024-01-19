import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../services/eventServices';
import ParticipantForm from './ParticipantForm';
import * as XLSX from 'xlsx';
import Cookies from 'js-cookie';
const EventDetailPage = () => {
  const { eventId } = useParams(); //pt a obtine eventId din url
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventService.getEventDetails(eventId);
        //actualizeaza stateul cu evenimentul primit
        setEventDetails(details);
      } catch (error) {
        console.error('Error fetching event details', error);
      }
    };

    fetchEventDetails(); //cererea de preluare a evenimentelor este executata imediat ce componenta se monteaza.
  }, [eventId]); //asigura re-executarea efectului la schimbarea idului evenimenului

  const isAdmin = Cookies.get('admin') === 'admin'; //verifia daca utilizatotul este admin utilizand cookies

  const handleAddParticipants = async (participants) => {
    try {
      // adaugam participanti la eveniment
      const updatedEvent = await eventService.addParticipants(
        eventId,
        participants
      );

      // actualizam detaliile evenimentului cu noile date
      setEventDetails(updatedEvent);
    } catch (error) {
      console.error('Error adding participants', error);
    }
  };

  const downloadParticipants = () => {
    // verificare daca exista participanti inainte de download
    if (
      !eventDetails ||
      !eventDetails.participants ||
      eventDetails.participants.length === 0
    ) {
      alert('There are no participants to download.');
      return;
    }

    // construire continut pentru XLSX
    const worksheet = XLSX.utils.json_to_sheet(eventDetails.participants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');

    XLSX.writeFile(workbook, 'participants_data.xlsx');
  };

  if (!eventDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{eventDetails.eventName}</h1>
      <ParticipantForm
        eventId={eventId}
        onAddParticipants={handleAddParticipants}
      />

      <h2>Participants</h2>
      {isAdmin && (
        <button onClick={downloadParticipants}>Download Participants</button>
      )}
      <ul>
        {eventDetails.participants.map((participant) => (
          <li key={participant.id}>
            <p>Participant Name: {participant.participantName}</p>
            <p>
              Attendance Time: {participant.attendanceTime || 'Not recorded'}
            </p>
            <p>
              Created At: {new Date(participant.createdAt).toLocaleString()}
            </p>
            <p>
              Updated At: {new Date(participant.updatedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetailPage;
