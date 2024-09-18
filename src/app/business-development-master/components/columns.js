import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

export const getColumns = ({ selectedCurrency }) => {

  const columns = [
    {
      title: "Client Name",
      dataIndex: ["client", "name"],
      key: "clientName",
      width: 200, // Adjust width as needed
      render: (name) => name || "N/A",
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
      title: "Contact Name",
      dataIndex: "contact",
      key: "contactName",
      width: 200,
      render: (contact) => contact ? `${contact.firstName} ${contact.lastName}` : "N/A",
    },
    {
      title: "Connection Source",
      dataIndex: "connectionSource",
      key: "connectionSource",
      width: 180,
      render: (connectionSource) => connectionSource || "N/A",
    },
    {
      title: "Potential Project",
      dataIndex: "potentialProject",
      key: "potentialProject",
      width: 150,
      render: (potentialProject) => potentialProject || "N/A",
    },
    {
      title: "Solution",
      dataIndex: ["solution", "label"],
      key: "solution",
      width: 150,
      render: (solution) => solution || "N/A",
    },
    {
      title: "Industry",
      dataIndex: ["industry", "label"],
      key: "industry",
      width: 250,
      render: (industry) => industry || "N/A",
    },
    {
      title: "Territory",
      dataIndex: ["territory", "label"],
      key: "territory",
      width: 200,
      render: (territory) => territory || "N/A",
    },
    {
      title: "Sales Champ",
      dataIndex: "salesChamp",
      key: "salesChamp",
      width: 200,
      render: (salesChamp) => salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A",
    },
    {
      title: "Potential Top Line",
      dataIndex: "potentialTopLine",
      key: "potentialTopLine",
      width: 150,
      // render: (text) => text?.toLocaleString() || "N/A",
      render: (value) => value || value == 0?  convertCurrency(value, selectedCurrency) : 'N/A',
    },
    {
      title: "Potential Offset",
      dataIndex: "potentialOffset",
      key: "potentialOffset",
      width: 150,
      // render: (text) => text?.toLocaleString() || "N/A",
      render: (value) => value || value == 0?  convertCurrency(value, selectedCurrency) : 'N/A',
    },
    {
      title: "Potential Revenue",
      dataIndex: "potentialRevenue",
      key: "potentialRevenue",
      width: 150,
      // render: (text) => text?.toLocaleString() || "N/A",
      render: (value) => value || value == 0?  convertCurrency(value, selectedCurrency) : 'N/A',
    },
    // {
    //   title: "Notes",
    //   dataIndex: "Notes",
    //   key: "notes",
    //   width: 200,
    //   render: (notes) => (notes && notes.length ? notes.join(", ") : "N/A"),
    // },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions showUrl={`/business-development-master/business-development-details/${record._id}`} />
      ),
    },
  ];
  return columns;
}
