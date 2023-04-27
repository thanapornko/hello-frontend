import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !authenticatedUser ||
      authenticatedUser.isAdmin === false
    ) {
      navigate("/");
    }
  }, [authenticatedUser, navigate]);

  return children;
}
