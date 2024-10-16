import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import DashBoard from "./pages/DashBoard/DashBoard";
import AllCourse from "./pages/AllCourse/AllCourse";
import AddCourse from "./pages/AddCourse/AddCourse";
import { Layout } from "antd";
import { PATH_NAME } from "./constant/pathname";
import Student from "./pages/Student/Student";
import AllInstructor from "./pages/Instructor/allIntructors/AllInstructor";
import Fee from "./pages/Fee/Fee";
import AddInstructor from "./pages/Instructor/addInstructor/AddInstructor";
import SapModule from "./pages/SapModule/AllSAPModule/SapModule";
import AddSAPModule from "./pages/SapModule/AddSAPModule/AddSAPModule";
import AllCertificate from "./pages/Certificate/AllCertificate/AllCertificate";
import AddCertificate from "./pages/Certificate/AddCertificate/AddCertificate";


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
        <Route
          path={PATH_NAME.ADD_INSTRUCTOR}
          element={
            <LayOut>
              <AddInstructor />
            </LayOut>
          }
        />
        <Route
          path={PATH_NAME.FEE}
          element={
            <LayOut>
              <Fee />
            </LayOut>

          }
        />
        <Route
          path={PATH_NAME.SAP_MODULE}
          element={
            <LayOut>
              <SapModule />
            </LayOut>

          }
        />
        <Route
          path={PATH_NAME.ADD_SAP_MODULE}
          element={
            <LayOut>
              <AddSAPModule />
            </LayOut>

          }
        />
        <Route
          path={PATH_NAME.CERTIFICATE}
          element={
            <LayOut>
              <AllCertificate />
            </LayOut>

          }
        />
        <Route
          path={PATH_NAME.ADD_CERTIFICATE}
          element={
            <LayOut>
              <AddCertificate />
            </LayOut>

          }
        />
        <Route
                    path="/course/all-course"
                    element={
                        <LayOut>
                            <AllCourse />
                        </LayOut>
                    }
                />
                <Route
                    path="/course/add-course"
                    element={
                        <LayOut>
                            <AddCourse />
                        </LayOut>
                    }
                />
      </Routes>
    </div>
  );
};

export default App;
