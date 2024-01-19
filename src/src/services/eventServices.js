import axios from 'axios';

const API_URL = 'http://localhost:3000/events';

const eventService = {
  getAllEvents: async () => {
    try {
      const response = await axios.get(API_URL); //trimite cerere la url, preia evenimentele disp de la server
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getEventDetails: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${API_URL}/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

const addParticipants = async (eventId, participants) => {
  try {
    const response = await fetch(`${API_URL}/${eventId}/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participants }),
    });

    if (!response.ok) {
      throw new Error('Failed to add participants');
    }

    const updatedEvent = await response.json();
    return updatedEvent;
  } catch (error) {
    throw new Error(`Error adding participants: ${error.message}`);
  }
};

export default eventService;
export { addParticipants };
