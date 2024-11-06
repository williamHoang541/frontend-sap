import { Fragment } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout_1 = () => {
  return (
    <Fragment>
      <Navbar className="layout-manage-navbar" />
      <Sidebar className="layout-navbar" />
      <div id="content">
        <div className="content-outlet">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Layout_1;
