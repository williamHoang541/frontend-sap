import  { useEffect, useState } from "react";
import "./Fee.css";
import { SlArrowRight } from "react-icons/sl";

import { Table } from "antd";
import axios from "axios";

const Fee = () => {
  const [data, setData] = useState([]); // Khởi tạo mảng dữ liệu
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      
      const paymentResponse = await axios.get('https://swdsapelearningapi.azurewebsites.net/api/Payment');
      const paymentData = paymentResponse.data.$values;

      
      const studentResponse = await axios.get('https://swdsapelearningapi.azurewebsites.net/api/User/get-all-student');
      const studentData = studentResponse.data.$values;

      
      const enrollmentResponse = await axios.get('https://swdsapelearningapi.azurewebsites.net/api/Enrollment/get-all');
      const enrollmentData = enrollmentResponse.data.$values;

      // Kết nối dữ liệu payment với student
      const updatedResults = paymentData.map(payment => {
        const enrollment = enrollmentData.find(enroll => enroll.id === payment.enrollmentId);
        const student = studentData.find(student => student.id === (enrollment ? enrollment.userId : null));
        return {
          ...payment,
          studentName: student ? student.fullname || 'Unknown' : 'Unknown',
        };
      });

      setData(updatedResults);
      setLoading(false);
      setTableParams(prevParams => ({
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          total: updatedResults.length,
        },
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
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

  const columns = [
    {
      title: "No.",
      sorter: true,
      width: "7%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      width: "15%",
    },
    {
      title: "Transaction code",
      dataIndex: "transactionId",
      sorter: true,
      width: "15%",
    },
    {
      title: "Date",
      dataIndex: "paymentDate",
      width: "12%",
      sorter: (a, b) =>
        new Date(a.paymentDate) - new Date(b.paymentDate),
      render: (date) => {
        if (!date) return "N/A";
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("vi-VN");
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => (a.amount || "").localeCompare(b.amount || ""),
      width: "12%",
    },
    {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <span className={`status-indicator ${status === "Success" ? "status-success" : (status === "Pending" ? "status-pending" : "status-cancelled")}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    ),
    width: "10%",
  },
  ];

  return (
    <div className="fee">
      <div className="fee_title_container">
        <div className="fee_title_left">
          <div className="fee_title">Payment</div>
        </div>
        <div className="fee_fee_right">
          <div className="fee_fee">Payment</div>
          <SlArrowRight className="fee_icon_right" />
          <div className="fee_collection">Payment</div>
        </div>
      </div>

      <div className="fee_table_container">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default Fee;
