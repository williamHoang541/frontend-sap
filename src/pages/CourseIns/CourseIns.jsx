import { useEffect, useState } from "react";
import "./Course.css";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios";

const CourseIns = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://swdsapelearningapi.azurewebsites.net/api/Course/get-all"
      );
      setCourses(response.data.$values);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
                  Month
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
