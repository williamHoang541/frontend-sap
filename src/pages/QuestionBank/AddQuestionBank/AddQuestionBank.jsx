import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios"; // Thêm axios
import { PATH_NAME } from "../../../constant/pathname";
import "./AddQuestionBank.css";
import { SELECTION_ALL } from "antd/es/table/hooks/useSelection";

const AddQuestionBank = () => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState("");
    const [status, setStatus] = useState(true); // Đặt mặc định là true
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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
                console.error("Error fetching topics:", error);
                setError("An error occurred while fetching topics.");
            }
        };
        fetchTopics();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        // Kiểm tra các giá trị của từng field
        console.log("Selected Topic ID:", selectedTopic);
        console.log("Question Text:", questionText);
        console.log("Answer:", selectedAnswer);
        console.log("Is Correct:", isCorrect);
        console.log("Status:", status);

        const requestData = {
            topicId: selectedTopic,
            questionText: questionText,
            answer: selectedAnswer,
            isCorrect: isCorrect === "true", // chuyển đổi thành boolean
            status: status,
        };

        try {
            const response = await axios.post(
                "https://swdsapelearningapi.azurewebsites.net/api/CertificateQuestion/create",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Question added successfully!");
                navigate(PATH_NAME.QUESTION_BANK); // điều hướng đến trang câu hỏi
            }
        } catch (error) {
            console.error("Error adding question:", error);
            setError("An error occurred while adding the question.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add_bank">
            <div className="add_bank_title_container">
                <div className="add_bank_title_left">
                    <div className="add_bank_title">Add Question</div>
                </div>
                <div className="add_bank_bank_right">
                    <div className="add_bank_bank">Question Bank</div>
                    <SlArrowRight className="add_bank_icon_right" />
                    <div className="add_bank_add_banks">Add Question</div>
                </div>
            </div>

            <div className="add_bank_form_container">
                <div className="add_bank_label">Basic Info</div>
                <form className="add_bank_form" onSubmit={handleSubmit}>
                    <div className="add_bank_input_row">
                        <div className="add_bank_input_colum">
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
                                    <option key={topic.id} value={topic.id}>
                                        {topic.topicName}
                                    </option>
                                ))}
                            </select>

                            <div className="add_bank_input_colum">
                                <label>Question</label>
                                <input
                                    type="text"
                                    value={questionText}
                                    onChange={(e) =>
                                        setQuestionText(e.target.value)
                                    }
                                    placeholder="Enter the question"
                                />
                            </div>

                            <div className="add_bank_input_colum">
                                <label>Answer</label>
                                <select
                                    value={selectedAnswer}
                                    onChange={(e) =>
                                        setSelectedAnswer(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Answer
                                    </option>
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </select>
                            </div>

                            <div className="add_bank_input_colum">
                                <label>Correct Answer</label>
                                <select
                                    value={isCorrect}
                                    onChange={(e) =>
                                        setIsCorrect(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Option
                                    </option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="button_container">
                        <button
                            className="add_bank_button_submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
                {error && <div className="error_message">{error}</div>}
            </div>
        </div>
    );
};

export default AddQuestionBank;
