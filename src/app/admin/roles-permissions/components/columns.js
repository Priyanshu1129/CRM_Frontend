import { EditOutlined } from "@ant-design/icons";
import { TableActions } from "@/components";
import { Button } from "antd";

export const columns = [
  {
    title: "Role",
    dataIndex: "name",
    key: "role",
    width: 150,
    sorter: (a, b) => (a.name || "").localeCompare(b.name || ""), // Sorting by name
    defaultSortOrder: "ascend", // Default sorting by name in ascending order
    render: (text) => text || "N/A",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // Sorting by createdAt date
    render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
  },
  {
    title: "Last Edit",
    dataIndex: "updatedAt",
    key: "last-edit",
    width: 150,
    sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt), // Sorting by updatedAt date
    render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <TableActions
        showUrl={`/admin/roles-permissions/role-details/${record._id}`}
      />
    ),
  },
];
