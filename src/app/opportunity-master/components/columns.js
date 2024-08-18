import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Custom ID",
    dataIndex: "customId",
    key: "customId",
    width: 150,
  },
  {
    title: "Entry Date",
    dataIndex: "entryDate",
    key: "entryDate",
    render: (text) => new Date(text).toLocaleDateString(),
    width: 120,
  },
  {
    title: "Entered By",
    dataIndex: "enteredBy",
    key: "enteredBy",
    width: 120,
    render: (enteredBy) => enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
  },
  {
    title: "Partnered With",
    dataIndex: "partneredWith",
    key: "partneredWith",
    width: 150,
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
    width: 200,
  },
  {
    title: "Associated Tender",
    dataIndex: "associatedTender",
    key: "associatedTender",
    width: 150,
    render: (tender) => tender ? `${tender.customId}` : "N/A",
  },
  {
    title: "Solution",
    dataIndex: ["solution", "label"],
    key: "solution",
    width: 150,
    render: (text) => text || 'N/A',
  },
  {
    title: "Sub Solution",
    dataIndex: ["subSolution", "label"],
    key: "subSolution",
    width: 150,
    render: (text) => text || 'N/A',
  },
  {
    title: "Sales Champion",
    dataIndex: "salesChamp",
    key: "salesChamp",
    width: 150,
    render: (salesChamp) => salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A",
  },
  {
    title: "Sales Stage",
    dataIndex: ["salesStage", "label"],
    key: "salesStage",
    width: 120,
    render: (text) => text || 'N/A',
  },
  {
    title: "Sales Sub Stage",
    dataIndex: ["salesSubStage", "label"],
    key: "salesSubStage",
    width: 120,
    render: (text) => text || 'N/A',
  },
  {
    title: "Stage Clarification",
    dataIndex: "stageClarification",
    key: "stageClarification",
    width: 200,
  },
  {
    title: "Sales Top Line",
    dataIndex: "salesTopLine",
    key: "salesTopLine",
    width: 150,
    render: (text) => text || 'N/A',
  },
  {
    title: "Offsets",
    dataIndex: "offsets",
    key: "offsets",
    width: 120,
    render: (text) => text || 'N/A',
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    width: 120,
    render: (text) => text.length > 0 ? text.join(", ") : 'N/A',
  },
  {
    title: "Confidence Level",
    dataIndex: "confidenceLevel",
    key: "confidenceLevel",
    render: (text) => `${text}%`,
    width: 150,
  },
  {
    title: "Expected Sales",
    dataIndex: "expectedSales",
    key: "expectedSales",
    width: 150,
    render: (text) => text.toString() || 'N/A',
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