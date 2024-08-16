import React, { useState } from 'react';

const ShortletBookingScreen = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    // Here you can handle the search logic, e.g., make an API call to search for shortlet apartments
    const searchCriteria = {
      checkInDate,
      checkOutDate,
      location: { state, area },
      rooms,
    };

    console.log('Search Criteria:', searchCriteria);
    // Perform the search using the criteria
  };

  return (
    <div>
      <h1>Search for Shortlet Apartments</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Check-In Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Check-Out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Area:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Rooms:</label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default ShortletBookingScreen;
