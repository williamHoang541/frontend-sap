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
    const [instructors, setInstructors] = useState([]);
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
                            <button
                                type="button"
                                className="course_button_edit"
                            >
                                <MdModeEditOutline />
                            </button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() => {
                            const instructorId = getInstructorIdByName(
                                record.instructorId
                            );
                            console.log("Instructor ID:", instructorId);
                            form.setFieldsValue({
                                instructorId: record.instructorId,
                                courseName: record.courseName,
                                mode: record.mode,
                                startTime: record.startTime,
                                endTime: record.endTime,
                                location: record.location,
                                enrollmentDate: record.enrollmentDate,
                                price: record.price,
                                status: record.status,
                            });
                        }}
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
                                        <Form.Item
                                            name="instructorId"
                                            label="Instructor"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please select an instructor",
                                                },
                                            ]}
                                        >
                                            <select className="all_session_form">
                                                <option value="">
                                                    Select instructor
                                                </option>
                                                {instructors.map((inst) => (
                                                    <option
                                                        key={inst.id}
                                                        value={inst.id}
                                                    >
                                                        {inst.fullname}
                                                    </option>
                                                ))}
                                            </select>
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
                                        <Form.Item name="price" label="Price">
                                            <input
                                                type="number"
                                                className="all_course_form"
                                                placeholder="Enter price"
                                            />
                                        </Form.Item>
                                        <Form.Item name="status" label="Status">
                                            <Radio.Group className="all_course_form status-radio-grp">
                                                <Radio value={true}>True</Radio>
                                                <Radio value={false}>
                                                    False
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>

                                    <div className="popup_buttons">
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
                        className="course_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            ),
            width: "10%",
        },
    ];

    const getInstructorIdByName = (fullname) => {
        const instructor = instructors.find(
            (inst) => inst.fullname === fullname
        );
        return instructor ? instructor.id : undefined;
    };

    // const handleEdit = async (values, id) => {
    //     if (!id) {
    //         console.error("Missing ID for update.");
    //         return;
    //     }

    //     try {
    //         const updateData = { ...values };
    //         updateData.instructorId = getInstructorIdByName(
    //             values.instructorId
    //         );

    //         console.log("Data sent to API:", updateData);

    //         const response = await axios.put(
    //             `https://swdsapelearningapi.azurewebsites.net/api/Course/${id}`,
    //             updateData,
    //             { headers: { "Content-Type": "application/json" } }
    //         );

    //         if (response.status === 200) {
    //             // Cập nhật state ngay lập tức sau khi cập nhật thành công
    //             setData((prevData) =>
    //                 prevData.map((item) =>
    //                     item.id === id ? { ...item, ...updateData } : item
    //                 )
    //             );
    //             form.resetFields();
    //             alert("Update successful!");
    //         } else {
    //             console.error(
    //                 "Failed to update. Response status:",
    //                 response.status
    //             );
    //         }
    //     } catch (error) {
    //         console.error(
    //             "Error updating session:",
    //             error.response?.data || error.message
    //         );
    //         if (error.response && error.response.data) {
    //             console.error("API error response:", error.response.data);
    //         }
    //     }
    // };

    // const handleEdit = async (values, id) => {
    //     try {
    //         const updateData = { ...values };
    //         const instructor = instructors.find(
    //             (inst) => inst.id === values.instructorId
    //         );
    //         if (instructor) updateData.instructorName = instructor.fullname;

    //         const response = await axios.put(
    //             `https://swdsapelearningapi.azurewebsites.net/api/Course/${id}`,
    //             updateData,
    //             { headers: { "Content-Type": "application/json" } }
    //         );

    //         if (response.status === 200) {
    //             setData((prevData) =>
    //                 prevData.map((item) =>
    //                     item.id === id ? { ...item, ...updateData } : item
    //                 )
    //             );
    //             form.resetFields();
    //             alert("Update successful!");
    //         } else {
    //             console.error(
    //                 "Failed to update. Response status:",
    //                 response.status
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Error updating course:", error);
    //     }
    // };

    const handleEdit = async (values, id) => {
        try {
            // Lấy instructor mới từ danh sách instructors dựa trên instructorId
            const instructor = instructors.find(
                (inst) => inst.id === values.instructorId
            );

            // Chuẩn bị dữ liệu update, bao gồm instructorName từ instructor tìm thấy
            const updateData = {
                ...values,
                instructorName: instructor ? instructor.fullname : null, // Đảm bảo instructorName được cập nhật từ fullname
            };

            // Gửi request PUT để cập nhật thông tin course
            const response = await axios.put(
                `https://swdsapelearningapi.azurewebsites.net/api/Course/${id}`,
                updateData,
                { headers: { "Content-Type": "application/json" } }
            );

            // Nếu cập nhật thành công, cập nhật lại state data để hiển thị ngay
            if (response.status === 200) {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === id ? { ...item, ...updateData } : item
                    )
                );
                form.resetFields();
                alert("Update successful!");
            } else {
                console.error(
                    "Failed to update. Response status:",
                    response.status
                );
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
            const [courseResponse, instructorResponse] = await Promise.all([
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/Course/get-all?PageSize=20`
                ),
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/Instructor/get-all`
                ),
            ]);

            const courseResults = courseResponse.data.$values;
            const instructorResults = instructorResponse.data.$values;

            if (Array.isArray(courseResults)) {
                const startIndex =
                    (pagination.current - 1) * pagination.pageSize;
                const paginatedData = courseResults.slice(
                    startIndex,
                    startIndex + pagination.pageSize
                );

                setData(paginatedData);
                setTableParams((prevParams) => ({
                    ...prevParams,
                    pagination: {
                        ...pagination,
                        total: courseResults.length,
                    },
                }));
            }

            if (Array.isArray(instructorResults)) {
                setInstructors(instructorResults);
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
