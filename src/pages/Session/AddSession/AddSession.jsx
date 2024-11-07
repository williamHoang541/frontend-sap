import React, { useState, useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Thêm axios
import { PATH_NAME } from "../../../constant/pathname";
import "./AddSession.css";

const AddSession = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [sessionName, setSessionName] = useState("");
    const [sessionDescription, setSessionDescription] = useState("");
    const [sessionDate, setSessionDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/Course/get-all?PageSize=20"
                );
                const data = response.data.$values;
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    setError("Unexpected response format. Expected an array.");
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setError("An error occurred while fetching certificates.");
            }
        };

        const fetchInstructors = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/Instructor/get-all"
                );
                const data = response.data.$values;
                if (Array.isArray(data)) {
                    setInstructors(data);
                } else {
                    setError("Unexpected response format. Expected an array.");
                }
            } catch (error) {
                console.error("Error fetching instructors:", error);
                setError("An error occurred while fetching instructors.");
            }
        };

        const fetchTopics = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/TopicArea/get-all"
                );
                const data = response.data.$values;
                if (Array.isArray(data)) {
                    setTopics(data);
                } else {
                    setError("Unexpected response format. Expected an array.");
                }
            } catch (error) {
                console.error("Error fetching instructors:", error);
                setError("An error occurred while fetching instructors.");
            }
        };
        fetchCourses();
        fetchInstructors();
        fetchTopics();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            sessionName,
            sessionDescription,
            sessionDate,
            startTime,
            endTime,
            courseId: selectedCourse,
            instructorId: selectedInstructor,
            topicId: selectedTopic,
        };

        try {
            const response = await axios.post(
                "https://swdsapelearningapi.azurewebsites.net/api/CourseSession/create",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Session added successfully!");
                navigate(PATH_NAME.SESSION); // Điều hướng tới trang khóa học sau khi thêm thành công
            }
        } catch (error) {
            console.error("Error adding course:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
            setError("An error occurred while adding the course.");
        }
    };

    return (
        <div className="add_session">
            <div className="add_session_title_container">
                <div className="add_session_title_left">
                    <div className="add_session_title">Add Session</div>
                </div>
                <div className="add_session_session_right">
                    <div className="add_session_session">Sessions</div>
                    <SlArrowRight className="add_session_icon_right" />
                    <div className="add_session_add_sessions">Add Session</div>
                </div>
            </div>

            <div className="add_session_form_container">
                <div className="add_session_label">Basic Info</div>
                <form className="add_session_form" onSubmit={handleSubmit}>
                    <div className="add_session_input_row">
                        <div className="add_session_input_colum">
                            <label>Course</label>
                            <select
                                value={selectedCourse}
                                onChange={(e) =>
                                    setSelectedCourse(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Course
                                </option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.courseName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="add_session_input_colum">
                            <label>Session name</label>
                            <input
                                type="text"
                                value={sessionName}
                                className="add_session_input"
                                onChange={(e) => setSessionName(e.target.value)}
                                placeholder="Enter session name"
                            />
                        </div>
                    </div>

                    <div className="add_session_input_row">
                        <div className="add_session_input_colum">
                            <label>Instructor</label>
                            <select
                                value={selectedInstructor}
                                onChange={(e) =>
                                    setSelectedInstructor(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Instructor
                                </option>
                                {instructors.map((inst) => (
                                    <option
                                        key={inst.id}
                                        value={inst.id} // Đảm bảo value là certificateId
                                    >
                                        {inst.fullname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="add_session_input_colum">
                            <label>Session Description</label>
                            <input
                                type="text"
                                value={sessionDescription}
                                className="add_session_input_colum"
                                onChange={(e) =>
                                    setSessionDescription(e.target.value)
                                }
                                placeholder="Enter the session description"
                            />
                        </div>
                    </div>
                    <div className="add_session_input_row">
                        <div className="add_session_input_colum">
                            <label>Topic Area</label>
                            <select
                                value={selectedTopic}
                                onChange={(e) =>
                                    setSelectedTopic(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Topic Area
                                </option>
                                {topics.map((topic) => (
                                    <option
                                        key={topic.id}
                                        value={topic.id} // Đảm bảo value là certificateId
                                    >
                                        {topic.topicName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="add_session_input_colum">
                            <label>Session Date</label>
                            <input
                                type="date"
                                value={sessionDate}
                                className="add_session_input"
                                onChange={(e) => setSessionDate(e.target.value)}
                                placeholder="Select the date"
                            />
                        </div>
                    </div>
                    <div className="add_course_input_row">
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Start Time</label>
                            <input
                                type="text"
                                value={startTime}
                                className="add_session_input"
                                onChange={(e) => setStartTime(e.target.value)}
                                placeholder="Enter the start time (hh:mm AM/PM)"
                            />
                        </div>
                        <div className="add_course_input_colum">
                            <label htmlFor="name">End Time</label>
                            <input
                                type="text"
                                value={endTime}
                                className="add_session_input"
                                onChange={(e) => setEndTime(e.target.value)}
                                placeholder="Enter the start time (hh:mm AM/PM)"
                            />
                        </div>
                    </div>
                    <button
                        className="add_session_button_submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {error && <div className="error_message">{error}</div>}
            </div>
        </div>
    );
};

export default AddSession;
