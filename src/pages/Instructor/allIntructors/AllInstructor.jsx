import { useEffect, useState } from "react";
import { Button, Table, Form } from "antd";
import Popup from "reactjs-popup";
import { SlArrowRight } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import qs from "qs";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import "./AllInstructor.css";

const AllInstructor = () => {
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
      title: "Full Name",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: "15%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Education",
      sorter: true,
      width: "12%",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
      sorter: true,
      width: "10%",
    },
    {
      title: "Joining Date",
      sorter: true,
      width: "12%",
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
                <h2>Edit Instructor</h2>
                <Form
                  form={form}
                  onFinish={(values) => {
                    handleEdit(values, record.login.uuid);
                    close(); // Đóng popup sau khi lưu
                  }}
                >
                  <div className="all_instructor_input">
                    <Form.Item name="name" label="Full Name">
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

export default AllInstructor;
