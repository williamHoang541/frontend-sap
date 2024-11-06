import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Button, Table, Form, Radio } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import Popup from "reactjs-popup";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import "./AllSample.css";

const AllSample = () => {
    const [data, setData] = useState([]); // Khởi tạo mảng dữ liệu
    const [certificates, setCertificates] = useState([]); // Khởi tạo mảng chứng chỉ
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
            title: "Certificate Name",
            dataIndex: "certificateId",
            sorter: true,
            width: "10%",
            render: (certificateId) => {
                // Tìm certificate name dựa vào certificateId
                const certificate = certificates.find(
                    (cert) => cert.id === certificateId
                );
                return certificate ? certificate.certificateName : "N/A";
            },
        },
        {
            title: "Test Name",
            dataIndex: "sampleTestName",
            sorter: (a, b) =>
                (a.sampleTestName || "").localeCompare(b.sampleTestName || ""),
            width: "15%",
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
                            <Button type="link" className="topic_button_edit">
                                <MdModeEditOutline />
                            </Button>
                        }
                        modal
                        closeOnDocumentClick
                        onOpen={() =>
                            form.setFieldsValue({
                                sampleTestName: record.sampleTestName,
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
                                    <div className="all_topic_input">
                                        <Form.Item
                                            name="sampleTestName"
                                            label="Test Name"
                                        >
                                            <input
                                                type="text"
                                                className="all_topic_form"
                                                placeholder="Enter Test Name"
                                            />
                                        </Form.Item>
                                        <Form.Item name="status" label="Status">
                                            <Radio.Group className="status-radio-group">
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
                    <button
                        type="link"
                        danger
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
                `https://swdsapelearningapi.azurewebsites.net/api/CertificateSampletest/update?id=${id}`,
                {
                    sampleTestName: values.sampleTestName, // Dữ liệu cần chỉnh sửa, ở đây là topicName
                    status: values.status,
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
                `https://swdsapelearningapi.azurewebsites.net/api/CertificateSampletest/delete?id=${id}`
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
            const [topicResponse, certificateResponse] = await Promise.all([
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/CertificateSampletest/get-all`
                ),
                axios.get(
                    `https://swdsapelearningapi.azurewebsites.net/api/Certificate/get-all`
                ),
            ]);

            const topicResults = topicResponse.data.$values;
            const certificateResults = certificateResponse.data.$values;

            if (Array.isArray(topicResults)) {
                const startIndex =
                    (pagination.current - 1) * pagination.pageSize;
                const paginatedData = topicResults.slice(
                    startIndex,
                    startIndex + pagination.pageSize
                ); // Phân trang dữ liệu

                setData(paginatedData);
                setTableParams((prevParams) => ({
                    ...prevParams,
                    pagination: {
                        ...pagination,
                        total: topicResults.length,
                    },
                }));
            }

            if (Array.isArray(certificateResults)) {
                setCertificates(certificateResults); // Lưu danh sách chứng chỉ
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
        <div className="test">
            <div className="test_title_container">
                <div className="test_title_left">
                    <div className="test_title">All Tests</div>
                </div>
                <div className="sample_test_right">
                    <div className="test_test">Test</div>
                    <SlArrowRight className="test_icon_right" />
                    <div className="test_all_tests">All Tests</div>
                </div>
            </div>

            <div className="test_table_container">
                <Link to={PATH_NAME.ADD_TEST}>
                    <button className="topic_add">Add New</button>
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

export default AllSample;
