import { useNavigate } from 'react-router-dom';

export const Odjava = () => {
  const navigate = useNavigate();
  return () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("_id");
    navigate("/login", { replace: true });
  };
};