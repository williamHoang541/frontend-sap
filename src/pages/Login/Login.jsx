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
    const loginData = {
      username: username,
      password: password,
    };

    const url =
      "https://swdsapelearningapi.azurewebsites.net/api/User/login-web";

    try {
      console.log(loginData);
      const response = await axios.post(url, loginData);
      console.log(response.data);
      const token = response.data;
      localStorage.setItem("Authen", JSON.stringify(response.data));
      setAuthen(response.data);
      //
      await fetchUserInfo(token);
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

      // Lấy thông tin người dùng từ response
      const userInfo = {
        name: response.data.fullname,
        email: response.data.email,
        role: jwtDecode(token)[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ], // Lấy vai trò từ token
      };

      // Cập nhật thông tin người dùng
      setAuth(userInfo); // Giả sử bạn có một hàm setAuth để lưu thông tin người dùng
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
        navigate(PATH_NAME.COURSE_INSTRUCTOR);
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
