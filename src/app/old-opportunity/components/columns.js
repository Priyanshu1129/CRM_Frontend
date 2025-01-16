import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

const calculateDynamicWidth = (title, dataIndex, data) => {
  const titleLength = title.length;

  // Find the max length of values in the column
  const maxValueLength = data?.reduce((maxLength, row) => {
    const value = dataIndex.includes(".")
      ? dataIndex.split(".").reduce((obj, key) => obj?.[key], row)
      : row[dataIndex];
    const valueString = value != null ? String(value) : ""; // Convert value to string
    return Math.max(maxLength, valueString.length);
  }, 0);

  // Get the maximum length
  const maxLength = Math.max(titleLength, maxValueLength) ?? 100;

  // Assume 10px per character as a rough width estimate
  return maxLength * 10 + 20; // Add some padding for readability
};

export const getColumns = ({ selectedCurrency, data }) => {
  const columns = [
    {
      title: "S No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: calculateDynamicWidth("S No.", "serialNumber", data),
      render: (_, __, rowIndex) => rowIndex + 1, // Dynamically calculate the serial number
    },
    // {
    //   title: "Custom ID",
    //   dataIndex: "customId",
    //   key: "customId",
    // },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      sorter: (a, b) => {},
      sortDirections: ["ascend", "descend"],
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: "150px",
    },
    {
      title: "Entered By",
      dataIndex: "enteredBy",
      key: "enteredBy",
      render: (enteredBy) =>
        enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
      width: calculateDynamicWidth("Entered By", "enteredBy", data),
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      width: calculateDynamicWidth("Client", "client.name", data),
    },
    {
      title: "In Partnership",
      dataIndex: "partneredWith",
      key: "partneredWith",
      width: calculateDynamicWidth("In Partnership", "partneredWith", data),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: calculateDynamicWidth("Project Name", "projectName", data),
    },
    {
      title: "Associated Tender",
      dataIndex: "associatedTender",
      key: "associatedTender",
      render: (tender) => (tender ? `${tender.customId}` : "N/A"),
      width: calculateDynamicWidth(
        "Associated Tender",
        "associatedTender",
        data
      ),
    },
    {
      title: "Solution",
      dataIndex: ["solution", "label"],
      key: "solution",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Solution", "solution.label", data),
    },
    {
      title: "Sub Solution",
      dataIndex: ["subSolution", "label"],
      key: "subSolution",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Sub Solution", "subSolution.label", data),
    },
    {
      title: "Sales Champ",
      dataIndex: "salesChamp",
      key: "salesChamp",
      render: (salesChamp) =>
        salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A",
      width: calculateDynamicWidth("Sales Champ", "salesChamp", data),
    },
    {
      title: "Sales Stage",
      dataIndex: ["salesStage", "label"],
      key: "salesStage",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Sales Stage", "salesStage.label", data),
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
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      width: calculateDynamicWidth(
        `Sales Top Line (${selectedCurrency?.key})`,
        "salesTopLine",
        data
      ),
    },
    {
      title: `Offsets (${selectedCurrency?.key})`,
      dataIndex: "offsets",
      key: "offsets",
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      width: calculateDynamicWidth(
        `Offsets (${selectedCurrency?.key})`,
        "offsets",
        data
      ),
    },
    {
      title: `Total Revenue (${selectedCurrency?.key})`,
      dataIndex: "totalRevenue",
      key: "revenue",
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      width: calculateDynamicWidth(
        `Total Revenue (${selectedCurrency?.key})`,
        "totalRevenue",
        data
      ),
    },
    {
      title: "Confidence Level",
      dataIndex: "confidenceLevel",
      key: "confidenceLevel",
      render: (text) => `${text} % `,
      width: calculateDynamicWidth(`Confidence Level`, "confidenceLevel", data),
    },
    {
      title: `Expected Sales (${selectedCurrency?.key})`,
      dataIndex: "expectedSales",
      key: "expectedSales",
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      width: calculateDynamicWidth(
        `Expected Sales (${selectedCurrency?.key})`,
        "expectedSales",
        data
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",

      render: (_, record) => (
        <TableActions
          showUrl={`/opportunity/opportunity-details/${record._id}`}
          deleteUrl={`/opportunity/delete-opportunity/${record._id}`}
        />
      ),
    },
  ];
  return columns;
};
