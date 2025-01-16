import React from "react";
import { Table, Avatar, Typography, Space, Tooltip, Alert } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TableActions } from "@/components";

const { Text } = Typography;

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <Alert message="No User is associated with this Role" type="info" showIcon />;
  }

  // Table columns definition
  const columns = [
    {
      title: "Profile",
      dataIndex: "avatar",
      key: "profile",
      width: 100,
      render: (avatar, record) => (
        <Avatar src={avatar} size={40}>
          {(!avatar && record?.firstName) ? record.firstName.charAt(0).toUpperCase() : ""}
        </Avatar>
      ),
    },
    {
      title: "Name",
      key: "name",
      width: 200,
      render: (record) => (
        <Text>
          {record.firstName} {record.lastName || ""}
        </Text>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone) => <Text>{phone || "N/A"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (email) => <Text>{email || "N/A"}</Text>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (gender) => <Text>{gender === "F" ? "Female" : "Male"}</Text>,
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      width: 100,
      render: (isVerified) =>
        isVerified ? (
          <Tooltip title="Verified">
            <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} />
          </Tooltip>
        ) : (
          <Tooltip title="Not Verified">
            <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} />
          </Tooltip>
        ),
    },
    {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 100,
          render: (_, record) => (
            <TableActions
              showUrl={`/user/user-details/${record._id}`}
              deleteUrl={`/user/delete-user/${record._id}`}
            />
          ),
        },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey={(record) => record._id}
      bordered
      scroll={{ x: 800 }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default UserList;
