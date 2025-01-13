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
    // {
    //   title: "Custom ID",
    //   dataIndex: "customId",
    //   key: "customId",
    //   render: (text) => text || "N/A",
    //   width: 150,
    // },
    {
      title: "RFP Date",
      dataIndex: "rfpDate",
      key: "rfpDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: 150,
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
      title: "Submission Due Date",
      dataIndex: "submissionDueDate",
      key: "submissionDueDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: 150,
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      render: (clientName) => clientName || "N/A",
      width: 200,
      width: calculateDynamicWidth("Client", ["client", "name"], data),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Reference", "reference", data),
    },
    {
      title: "RFP Title",
      dataIndex: "rfpTitle",
      key: "rfpTitle",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("RFP Title", "rfpTitle", data),
    },
    {
      title: "RFP Source",
      dataIndex: "rfpSource",
      key: "rfpSource",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("RFP Source", "rfpSource", data),
    },
    {
      title: "Associated Opportunity",
      dataIndex: ["associatedOpportunity", "customId"],
      key: "associatedOpportunity",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth(
        "Associated Opportunity",
        ["associatedOpportunity", "customId"],
        data
      ),
    },
    {
      title: "Bond",
      dataIndex: "bond",
      key: "bond",
      render: (text) => (text ? "Yes" : "No"),
      width: calculateDynamicWidth("Bond", "bond", data),
    },
    {
      title: `Bond Value (${selectedCurrency?.key})`,
      dataIndex: "bondValue",
      render: (value) =>
        value || value == 0
          ? convertCurrency({
              value,
              selectedCurrency: selectedCurrency?.value,
            })
          : "N/A",
      key: "bondValue",
      width: calculateDynamicWidth(
        `Bond Value (${selectedCurrency?.key})`,
        "bondValue",
        data
      ),
    },
    {
      title: "Bond Issue Date",
      dataIndex: "bondIssueDate",
      key: "bondIssueDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: 150,
    },
    {
      title: "Bond Expiry",
      dataIndex: "bondExpiry",
      key: "bondExpiry",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: 150,
    },
    {
      title: "Submission Mode",
      dataIndex: "submissionMode",
      key: "submissionMode",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Submission Mode", "submissionMode", data),
    },
    {
      title: "Evaluation Date",
      dataIndex: "evaluationDate",
      key: "evaluationDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: 150,
    },
    {
      title: "Officer",
      dataIndex: "officer",
      key: "officer",
      render: (officer) =>
        officer
          ? `${officer.firstName || "N/A"} ${officer.lastName || "N/A"}`
          : "N/A",
      width: calculateDynamicWidth("Officer", "officer", data),
    },
    {
      title: "Bid Manager",
      dataIndex: "bidManager",
      key: "bidManager",
      render: (manager) =>
        manager
          ? `${manager.firstName || "N/A"} ${manager.lastName || "N/A"}`
          : "N/A",
      width: calculateDynamicWidth("Bid Manager", "bidManager", data),
    },
    {
      title: "Stage",
      dataIndex: ["stage", "label"],
      key: "stage",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Stage", ["stage", "label"], data),
    },
    {
      title: "Stage Explanation",
      dataIndex: "stageExplanation",
      key: "stageExplanation",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth(
        "Stage Explanation",
        "stageExplanation",
        data
      ),
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <TableActions showUrl={`/tender/tender-details/${record._id}`} />
      ),
    },
  ];
  return columns;
};
