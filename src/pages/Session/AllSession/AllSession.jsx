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
import "./AllSession.css";

const AllSession = () => {
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
            width: "10%",
        },
        {
            title: "Topic name",
            dataIndex: "topicName",
            sorter: (a, b) =>
                (a.topicName || "").localeCompare(b.topicName || ""),
            width: "12%",
        },
        {
            title: "Session Name",
            dataIndex: "sessionName",
            sorter: (a, b) =>
                (a.sessionName || "").localeCompare(b.sessionName || ""),
            width: "15%",
        },
        {
            title: "Session Description",
            dataIndex: "sessionDescription",
            sorter: (a, b) =>
                (a.sessionDescription || "").localeCompare(
                    b.sessionDescription || ""
                ),
            width: "15%",
        },
        {
            title: "Session Date",
            dataIndex: "sessionDate",
            sorter: (a, b) =>
                (a.sessionDate || "").localeCompare(b.sessionDate || ""),
            width: "12%",
            render: (sessionDate) => {
                const date = new Date(sessionDate);
                return date.toLocaleDateString(); // Chỉ lấy ngày/tháng/năm
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "5%",
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
                <>
                    <Popup
                        trigger={
                            <Button type="link" className="session_button_edit">
                                <MdModeEditOutline />
                            </Button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() => {
                            console.log("ID:", record.$id); // Kiểm tra giá trị ID
                            form.setFieldsValue({
                                instructorId: record.instructorId,
                                sessionName: record.sessionName,
                                sessionDescription: record.sessionDescription,
                                sessionDate: record.sessionDate,
                            });
                        }}
                    >
                        {(close) => (
                            <div className="popup_container">
                                <h2>Edit Session</h2>
                                <Form
                                    form={form}
                                    onFinish={(values) => {
                                        handleEdit(values, record.$id);
                                        close(); // Đóng popup sau khi lưu
                                    }}
                                >
                                    <div className="all_session_input">
                                        <Form.Item
                                            name="sessionName"
                                            label="Session Name"
                                        >
                                            <input
                                                type="text"
                                                className="all_session_form"
                                                placeholder="Enter session name"
                                            />
                                        </Form.Item>
                                        {/* <Form.Item
                                            name="instructorId"
                                            label="Instructor"
                                        >
                                            <Select
                                                placeholder="Select instructor"
                                                options={instructors.map(
                                                    (inst) => ({
                                                        label: inst.instructorIdName,
                                                        value: inst.instructorName,
                                                    })
                                                )}
                                            />
                                        </Form.Item> */}
                                    </div>
                                    <div className="all_session_input">
                                        <Form.Item
                                            name="sessionDescription"
                                            label="Session Description"
                                        >
                                            <input
                                                type="text"
                                                className="all_session_form"
                                                placeholder="Enter session description"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_session_input">
                                        <Form.Item
                                            name="sessionDate"
                                            label="Session Date"
                                        >
                                            <input
                                                type="date"
                                                className="all_session_form"
                                            />
                                        </Form.Item>
                                        <Form.Item name="status" label="Status">
                                            <Radio.Group className="status-group">
                                                <Radio value={true}>True</Radio>
                                                <Radio value={false}>
                                                    False
                                                </Radio>
                                            </Radio.Group>
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
                        className="session_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </Button>
                </>
            ),
            width: "10%",
        },
    ];

    const handleEdit = async (values, id) => {
        if (!id) {
            console.error("ID is undefined. Cannot update record.");
            return; // Dừng lại nếu ID không hợp lệ
        }

        try {
            const existingRecord = data.find((item) => item.$id === id);
            const updatedRecord = { ...existingRecord, ...values };

            const response = await axios.put(
                `https://swdsapelearningapi.azurewebsites.net/api/CourseSession/${id}`,
                updatedRecord
            );

            if (response.status === 200) {
                const updatedData = data.map((item) =>
                    item.$id === id ? { ...item, ...updatedRecord } : item
                );
                setData(updatedData);
                form.resetFields();
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
            // const response = await axios.get(
            //     `https://swdsapelearningapi.azurewebsites.net/api/CourseSession/get-all`
            // );
            // const results = response.data.$values;

            // if (Array.isArray(results)) {
            //     console.log("Fetched data:", results); // Kiểm tra dữ liệu
            //     const startIndex =
            //         (pagination.current - 1) * pagination.pageSize;
            //     const paginatedData = results.slice(
            //         startIndex,
            //         startIndex + pagination.pageSize
            //     );
            //     setData(paginatedData);
            //     setTableParams((prevParams) => ({
            //         ...prevParams,
            //         pagination: {
            //             ...pagination,
            //             total: results.length,
            //         },
            //     }));
            // } else {
            //     console.error("Fetched data is not an array:", results);
            //     setData([]);
            // }

            const [courseResponse, instructorResponse] = await Promise.all([
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/CourseSession/get-all`
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
                ); // Phân trang dữ liệu

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
                setInstructors(instructorResults); // Lưu danh sách chứng chỉ
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
        <div className="session">
            <div className="session_title_container">
                <div className="session_title_left">
                    <div className="session_title">All Sessions</div>
                </div>
                <div className="session_session_right">
                    <div className="session_session">Sessions</div>
                    <SlArrowRight className="session_icon_right" />
                    <div className="session_all_sessions">All Sessions</div>
                </div>
            </div>

            <div className="session_table_container">
                <Link to={PATH_NAME.ADD_SESSION}>
                    <button className="session_add">Add New</button>
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

export default AllSession;
