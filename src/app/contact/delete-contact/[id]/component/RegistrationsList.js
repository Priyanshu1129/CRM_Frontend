import React from "react";
import { Table, Avatar, Typography, Tooltip, Space, Alert } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { BsTrash2 } from "react-icons/bs";
import { TableActions } from "@/components";

const { Text } = Typography;

const RegistrationsList = ({ registrations }) => {
  const router = useRouter();

  if (
    !Array.isArray(registrations) ||
    !registrations ||
    registrations.length === 0
  ) {
    return <Alert message="No registrations available" type="info" showIcon />;
  }

  // Table columns definition
  const columns = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      width: 200,
      render: (client) => (
        <Space>
          <Avatar src={client?.avatar} />
          <Text>{client?.name || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Website",
      dataIndex: "websiteDetails",
      key: "websiteDetails",
      width: 250,
      render: (websiteDetails) => (
        <div>
          <Text strong>Username:</Text> {websiteDetails?.username || "N/A"}
          <br />
          <a
            href={websiteDetails?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Website
          </a>
        </div>
      ),
    },
    {
      title: "Entered By",
      dataIndex: "enteredBy",
      key: "enteredBy",
      width: 180,
      render: (enteredBy) => (
        <Space>
          <Avatar src={enteredBy?.avatar} />
          <Text>
            {enteredBy?.firstName} {enteredBy?.lastName}
          </Text>
        </Space>
      ),
    },
    {
      title: "Registration Champ",
      dataIndex: "registrationChamp",
      key: "registrationChamp",
      width: 180,
      render: (champ) => (
        <Text>
          {champ?.firstName} {champ?.lastName}
        </Text>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
      width: 120,
      render: (registrationDate) =>
        new Date(registrationDate).toLocaleDateString("en-US") || "N/A",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: 120,
      render: (expiryDate) =>
        new Date(expiryDate).toLocaleDateString("en-US") || "N/A",
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      width: 120,
      render: (entryDate) =>
        new Date(entryDate).toLocaleDateString("en-US") || "N/A",
    },
    {
      title: "Documents",
      dataIndex: "submittedDocuments",
      key: "submittedDocuments",
      width: 150,
      render: (submittedDocuments) => (
        <Text>{submittedDocuments || "N/A"}</Text>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 200,
      render: (notes) =>
        notes?.length ? (
          <Tooltip title={notes.join(", ")}>
            <Text>View Notes</Text>
          </Tooltip>
        ) : (
          <Text>N/A</Text>
        ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions
          showUrl={`/registration/registration-details/${record._id}`}
          deleteUrl={`/registration/delete-registration/${record._id}`}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={registrations}
      columns={columns}
      rowKey={(record) => record._id}
      bordered
      scroll={{ x: 1300 }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default RegistrationsList;
