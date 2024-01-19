import React from 'react';

const ParticipantList = ({ participants }) => {
  // verifica daca participants este definit si nu este null
  if (!participants || participants.length === 0) {
    return <div>No participants</div>;
  }

  return (
    <div>
      <strong>Participants:</strong>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.participantName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
