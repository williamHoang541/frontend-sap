import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { Layout } from "antd";

import { GoSearch } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/LogoSAP.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import useAuth from "../hooks/useAuth";

const { Header } = Layout;
const Navbar = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  
  return (
    <Layout>
      <Header className="header">
        <div className="navbar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <img src={logo} alt="" className="sidebar-logo-img"/>
            </div>
          </div>

          <form className="navbar-form">
            <div className="navbar-position">
              <button className="navbar-search-button" type="submit">
                <GoSearch className="navbar-search-icon" />
              </button>
              <input
                type="text"
                className="navbar-search"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
        <div className="navbar-right">
          <button className="navbar-noti-button" type="button">
            <IoNotificationsOutline className="navbar-noti-icon" />
            <span className="navbar-point"></span>
          </button>
          <button
            className="navbar-button-name"
            ref={profileDropdownRef}
            onClick={toggleProfileDropdown}
          >
            Admin
          </button>
          {isProfileDropdownOpen && (
            <div className="navbar-dropdowns">
              <div className="navbar-dropdown-item">
                <div className="navbar-message">
                  <h6>Admin</h6>
                </div>
              </div>
              <div className="navbar-profile-wrapper">
                <IoSettingsOutline className="navbar-icon" />
                <div className="navbar-profile-item">Account Setting</div>
              </div>
              <div className="navbar-profile-wrapper">
                <CiLogout className="navbar-icon" />
                <div className="navbar-profile-item">Log Out</div>
              </div>
            </div>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
