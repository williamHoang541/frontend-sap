import { useEffect, useState } from "react";
import "./AllCertificate.css";
import { SlArrowRight } from "react-icons/sl";
import { Button, Form, Table } from "antd";
import Popup from "reactjs-popup";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import qs from "qs";

const AllCertificate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [form] = Form.useForm();

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const columns = [
    {
      title: "No.",
      sorter: true,
      width: "7%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name Certificate",
      dataIndex: "name_certificate",
      width: "16%",
    },
    {
      title: "Level",
      dataIndex: "level",
      width: "16%",
    },
    {
      title: "Environment",
      dataIndex: "env",
      width: "16%",
    },
    {
      title: "Name SAP Module",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
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
              form.setFieldsValue({ name: record.name, email: record.email })
            }
          >
            {(close) => (
              <div className="popup_container">
                <h2>Edit Certificate</h2>
                <Form
                  form={form}
                  onFinish={(values) => {
                    handleEdit(values, record.login.uuid);
                    close(); // Đóng popup sau khi lưu
                  }}
                >
                  <div className="sap_module_input">
                    <Form.Item name="name_certificate" label="Name Certificate">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter name certificate"
                      />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter description"
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

  const handleEdit = (values, uuid) => {
    const updatedData = data.map((item) =>
      item.login.uuid === uuid ? { ...item, ...values } : item
    );
    setData(updatedData);
    form.resetFields();
  };

  const handleDelete = (uuid) => {
    setData((prevData) => prevData.filter((item) => item.login.uuid !== uuid));
  };

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams((prevParams) => ({
          ...prevParams,
          pagination: {
            ...prevParams.pagination,
            total: 200,
          },
        }));
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination) => {
    setTableParams({ pagination });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
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
          rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default AllCertificate;
