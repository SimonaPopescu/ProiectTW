import React, { useState } from 'react';
//useState este un hook care permite componentei să-și gestioneze propria stare interna
//aduce modulul QRCode pentru a genera coduri QR
import QRCode from 'qrcode.react';
import { addParticipants } from '../services/eventServices';

const ParticipantForm = ({ eventId }) => {
  const [participantName, setParticipantName] = useState('');

  const handleAddParticipant = async () => {
    if (!participantName) {
      alert('Please enter participant name.');
      return;
    }

    try {
      await addParticipants(eventId, [participantName]);
      setParticipantName('');
    } catch (error) {
      console.error(error.message);
      alert('Failed to add participant. Please try again.');
    }
  };

  return (
    <div>
      <h2>Subscribe</h2>
      <label>
        Your name:
        <input
          type='text'
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
        />
      </label>
      <button onClick={handleAddParticipant}>Subscribe</button>

      {/* afiseaza codul QR */}
      {participantName && (
        <div>
          <h2>Participant QR Code</h2>
          {/* genereaza codul QR cu participantName si eventId */}
          <QRCode
            value={`http://localhost:3000/participant/${eventId}/${participantName}`}
          />
        </div>
      )}
    </div>
  );
};

export default ParticipantForm;
