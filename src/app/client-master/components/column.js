import { TableActions, CustomAvatar, Text } from "@/components";
import { SearchOutlined } from "@ant-design/icons";
import { Space } from "antd";
import TableSearch from "@/components/table-search";


export const columns = [
    {
        title: <div style={{ paddingLeft: "24px" }}>Name</div>,
        key: "name",
        width: 200,
        // filterDropdown: <TableSearch />,
        // filterIcon: filtered => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        // onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        render: (_, record) => (
            <Space>
                <CustomAvatar src={record.avatar} />
                <Text>{record.name}</Text>
            </Space>
        ),
    },
    {
        title: "Client Code",
        dataIndex: "clientCode",
        key: "clientCode",
        width: 150,
        render: (clientCode) => clientCode || "N/A",
    },
    {
        title: "Entry Date",
        dataIndex: "entryDate",
        key: "entryDate",
        width: 120,
        // sorter: (a, b) => new Date(a.entryDate) - new Date(b.entryDate),
        // sortDirections: ['ascend', 'descend'],
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
        width: 200,
        render: (enteredBy) => enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
    },
    {
        title: "Industry",
        dataIndex: ["industry", "label"],
        key: "industry",
        width: 200,
        render: (industry) => industry || "N/A",
    },
    {
        title: "Sub-Industry",
        dataIndex: ["subIndustry", "label"],
        key: "subIndustry",
        width: 200,
        render: (subIndustry) => subIndustry || "N/A",
    },
    {
        title: "Offering",
        dataIndex: "offering",
        key: "offering",
        width: 150,
        render: (offering) => offering || "N/A",
    },
    {
        title: "Incorporation",
        dataIndex: ["incorporationType", "label"],
        key: "classification",
        width: 200,
        render: (classification) => classification || "N/A",
    },
    {
        title: "Territory",
        dataIndex: ["territory", "label"],
        key: "territory",
        width: 200,
        render: (territory) => territory || "N/A",
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
        width: 150,
        render: (marketCap) => marketCap || "N/A",
    },
    {
        title: "Annual Revenue",
        dataIndex: "annualRevenue",
        key: "annualRevenue",
        width: 150,
        render: (revenue) => revenue ? `$${revenue.toLocaleString()}` : "N/A",
    },
    {
        title: "Employee Strength",
        dataIndex: "totalEmployeeStrength",
        key: "totalEmployeeStrength",
        width: 200,
        render: (total) => total ? `${total.toLocaleString()}` : "N/A",
    },
    {
        title: "IT Employee Strength",
        dataIndex: "itEmployeeStrength",
        key: "itEmployeeStrength",
        width: 200,
        render: (itTotal) => itTotal ? `${itTotal.toLocaleString()}` : "N/A",
    },
    {
        title: "Classification",
        dataIndex: ["classification", "label"],
        key: "classification",
        width: 200,
        render: (classification) => classification || "N/A",
    },
    {
        title: "Primary Relationship",
        dataIndex: "primaryRelationship",
        key: "primaryRelationship",
        width: 200,
        render: (member) => member ? `${member.firstName} ${member.lastName}` : "N/A",
    },
    {
        title: "Secondary Relationship",
        dataIndex: "secondaryRelationship",
        key: "secondaryRelationship",
        width: 200,
        render: (member) => member ? `${member.firstName} ${member.lastName}` : "N/A",
    },
    {
        title: "Relationship Status",
        dataIndex: ["relationshipStatus", "label"],
        key: "relationshipStatus",
        width: 200,
        render: (status) => status || "N/A",
    },
    {
        title: "LifeTime Value",
        dataIndex: "lifeTimeValue",
        key: "lifeTimeValue",
        width: 150,
        render: (value) => value ? `$${value.toLocaleString()}` : "N/A",
    },
    {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        width: 150,
        render: (priority) => priority || "N/A",
    },
    {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (_, record) => (
            <TableActions showUrl={`/client-master/client-details/${record._id}`} />
        ),
    },
];
