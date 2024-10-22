import { useEffect, useState } from "react";
import { Button, Table, Form } from "antd";
import Popup from "reactjs-popup";
import { SlArrowRight } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import qs from "qs";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import "./AllCourse.css";

const AllCourse = () => {
    const data_1 = [
        {
            course_id: 1,
            course_name: "Introduction to SAP",
            start_date: "2024-10-15",
            end_date: "2024-12-15",
            mode: "Online",
            price: 150.0,
            total_student: 30,
            end_register_date: "2024-10-10",
            location_url: "https://meet.google.com/xyz-abc-101",
            status: "Available",
        },
        {
            course_id: 2,
            course_name: "Advanced ABAP Programming",
            start_date: "2024-11-01",
            end_date: "2025-01-01",
            mode: "Offline",
            price: 300.0,
            total_student: 20,
            end_register_date: "2024-10-28",
            location_url: "123 SAP Blvd, NY",
            status: "Expired",
        },
        {
            course_id: 3,
            course_name: "SAP S/4HANA Overview",
            start_date: "2024-10-20",
            end_date: "2024-11-20",
            mode: "Online",
            price: 200.0,
            total_student: 50,
            end_register_date: "2024-10-18",
            location_url: "https://meet.google.com/xyz-abc-103",
            status: "Available",
        },
        {
            course_id: 4,
            course_name: "SAP Fiori Development",
            start_date: "2024-12-01",
            end_date: "2025-02-01",
            mode: "Offline",
            price: 350.0,
            total_student: 25,
            end_register_date: "2024-11-28",
            location_url: "456 Tech St, SF",
            status: "Available",
        },
        {
            course_id: 5,
            course_name: "SAP CAP Model Workshop",
            start_date: "2024-09-30",
            end_date: "2024-10-30",
            mode: "Online",
            price: 250.0,
            total_student: 40,
            end_register_date: "2024-09-28",
            location_url: "https://meet.google.com/xyz-abc-105",
            status: "Expired",
        },
    ];

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
            title: "Course Name",
            dataIndex: "courseName",
            sorter: (a, b) =>
                (a.courseName || "").localeCompare(b.courseName || ""),
            width: "15%",
        },
        {
            title: "Instructor Name",
            dataIndex: "instructorName",
            sorter: (a, b) =>
                (a.instructorName || "").localeCompare(b.instructorName || ""),
            width: "15%",
        },
        {
            title: "Mode",
            dataIndex: "mode",
            filters: [
                { text: "Online", value: "online" },
                { text: "Offline", value: "offline" },
            ],
            render: (mode) => (
                <span
                    className={
                        mode.toLowerCase() === "online"
                            ? "status-online"
                            : "status-offline"
                    }
                >
                    {mode.toLowerCase()}
                </span>
            ),
            width: "10%",
        },
        {
            title: "Start Date",
            dataIndex: "startTime",
            sorter: true,
            width: "10%",
        },
        {
            title: "End Date",
            dataIndex: "endTime",
            sorter: true,
            width: "10%",
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: true,
            width: "10%",
        },
        {
            title: "Total Student",
            dataIndex: "totalStudent",
            sorter: true,
            width: "10%",
        },
        {
            title: "Location",
            dataIndex: "location",
            sorter: true,
            width: "12%",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "10%",
            render: (status) => (
                <span
                    className={`course_status_indicator ${
                        status ? "active" : "inactive"
                    }`}
                />
            ),
        },
        {
            title: "Action",
            render: (_, record) => (
                <div className="course_buttons">
                    <Popup
                        trigger={
                            <Button type="link" className="course_button_edit">
                                <MdModeEditOutline />
                            </Button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() =>
                            form.setFieldsValue({
                                courseName: record.courseName,
                                instructorName: record.instructorName,
                                mode: record.mode,
                                startTime: record.startTime,
                                endTime: record.endTime,
                                totalStudent: record.totalStudent,
                                location: record.location,
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
                                    <div className="all_course_input">
                                        <Form.Item
                                            name="courseName"
                                            label="Course Name"
                                        >
                                            <input
                                                type="text"
                                                className="all_course_form"
                                                placeholder="Enter full name"
                                            />
                                        </Form.Item>
                                        <Form.Item name="mode" label="Mode">
                                            <input
                                                type="text"
                                                className="all_course_form"
                                                placeholder="Enter Mode"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_course_input">
                                        <Form.Item
                                            name="startTime"
                                            label="Start Date"
                                        >
                                            <input
                                                type="date"
                                                className="all_course_form"
                                                placeholder="Select start date"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="totalStudent"
                                            label="Total Student"
                                        >
                                            <input
                                                type="text"
                                                className="all_course_form"
                                                placeholder="Enter maximum student"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_course_input">
                                        <Form.Item
                                            name="endTime"
                                            label="End Date"
                                        >
                                            <input
                                                type="date"
                                                className="all_course_form"
                                                placeholder="Select end date"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="endTime"
                                            label="End register date"
                                        >
                                            <input
                                                type="date"
                                                className="all_course_form"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_course_input">
                                        <Form.Item
                                            name="location"
                                            label="Location"
                                        >
                                            <input
                                                type="text"
                                                className="all_course_form"
                                                placeholder="Select location"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="status"
                                            label="End status"
                                        >
                                            <input
                                                type="text"
                                                className="all_course_form"
                                                placeholder="Select status"
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
                        className="course_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </Button>
                </div>
            ),
            width: "10%",
        },
    ];

    const handleEdit = (values, id) => {
        const updatedData = data.map(
            (item) => (item.id === id ? { ...item, ...values, id } : item) // Cập nhật thông tin người dùng
        );
        setData(updatedData);
        form.resetFields();
    };

    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const fetchData = async (pagination) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://swdsapelearningapi.azurewebsites.net/api/Course/get-all`
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
        <div className="course">
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

            <div className="course_table_container">
                <Link to={PATH_NAME.ADD_COURSE}>
                    <button className="course_add">Add New</button>
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

export default AllCourse;
