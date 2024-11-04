import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import AllCourse from "./pages/Course/AllCourse/AllCourse";
import AddCourse from "./pages/Course/AddCourse/AddCourse";
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
import AddQuestionBank from "./pages/QuestionBank/AddQuestionBank/AddQuestionBank";
import AllSample from "./pages/SampleTest/AllSample/AllSample";
import AddSample from "./pages/SampleTest/AddSample/AddSample";
import AllQuesInTest from "./pages/QuestionInTest/AllQuesInTest/AllQuesInTest";
import AddQuesInTest from "./pages/QuestionInTest/AddQuesInTest/AddQuesInTest";
import Layout_1 from "./components/Layout/Layout_1";
import Layout_2 from "./components/Layout/Layout_2";
import Calendar from "./pages/Calendar/Calendar";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH_NAME.LOGIN} element={<Login />} />
        <Route
          path={PATH_NAME.DASHBOARD}
          element={
            <Layout_1>
              <DashBoard />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.STUDENT}
          element={
            <Layout_1>
              <Student />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.INSTRUCTOR}
          element={
            <Layout_1>
              <AllInstructor />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_INSTRUCTOR}
          element={
            <Layout_1>
              <AddInstructor />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.PAYMENT}
          element={
            <Layout_1>
              <Fee />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.COURSE}
          element={
            <Layout_1>
              <AllCourse />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_COURSE}
          element={
            <Layout_1>
              <AddCourse />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.SAP_MODULE}
          element={
            <Layout_1>
              <SapModule />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_SAP_MODULE}
          element={
            <Layout_1>
              <AddSAPModule />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.CERTIFICATE}
          element={
            <Layout_1>
              <AllCertificate />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_CERTIFICATE}
          element={
            <Layout_1>
              <AddCertificate />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ANALYTIC}
          element={
            <Layout_1>
              <Analytic />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.TOPIC}
          element={
            <Layout_1>
              <AllTopic />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_TOPIC}
          element={
            <Layout_1>
              <AddTopic />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.SESSION}
          element={
            <Layout_1>
              <AllSession />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_SESSION}
          element={
            <Layout_1>
              <AddSession />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.QUESTION_BANK}
          element={
            <Layout_1>
              <AllQuestionBank />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_QUESTION_BANK}
          element={
            <Layout_1>
              <AddQuestionBank />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.TEST}
          element={
            <Layout_1>
              <AllSample />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_TEST}
          element={
            <Layout_1>
              <AddSample />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.QUESTION_IN_TEST}
          element={
            <Layout_1>
              <AllQuesInTest />
            </Layout_1>
          }
        />
        <Route
          path={PATH_NAME.ADD_QUESTION_IN_TEST}
          element={
            <Layout_1>
              <AddQuesInTest />
            </Layout_1>
          }
        />

        {/* instructor */}

        <Route
          path={PATH_NAME.CALENDAR}
          element={
            <Layout_2>
              <Calendar />
            </Layout_2>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
