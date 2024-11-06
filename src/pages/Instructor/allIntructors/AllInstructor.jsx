import { useEffect, useState } from "react";
import { Table, Form } from "antd";
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
      width: "20%",
      render: (fullname) => fullname || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      render: (email) => email || "N/A",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Mobile",
      dataIndex: "phonenumber",
      render: (phonenumber) => phonenumber || "N/A",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (status) => (
        <span
          className={`instructor_status_indicator ${
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
              <button type="button" className="instructor_button_edit">
                <MdModeEditOutline />
              </button>
            }
            modal
            closeOnDocumentClick
            onOpen={() =>
              form.setFieldsValue({
                fullname: record.fullname || "",
                email: record.email || "",
                phone: record.phonenumber || "",
              })
            }
          >
            {(close) => (
              <div className="popup_container">
                <h2>Edit Instructor</h2>
                <Form
                  form={form}
                  onFinish={async (values) => {
                    await handleEdit(values, record.userId);
                    close();
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
                        type="text"
                        className="all_instructor_form"
                        placeholder="Enter mobile number"
                      />
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
            onClick={() => handleDelete(record.userId)}
            className="instructor_button_delete"
          >
            <RiDeleteBin6Line />
          </button>
        </>
      ),
      width: "10%",
    },
  ];

  const handleEdit = async (values, userId) => {
    try {
      const updateData = {
        fullname: values.fullname,
        email: values.email,
        phonenumber: values.phone,
      };

      const response = await axios.put(
        `https://swdsapelearningapi.azurewebsites.net/api/Instructor/update-Instructor?userId=${userId}`,
        updateData
      );

      if (response.status === 200) {
        const updatedData = data.map((item) =>
          item.userId === userId ? { ...item, ...updateData } : item
        );
        setData(updatedData);
        form.resetFields();
      } else {
        console.error("Error updating data:", response.data);
      }
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = (userId) => {
    setData((prevData) => prevData.filter((item) => item.userId !== userId));
  };

  const fetchData = async (pagination) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swdsapelearningapi.azurewebsites.net/api/Instructor/get-all`
      );
      const results = response.data.$values;

      if (Array.isArray(results)) {
        const startIndex = (pagination.current - 1) * pagination.pageSize;
        const paginatedData = results.slice(
          startIndex,
          startIndex + pagination.pageSize
        );

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
        setData([]);
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
          rowKey={(record) => record.userId}
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
