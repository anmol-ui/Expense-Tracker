import React, { useState } from 'react';

const UseShowLogin = () => {
  const [showLogin, setShowLogin] = useState(true);
  // do some stuff
  return { showLogin, setShowLogin };
};

export default UseShowLogin;