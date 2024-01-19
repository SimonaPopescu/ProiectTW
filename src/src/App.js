import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import CreateEventPage from './pages/CreateEventPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/events/create' element={<CreateEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
