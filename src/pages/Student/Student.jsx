import React, { useEffect, useState } from "react";
import "./Student.css";
import { SlArrowRight } from "react-icons/sl";
import { Button, Popconfirm, Table } from "antd";
import qs from "qs";
import { RiDeleteBin6Line } from "react-icons/ri";

const Student = () => {
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
      width: "12%",
    },
    {
      title: "Mobile",
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
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDelete(record.login.uuid)}
          className="student_button_delete"
        >
          <RiDeleteBin6Line />
        </Button>
      ),
      width: "10%",
    },
  ];

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
    <div className="student">
      <div className="student_title_container">
        <div className="student_title_left">
          <div className="student_title">All Students</div>
        </div>
        <div className="student_student_right">
          <div className="student_student">Students</div>
          <SlArrowRight className="student_icon_right" />
          <div className="student_all_students">All Students</div>
        </div>
      </div>

      <div className="student_table_container">
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

export default Student;
