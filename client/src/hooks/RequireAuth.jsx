import { useSelector } from "react-redux";
import LoginPopup from "@/components/LoginPopup";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <LoginPopup />;
  }
  return children;
};

export default RequireAuth;
