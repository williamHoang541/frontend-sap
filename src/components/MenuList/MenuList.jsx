import { Menu } from "antd";
import "./MenuList.css";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import { RxDashboard } from "react-icons/rx";
import {
  PiGraduationCap,
  PiBooks,
  PiExamLight,
  PiQuestionLight,
} from "react-icons/pi";
import { PiCertificate, PiUsersThree, PiCoinsLight } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";
import { IoAnalytics } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
import { MdViewModule } from "react-icons/md";

const MenuList = () => {
  const items = [
    {
      key: "dashboard",
      icon: <RxDashboard />,
      label: <Link to={PATH_NAME.DASHBOARD}>Dashboard</Link>,
    },
    {
      key: "students",
      icon: <PiUsersThree />,
      label: <Link to={PATH_NAME.STUDENT}>Student</Link>,
    },
    {
      key: "instructors",
      icon: <LuUsers2 />,
      label: <Link to={PATH_NAME.INSTRUCTOR}> Instructor</Link>,
    },
    {
      key: "module",
      icon: <MdViewModule />,
      label: <Link to={PATH_NAME.SAP_MODULE}> SAP Module</Link>,
    },
    {
      key: "certificate",
      icon: <PiCertificate />,
      label: <Link to={PATH_NAME.CERTIFICATE}> Certificate</Link>,
      
    },
    {
      key: "courses",
      icon: <PiGraduationCap />,
      label: <Link to={PATH_NAME.COURSE}> Courses</Link>,
    },
    {
      key: "sessions",
      icon: <PiBooks />,
      label: <Link to={PATH_NAME.SESSION}> Session</Link>,
     
    },
    {
      key: "topic_area",
      icon: <MdOutlineTopic />,
      label: <Link to={PATH_NAME.TOPIC}> Topic Area</Link>,
      
    },
    {
      key: "test",
      icon: <PiExamLight />,
      label: <Link to={PATH_NAME.TEST}>Test</Link>,
    },
    {
      key: "question_in_test",
      icon: <PiQuestionLight />,
      label: <Link to={PATH_NAME.QUESTION_IN_TEST}>Question in Test</Link>,
      
    },
    {
      key: "question",
      icon: <PiQuestionLight />,
      label: <Link to={PATH_NAME.QUESTION_BANK}>Question Bank</Link>,
      
    },
    
    {
      key: "payment",
      icon: <PiCoinsLight />,
      label: <Link to={PATH_NAME.PAYMENT}>Payment</Link>,
    },
    
    {
      key: "analytic",
      icon: <IoAnalytics />,
      label: <Link to={PATH_NAME.ANALYTIC}>Analytic</Link>,
    },
    
    {
      key: "setting",
      icon: <IoSettingsOutline />,
      label: <Link to={PATH_NAME.ACCOUNT_SETTING}>Account Setting</Link>,
    },
  ];
  return <Menu items={items} mode="inline" className="menu-bar"></Menu>;
};

export default MenuList;
