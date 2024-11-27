import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Osnovni CSS za koledar

// Dodamo Tailwind prekrivanje za styling
const tailwindCalendarStyles = `
  .react-calendar {
    border: none;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  .react-calendar__tile {
    padding: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
  }

  .react-calendar__tile:hover {
    background-color: #e2e8f0;
  }

  .react-calendar__tile--active {
    background-color: #3b82f6;
    color: white;
  }

  .react-calendar__tile--active:hover {
    background-color: #2563eb;
  }
`;

const Koledar = () => {
    const [value, setValue] = useState(new Date());

    return (
        <div className="flex flex-col items-center">
            <style>{tailwindCalendarStyles}</style>
            <h2 className="text-2xl font-bold mb-4">Izberi datum:</h2>
            <Calendar
                onChange={setValue}
                value={value}
                className="w-full max-w-md"
            />
            <p className="mt-4 text-lg">
                Izbrani datum: <span className="font-semibold">{value.toDateString()}</span>
            </p>
        </div>
    );
};

export default Koledar;
