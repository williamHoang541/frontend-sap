import { Table } from "antd";
import React, { useState } from "react";
import "./SapModule.css";
import { SlArrowRight } from "react-icons/sl";

const expandDataSource = Array.from({ length: 3 }).map((_, i) => ({
  key: i.toString(),

  name: "This is production name",
  desc: "Upgraded: 56",
}));

const dataSource = Array.from({ length: 11 }).map((_, i) => ({
  key: i.toString(),
  name: "Screen",
  desc: "iOS",
}));

const expandColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Description", dataIndex: "desc", key: "desc" },
  { title: "Level", dataIndex: "level", key: "level" },
  { title: "Environment", dataIndex: "env", key: "env" },
];

const columns = [
  {
    title: "No.",
    sorter: true,
    width: "7%",
    render: (_, __, index) => index + 1,
  },
  { title: "Name", dataIndex: "name", key: "name", sorter: true },
  { title: "Description", dataIndex: "desc", key: "desc" },
];

const expandedRowRender = () => (
  <Table
    columns={expandColumns}
    dataSource={expandDataSource}
    pagination={false}
  />
);

const SapModule = () => {
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
        <Table
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ["0"],
          }}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50"],
          }}
        />
      </div>
    </div>
  );
};

export default SapModule;
