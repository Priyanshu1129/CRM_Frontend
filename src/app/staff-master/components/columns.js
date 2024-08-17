import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns = [
    {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (text) => {
            switch (text) {
                case "M":
                    return "Male";
                case "F":
                    return "Female";
                case "O":
                    return "Other";
                default:
                    return text;
            }
        },
    },
    {
        title: "Date of Birth",
        dataIndex: "DOB",
        key: "DOB",
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Teams",
        dataIndex: "teams",
        key: "teams",
        render: (teams) => teams.map((team) => team.name).join(", "),
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
