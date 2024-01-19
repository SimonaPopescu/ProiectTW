import React from 'react';
import Cookies from 'js-cookie';

const SetCookieRoute = () => {
  const setAdminCookie = () => {
    // seteaza cookie-ul cu numele "admin" si valoarea "admin"
    Cookies.set('admin', 'admin', { expires: 7 });
  };

  const deleteAdminCookie = () => {
    Cookies.remove('admin');
  };

  return (
    <div>
      <h1>Set Cookie Route</h1>
      <button onClick={setAdminCookie}>Setează cookie-ul admin</button>
      <button onClick={deleteAdminCookie}>Șterge cookie-ul admin</button>
    </div>
  );
};

export default SetCookieRoute;
