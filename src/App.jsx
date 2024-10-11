import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import DashBoard from "./pages/DashBoard/DashBoard";
import { Layout } from "antd";
import { PATH_NAME } from "./constant/pathname";
import Student from "./pages/Student/Student";
import AllInstructor from "./pages/Instructor/allIntructors/AllInstructor";

const LayOut = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Container fluid style={{ padding: "16px"}}>
          {children}
        </Container>
      </Layout>
    </Layout>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path={PATH_NAME.DASHBOARD}
          element={
            <LayOut>
              <DashBoard />
            </LayOut>
          }
        />
        <Route
          path={PATH_NAME.STUDENT}
          element={
            <LayOut>
              <Student />
            </LayOut>
          }
        />
        <Route
          path={PATH_NAME.INSTRUCTOR}
          element={
            <LayOut>
              <AllInstructor />
            </LayOut>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
