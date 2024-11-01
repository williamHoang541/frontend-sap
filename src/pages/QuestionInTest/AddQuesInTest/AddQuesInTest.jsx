import React, { useState, useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Thêm axios
import { PATH_NAME } from "../../../constant/pathname";

import "./AddQuesInTest.css";

const AddQuesInTest = () => {
    const [sampleTests, setSampleTests] = useState([]);
    const [selectedSampleTest, setSelectedSampleTest] = useState("");
    const [questionIds, setQuestionIds] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");
    const [displayInTest, setDisplayInTest] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSampleTests = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/CertificateSampletest/get-all"
                );
                const data = response.data.$values;
                if (Array.isArray(data)) {
                    setSampleTests(data);
                } else {
                    setError("Unexpected response format. Expected an array.");
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setError("An error occurred while fetching certificates.");
            }
        };

        const fetchQuestionBanks = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/CertificateQuestion/get-all"
                );
                const data = response.data.$values;
                if (Array.isArray(data)) {
                    setQuestionIds(data);
                } else {
                    setError("Unexpected response format. Expected an array.");
                }
            } catch (error) {
                console.error("Error fetching instructors:", error);
                setError("An error occurred while fetching instructors.");
            }
        };
        fetchSampleTests();
        fetchQuestionBanks();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            displayInTest,
            sampleTestId: selectedSampleTest,
            questionId: selectedQuestionId,
        };

        try {
            const response = await axios.post(
                "https://swdsapelearningapi.azurewebsites.net/api/CertificateTestQuestion/create",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Course added successfully!");
                navigate(PATH_NAME.QUESTION_IN_TEST); // Điều hướng tới trang khóa học sau khi thêm thành công
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
        <div className="add_question">
            <div className="add_question_title_container">
                <div className="add_question_title_left">
                    <div className="add_question_title">Question In tests</div>
                </div>
                <div className="add_question_question_right">
                    <div className="add_question_question">
                        Question In Tests
                    </div>
                    <SlArrowRight className="add_question_icon_right" />
                    <div className="add_question_add_questions">Add Test</div>
                </div>
            </div>

            <div className="add_question_form_container">
                <div className="add_question_label">Basic Info</div>
                <form className="add_question_form" onSubmit={handleSubmit}>
                    <div className="add_question_input_row">
                        <div className="add_question_input_colum">
                            <label>Sample Test</label>
                            <select
                                value={selectedSampleTest}
                                onChange={(e) =>
                                    setSelectedSampleTest(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Sample Test
                                </option>
                                {sampleTests.map((sample) => (
                                    <option key={sample.id} value={sample.id}>
                                        {sample.sampleTestName}
                                    </option>
                                ))}
                            </select>
                            <div className="add_question_input_colum">
                                <label>Question</label>
                                <select
                                    value={selectedQuestionId}
                                    onChange={(e) =>
                                        setSelectedQuestionId(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Question
                                    </option>
                                    {questionIds.map((question) => (
                                        <option
                                            key={question.id}
                                            value={question.id}
                                        >
                                            {question.questionText}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="add_question_input_colum">
                                <label>Index in Test</label>
                                <input
                                    type="text"
                                    value={displayInTest}
                                    className="add_session_input"
                                    onChange={(e) =>
                                        setDisplayInTest(e.target.value)
                                    }
                                    placeholder="Enter number:"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="add_question_button_submit"
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

export default AddQuesInTest;
