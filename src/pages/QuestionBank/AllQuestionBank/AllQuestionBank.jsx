import { useEffect, useState } from "react";
import { Button, Table, Form, Radio } from "antd";
import Popup from "reactjs-popup";
import { SlArrowRight } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import qs from "qs";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import "./AllQuestionBank.css";

const AllQuestionBank = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
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
            title: "Question",
            dataIndex: "questionText",
            sorter: (a, b) =>
                (a.questionText || "").localeCompare(b.questionText || ""),
            width: "15%",
        },
        {
            title: "Answer",
            dataIndex: "answer",
            sorter: (a, b) => (a.answer || "").localeCompare(b.answer || ""),
            width: "12%",
        },

        {
            title: "Action",
            render: (_, record) => (
                <div className="bank_buttons">
                    <Popup
                        trigger={
                            <Button type="link" className="bank_button_edit">
                                <MdModeEditOutline />
                            </Button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() =>
                            form.setFieldsValue({
                                questionText: record.questionText || "",
                                answer: record.answer || "",
                            })
                        }
                    >
                        {(close) => (
                            <div className="popup_container">
                                <h2>Edit Course</h2>
                                <Form
                                    form={form}
                                    onFinish={(values) => {
                                        handleEdit(values, record.id);
                                        close(); // Đóng popup sau khi lưu
                                    }}
                                >
                                    <div className="all_bank_input">
                                        <Form.Item
                                            name="questionText"
                                            label="Question"
                                        >
                                            <input
                                                type="text"
                                                className="all_bank_form"
                                                placeholder="Enter question"
                                            />
                                        </Form.Item>
                                        <Form.Item name="answer" label="Answer">
                                            <input
                                                type="text"
                                                className="all_bank_form"
                                                placeholder="Enter answer"
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="popup_buttons">
                                        <Button
                                            className="button_save"
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="button_cancel"
                                            type="button"
                                            onClick={close}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Popup>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
                        className="bank_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </Button>
                </div>
            ),
            width: "10%",
        },
    ];

    const handleEdit = async (values, id) => {
        try {
            // Lấy thông tin cũ của record (có chứa Instructor name)
            const existingRecord = data.find((item) => item.id === id);

            // Chỉ ghi đè các trường đã thay đổi trong form, các trường không có trong form sẽ giữ nguyên
            const updatedRecord = {
                ...existingRecord, // giữ nguyên dữ liệu cũ (bao gồm Instructor name)
                ...values, // chỉ cập nhật các trường có trong form
            };

            // Gửi yêu cầu update với record đã cập nhật
            const response = await axios.put(
                `https://swdsapelearningapi.azurewebsites.net/api/CertificateQuestion/update?id=${id}`,
                updatedRecord // gửi toàn bộ bản ghi đã được cập nhật
            );

            if (response.status === 200) {
                // Cập nhật lại dữ liệu trên frontend
                const updatedData = data.map((item) =>
                    item.id === id ? { ...item, ...updatedRecord } : item
                );
                setData(updatedData);
                form.resetFields(); // reset form sau khi hoàn thành
            } else {
                console.error("Update failed:", response);
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };
    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const fetchData = async (pagination) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://swdsapelearningapi.azurewebsites.net/api/CertificateQuestion/get-all`
            );
            const results = response.data.$values; // Lấy dữ liệu từ response

            // Kiểm tra xem results có phải là mảng không
            if (Array.isArray(results)) {
                const startIndex =
                    (pagination.current - 1) * pagination.pageSize;
                const paginatedData = results.slice(
                    startIndex,
                    startIndex + pagination.pageSize
                ); // Phân trang dữ liệu

                setData(paginatedData);
                setTableParams((prevParams) => ({
                    ...prevParams,
                    pagination: {
                        ...pagination,
                        total: results.length,
                    },
                }));
            } else {
                console.error("Fetched data is not an array:", results);
                setData([]); // Đặt lại dữ liệu nếu không hợp lệ
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
        <div className="question_bank">
            <div className="bank_title_container">
                <div className="bank_title_left">
                    <div className="bank_title">Question Bank</div>
                </div>
                <div className="bank_bank_right">
                    <div className="bank_bank">Question Bank</div>
                    <SlArrowRight className="bank_icon_right" />
                    <div className="bank_all_banks">All Questions</div>
                </div>
            </div>

            <div className="bank_table_container">
                <Link to={PATH_NAME.ADD_COURSE}>
                    <button className="bank_add">Add New</button>
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

export default AllQuestionBank;
