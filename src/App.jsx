import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import DashBoard from "./pages/DashBoard/DashBoard";
import AllCourse from "./pages/Course/AllCourse/AllCourse";
import AddCourse from "./pages/Course/AddCourse/AddCourse";
import { Layout } from "antd";
import { PATH_NAME } from "./constant/pathname";
import Student from "./pages/Student/Student";
import AllInstructor from "./pages/Instructor/allIntructors/AllInstructor";
import Fee from "./pages/Fee/Fee";
import AddInstructor from "./pages/Instructor/addInstructor/AddInstructor";
import Analytic from "./pages/Analytic/Analytic";
import AllTopic from "./pages/TopicArea/AllTopic/AllTopic";
import AddTopic from "./pages/TopicArea/AddTopic/AddTopic";
import AllSession from "./pages/Session/AllSession/AllSession";
import AddSession from "./pages/Session/AddSession/AddSession";
import SapModule from "./pages/SapModule/AllSAPModule/SapModule";
import AddSAPModule from "./pages/SapModule/AddSAPModule/AddSAPModule";
import AllCertificate from "./pages/Certificate/AllCertificate/AllCertificate";
import AddCertificate from "./pages/Certificate/AddCertificate/AddCertificate";
import AllQuestionBank from "./pages/QuestionBank/AllQuestionBank/AllQuestionBank";
import AllSample from "./pages/SampleTest/AllSample/AllSample";
import AllQuesInTest from "./pages/QuestionInTest/AllQuesInTest/AllQuesInTest";
import AddQuestionBank from "./pages/QuestionBank/AddQuestionBank/AddQuestionBank";

const LayOut = ({ children }) => {
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

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={PATH_NAME.LOGIN} element={<Login />} />
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
                    path={PATH_NAME.PAYMENT}
                    element={
                        <LayOut>
                            <Fee />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.COURSE}
                    element={
                        <LayOut>
                            <AllCourse />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.ADD_COURSE}
                    element={
                        <LayOut>
                            <AddCourse />
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
                    path={PATH_NAME.ANALYTIC}
                    element={
                        <LayOut>
                            <Analytic />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.TOPIC}
                    element={
                        <LayOut>
                            <AllTopic />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.ADD_TOPIC}
                    element={
                        <LayOut>
                            <AddTopic />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.SESSION}
                    element={
                        <LayOut>
                            <AllSession />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.ADD_SESSION}
                    element={
                        <LayOut>
                            <AddSession />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.QUESTION_BANK}
                    element={
                        <LayOut>
                            <AllQuestionBank />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.ADD_QUESTION}
                    element={
                        <LayOut>
                            <AddQuestionBank />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.TEST}
                    element={
                        <LayOut>
                            <AllSample />
                        </LayOut>
                    }
                />
                <Route
                    path={PATH_NAME.QUESTION_IN_TEST}
                    element={
                        <LayOut>
                            <AllQuesInTest />
                        </LayOut>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
