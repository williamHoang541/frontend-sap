import { useState } from "react";
import "./Login.css";
import logo from "../../assets/LogoSAP.png";
import { FaRegUser } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { PATH_NAME } from "../../constant/pathname";
import useAuth from "../../components/hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authen, setAuthen] = useState(null);

  // Hàm xử lý đăng nhập
 
  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = { username, password };
    const url = "https://swdsapelearningapi.azurewebsites.net/api/User/login-web";

    try {
      const response = await axios.post(url, loginData);
      const token = response.data;
      localStorage.setItem("Authen", JSON.stringify(token));

      await fetchUserInfo(token); // Fetch user information based on token
    } catch (error) {
      console.log(error);
      setLoginError("Username or password is incorrect.");
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(
        "https://swdsapelearningapi.azurewebsites.net/api/User/api/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("User info response:", response.data);
      

      // Decoding and storing user info
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log("Decoded token:", decodedToken);
      const userInfo = {
        userId: userId,
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };

      console.log("User info to be set:", userInfo);

      setAuth(userInfo); // Set user info in context
      navigateBasedOnRole(userInfo.role);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setLoginError("Could not fetch user information.");
    }
  };

  const navigateBasedOnRole = (role) => {
    console.log("Navigating based on role:", role);
    switch (role) {
      case "admin":
        navigate(PATH_NAME.DASHBOARD);
        break;
      case "instructor":
        navigate(PATH_NAME.CALENDAR);
        break;
      default:
        setLoginError("Username does not exist");
        break;
    }
  };

  return (
    <div className="login">
      <div className="login-logo-container">
        <img src={logo} alt="SAP Logo" className="login-logo" />
        <h1 className="login-title">SAP Learn</h1>
      </div>
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        <p className="login-banner">Log In to Your Account!</p>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div className="login-input-wrapper">
            <FaRegUser className="login-input-icon" />
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-input-wrapper">
            <TfiKey className="login-input-icon" />
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className="login-btn sign-in">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
