import { Button, Form, Table } from "antd";
import { useEffect, useState } from "react";
import "./SapModule.css";
import { SlArrowRight } from "react-icons/sl";
import { PATH_NAME } from "../../../constant/pathname";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Popup from "reactjs-popup";
import { MdModeEditOutline } from "react-icons/md";
import qs from "qs";

const SapModule = () => {
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
      title: "Name SAP Module",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: "40%",
    },

    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
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
                <h2>Edit SAP Module</h2>
                <Form
                  form={form}
                  onFinish={(values) => {
                    handleEdit(values, record.login.uuid);
                    close(); // Đóng popup sau khi lưu
                  }}
                >
                  <div className="sap_module_input">
                    <Form.Item name="name" label="Name SAP Module">
                      <input
                        type="text"
                        className="sap_module_form"
                        placeholder="Enter name"
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

export default SapModule;
