import { useEffect, useState } from "react";
import "./Course.css";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios";
import useAuth from "../../components/hooks/useAuth";

const CourseIns = () => {
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInstructorAndCourses = async () => {
    try {
      // 1. Fetch API của instructor để tìm instructor có `userId` trùng với `userId` từ token
      const instructorResponse = await axios.get("https://swdsapelearningapi.azurewebsites.net/api/Instructor/get-all");
      const instructors = instructorResponse.data.$values;
      const currentInstructor = instructors.find(
        (instructor) => instructor.userId === auth.userId
      );

      if (currentInstructor) {
        // 2. Nếu tìm thấy instructor, fetch course và lọc theo `instructorId`
        const courseResponse = await axios.get("https://swdsapelearningapi.azurewebsites.net/api/Course/get-all");
        const allCourses = courseResponse.data.$values;

        // 3. Lọc các course có `instructorId` khớp với `id` của instructor
        const instructorCourses = allCourses.filter(
          (course) => course.instructorId === currentInstructor.id
        );

        setCourses(instructorCourses);
      } else {
        console.error("No matching instructor found for this user.");
      }
    } catch (error) {
      console.error("Error fetching instructor or courses:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Auth data on component load:", auth);
    fetchInstructorAndCourses();
  }, [auth.userId]);

  const calculateDurationInMonths = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return months;
  };

  if (loading) {
    return (
      <div className="overlay">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="course_ins">
      <div className="course_title_container">
        <div className="course_title_left">
          <div className="course_title">All Courses</div>
        </div>
        <div className="course_course_right">
          <div className="course_course">Course</div>
          <SlArrowRight className="course_icon_right" />
          <div className="course_all_courses">All Courses</div>
        </div>
      </div>

      <div className="course_container">
        {courses.map((course) => (
          <div key={course.id} className="course_detail">
            <h1 className="cert_name">
              {course.certificateName || "No Certificate"}
            </h1>
            <h3 className="course_name">{course.courseName}</h3>
            <ul className="info_detail">
              <li className="info">
                <span className="info_1">Start Time:</span>
                <strong className="info_2">
                  {new Date(course.startTime).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </strong>
              </li>
              <li className="info">
                <span className="info_1">Duration:</span>
                <strong className="info_2">
                  {calculateDurationInMonths(course.startTime, course.endTime)}{" "}
                  months
                </strong>
              </li>
              <li className="info">
                <span className="info_1">Professor:</span>
                <strong className="info_2">{course.instructorName}</strong>
              </li>
              <li className="info">
                <span className="info_1">Mode:</span>

                <strong
                  className={`info_2 ${
                    course.mode.toLowerCase() === "online"
                      ? "mode-online"
                      : "mode-offline"
                  }`}
                >
                  {course.mode.charAt(0).toUpperCase() +
                    course.mode.slice(1).toLowerCase()}
                </strong>
              </li>
              <li className="info">
                <span className="info_1">Location:</span>
                <strong className="info_2">{course.location}</strong>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseIns;
