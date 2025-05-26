// src/features/booking/BookingContext.jsx
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieId, setMovieId] = useState(null);

  const selectSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const clearBooking = () => {
    setSelectedSeats([]);
    setMovieId(null);
  };

  return (
    <BookingContext.Provider
      value={{ selectedSeats, selectSeat, movieId, setMovieId, clearBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}
