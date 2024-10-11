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

const MenuList = () => {
  const items = [
    {
      key: "dashboard",
      icon: <RxDashboard />,
      label: <Link to={PATH_NAME.DASHBOARD}>Dashboard</Link>,
    },
    {
      key: "module",
      icon: <PiCertificate />,
      label: "SAP Module",
      children: [
        {
          key: "allmodule",
          label: <Link to="/SAP-module/all-module">- All Module</Link>,
        },
        {
          key: "addmodule",
          label: <Link to="/course/add-module">- Add Module</Link>,
        },
      ],
    },
    {
      key: "courses",
      icon: <PiGraduationCap />,
      label: "Courses",
      children: [
        {
          key: "allcourse",
          label: <Link to="/course/all-course">- All Courses</Link>,
        },
        {
          key: "addcourse",
          label: <Link to="/course/add-course">- Add Course</Link>,
        },
      ],
    },
    {
      key: "topic_area",
      icon: <MdOutlineTopic />,
      label: "Topic Area",
      children: [
        {
          key: "all_topic_area",
          label: <Link to="/topic/all-topic">- All Topic</Link>,
        },
        {
          key: "add_topic_area",
          label: <Link to="/course/add-course">- Add Topic</Link>,
        },
      ],
    },
    {
      key: "students",
      icon: <PiUsersThree />,
      label: <Link to={PATH_NAME.STUDENT}>Students</Link>,
    },
    {
      key: "instructors",
      icon: <LuUsers2 />,
      label: "Instructors",
      children: [
        {
          key: "allinstructors",
          label: <Link to={PATH_NAME.INSTRUCTOR}>- All Instructors</Link>,
        },
        {
          key: "addinstructor",
          label: <Link to={PATH_NAME.ADD_INSTRUCTOR}>- Add Instructor</Link>,
        },
      ],
    },
    {
      key: "fee",
      icon: <PiCoinsLight />,
      label: <Link to="/fee">Fee</Link>,
    },
    {
      key: "sessions",
      icon: <PiBooks />,
      label: "Session",
      children: [
        {
          key: "allsessions",
          label: <Link to="/session/all-sessions">- All Sessions</Link>,
        },
        {
          key: "addsession",
          label: <Link to="/session/add-session">- Add Session</Link>,
        },
      ],
    },
    {
      key: "analytic",
      icon: <IoAnalytics />,
      label: <Link to="/analytic">Analytic</Link>,
    },
    {
      key: "test",
      icon: <PiExamLight />,
      label: "Test",
      children: [
        {
          key: "alltest",
          label: <Link to="/test/all-tests">- All Test</Link>,
        },
        {
          key: "addtest",
          label: <Link to="/test/add-test">- Add Test</Link>,
        },
      ],
    },
    {
      key: "question",
      icon: <PiQuestionLight />,
      label: "Question Bank",
      children: [
        {
          key: "allquestion",
          label: <Link to="/question/all-questions">- All Questions</Link>,
        },
        {
          key: "addquestion",
          label: <Link to="/question/add-question">- Add Question</Link>,
        },
      ],
    },
    {
      key: "setting",
      icon: <IoSettingsOutline />,
      label: <Link to="/setting">Account Setting</Link>,
    },
  ];
  return (
    <Menu items={items} mode="inline" className="menu-bar">
    </Menu>
  );
};

export default MenuList;
