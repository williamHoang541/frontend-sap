import "./Login.css";
import logo from "../../assets/LogoSAP.png";
import { FaRegUser, FaRegEyeSlash } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";

const Login = () => {
  return (
    <div className="login">
      <div className="login-logo-container">
        <img src={logo} alt="SAP Logo" className="login-logo" />
        <h1 className="login-title">SAP Learn</h1>
      </div>
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        <p className="login-banner">Log In to Your Account!</p>
        <form>
          <div className="login-input-wrapper">
            <FaRegUser className="login-input-icon" />
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
            />
          </div>
          <div className="login-input-wrapper">
            <TfiKey className="login-input-icon" />
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
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
        <div className="forgot-password-link">
          <span>Or</span>
          <span className="forgot-password">Forgot Password?</span>
        </div>

      </div>
    </div>
    );
};

export default Login;
