import { Layout } from 'antd';
import React from 'react'
import logo from "../../assets/LogoSAP.png";
import MenuList from './MenuList';

const { Sider } = Layout;

const SidebarIns = ({ collapsed }) => {
    return (
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          className="sidebar"
        >
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <img src={logo} alt="" className="sidebar-logo-img" />
            </div>
          </div>
          <MenuList />
        </Sider>
    );
  };

export default SidebarIns
