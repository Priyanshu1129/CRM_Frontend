import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns = [
    {
        title: "Client",
        dataIndex: "client",
        key: "client",
    },
    {
        title: "Entry Date",
        dataIndex: "entryDate",
        key: "entryDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
    },
    {
        title: "Registration Champ",
        dataIndex: "registrationChamp",
        key: "registrationChamp",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Website Username",
        dataIndex: ["websiteDetails", "username"],
        key: "websiteUsername",
    },
    {
        title: "Website Password",
        dataIndex: ["websiteDetails", "password"],
        key: "websitePassword",
        render: () => "••••••", // Masking the password for security
    },
    {
        title: "Other Details",
        dataIndex: "otherDetails",
        key: "otherDetails",
    },
    {
        title: "Registration Date",
        dataIndex: "registrationDate",
        key: "registrationDate",
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Expiry Date",
        dataIndex: "expiryDate",
        key: "expiryDate",
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Primary Contact",
        dataIndex: "primaryContact",
        key: "primaryContact",
    },
    {
        title: "Submitted Documents",
        dataIndex: "submittedDocuments",
        key: "submittedDocuments",
    },
    {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        render: (notes) => notes.join(", "),
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

