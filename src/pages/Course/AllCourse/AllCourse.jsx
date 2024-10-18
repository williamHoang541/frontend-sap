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

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const columns = [
        {
            title: "No.",
            sorter: true,
            width: "7%",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Course Name",
            dataIndex: "name",
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: "15%",
        },
        {
            title: "Mode",
            dataIndex: "mode",
            filters: [
                { text: "Online", value: "online" },
                { text: "Offline", value: "offline" },
            ],
            render: (status) => (
                <span
                    className={
                        status === "online" ? "status-online" : "status-offline"
                    }
                ></span>
            ),
            width: "10%",
        },
        {
            title: "Start Date",
            sorter: true,
            width: "10%",
        },
        {
            title: "End Date",
            sorter: true,
            width: "10%",
        },
        {
            title: "Total Student",
            dataIndex: "phone",
            sorter: true,
            width: "10%",
        },
        {
            title: "Location",
            sorter: true,
            width: "12%",
        },
        {
            title: "Status",
            sorter: true,
            width: "12%",
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                    <Popup
                        trigger={
                            <Button
                                type="link"
                                className="instructor_button_edit"
                            >
                                <MdModeEditOutline />
                            </Button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() =>
                            form.setFieldsValue({
                                name: record.name,
                                email: record.email,
                            })
                        }
                    >
                        {(close) => (
                            <div className="popup_container">
                                <h2>Edit Course</h2>
                                <Form
                                    form={form}
                                    onFinish={(values) => {
                                        handleEdit(values, record.login.uuid);
                                        close(); // Đóng popup sau khi lưu
                                    }}
                                >
                                    <div className="all_instructor_input">
                                        <Form.Item
                                            name="name"
                                            label="Course Name"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Enter full name"
                                            />
                                        </Form.Item>
                                        <Form.Item name="mode" label="Mode">
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Enter Mode"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_instructor_input">
                                        <Form.Item
                                            name="start_date"
                                            label="Start Date"
                                        >
                                            <input
                                                type="date"
                                                className="all_instructor_form"
                                                placeholder="Select start date"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="t_student"
                                            label="Total Student"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Enter maximum student"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_instructor_input">
                                        <Form.Item
                                            name="end_date"
                                            label="End Date"
                                        >
                                            <input
                                                type="date"
                                                className="all_instructor_form"
                                                placeholder="Select end date"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="end_register_date"
                                            label="End register date"
                                        >
                                            <input
                                                type="date"
                                                className="all_instructor_form"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_instructor_input">
                                        <Form.Item
                                            name="location"
                                            label="Location"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Select location"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="status"
                                            label="End status"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
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
                        onClick={() => handleDelete(record.login.uuid)}
                        className="instructor_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </Button>
                </>
            ),
            width: "10%",
        },
    ];

    const handleEdit = (values, uuid) => {
        const updatedData = data.map((item) =>
            item.login.uuid === uuid ? { ...item, ...values } : item
        );
        setData(updatedData);
        form.resetFields();
    };

    const handleDelete = (uuid) => {
        setData((prevData) =>
            prevData.filter((item) => item.login.uuid !== uuid)
        );
    };

    const fetchData = () => {
        setLoading(true);
        fetch(
            `https://randomuser.me/api?${qs.stringify(
                getRandomuserParams(tableParams)
            )}`
        )
            .then((res) => res.json())
            .then(({ results }) => {
                // Thêm trường status vào dữ liệu
                const updatedResults = results.map((item) => ({
                    ...item,
                    status: Math.random() > 0.5 ? "online" : "offline", // Giả lập trạng thái
                }));
                setData(updatedResults);
                setLoading(false);
                setTableParams((prevParams) => ({
                    ...prevParams,
                    pagination: {
                        ...prevParams.pagination,
                        total: 200,
                    },
                }));
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const handleTableChange = (pagination) => {
        setTableParams({ pagination });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <div className="instructor">
            <div className="instructor_title_container">
                <div className="instructor_title_left">
                    <div className="instructor_title">All Courses</div>
                </div>
                <div className="instructor_instructor_right">
                    <div className="instructor_instructor">Course</div>
                    <SlArrowRight className="instructor_icon_right" />
                    <div className="instructor_all_instructors">
                        All Courses
                    </div>
                </div>
            </div>

            <div className="instructor_table_container">
                <Link to={PATH_NAME.ADD_COURSE}>
                    <button className="instructor_add">Add New</button>
                </Link>
                <Table
                    columns={columns}
                    rowKey={(record) => record.login.uuid}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
};

export default AllCourse;
