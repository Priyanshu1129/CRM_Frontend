import React from "react";
import { Table, Avatar, Typography, Tooltip, Space, Alert } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { TableActions } from "@/components";

const { Text } = Typography;

const ClientList = ({ clients }) => {
  const router = useRouter();

  if (!Array.isArray(clients) || !clients || clients.length === 0) {
    return <Alert message="No clients available" type="info" showIcon />;
  }

  // Table columns definition
  const columns = [
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: "Client Code",
      dataIndex: "clientCode",
      key: "clientCode",
      width: 150,
      render: (clientCode) => <Text>{clientCode || "N/A"}</Text>,
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      width: 250,
      render: (industry) => (
        <Text>
          {industry?.label || "N/A"}{" "}
          {industry?.subIndustry ? ` - ${industry.subIndustry.label}` : ""}
        </Text>
      ),
    },
    {
      title: "Offering",
      dataIndex: "offering",
      key: "offering",
      width: 200,
      render: (offering) => <Text>{offering || "N/A"}</Text>,
    },
    {
      title: "Primary Relationship",
      dataIndex: "primaryRelationship",
      key: "primaryRelationship",
      width: 250,
      render: (primaryRelationship) => (
        <Space>
          <Avatar src={primaryRelationship?.avatar} />
          <Text>
            {primaryRelationship?.firstName} {primaryRelationship?.lastName}
          </Text>
        </Space>
      ),
    },
    {
      title: "Secondary Relationship",
      dataIndex: "secondaryRelationship",
      key: "secondaryRelationship",
      width: 250,
      render: (secondaryRelationship) => (
        <Space>
          <Avatar src={secondaryRelationship?.avatar} />
          <Text>
            {secondaryRelationship?.firstName} {secondaryRelationship?.lastName}
          </Text>
        </Space>
      ),
    },
    {
      title: "Territory",
      dataIndex: "territory",
      key: "territory",
      width: 200,
      render: (territory) => <Text>{territory?.label || "N/A"}</Text>,
    },
    {
      title: "Listed",
      dataIndex: "listedCompany",
      key: "listedCompany",
      width: 100,
      render: (listedCompany) => <Text>{listedCompany ? "Yes" : "No"}</Text>,
    },
    {
      title: "Annual Revenue",
      dataIndex: "annualRevenue",
      key: "annualRevenue",
      width: 150,
      render: (annualRevenue) => (
        <Text>${parseFloat(annualRevenue).toLocaleString() || "N/A"}</Text>
      ),
    },
    {
      title: "Life Time Value",
      dataIndex: "lifeTimeValue",
      key: "lifeTimeValue",
      width: 150,
      render: (lifeTimeValue) => (
        <Text>${parseFloat(lifeTimeValue).toLocaleString() || "N/A"}</Text>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 150,
      render: (priority) => <Text>{priority || "N/A"}</Text>,
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      width: 150,
      render: (entryDate) =>
        new Date(entryDate).toLocaleDateString("en-US") || "N/A",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions
          showUrl={`/client/client-details/${record._id}`}
          deleteUrl={`/client/delete-client/${record._id}`}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={clients}
      columns={columns}
      rowKey={(record) => record._id}
      bordered
      scroll={{ x: 1500 }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ClientList;
