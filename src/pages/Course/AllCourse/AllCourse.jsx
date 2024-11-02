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
import "./AllCourse.css";

const AllCourse = () => {
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
            width: "12%",
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
            width: "8%",
        },
        {
            title: "Start Date",
            dataIndex: "startTime",
            sorter: true,
            width: "8%",
            render: (startTime) => {
                const date = new Date(startTime);
                return date.toLocaleDateString(); // Chỉ lấy ngày/tháng/năm
            },
        },
        {
            title: "End Date",
            dataIndex: "endTime",
            sorter: true,
            width: "8%",
            render: (endTime) => {
                const date = new Date(endTime);
                return date.toLocaleDateString(); // Chỉ lấy ngày/tháng/năm
            },
        },
        {
            title: "Enrollment Date",
            dataIndex: "enrollmentDate",
            sorter: true,
            width: "8%",
            render: (enrollmentDate) => {
                const date = new Date(enrollmentDate);
                return date.toLocaleDateString(); // Chỉ lấy ngày/tháng/năm
            },
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
            width: "8%",
        },
        {
            title: "Location",
            dataIndex: "location",
            sorter: true,
            width: "15%",
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
                                mode: record.mode,
                                startTime: record.startTime,
                                endTime: record.endTime,
                                location: record.location,
                                enrollmentDate: record.enrollmentDate,
                                price: record.price,
                                status: record.status,
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
                                        {/* <Form.Item
                                            name="totalStudent"
                                            label="Total Student"
                                        >
                                            <input
                                                type="number"
                                                className="all_course_form"
                                                placeholder="Enter maximum student"
                                            />
                                        </Form.Item> */}
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
                                            name="enrollmentDate"
                                            label="End register date"
                                        >
                                            <input
                                                type="date"
                                                className="all_course_form"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_course_input">
                                        <Form.Item name="status" label="Status">
                                            <Radio.Group className="status-radio-group">
                                                <Radio value={true}>True</Radio>
                                                <Radio value={false}>
                                                    False
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item name="price" label="Price">
                                            <input
                                                type="number"
                                                className="all_course_form"
                                                placeholder="Enter price"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_course_input"></div>
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
                `https://swdsapelearningapi.azurewebsites.net/api/Course/${id}`,
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
    const handleDelete = async (id) => {
        try {
            // Gửi yêu cầu xóa đến API
            const response = await axios.delete(
                ` https://swdsapelearningapi.azurewebsites.net/api/Course/delete/${id}`
            );

            if (response.status === 200) {
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
