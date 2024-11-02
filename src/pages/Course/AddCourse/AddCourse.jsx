import React, { useState, useEffect } from "react";
import "./AddCourse.css";
import "./CourseSteps.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios"; // Thêm axios
import { PATH_NAME } from "../../../constant/pathname";

const AddCourse = () => {
    const [certificates, setCertificates] = useState([]);
    const [selectedCertification, setSelectedCertification] = useState("");
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [courseName, setCourseName] = useState("");
    const [mode, setMode] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [enrollmentDate, setEnrollmentDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy danh sách chứng chỉ từ API
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/Certificate/get-all"
                );
                const data = response.data.$values;
                if (Array.isArray(data)) {
                    setCertificates(data);
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

        fetchCertificates();
        fetchInstructors();
    }, []);

    const handleChangeCertification = (event) => {
        const value = event.target.value;
        console.log("Selected Certification Value:", value); // In giá trị
        setSelectedCertification(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            courseName,
            mode,
            startTime,
            endTime,
            enrollmentDate,
            location,
            price,
            certificateId: selectedCertification,
            instructorId: selectedInstructor,
        };

        try {
            const response = await axios.post(
                "https://swdsapelearningapi.azurewebsites.net/api/Course/create",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Course added successfully!");
                navigate(PATH_NAME.COURSE); // Điều hướng tới trang khóa học sau khi thêm thành công
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
        <div className="add_course">
            <div className="add_course_title_container">
                <div className="add_course_title_left">
                    <div className="add_course_title">Add Course</div>
                </div>
                <div className="add_course_course_right">
                    <div className="add_course_course">Courses</div>
                    <SlArrowRight className="add_course_icon_right" />
                    <div className="add_course_add_courses">Add Course</div>
                </div>
            </div>

            <div className="add_course_form_container">
                <div className="add_course_label">Basic Info</div>
                <form className="add_course_form" onSubmit={handleSubmit}>
                    <div className="add_course_input_row">
                        <div className="add_course_input_colum">
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
                        <div className="add_course_input_colum">
                            <label>Certificate Name</label>
                            <select
                                value={selectedCertification}
                                onChange={(e) =>
                                    setSelectedCertification(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Certification
                                </option>
                                {certificates.map((cert) => (
                                    <option
                                        key={cert.id}
                                        value={cert.id} // Đảm bảo value là certificateId
                                    >
                                        {cert.certificateName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Mode</label>
                            <input
                                type="text"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                placeholder="Enter Mode"
                            />
                        </div>
                    </div>
                    <div className="add_course_input_row">
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Course Name</label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                placeholder="Enter the full name"
                            />
                        </div>
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Start Time</label>
                            <input
                                type="date"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="add_course_input_colum">
                            <label htmlFor="name">End Time</label>
                            <input
                                type="date"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="add_course_input_row">
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Enrollment Date</label>
                            <input
                                type="date"
                                value={enrollmentDate}
                                onChange={(e) =>
                                    setEnrollmentDate(e.target.value)
                                }
                            />
                        </div>
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Location</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter location"
                            />
                        </div>
                        <div className="add_course_input_colum">
                            <label htmlFor="name">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price"
                            />
                        </div>
                    </div>

                    <button
                        className="add_course_button_submit"
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

export default AddCourse;
