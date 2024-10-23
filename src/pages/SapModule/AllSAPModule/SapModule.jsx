import { Button, Form, Radio, Table } from "antd";
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
    pagination: { current: 1, pageSize: 10, total: 0 },
  });
  const [form] = Form.useForm();
  const [descriptionPopupOpen, setDescriptionPopupOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const columns = [
    {
      title: "No.",
      width: "7%",
      render: (_, __, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
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
      render: (text) => (
        <Button
          type="link"
          onClick={() => handleViewDetail(text)}
          className="button_view"
        >
          View
        </Button>
      ),
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (status) => (
        <span
          className={`sap_module_status_indicator ${status ? "active" : "inactive"}`}
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
            onOpen={() => {
              form.setFieldsValue({
                nameSAPModule: record.moduleName || '',
                description: record.moduleDescription || '',
                status: record.status,
              });
            }}
          >
            {(close) => (
              <div className="popup_container">
                <h2>Edit SAP Module</h2>
                <Form
                  form={form}
                  onFinish={async (values) => {
                    await handleEdit(values, record.id);
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
                  <Form.Item name="status" label="Status">
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Inactive</Radio>
                      </Radio.Group>
                    </Form.Item>
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

  const handleViewDetail = (description) => {
    setSelectedDescription(description);
    setDescriptionPopupOpen(true);
  };

  const handleEdit = async (values, id) => {
    try {
      const updateData = {
        moduleName: values.nameSAPModule,
        moduleDescription: values.description,
        status: values.status,
      };

      const response = await axios.put(
        `https://swdsapelearningapi.azurewebsites.net/api/SapModule/update/${id}`,
        updateData
      );

      if (response.status === 200) {
        const updatedData = data.map(item => 
          item.id === id ? { ...item, ...updateData } : item
        );
        setData(updatedData); // Cập nhật state với dữ liệu mới
        form.resetFields(); // Reset form sau khi lưu
      } else {
        console.error("Error updating data:", response.data);
      }
    } catch (error) {
      console.error("Error updating data:", error.response ? error.response.data : error.message);
    }
  };

  // const handleDelete = (id) => {
  //   setData((prevData) => prevData.filter((item) => item.id !== id));
  // };

  const handleDelete = async (id) => {
    try {
      // Gửi yêu cầu xóa đến API
      const response = await axios.delete(`https://swdsapelearningapi.azurewebsites.net/api/SapModule/${id}`);

      if (response.status === 204) {
        // Nếu xóa thành công, cập nhật state để loại bỏ mục đã xóa
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        console.error("Error deleting data:", response.data);
      }
    } catch (error) {
      console.error("Error deleting data:", error.response ? error.response.data : error.message);
    }
  };

  const fetchData = async (pagination) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all`);
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

      {/* Popup hiển thị mô tả */}
      <Popup
        open={descriptionPopupOpen}
        onClose={() => setDescriptionPopupOpen(false)}
      >
        <div className="popup_container">
          <h2>Description Detail</h2>
          <p>{selectedDescription}</p>
          <div className="popup_button_1">
            <Button
              type="button"
              onClick={() => setDescriptionPopupOpen(false)}
              className="button_close"
            >
              Close
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default SapModule;