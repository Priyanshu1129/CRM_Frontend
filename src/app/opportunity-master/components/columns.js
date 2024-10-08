import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

export const getColumns = ({ selectedCurrency }) => {

  const columns = [
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
      width: 120,
      sorter: (a, b) => { },
      sortDirections: ['ascend', 'descend'],
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
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      width: 150,
    },
    {
      title: "In Partnership",
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
      title: "Sales Champ",
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
      title: `Sales Top Line (${selectedCurrency?.key})`,
      dataIndex: "salesTopLine",
      key: "salesTopLine",
      width: 150,
      render: (value) => value || value == 0 ? convertCurrency(value, selectedCurrency?.value) : 'N/A',
    },
    {
      title: `Offsets (${selectedCurrency?.key})`,
      dataIndex: "offsets",
      key: "offsets",
      width: 120,
      render: (value) => value || value == 0 ? convertCurrency(value, selectedCurrency?.value) : 'N/A',
    },
    {
      title: `Total Revenue (${selectedCurrency?.key})`,
      dataIndex: "totalRevenue",
      key: "revenue",
      width: 120,
      render: (value) => value || value == 0 ? convertCurrency(value, selectedCurrency?.value) : 'N/A',
    },
    {
      title: "Confidence Level",
      dataIndex: "confidenceLevel",
      key: "confidenceLevel",
      render: (text) => `${text} % `,
      width: 150,
    },
    {
      title: `Expected Sales (${selectedCurrency?.key})`,
      dataIndex: "expectedSales",
      key: "expectedSales",
      width: 150,
      render: (value) => value || value == 0 ? convertCurrency(value, selectedCurrency?.value) : 'N/A',
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions showUrl={`/opportunity-master/opportunity-details/${record._id}`} />
      ),
    },
  ];
  return columns;
}