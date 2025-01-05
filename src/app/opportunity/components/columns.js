import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

export const getColumns = ({ selectedCurrency }) => {
  const columns = [
    {
      title: "Custom ID",
      dataIndex: "customId",
      key: "customId",
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      sorter: (a, b) => {},
      sortDirections: ["ascend", "descend"],
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
      title: "Entered By",
      dataIndex: "enteredBy",
      key: "enteredBy",
      render: (enteredBy) =>
        enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
    },
    {
      title: "In Partnership",
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
      render: (tender) => (tender ? `${tender.customId}` : "N/A"),
    },
    {
      title: "Solution",
      dataIndex: ["solution", "label"],
      key: "solution",
      render: (text) => text || "N/A",
    },
    {
      title: "Sub Solution",
      dataIndex: ["subSolution", "label"],
      key: "subSolution",
      render: (text) => text || "N/A",
    },
    {
      title: "Sales Champ",
      dataIndex: "salesChamp",
      key: "salesChamp",
      render: (salesChamp) =>
        salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A",
    },
    {
      title: "Sales Stage",
      dataIndex: ["salesStage", "label"],
      key: "salesStage",
      render: (text) => text || "N/A",
    },
    {
      title: "Sales Sub Stage",
      dataIndex: ["salesSubStage", "label"],
      key: "salesSubStage",
      render: (text) => text || "N/A",
    },
    {
      title: "Stage Clarification",
      dataIndex: "stageClarification",
      key: "stageClarification",
    },
    {
      title: `Sales Top Line (${selectedCurrency?.key})`,
      dataIndex: "salesTopLine",
      key: "salesTopLine",
      render: (value) =>
        value || value == 0
          ? convertCurrency(value, selectedCurrency?.value)
          : "N/A",
    },
    {
      title: `Offsets (${selectedCurrency?.key})`,
      dataIndex: "offsets",
      key: "offsets",
      render: (value) =>
        value || value == 0
          ? convertCurrency(value, selectedCurrency?.value)
          : "N/A",
    },
    {
      title: `Total Revenue (${selectedCurrency?.key})`,
      dataIndex: "totalRevenue",
      key: "revenue",
      render: (value) =>
        value || value == 0
          ? convertCurrency(value, selectedCurrency?.value)
          : "N/A",
    },
    {
      title: "Confidence Level",
      dataIndex: "confidenceLevel",
      key: "confidenceLevel",
      render: (text) => `${text} % `,
    },
    {
      title: `Expected Sales (${selectedCurrency?.key})`,
      dataIndex: "expectedSales",
      key: "expectedSales",
      render: (value) =>
        value || value == 0
          ? convertCurrency(value, selectedCurrency?.value)
          : "N/A",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",

      render: (_, record) => (
        <TableActions
          showUrl={`/opportunity/opportunity-details/${record._id}`}
        />
      ),
    },
  ];
  return columns;
};
