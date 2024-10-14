import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/LogoSAP.png";
import { FaRegUser, FaRegEyeSlash } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authen, setAuthen] = useState("");

    // Hàm xử lý đăng nhập
    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            username: username,
            password: password,
        };

        const url = "http://localhost:5250/api/User/login-web";

        try {
            const response = await axios.post(url, loginData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                localStorage.setItem(
                    "Authen",
                    JSON.stringify(response.data.token)
                );
                setAuthen(response.data.token);

                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setLoginError(
                error.response?.data?.message ||
                    "Username or password is incorrect. Try again!"
            );
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                <div className="forgot-password-link">
                    <span>Or</span>
                    <span className="forgot-password">Forgot Password?</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
