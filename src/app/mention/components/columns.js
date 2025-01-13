import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

const calculateDynamicWidth = (title, dataIndex, data) => {
  // Calculate the maximum value length in the column
  const maxValueLength = data?.reduce((max, record) => {
    const value = Array.isArray(dataIndex)
      ? dataIndex.reduce((obj, key) => (obj ? obj[key] : ""), record)
      : record[dataIndex];

    // Calculate the length of the value or fallback to 0 for null/undefined
    const length = value ? value.toString().length : 0;
    return Math.max(max, length);
  }, 0);

  // Compare with the title length
  const titleLength = title.length;
  const maxLength = Math.max(maxValueLength, titleLength) ?? 100;

  // Set a base width factor (e.g., 10px per character)
  const widthFactor = 10;
  return maxLength * widthFactor;
};

export const getColumns = ({ selectedCurrency, data }) => {
  const columns = [
    {
      title: "S No.",
      key: "serialNumber",
      width: 80, // Fixed width for serial number
      render: (_, __, rowIndex) => rowIndex + 1, // Dynamically calculate serial number
    },
    {
      title: "Client Name",
      dataIndex: ["client", "name"],
      key: "clientName",
      width: calculateDynamicWidth("Client Name", ["client", "name"], data),
      render: (name) => name || "N/A",
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      width: 150,
      sorter: (a, b) => {},
      sortDirections: ["ascend", "descend"],
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
      title: "Entered By",
      dataIndex: "enteredBy",
      key: "enteredBy",
      width: calculateDynamicWidth("Entered By", "enteredBy", data),
      render: (enteredBy) =>
        enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
    },
    {
      title: "Contact Name",
      dataIndex: "contact",
      key: "contactName",
      width: calculateDynamicWidth("Contact Name", "contact", data),
      render: (contact) =>
        contact ? `${contact.firstName} ${contact.lastName}` : "N/A",
    },
    {
      title: "Connection Source",
      dataIndex: "connectionSource",
      key: "connectionSource",
      width: calculateDynamicWidth(
        "Connection Source",
        "connectionSource",
        data
      ),
      render: (connectionSource) => connectionSource || "N/A",
    },
    {
      title: "Potential Project",
      dataIndex: "potentialProject",
      key: "potentialProject",
      width: calculateDynamicWidth(
        "Potential Project",
        "potentialProject",
        data
      ),
      render: (potentialProject) => potentialProject || "N/A",
    },
    {
      title: "Solution",
      dataIndex: ["solution", "label"],
      key: "solution",
      width: calculateDynamicWidth("Solution", ["solution", "label"], data),
      render: (solution) => solution || "N/A",
    },
    {
      title: "Industry",
      dataIndex: ["industry", "label"],
      key: "industry",
      width: calculateDynamicWidth("Industry", ["industry", "label"], data),
      render: (industry) => industry || "N/A",
    },
    {
      title: "Territory",
      dataIndex: ["territory", "label"],
      key: "territory",
      width: calculateDynamicWidth("Territory", ["territory", "label"], data),
      render: (territory) => territory || "N/A",
    },
    {
      title: "Sales Champ",
      dataIndex: "salesChamp",
      key: "salesChamp",
      width: calculateDynamicWidth("Sales Champ", "salesChamp", data),
      render: (salesChamp) =>
        salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A",
    },
    {
      title: `Potential Top Line (${selectedCurrency?.key})`,
      dataIndex: "potentialTopLine",
      key: "potentialTopLine",
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      width: calculateDynamicWidth(
        `Potential Top Line (${selectedCurrency?.key})`,
        "potentialTopLine",
        data
      ),
    },
    {
      title: `Potential Offset (${selectedCurrency?.key})`,
      dataIndex: "potentialOffset",
      key: "potentialOffset",
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      width: calculateDynamicWidth(
        `Potential Offset (${selectedCurrency?.key})`,
        "potentialOffset",
        data
      ),
    },
    {
      title: `Potential Revenue (${selectedCurrency?.key})`,
      dataIndex: "potentialRevenue",
      key: "potentialRevenue",
      width: calculateDynamicWidth(
        `Potential Revenue (${selectedCurrency?.key})`,
        "potentialRevenue",
        data
      ),
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions showUrl={`/mention/mention-details/${record._id}`} />
      ),
    },
  ];
  return columns;
};
