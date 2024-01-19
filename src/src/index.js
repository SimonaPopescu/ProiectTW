import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailPage from './pages/EventDetailPage';
import Navbar from './components/Navbar';
import SetCookieRoute from './pages/SetCookieRoute';

// Componenta pentru ruta "/set-cookie"
const SetCookieWrapper = () => (
  <div>
    <Outlet />
  </div>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/events/create' element={<CreateEventPage />} />
      <Route path='/' element={<EventListPage />} />
      <Route path='/events/:eventId' element={<EventDetailPage />} />
      {/* modifica ruta "/set-cookie" pentru a folosi SetCookieWrapper */}
      <Route path='/set-cookie' element={<SetCookieWrapper />}>
        {/* adauga sub-rutele specifice lui "/set-cookie" aici */}
        <Route index element={<SetCookieRoute />} />
      </Route>
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
