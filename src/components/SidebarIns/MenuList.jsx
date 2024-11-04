import React from 'react'
import { PATH_NAME } from '../../constant/pathname';
import { Link } from 'react-router-dom';
import { RxCalendar } from "react-icons/rx";
import { IoSettingsOutline } from 'react-icons/io5';
import { LiaGraduationCapSolid } from "react-icons/lia";
import { Menu } from 'antd';

const MenuList = () => {
    const items = [
        {
          key: "calender",
          icon: <RxCalendar />,
          label: <Link to={PATH_NAME.CALENDAR}>Calendar</Link>,
        },
        {
          key: "course_ins",
          icon: <LiaGraduationCapSolid />,
          label: <Link to={PATH_NAME.COURSE_INSTRUCTOR}>Student</Link>,
        },
        
        {
          key: "setting",
          icon: <IoSettingsOutline />,
          label: <Link to={PATH_NAME.ACCOUNT_SETTING}>Account Setting</Link>,
        },
      ];
      return <Menu items={items} mode="inline" className="menu-bar"></Menu>;
    };

export default MenuList