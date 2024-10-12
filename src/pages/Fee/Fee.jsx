import React, { useEffect, useState } from "react";
import "./Fee.css";
import { SlArrowRight } from "react-icons/sl";
import qs from "qs";
import { Table } from "antd";

const Fee = () => {
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
      title: "Student Name",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: "15%",
    },
    {
      title: "Invoice Number",
      sorter: true,
      width: "15%",
    },
    {
      title: "Payment Type",
      width: "15%",
    },
    {
      title: "Date",
      sorter: true,
      width: "12%",
    },
    {
      title: "Amount",
      sorter: true,
      width: "12%",
    },
    {
    title: "Status",
    dataIndex: "status",
    filters: [
      { text: "Paid", value: "paid" },
      { text: "Unpaid", value: "unpaid" },
    ],
    render: (status) => (
      <span className={status === "paid" ? "status-paid" : "status-unpaid"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    ),
    width: "10%",
  },
  ];


  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        // Thêm trường status vào dữ liệu
        const updatedResults = results.map((item) => ({
          ...item,
          status: Math.random() > 0.5 ? "paid" : "unpaid", // Giả lập trạng thái
        }));
        setData(updatedResults);
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
    <div className="fee">
      <div className="fee_title_container">
        <div className="fee_title_left">
          <div className="fee_title">Fees Collection</div>
        </div>
        <div className="fee_fee_right">
          <div className="fee_fee">Fee</div>
          <SlArrowRight className="fee_icon_right" />
          <div className="fee_collection">Fees Collection</div>
        </div>
      </div>

      <div className="fee_table_container">
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

export default Fee;
