import { useEffect, useState } from "react";
import "./AllCertificate.css";
import { SlArrowRight } from "react-icons/sl";
import { Button, Checkbox, Form, Radio, Table } from "antd";
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
  const [descriptionPopupOpen, setDescriptionPopupOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const fetchSapModules = async () => {
    try {
      const response = await axios.get(
        "https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all"
      );
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
        if (
          !Array.isArray(moduleIds.$values) ||
          moduleIds.$values.length === 0
        ) {
          return "Deleted"; // Hiển thị "Deleted" nếu moduleIds trống
        }

        return moduleIds.$values
          .map((id) => {
            const sapModule = sapModules.find((module) => module.id === id);
            return sapModule ? sapModule.moduleName : "Deleted"; // Hiển thị "Deleted" nếu không tìm thấy module
          })
          .join(", ");
      },
      sorter: (a, b) => {
        const moduleNamesA = (a.moduleIds.$values || [])
          .map(
            (id) =>
              sapModules.find((module) => module.id === id)?.moduleName ||
              "Deleted"
          )
          .join(", ");
        const moduleNamesB = (b.moduleIds.$values || [])
          .map(
            (id) =>
              sapModules.find((module) => module.id === id)?.moduleName ||
              "Deleted"
          )
          .join(", ");
        return moduleNamesA.localeCompare(moduleNamesB);
      },
      width: "16%",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <Button
          type="link"
          onClick={() => handleViewDetail(text)}
          className="button_view"
        >
          View
        </Button>
      ),
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
                certificateName: record.certificateName || "",
                description: record.description || "",
                level: record.level || "",
                environment: record.environment || "",
                status: record.status,
                moduleIds: record.moduleIds.$values || [],
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
                    <Form.Item name="certificateName" label="Name Certificate">
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
                    <Form.Item name="environment" label="Environment">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter environment"
                      />
                    </Form.Item>
                  </div>

                  <div className="sap_module_input">
                    <Form.Item name="moduleIds" label="SAP Modules">
                      <Checkbox.Group>
                        {sapModules.map((module) => (
                          <Checkbox key={module.id} value={module.id}>
                            {module.moduleName}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item name="status" label="Status">
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Inactive</Radio>
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

  // const handleEdit = async (values, id) => {
  //   try {
  //     // Lấy thông tin cũ của record
  //     const existingRecord = data.find((item) => item.id === id);

  //     // Chỉ ghi đè các trường đã thay đổi trong form, các trường không có trong form sẽ giữ nguyên
  //     const updatedRecord = {
  //       ...existingRecord, // giữ nguyên dữ liệu cũ (bao gồm Instructor name)
  //       ...values, // chỉ cập nhật các trường có trong form
  //     };

  //     console.log("Update Data:", updatedRecord);

  //     // Gửi yêu cầu update với record đã cập nhật
  //     const response = await axios.put(
  //       `https://swdsapelearningapi.azurewebsites.net/api/Certificate/update/${id}`,
  //       updatedRecord // gửi toàn bộ bản ghi đã được cập nhật
  //     );

  //     if (response.status === 200) {
  //       // Cập nhật lại dữ liệu trên frontend
  //       const updatedData = data.map((item) =>
  //         item.id === id ? { ...item, ...updatedRecord } : item
  //       );
  //       setData(updatedData);
  //       form.resetFields(); // reset form sau khi hoàn thành
  //     } else {
  //       console.error("Update failed:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error updating course:", error);
  //   }
  // };

  const handleEdit = async (values, id) => {
    try {
      // Cập nhật chứng chỉ qua API
      await axios.put(
        `https://swdsapelearningapi.azurewebsites.net/api/Certificate/update/${id}`,
        values
      );

      // Cập nhật lại dữ liệu trong state
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, ...values, moduleIds: { $values: values.moduleIds } } // Đảm bảo moduleIds được cập nhật
            : item
        )
      );

      alert("Update successfully!");
    } catch (error) {
      alert("Update failed!");
      console.error("Error updating certificate:", error);
    }
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

export default AllCertificate;
