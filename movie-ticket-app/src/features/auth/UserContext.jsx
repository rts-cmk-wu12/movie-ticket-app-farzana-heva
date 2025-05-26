// src/features/auth/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
