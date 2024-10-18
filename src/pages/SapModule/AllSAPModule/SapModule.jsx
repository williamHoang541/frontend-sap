import { Button, Form, Table } from "antd";
import { useEffect, useState } from "react";
import "./SapModule.css";
import { SlArrowRight } from "react-icons/sl";
import { PATH_NAME } from "../../../constant/pathname";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Popup from "reactjs-popup";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";

const SapModule = () => {
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
      title: "Name SAP Module",
      dataIndex: "moduleName",
      sorter: (a, b) => (a.moduleName || "").localeCompare(b.moduleName || ""),
      width: "35%",
    },

    {
      title: "Description",
      dataIndex: "moduleDescription",
      sorter: (a, b) =>
        (a.moduleDescription || "").localeCompare(b.moduleDescription || ""),
      width: "35%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (status) => (
        <span
          className={`sap_module_status_indicator ${
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
              <Button type="link" className="instructor_button_edit">
                <MdModeEditOutline />
              </Button>
            }
            modal
            closeOnDocumentClick
            onOpen={() =>
              form.setFieldsValue({
                nameSAPModule: record.moduleName,
                description: record.moduleDescription,
              })
            }
          >
            {(close) => (
              <div className="popup_container">
                <h2>Edit SAP Module</h2>
                <Form
                  form={form}
                  onFinish={(values) => {
                    handleEdit(values, record.id);
                    close(); // Đóng popup sau khi lưu
                  }}
                >
                  <div className="sap_module_input">
                    <Form.Item name="nameSAPModule" label="Name SAP Module">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter name"
                      />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                      <textarea
                        className="sap_module_form"
                        placeholder="Enter description"
                        rows={5} 
                      />
                    </Form.Item>
                  </div>

                  
                </Form>
                <div className="popup_button">
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
        `https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all`
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
    <div className="sap_module">
      <div className="student_title_container">
        <div className="student_title_left">
          <div className="student_title">All SAP Modules</div>
        </div>
        <div className="student_student_right">
          <div className="student_student">SAP Module</div>
          <SlArrowRight className="student_icon_right" />
          <div className="student_all_students">All SAP Modules</div>
        </div>
      </div>

      <div className="sap_module_table_container">
        <Link to={PATH_NAME.ADD_SAP_MODULE}>
          <button className="sap_module_add">Add New</button>
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

export default SapModule;
