import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./Student.css";

const Student = () => {
  const [data, setData] = useState([]); // Khởi tạo mảng dữ liệu
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
      width: "7%",
      render: (_, __, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
        index +
        1,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      sorter: (a, b) => (a.fullname || "").localeCompare(b.fullname || ""),
      width: "15%",
      render: (fullname) => fullname || "N/A",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => (a.gender || "").localeCompare(b.gender || ""),
      width: "10%",
      render: (gender) => gender || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      render: (email) => email || "N/A",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Education",
      dataIndex: "education",
      width: "12%",
      render: (education) => education || "N/A",
    },
    {
      title: "Mobile",
      dataIndex: "phonenumber",
      width: "10%",
      render: (phonenumber) => phonenumber || "N/A",
    },
    {
      title: "Joining Date",
      dataIndex: "registrationDate",
      width: "12%",
      sorter: (a, b) =>
        new Date(a.registrationDate) - new Date(b.registrationDate),
      render: (date) => {
        if (!date) return "N/A";
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("vi-VN");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (status) => (
        <span
          className={`student_status_indicator ${status ? "active" : "inactive"}`}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDelete(record.id)}
          className="student_button_delete"
        >
          <RiDeleteBin6Line />
        </Button>
      ),
      width: "10%",
    },
  ];

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const fetchData = async (pagination) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swdsapelearningapi.azurewebsites.net/api/User/api/users`
      );
      const results = response.data.$values; // Lấy dữ liệu từ response

      // Kiểm tra xem results có phải là mảng không
      if (Array.isArray(results)) {
        const startIndex = (pagination.current - 1) * pagination.pageSize;
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
    <div className="student">
      <div className="student_title_container">
        <div className="student_title_left">
          <div className="student_title">All Students</div>
        </div>
        <div className="student_student_right">
          <div className="student_student">Students</div>
          <SlArrowRight className="student_icon_right" />
          <div className="student_all_students">All Students</div>
        </div>
      </div>

      <div className="student_table_container">
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

export default Student;
