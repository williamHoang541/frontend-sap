import { useEffect, useState } from "react";
import "./AllInstructor.css";
import { SlArrowRight } from "react-icons/sl";
import { Button, Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import qs from "qs";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";

const AllInstructor = () => {
  const [data, setData] = useState([]); // Khởi tạo mảng dữ liệu
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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
      title: "Name",
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
      width: "15%",
    },
    {
      title: "Mobile",
      sorter: true,
      width: "10%",
    },
    {
      title: "Joining Date",
      sorter: true,
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
            className="instructor_button_edit"
          >
            <MdModeEditOutline />
          </Button>
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

  const handleEdit = (record) => {
    // Thực hiện hành động chỉnh sửa tại đây
    console.log("Edit record:", record);
    // Bạn có thể mở một modal hoặc điều hướng đến trang chỉnh sửa ở đây
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
            total: 200, // Giả lập tổng số bản ghi
          },
        }));
      })
      .catch(() => setLoading(false)); // Đảm bảo set loading false khi có lỗi
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]); // Xóa dữ liệu khi thay đổi pageSize
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
