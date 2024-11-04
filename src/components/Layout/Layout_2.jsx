import { Layout } from "antd";
import React, { useState } from "react";
import SidebarIns from "../SidebarIns/SidebarIns";
import Navbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";

const Layout_2 = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarIns collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Container fluid style={{ padding: "16px" }}>
          {children}
        </Container>
      </Layout>
    </Layout>
  );
};

export default Layout_2;
