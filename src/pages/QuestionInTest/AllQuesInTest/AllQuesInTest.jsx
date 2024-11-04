import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Table, Form } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import Popup from "reactjs-popup";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import "./AllQuesInTest.css";

const AllQuesInTest = () => {
    const [data, setData] = useState([]); // Khởi tạo mảng dữ liệu
    const [sampleTests, setSampleTests] = useState([]); // Khởi tạo mảng chứng chỉ
    const [questions, setQuestions] = useState([]); // Khởi tạo mảng chứng chỉ
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    });
    const [form] = Form.useForm();

    const columns = [
        {
            title: "No.",
            sorter: true,
            width: "7%",
            render: (_, __, index) =>
                (tableParams.pagination.current - 1) *
                    tableParams.pagination.pageSize +
                index +
                1,
        },
        {
            title: "Sample Test Name",
            dataIndex: "sampleTestId",
            sorter: true,
            width: "15%",
            render: (sampleTestId) => {
                const sampleTest = sampleTests.find(
                    (sample) => sample.id === sampleTestId
                );
                return sampleTest ? sampleTest.sampleTestName : "N/A";
            },
        },
        {
            title: "Question bank name",
            dataIndex: "questionId",
            sorter: true,
            width: "15%",
            render: (questionId) => {
                const question = questions.find(
                    (question) => question.id === questionId
                );
                return question ? question.questionText : "N/A";
            },
        },
        {
            title: "Index in Test",
            dataIndex: "displayInTest",
            sorter: (a, b) =>
                (a.displayInTest || "").localeCompare(b.displayInTest || ""),
            width: "8%",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "10%",
            render: (status) => (
                <span
                    className={`test_status_indicator ${
                        status ? "active" : "inactive"
                    }`}
                />
            ),
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                    <Popup
                        trigger={
                            <button
                                type="button"
                                className="question_button_edit"
                            >
                                <MdModeEditOutline />
                            </button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() =>
                            form.setFieldsValue({
                                displayInTest: record.displayInTest,
                                status: record.status,
                            })
                        }
                    >
                        {(close) => (
                            <div className="popup_container">
                                <h2>Edit Topic</h2>
                                <Form
                                    form={form}
                                    onFinish={(values) => {
                                        handleEdit(values, record.id);
                                        close(); // Đóng popup sau khi lưu
                                    }}
                                >
                                    <div className="all_question_input">
                                        <Form.Item
                                            name="displayInTest"
                                            label="Index In Test"
                                        >
                                            <input
                                                type="text"
                                                className="all_question_form"
                                                placeholder="Enter number"
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="question_buttons">
                                        <button
                                            className="button_save"
                                            type="submit"
                                        
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="button_cancel"
                                            type="button"
                                            onClick={close}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Popup>
                    <button
                        type="button"
                        onClick={() => handleDelete(record.id)}
                        className="test_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </>
            ),
            width: "8%",
        },
    ];

    const handleEdit = async (values, id) => {
        try {
            // Gửi yêu cầu PUT đến API với dữ liệu cập nhật
            const response = await axios.put(
                `https://swdsapelearningapi.azurewebsites.net/api/CertificateTestQuestion/update?id=${id}`,
                {
                    displayInTest: values.displayInTest,
                }
            );

            // Nếu API thành công, cập nhật lại dữ liệu trên giao diện
            if (response.status === 200) {
                const updatedData = data.map((item) =>
                    item.id === id ? { ...item, ...values } : item
                );
                setData(updatedData);
                form.resetFields();
            } else {
                console.error("Error updating topic:", response);
            }
        } catch (error) {
            console.error("Error during API PUT request:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Gửi yêu cầu xóa đến API
            const response = await axios.delete(
                `https://swdsapelearningapi.azurewebsites.net/api/CertificateTestQuestion/delete?id=${id}`
            );

            if (response.status >= 200 && response.status < 300) {
                // Nếu xóa thành công, cập nhật state để loại bỏ mục đã xóa
                setData((prevData) =>
                    prevData.filter((item) => item.id !== id)
                );
            } else {
                console.error("Error deleting data:", response.data);
            }
        } catch (error) {
            console.error(
                "Error deleting data:",
                error.response ? error.response.data : error.message
            );
        }
    };
    const fetchData = async (pagination) => {
        setLoading(true);
        try {
            const [
                certificateTestResponse,
                certificateSampleResponse,
                certificateQuestionResponse,
            ] = await Promise.all([
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/CertificateTestQuestion/get-all`
                ),
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/CertificateSampletest/get-all`
                ),
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/CertificateQuestion/get-all`
                ),
            ]);

            const bankResults = certificateTestResponse.data.$values;
            const sampleResults = certificateSampleResponse.data.$values;
            const questionResults = certificateQuestionResponse.data.$values;

            if (Array.isArray(bankResults)) {
                const startIndex =
                    (pagination.current - 1) * pagination.pageSize;
                const paginatedData = bankResults.slice(
                    startIndex,
                    startIndex + pagination.pageSize
                ); // Phân trang dữ liệu

                setData(paginatedData);
                setTableParams((prevParams) => ({
                    ...prevParams,
                    pagination: {
                        ...pagination,
                        total: bankResults.length,
                    },
                }));
            }

            if (Array.isArray(sampleResults)) {
                setSampleTests(sampleResults); // Lưu danh sách chứng chỉ
            }

            if (Array.isArray(questionResults)) {
                setQuestions(questionResults); // Lưu danh sách chứng chỉ
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(tableParams.pagination);
    }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };

    return (
        <div className="question_in_test">
            <div className="question_title_container">
                <div className="question_title_left">
                    <div className="question_title">All Tests</div>
                </div>
                <div className="question_question_right">
                    <div className="question_question">Question in Test</div>
                    <SlArrowRight className="question_icon_right" />
                    <div className="question_all_questions">All Tests</div>
                </div>
            </div>

            <div className="question_table_container">
                <Link to={PATH_NAME.ADD_QUESTION_IN_TEST}>
                    <button className="question_add">Add New</button>
                </Link>
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={Array.isArray(data) ? data : []}
                    pagination={{
                        ...tableParams.pagination,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50"],
                    }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
};

export default AllQuesInTest;
