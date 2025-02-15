import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios"; // Thêm axios
import { PATH_NAME } from "../../../constant/pathname";
import "./AddTopic.css";

const AddTopic = () => {
    const [certificates, setCertificates] = useState([]); // Danh sách chứng chỉ
    const [selectedCertification, setSelectedCertification] = useState("");
    const [topicName, setTopicName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Lấy danh sách chứng chỉ từ API
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(
                    "https://swdsapelearningapi.azurewebsites.net/api/Certificate/get-all"
                );
                const data = response.data.$values;

                // Kiểm tra xem data có phải là mảng không
                if (Array.isArray(data)) {
                    setCertificates(data); // Giả sử response.data chứa danh sách chứng chỉ
                } else {
                    setError("Unexpected response format. Expected an array.");
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setError("An error occurred while fetching certificates.");
            }
        };

        fetchCertificates();
    }, []); // Chạy chỉ 1 lần khi component mount

    const handleChangeCertification = (event) => {
        const value = event.target.value;
        console.log("Selected Certification Value:", value); // In giá trị
        setSelectedCertification(value);
    };

    const handleChangeTopicName = (event) => {
        setTopicName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Kiểm tra thông tin trước khi gửi
        if (!selectedCertification || !topicName) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        console.log("Selected Certification:", selectedCertification); // In giá trị

        // Chuyển đổi selectedCertification sang số
        const certId = parseInt(selectedCertification, 10);
        if (isNaN(certId)) {
            setError("Invalid certificate ID.");
            setLoading(false);
            return;
        }

        const requestData = {
            certificateId: certId, // Sử dụng certificateId đã chuyển đổi
            topicName: topicName,
            status: true, // Đặt status là true
        };

        console.log("Request Data:", requestData); // In ra dữ liệu để kiểm tra

        try {
            const response = await axios.post(
                "https://swdsapelearningapi.azurewebsites.net/api/TopicArea/create",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Topic added successfully!"); // Thông báo thành công
                navigate(PATH_NAME.TOPIC); // Điều hướng người dùng đến trang Topic

                // Reset form fields sau khi điều hướng
                setSelectedCertification("");
                setTopicName("");
            }
        } catch (error) {
            console.error("Error adding topic:", error);

            if (error.response) {
                console.error("Response data:", error.response.data); // In chi tiết lỗi
                console.error("Response status:", error.response.status);
            }

            setError("An error occurred while adding the topic."); // Hiển thị lỗi trên UI
        } finally {
            setLoading(false); // Dừng trạng thái tải bất kể có lỗi hay không
        }
    };

    return (
        <div className="add_topic">
            <div className="add_topic_title_container">
                <div className="add_topic_title_left">
                    <div className="add_topic_title">Add Topic</div>
                </div>
                <div className="add_topic_topic_right">
                    <div className="add_topic_topic">Topic Area</div>
                    <SlArrowRight className="add_topic_icon_right" />
                    <div className="add_topic_add_topics">Add Topic</div>
                </div>
            </div>

            <div className="add_topic_form_container">
                <div className="add_topic_label">Basic Info</div>
                <form className="add_topic_form" onSubmit={handleSubmit}>
                    <div className="add_topic_input_row">
                        <div className="add_topic_input_colum">
                            <label>Certificate Name</label>
                            <select
                                value={selectedCertification}
                                onChange={handleChangeCertification}
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
                    </div>
                    <div className="add_topic_input_row">
                        <div className="add_topic_input_colum">
                            <label htmlFor="name">Topic Name</label>
                            <input
                                type="text"
                                id="name"
                                className="add_topic_input"
                                placeholder="Enter the full name"
                                value={topicName}
                                onChange={handleChangeTopicName}
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && (
                        <div className="success-message">{success}</div>
                    )}
                    <button
                        className="add_topic_button_submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTopic;
