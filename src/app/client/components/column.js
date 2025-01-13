import { TableActions, CustomAvatar, Text } from "@/components";
import { Space } from "antd";
import { convertCurrency } from "@/utilities/convertCurrency";

const calculateDynamicWidth = (title, dataIndex, data) => {
  // Calculate the maximum value length in the column
  const maxValueLength = data?.reduce((max, record) => {
    const value = Array.isArray(dataIndex)
      ? dataIndex.reduce((obj, key) => (obj ? obj[key] : ""), record)
      : record[dataIndex];

    // Calculate the length of the value or fallback to 0 for null/undefined
    const length = value ? value.toString().length : 0;
    return Math.max(max, length);
  }, 0);

  // Compare with the title length
  const titleLength = title.length;
  const maxLength = Math.max(maxValueLength, titleLength) ?? 100;

  // Set a base width factor (e.g., 10px per character)
  const widthFactor = 10;
  return maxLength * widthFactor;
};

export const getColumns = ({ selectedCurrency, data }) => {
  const columns = [
    {
      title: <div style={{ paddingLeft: "24px" }}>Name</div>,
      dataIndex: "name",
      key: "name",
      sorter: true,
      sorter: (a, b) => {},
      sortDirections: ["ascend", "descend"],
      render: (_, record) => (
        <Space>
          <CustomAvatar src={record.avatar} />
          <Text>{record.name}</Text>
        </Space>
      ),
      width: calculateDynamicWidth("Name", "name", data),
    },
    {
      title: "Client Code",
      dataIndex: "clientCode",
      key: "clientCode",
      width: calculateDynamicWidth("Client Code", "clientCode", data),
      render: (clientCode) => clientCode || "N/A",
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      width: 150,
      sorter: (a, b) => {},
      sortDirections: ["ascend", "descend"],
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
      title: "Entered By",
      dataIndex: "enteredBy",
      key: "enteredBy",
      width: calculateDynamicWidth("Entered By", "enteredBy", data),
      render: (enteredBy) =>
        enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
    },
    {
      title: "Industry",
      dataIndex: ["industry", "label"],
      key: "industry",
      width: calculateDynamicWidth("Industry", ["industry", "label"], data),
      render: (industry) => industry || "N/A",
    },
    {
      title: "Sub-Industry",
      dataIndex: ["subIndustry", "label"],
      key: "subIndustry",
      width: calculateDynamicWidth(
        "Sub-Industry",
        ["subIndustry", "label"],
        data
      ),
      render: (subIndustry) => subIndustry || "N/A",
    },
    {
      title: "Territory",
      dataIndex: ["territory", "label"],
      key: "territory",
      width: calculateDynamicWidth("Territory", ["territory", "label"], data),
      render: (territory) => territory || "N/A",
    },
    {
      title: "About",
      dataIndex: "offering",
      key: "offering",
      width: calculateDynamicWidth("About", "offering", data),
      render: (offering) => offering || "N/A",
    },
    {
      title: "Incorporation",
      dataIndex: ["incorporationType", "label"],
      key: "classification",
      width: calculateDynamicWidth(
        "Incorporation",
        ["incorporationType", "label"],
        data
      ),
      render: (classification) => classification || "N/A",
    },
    {
      title: "Listed",
      dataIndex: "listedCompany",
      key: "listedCompany",
      width: 100,
      render: (listed) => (listed ? "Yes" : "No"),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (value) => value ?? "N/A",
      width: calculateDynamicWidth("Market Cap", ["marketCap"], data),
    },
    {
      title: `Annual Revenue (${selectedCurrency?.key})`,
      dataIndex: "annualRevenue",
      key: "annualRevenue",
      width: calculateDynamicWidth(
        `Annual Revenue (${selectedCurrency?.key})`,
        ["annualRevenue"],
        data
      ),
      render: (value) =>
        value || value == 0
          ? convertCurrency(value, selectedCurrency?.value)
          : "N/A",
    },
    {
      title: "Employee Strength",
      dataIndex: "totalEmployeeStrength",
      key: "totalEmployeeStrength",
      width: calculateDynamicWidth(
        "Employee Strength",
        "totalEmployeeStrength",
        data
      ),
      render: (total) => (total ? `${total.toLocaleString()}` : "N/A"),
    },
    {
      title: "IT Employee Strength",
      dataIndex: "itEmployeeStrength",
      key: "itEmployeeStrength",
      width: calculateDynamicWidth(
        "IT Employee Strength",
        "itEmployeeStrength",
        data
      ),
      render: (itTotal) => (itTotal ? `${itTotal.toLocaleString()}` : "N/A"),
    },
    {
      title: "Classification",
      dataIndex: ["classification", "label"],
      key: "classification",
      width: calculateDynamicWidth(
        "Classification",
        ["classification", "label"],
        data
      ),
      render: (classification) => classification || "N/A",
    },
    {
      title: "Primary Relationship",
      dataIndex: "primaryRelationship",
      key: "primaryRelationship",
      width: calculateDynamicWidth(
        "Primary Relationship",
        "primaryRelationship",
        data
      ),
      render: (member) =>
        member ? `${member.firstName} ${member.lastName}` : "N/A",
    },
    {
      title: "Secondary Relationship",
      dataIndex: "secondaryRelationship",
      key: "secondaryRelationship",
      width: calculateDynamicWidth(
        "Secondary Relationship",
        "secondaryRelationship",
        data
      ),
      render: (member) =>
        member ? `${member.firstName} ${member.lastName}` : "N/A",
    },
    {
      title: "Relationship Status",
      dataIndex: ["relationshipStatus", "label"],
      key: "relationshipStatus",
      width: calculateDynamicWidth(
        "Relationship Status",
        ["relationshipStatus", "label"],
        data
      ),
      render: (status) => status || "N/A",
    },
    {
      title: `LifeTime Value (${selectedCurrency?.key})`,
      dataIndex: "lifeTimeValue",
      key: "lifeTimeValue",
      width: calculateDynamicWidth(
        `LifeTime Value (${selectedCurrency?.key})`,
        ["lifeTimeValue"],
        data
      ),
      render: (value) =>
        value || value == 0
          ? convertCurrency(value, selectedCurrency?.value)
          : "N/A",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: calculateDynamicWidth("Priority", "priority", data),
      render: (priority) => priority || "N/A",
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
  return columns;
};
