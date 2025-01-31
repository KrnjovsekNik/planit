import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { BsGraphUp, BsClipboardCheck } from 'react-icons/bs';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
let routes = [
    {
      label: "Home",     // Name of the navigation item
      path: "/home",         // Corresponding route
      requiresAuth: false, // Whether authentication is required
      icon: <AiOutlineHome /> 
    },
    {
      label: "Chat",
      path: "/chat",
      requiresAuth: true, // Requires the user to be authenticated
      icon: <AiOutlineMessage />
    },
    {
      label: "Statistika",
      path: "/statistika",
      requiresAuth: true,
      icon: <BsGraphUp />
    },
    {
      label: "Moji projekti",
      path: "/moji-projekti",
      requiresAuth: true,
      icon: <BsClipboardCheck />
    },
    {
      label: "Moje naloge",
      path: "/moje-naloge",
      requiresAuth: true,
      icon: <MdOutlineTaskAlt />
    },
    {
     label: "Prijatelji",
     path: "/prijatelji",
     requiresAuth: true,
     icon: <FaUserFriends />
    },
    {
      label: "Koledar",
      path: "/koledar",
      requiresAuth: true,
      icon: <FaCalendarAlt />
     },
  ];

export default routes;