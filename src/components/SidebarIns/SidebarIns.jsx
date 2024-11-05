import { Layout } from 'antd';

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
          
          <MenuList />
        </Sider>
    );
  };

export default SidebarIns
