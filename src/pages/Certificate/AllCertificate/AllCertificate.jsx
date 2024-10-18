import { useEffect, useState } from "react";
import "./AllCertificate.css";
import { SlArrowRight } from "react-icons/sl";
import { Button, Form, Table } from "antd";
import Popup from "reactjs-popup";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import axios from "axios";

const AllCertificate = () => {
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
  const [sapModules, setSapModules] = useState([]);

  const fetchSapModules = async () => {
    try {
      const response = await axios.get("https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all"); 
      setSapModules(response.data.$values); 
    } catch (error) {
      console.error("Error fetching SAP modules:", error);
    }
  };

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
      title: "Name Certificate",
      dataIndex: "certificateName",
      sorter: (a, b) =>
        (a.certificateName || "").localeCompare(b.certificateName || ""),
      width: "16%",
    },
    {
      title: "Level",
      dataIndex: "level",
      sorter: (a, b) => (a.level || "").localeCompare(b.level || ""),
      width: "16%",
    },
    {
      title: "Environment",
      dataIndex: "environment",
      sorter: (a, b) =>
        (a.environment || "").localeCompare(b.environment || ""),
      width: "16%",
    },
    {
      title: "Name SAP Module",
      dataIndex: "moduleIds", 
      render: (moduleIds) => {
        if (!Array.isArray(moduleIds.$values)) return "Unknown"; 
        return moduleIds.$values
          .map(id => {
            const sapModule = sapModules.find(module => module.id === id); 
            return sapModule ? sapModule.moduleName : "Unknown"; 
          })
          .join(", "); 
      },
      sorter: (a, b) => {
        const moduleNamesA = a.moduleIds.$values
          .map(id => sapModules.find(module => module.id === id)?.moduleName || "")
          .join(", ");
        const moduleNamesB = b.moduleIds.$values
          .map(id => sapModules.find(module => module.id === id)?.moduleName || "")
          .join(", ");
        return moduleNamesA.localeCompare(moduleNamesB);
      },
      width: "16%",
    },

    {
      title: "Description",
      dataIndex: "description",
      width: "16%",
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
                name_certificate: record.certificateName,
                description: record.description,
                level: record.level,
                env: record.environment,
              })
            }
          >
            {(close) => (
              <div className="popup_container">
                <h2>Edit Certificate</h2>
                <Form
                  form={form}
                  onFinish={(values) => {
                    handleEdit(values, record.id);
                    close(); // Đóng popup sau khi lưu
                  }}
                >
                  <div className="sap_module_inputs">
                    <Form.Item name="name_certificate" label="Name Certificate">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter name certificate"
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

                  <div className="sap_module_input">
                    <Form.Item name="level" label="Level">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter level"
                      />
                    </Form.Item>
                    <Form.Item name="env" label="Environment">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter environment"
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
        `https://swdsapelearningapi.azurewebsites.net/api/Certificate/get-all`
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
    fetchSapModules(); 
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
    <div className="certificate">
      <div className="student_title_container">
        <div className="student_title_left">
          <div className="student_title">All Certificates</div>
        </div>
        <div className="student_student_right">
          <div className="student_student">Certificate</div>
          <SlArrowRight className="student_icon_right" />
          <div className="student_all_students">All Certificates</div>
        </div>
      </div>
      <div className="sap_module_table_container">
        <Link to={PATH_NAME.ADD_CERTIFICATE}>
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

export default AllCertificate;
