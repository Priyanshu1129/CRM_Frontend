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
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Connection Source",
    dataIndex: "connectionSource",
    key: "connectionSource",
  },
  {
    title: "Potential Project",
    dataIndex: "potentialProject",
    key: "potentialProject",
  },
  {
    title: "Solution",
    dataIndex: "solution",
    key: "solution",
  },
  {
    title: "Sub-Solution",
    dataIndex: "subSolution",
    key: "subSolution",
  },
  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
  },
  {
    title: "Territory",
    dataIndex: "territory",
    key: "territory",
  },
  {
    title: "Sales Champ",
    dataIndex: "salesChamp",
    key: "salesChamp",
  },
  {
    title: "Potential Top Line",
    dataIndex: "potentialTopLine",
    key: "potentialTopLine",
    render: (text) => text?.toLocaleString() || "N/A", // Format as a number
  },
  {
    title: "Potential Offset",
    dataIndex: "potentialOffset",
    key: "potentialOffset",
    render: (text) => text?.toLocaleString() || "N/A", // Format as a number
  },
  {
    title: "Notes",
    dataIndex: "Notes",
    key: "Notes",
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


