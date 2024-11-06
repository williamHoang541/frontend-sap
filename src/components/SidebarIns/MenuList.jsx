
import { PATH_NAME } from "../../constant/pathname";
import { Link, useNavigate } from "react-router-dom";
import { RxCalendar } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { Menu } from "antd";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";

const MenuList = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Authen");
    setAuth(null);
    navigate(PATH_NAME.LOGIN);
  };
  const items = [
    {
      key: "calender",
      icon: <RxCalendar />,
      label: <Link to={PATH_NAME.CALENDAR}>Calendar</Link>,
    },
    {
      key: "course_ins",
      icon: <LiaGraduationCapSolid />,
      label: <Link to={PATH_NAME.COURSE_INSTRUCTOR}>Course</Link>,
    },
    {
      key: "logout",
      icon: <CiLogout />,
      label: "Log out",
      onClick: handleLogout,
    },
  ];
  return <Menu items={items} mode="inline" className="menu-bar"></Menu>;
};

export default MenuList;
