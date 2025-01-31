import { useNavigate } from 'react-router-dom';

export const Odjava = () => {
  const navigate = useNavigate();
  return () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("profile_image");
    navigate("/login", { replace: true });
  };
};