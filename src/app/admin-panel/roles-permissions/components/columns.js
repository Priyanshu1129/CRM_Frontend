import { EditOutlined } from "@ant-design/icons";
import { TableActions } from "@/components";
import { Button } from "antd";

export const columns = [
    {
        title: "Role",
        dataIndex: "name",
        key: "role",
        width: 150,
        render: (text) => text || "N/A",
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        // render: (text) => text || "N/A",
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Last Edit",
        dataIndex: "updatedAt",
        key: "last-edit",
        width: 150,
        // render: (text) => text || "N/A",
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        // render: (_, record) => (<Button icon={<EditOutlined />} />),
        render: (_, record) => (
            <TableActions showUrl={`/admin-panel/roles-permissions/role-details/${record._id}`} />
        ),

    },
];
