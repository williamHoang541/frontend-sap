import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  let userRole = null;

  // Decode the token to get the user role
  if (auth.token) {
    try {
      const decodedToken = jwtDecode(auth.token);
      userRole = decodedToken;
      ("http://schemas.microsoft.com/ws/2008/06/identity/claims/role"); // Adjust based on how the role is structured in the token
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

  return userRole && allowedRoles?.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to={PATH_NAME.LOGIN} state={{ from: location }} replace />
  );
};

export default RequireAuth;
