import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Button, Popconfirm, Table, Form } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import qs from "qs";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "./AllTopic.css";

const AllTopic = () => {
    const [data, setData] = useState([]); // Khởi tạo mảng dữ liệu
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
            title: "Certificate Name",
            dataIndex: "name",
            sorter: true,
            render: (name) => `${name.last}`,
            width: "15%",
        },
        {
            title: "Topic Name",
            dataIndex: "name",
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: "15%",
        },
        {
            title: "Topic detail",
            dataIndex: "gender",
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
            ],
            width: "10%",
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
                                <h2>Edit Instructor</h2>
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
                                            label="Certificate Name"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Enter Certificate Name"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_instructor_input">
                                        <Form.Item
                                            name="phone"
                                            label="Topic Name"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Enter Topic Name"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="all_instructor_input">
                                        <Form.Item
                                            name="gender"
                                            label="Topic Details"
                                        >
                                            <input
                                                type="text"
                                                className="all_instructor_form"
                                                placeholder="Enter Topic Details"
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
                setData(results);
                setLoading(false);
                setTableParams((prevParams) => ({
                    ...prevParams,
                    pagination: {
                        ...prevParams.pagination,
                        total: 200, // Giả lập tổng số bản ghi
                    },
                }));
            })
            .catch(() => setLoading(false)); // Đảm bảo set loading false khi có lỗi
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]); // Xóa dữ liệu khi thay đổi pageSize
        }
    };

    return (
        <div className="topic-area">
            <div className="topic_title_container">
                <div className="topic_title_left">
                    <div className="topic_title">All Topic</div>
                </div>
                <div className="topic_area_right">
                    <div className="topic_topic">Topic Area</div>
                    <SlArrowRight className="topic_icon_right" />
                    <div className="topic_all_topics">All Topic</div>
                </div>
            </div>

            <div className="topic_table_container">
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

export default AllTopic;
