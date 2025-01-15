import React from "react";
import { Table, Avatar, Typography, Tooltip, Space, Alert } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { TableActions } from "@/components";

const { Text } = Typography;

const BDList = ({ businessDevelopments }) => {
  const router = useRouter();

  if (
    !Array.isArray(businessDevelopments) ||
    !businessDevelopments ||
    businessDevelopments.length === 0
  ) {
    return (
      <Alert
        message="No business development records available"
        type="info"
        showIcon
      />
    );
  }

  // Table columns definition
  const columns = [
    {
      title: "Client Name",
      dataIndex: ["client", "name"],
      key: "clientName",
      width: 200,
      render: (name, record) => (
        <Space>
          <Avatar src={record?.client?.avatar} />
          <Text>{name || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Potential Project",
      dataIndex: "potentialProject",
      key: "potentialProject",
      width: 200,
      render: (project) => <Text>{project || "N/A"}</Text>,
    },
    {
      title: "Potential Revenue",
      dataIndex: "potentialRevenue",
      key: "potentialRevenue",
      width: 150,
      render: (revenue) => (revenue ? `$${revenue.toLocaleString()}` : "N/A"),
    },
    {
      title: "Potential Top Line",
      dataIndex: "potentialTopLine",
      key: "potentialTopLine",
      width: 150,
      render: (topLine) => (topLine ? `$${topLine.toLocaleString()}` : "N/A"),
    },
    {
      title: "Potential Offset",
      dataIndex: "potentialOffset",
      key: "potentialOffset",
      width: 150,
      render: (offset) => (offset ? `$${offset.toLocaleString()}` : "N/A"),
    },
    {
      title: "Sales Champ",
      dataIndex: "salesChamp",
      key: "salesChamp",
      width: 250,
      render: (salesChamp) => (
        <Space>
          <Avatar src={salesChamp?.avatar} />
          <Text>
            {salesChamp?.firstName} {salesChamp?.lastName || ""}
          </Text>
        </Space>
      ),
    },
    {
      title: "Entered By",
      dataIndex: "enteredBy",
      key: "enteredBy",
      width: 250,
      render: (enteredBy) => (
        <Space>
          <Avatar src={enteredBy?.avatar} />
          <Text>
            {enteredBy?.firstName} {enteredBy?.lastName || ""}
          </Text>
        </Space>
      ),
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      width: 150,
      render: (entryDate) =>
        entryDate ? new Date(entryDate).toLocaleDateString("en-US") : "N/A",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions
          showUrl={`/mention/mention-details/${record._id}`}
          deleteUrl={`/mention/delete-mention/${record._id}`}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={businessDevelopments}
      columns={columns}
      rowKey={(record) => record._id}
      bordered
      scroll={{ x: 1500 }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default BDList;
