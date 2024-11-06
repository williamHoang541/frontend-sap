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
import Calendar from "./pages/Calendar/CalendarIns";
import CourseIns from "./pages/CourseIns/CourseIns";
import RequireAuth from "./components/ReqAuth/RequireAuth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH_NAME.LOGIN} element={<Login />} />

        {/* admin */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route element={<Layout_1 />}>
            <Route path={PATH_NAME.DASHBOARD} element={<DashBoard />} />
            <Route path={PATH_NAME.STUDENT} element={<Student />} />
            <Route path={PATH_NAME.INSTRUCTOR} element={<AllInstructor />} />
            <Route
              path={PATH_NAME.ADD_INSTRUCTOR}
              element={<AddInstructor />}
            />
            <Route path={PATH_NAME.PAYMENT} element={<Fee />} />
            <Route path={PATH_NAME.COURSE} element={<AllCourse />} />
            <Route path={PATH_NAME.ADD_COURSE} element={<AddCourse />} />
            <Route path={PATH_NAME.SAP_MODULE} element={<SapModule />} />
            <Route path={PATH_NAME.ADD_SAP_MODULE} element={<AddSAPModule />} />
            <Route path={PATH_NAME.CERTIFICATE} element={<AllCertificate />} />
            <Route
              path={PATH_NAME.ADD_CERTIFICATE}
              element={<AddCertificate />}
            />
            <Route path={PATH_NAME.ANALYTIC} element={<Analytic />} />
            <Route path={PATH_NAME.TOPIC} element={<AllTopic />} />
            <Route path={PATH_NAME.ADD_TOPIC} element={<AddTopic />} />
            <Route path={PATH_NAME.SESSION} element={<AllSession />} />
            <Route path={PATH_NAME.ADD_SESSION} element={<AddSession />} />
            <Route
              path={PATH_NAME.QUESTION_BANK}
              element={<AllQuestionBank />}
            />
            <Route
              path={PATH_NAME.ADD_QUESTION_BANK}
              element={<AddQuestionBank />}
            />
            <Route path={PATH_NAME.TEST} element={<AllSample />} />
            <Route path={PATH_NAME.ADD_TEST} element={<AddSample />} />
            <Route
              path={PATH_NAME.QUESTION_IN_TEST}
              element={<AllQuesInTest />}
            />
            <Route
              path={PATH_NAME.ADD_QUESTION_IN_TEST}
              element={<AddQuesInTest />}
            />
          </Route>
        </Route>

        {/* instructor */}
        <Route element={<RequireAuth allowedRoles={["instructor"]} />}>
          <Route element={<Layout_2 />}>
            <Route path={PATH_NAME.CALENDAR} element={<Calendar />} />
            <Route path={PATH_NAME.COURSE_INSTRUCTOR} element={<CourseIns />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
