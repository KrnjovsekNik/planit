import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Uvoz stila za koledar
import { useNavigate } from "react-router-dom";

function NalogaInfoModal({ime, projekt, opis, isOpen, onClose }) {
  const [dueDate, setDueDate] = useState(null);
  const [showFriends, setShowFriends] = useState(false); // Stanje za prikaz prijateljev
  const navigate = useNavigate();

  const opravila = [
    { ime: "opravilo1" },
    { ime: "opravilo2" },
    { ime: "opravilo3" },
    { ime: "opravilo4" },
    { ime: "opravilo5" },
    { ime: "opravilo6" },
    { ime: "opravilo7" },
    { ime: "opravilo8" },
    { ime: "opravilo9" },
    { ime: "opravilo10"},
    { ime: "opravilo11" },
    { ime: "opravilo12" },
    { ime: "opravilo13" },
  ];



  if (!isOpen) return null;

  return (
    <div>

    </div>
  );
}

export default NalogaInfoModal;
