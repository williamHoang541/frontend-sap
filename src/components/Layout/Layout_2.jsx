import { Fragment } from "react";
import SidebarIns from "../SidebarIns/SidebarIns";
import { Outlet } from "react-router-dom";
import NavbarIns from "../SidebarIns/NavbarIns";

const Layout_2 = () => {
  return (
    <Fragment>
      <NavbarIns className="layout-manage-navbar" />
      <SidebarIns className="layout-navbar" />
      <div id="content">
        <div className="content-outlet">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Layout_2;
