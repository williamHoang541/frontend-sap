import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Button, Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
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
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
                        className="test_button_delete"
                    >
                        <RiDeleteBin6Line />
                    </Button>
                </>
            ),
            width: "8%",
        },
    ];

    const handleDelete = async (id) => {
        try {
            // Gửi yêu cầu xóa đến API
            const response = await axios.delete(
                `https://swdsapelearningapi.azurewebsites.net/api/CourseSession/${id}`
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
