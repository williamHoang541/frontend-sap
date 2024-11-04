import { Layout } from "antd";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";

const Layout_1 = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Container fluid style={{ padding: "16px" }}>
          {children}
        </Container>
      </Layout>
    </Layout>
  );
};

export default Layout_1;
