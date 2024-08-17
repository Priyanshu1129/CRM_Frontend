import React from "react";
import { Table } from "@/components";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "First Name",
    width: 150,
    dataIndex: "firstName",
    key: "firstName",
    // fixed: "left",
  },
  {
    title: "Last Name",
    width: 150,
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Job Title",
    width: 200,
    dataIndex: "jobTitle",
    key: "jobTitle",
  },
  {
    title: "Client",
    width: 200,
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Relationship Degree",
    dataIndex: "relationshipDegree",
    width: 200,
    key: "relationshipDegree",
  },
  {
    title: "Personal Email",
    width: 300,
    dataIndex: "personalEmail",
    key: "personalEmail",
  },
  {
    title: "Work Email",
    width: 300,
    dataIndex: "workEmail",
    key: "workEmail",
  },
  {
    title: "Phone",
    width: 300,
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Mobile Phone",
    width: 300,
    dataIndex: "mobilePhone",
    key: "mobilePhone",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Arch Type",
    dataIndex: "archType",
    key: "archType",
  },
  {
    title: "Details Confirmation",
    dataIndex: "detailsConfirmation",
    key: "detailsConfirmation",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <Space>
        <Button size="small" href="" icon={<EyeOutlined />} />
        <Button size="small" href="" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park",
  },
];

export const ContactsTableView = ({ loading }) => {
  return (
    <>
      <Table loading={loading} data={data} columns={columns} />
    </>
  );
};
