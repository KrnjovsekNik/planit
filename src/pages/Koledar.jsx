import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./customCalendar.css";
import { pridobiNaloge } from "../api/nalogeApi";
import Loading from "./Loading";
import { toast } from "react-toastify";
import Modal from "./Modal"; 
import { FaInfoCircle, FaRegCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [naloge, setNaloge] = useState([]);
  const [koledarEvents, setKoledarEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const my_username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchNaloge = async () => {
      setLoading(true);
      try {
        const data = await pridobiNaloge(my_username);
        setNaloge(data);

        const events = data.map((naloga) => ({
          id: naloga._id,
          title: naloga.ime,
          start: new Date(naloga.rok),
          end: new Date(naloga.rok),
          color: naloga.stanje === "končano" ? "#48BB78" : naloga.stanje === "vteku" ? "#4299E1" : "#ED8936",
          details: naloga, 
        }));

        setKoledarEvents(events);
      } catch (error) {
        toast.error("Napaka pri pridobivanju nalog.");
      } finally {
        setLoading(false);
      }
    };

    fetchNaloge();
  }, []);

  const eventStyleGetter = (event) => ({
    className: "custom-event",
    style: {
      backgroundColor: event.color,
      borderRadius: "8px",
      color: "white",
      padding: "5px",
    },
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event.details); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedEvent(null); 
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        {loading ? (
          <Loading />
        ) : (
          <Calendar
            localizer={localizer}
            events={koledarEvents}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            className="custom-big-calendar"
            defaultView="month"
            views={["month", "week", "day"]}
            onSelectEvent={handleEventClick} 
            messages={{
              next: "Naprej",
              previous: "Nazaj",
              today: "Danes",
              month: "Mesec",
              week: "Teden",
              day: "Dan",
            }}
          />
        )}
      </div>


      {isModalOpen && (
        <Modal onClose={closeModal} title="Podrobnosti naloge">
        <p>
          <FaInfoCircle /> <strong>Ime:</strong> {selectedEvent?.ime}
        </p>
        <p>
          <FaRegCalendarAlt /> <strong>Opis:</strong> {selectedEvent?.opis}
        </p>
        <p>
          <FaClock /> <strong>Rok:</strong> {new Date(selectedEvent?.rok).toLocaleString()}
        </p>
        <p>
          <FaCheckCircle /> <strong>Stanje:</strong> {selectedEvent?.stanje}
        </p>
      </Modal>
      )}
    </div>
  );
};

export default MyCalendar;
