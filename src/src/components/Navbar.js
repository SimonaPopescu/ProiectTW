import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const isAdmin = Cookies.get('admin') === 'admin';

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to='/events/create'>Create Event</Link>
            </li>
            <li>
              <Link to='/set-cookie'>Set Cookie</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
