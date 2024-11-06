import "./Sidebar.css";
import "phosphor-icons";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar">
      <MenuList />
    </Sider>
  );
};

export default Sidebar;
