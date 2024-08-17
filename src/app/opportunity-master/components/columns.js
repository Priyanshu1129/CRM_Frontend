import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
export const columns = [
  {
    title: "Custom ID",
    dataIndex: "customId",
    key: "customId",
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
    title: "Client",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Partnered With",
    dataIndex: "partneredWith",
    key: "partneredWith",
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "Associated Tender",
    dataIndex: "associatedTender",
    key: "associatedTender",
  },
  {
    title: "Solution",
    dataIndex: "solution",
    key: "solution",
  },
  {
    title: "Sub Solution",
    dataIndex: "subSolution",
    key: "subSolution",
  },
  {
    title: "Sales Champion",
    dataIndex: "salesChamp",
    key: "salesChamp",
  },
  {
    title: "Sales Stage",
    dataIndex: "salesStage",
    key: "salesStage",
  },
  {
    title: "Sales Sub Stage",
    dataIndex: "salesSubStage",
    key: "salesSubStage",
  },
  {
    title: "Stage Clarification",
    dataIndex: "stageClarification",
    key: "stageClarification",
  },
  {
    title: "Sales Top Line",
    dataIndex: "salesTopLine",
    key: "salesTopLine",
  },
  {
    title: "Offsets",
    dataIndex: "offsets",
    key: "offsets",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
  },
  {
    title: "Confidence Level",
    dataIndex: "confidenceLevel",
    key: "confidenceLevel",
    render: (text) => `${text}%`,
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