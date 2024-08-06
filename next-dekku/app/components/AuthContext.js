"use client"; // Ensures this component runs only on the client-side

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    // This code runs only on the client-side
    const storedAccessToken = window.localStorage.getItem('access');
    const storedName = window.localStorage.getItem('name');

    setIsLoggedIn(!!storedAccessToken);
    setLoginUser(storedName);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useLogin = () => useContext(AuthContext);

export default AuthProvider;
