import "./Sidebar.css";
import "phosphor-icons";
import logo from "../../assets/LogoSAP.png";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";
import Navbar from "../Navbar/Navbar";


const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
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

export default Sidebar;
