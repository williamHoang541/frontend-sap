import { useEffect, useState } from "react";
import { Button, Table, Form } from "antd";
import Popup from "reactjs-popup";
import { SlArrowRight } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import "./AllInstructor.css";
import axios from "axios";

const AllInstructor = () => {
  const [data, setData] = useState([]);
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
      render: (phonenumber) => phonenumber || "N/A",
      width: "10%",
    },
    {
      title: "Date of birth",
      dataIndex: "birthdate",
      width: "12%",
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate),
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
          className={`instructor_status_indicator ${status ? "active" : "inactive"}`}
        />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Popup
            trigger={
              <Button type="link" className="instructor_button_edit">
                <MdModeEditOutline />
              </Button>
            }
            modal
            closeOnDocumentClick
            onOpen={() =>
              form.setFieldsValue({
                fullname: record.fullname,
                email: record.email,
                phone: record.phonenumber,
                education: record.education,
                gender: record.gender,
                birthdate: record.birthdate,
              })
            }
          >
            {(close) => (
              <div className="popup_container">
                <h2>Edit Instructor</h2>
                <Form
                  form={form}
                  onFinish={(values) => {
                    handleEdit(values, record.id);
                    close(); // Đóng popup sau khi lưu
                  }}
                >
                  <div className="all_instructor_input">
                    <Form.Item name="fullname" label="Full Name">
                      <input
                        type="text"
                        className="all_instructor_form"
                        placeholder="Enter full name"
                      />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <input
                        type="email"
                        className="all_instructor_form"
                        placeholder="Enter email"
                      />
                    </Form.Item>
                  </div>
                  <div className="all_instructor_input">
                    <Form.Item name="phone" label="Mobile Number">
                      <input
                        type="number"
                        className="all_instructor_form"
                        placeholder="Enter mobile number"
                      />
                    </Form.Item>
                    <Form.Item name="education" label="Education">
                      <input
                        type="text"
                        className="all_instructor_form"
                        placeholder="Enter education"
                      />
                    </Form.Item>
                  </div>
                  <div className="all_instructor_input">
                    <Form.Item name="gender" label="Gender">
                      <input
                        type="text"
                        className="all_instructor_form"
                        placeholder="Enter gender"
                      />
                    </Form.Item>
                    <Form.Item name="birthdate" label="Date of Birth">
                      <input type="date" className="all_instructor_form" />
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
            className="instructor_button_delete"
          >
            <RiDeleteBin6Line />
          </Button>
        </>
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
        `https://swdsapelearningapi.azurewebsites.net/api/Instructor/get-all`
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
    <div className="instructor">
      <div className="instructor_title_container">
        <div className="instructor_title_left">
          <div className="instructor_title">All Instructors</div>
        </div>
        <div className="instructor_instructor_right">
          <div className="instructor_instructor">Instructors</div>
          <SlArrowRight className="instructor_icon_right" />
          <div className="instructor_all_instructors">All Instructors</div>
        </div>
      </div>

      <div className="instructor_table_container">
        <Link to={PATH_NAME.ADD_INSTRUCTOR}>
          <button className="instructor_add">Add New</button>
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

export default AllInstructor;
