import React from "react";
import { Table } from "antd";

const processApiData = (data) => {
  // Transform the API data into a format that works with the table
  const result = [];

  data.forEach((item, index) => {
    const { firstName, lastName, entryDetails } = item;

    // Map each quarter to a row
    const rows = [
      {
        key: `${item._id}-currentQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "Current Quarter",
        ...entryDetails.currentQuarter,
      },
      {
        key: `${item._id}-lastQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "Last Quarter",
        ...entryDetails.lastQuarter,
      },
      {
        key: `${item._id}-last3rdQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "Last 3rd Quarter",
        ...entryDetails.last3rdQuarter,
      },
      {
        key: `${item._id}-last4thQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "Last 4th Quarter",
        ...entryDetails.last4thQuarter,
      },
      {
        key: `${item._id}-lastYear`,
        name: `${firstName} ${lastName}`,
        quarter: "Last Year",
        ...entryDetails.lastYear,
      },
    ];

    // Add rowSpan only for the first entry of each "Sales Champ"
    rows.forEach((row, rowIndex) => {
      if (rowIndex === 0) {
        row.rowSpan = 5; // Spanning across all 5 quarters
      } else {
        row.rowSpan = 0; // Don't display repeated cells
      }
    });

    result.push(...rows);
  });

  return result;
};

const columns = [
  {
    title: "Sales Champ",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    width: 150,
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (row.rowSpan) {
        obj.props.rowSpan = row.rowSpan; // Merge rows
      } else {
        obj.props.rowSpan = 0; // Skip repeated cells
      }
      return obj;
    },
  },
  {
    title: "Quarter",
    dataIndex: "quarter",
    key: "quarter",
    width: 150,
  },
  {
    title: "Client Entries",
    dataIndex: "clientEntries",
    key: "clientEntries",
    width: 100,
  },
  {
    title: "Contact Entries",
    dataIndex: "contactEntries",
    key: "contactEntries",
    width: 100,
  },
  {
    title: "Registration Entries",
    dataIndex: "registrationEntries",
    key: "registrationEntries",
    width: 150,
  },
  {
    title: "Tender Entries",
    dataIndex: "tenderEntries",
    key: "tenderEntries",
    width: 150,
  },
  {
    title: "Mention Entries",
    dataIndex: "mentionEntries",
    key: "mentionEntries",
    width: 150,
  },
  {
    title: "Lead Entries",
    dataIndex: "leadEntries",
    key: "leadEntries",
    width: 100,
  },
  {
    title: "Prospect Entries",
    dataIndex: "prospectEntries",
    key: "prospectEntries",
    width: 150,
  },
  {
    title: "Qualification Entries",
    dataIndex: "qualificationEntries",
    key: "qualificationEntries",
    width: 150,
  },
  {
    title: "Follow-up Entries",
    dataIndex: "followUpEntries",
    key: "followUpEntries",
    width: 150,
  },
  {
    title: "Proposal Entries",
    dataIndex: "proposalEntries",
    key: "proposalEntries",
    width: 150,
  },
  {
    title: "Closing Entries",
    dataIndex: "closingEntries",
    key: "closingEntries",
    width: 150,
  },
  {
    title: "Won Entries",
    dataIndex: "wonEntries",
    key: "wonEntries",
    width: 150,
  },
];

export const Board = ({ data }) => {
  const processedData = processApiData(data);

  return (
    <Table
      columns={columns}
      dataSource={processedData}
      bordered
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};

// Example usage
const data = [
  {
    _id: "670e85355a74d28e495aaf4e",
    firstName: "Ashwin",
    lastName: "Gorle",
    entryDetails: {
      currentQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      lastQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 1,
        prospectEntries: 5,
        qualificationEntries: 10,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      last3rdQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 11,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 25,
        wonEntries: 2,
      },
      last4thQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      lastYear: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
    },
  },
];

export const App = () => <Board data={data} />;
