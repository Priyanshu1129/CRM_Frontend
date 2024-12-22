import React from "react";
import { Table } from "antd";
import "../tableStyles.css"; // Import the custom CSS for styling

const processApiData = (data) => {
  const result = [];

  data.forEach((item, index) => {
    const { firstName, lastName, entryDetails } = item;

    const rows = [
      {
        key: `${item._id}-currentQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "4th Quarter",
        ...entryDetails.currentQuarter,
      },
      {
        key: `${item._id}-lastQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "3rd Quarter",
        ...entryDetails.lastQuarter,
      },
      {
        key: `${item._id}-last3rdQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "2nd Quarter",
        ...entryDetails.last3rdQuarter,
      },
      {
        key: `${item._id}-last4thQuarter`,
        name: `${firstName} ${lastName}`,
        quarter: "1st Quarter",
        ...entryDetails.last4thQuarter,
      },
      {
        key: `${item._id}-lastYear`,
        name: `${firstName} ${lastName}`,
        quarter: "Last Year",
        ...entryDetails.lastYear,
      },
    ];

    rows.forEach((row, rowIndex) => {
      if (rowIndex === 0) {
        row.rowSpan = 5;
      } else {
        row.rowSpan = 0;
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
    width: 130,
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (row.rowSpan) {
        obj.props.rowSpan = row.rowSpan;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    title: "Quarter",
    dataIndex: "quarter",
    key: "quarter",
    fixed: "left",
    width: 120,
  },
  {
    title: "Entries", // Parent column
    children: [
      {
        title: "Client",
        dataIndex: "clientEntries",
        key: "clientEntries",
        width: 100,
      },
      {
        title: "Contact",
        dataIndex: "contactEntries",
        key: "contactEntries",
        width: 100,
      },
      {
        title: "Registration",
        dataIndex: "registrationEntries",
        key: "registrationEntries",
        width: 120,
      },
      {
        title: "Tender",
        dataIndex: "tenderEntries",
        key: "tenderEntries",
        width: 100,
      },
      {
        title: "Mention",
        dataIndex: "mentionEntries",
        key: "mentionEntries",
        width: 100,
      },
      {
        title: "Lead",
        dataIndex: "leadEntries",
        key: "leadEntries",
        width: 100,
      },
      {
        title: "Prospect",
        dataIndex: "prospectEntries",
        key: "prospectEntries",
        width: 120,
      },
      {
        title: "Qualification",
        dataIndex: "qualificationEntries",
        key: "qualificationEntries",
        width: 120,
      },
      {
        title: "Follow-up",
        dataIndex: "followUpEntries",
        key: "followUpEntries",
        width: 100,
      },
      {
        title: "Proposal",
        dataIndex: "proposalEntries",
        key: "proposalEntries",
        width: 100,
      },
      {
        title: "Closing",
        dataIndex: "closingEntries",
        key: "closingEntries",
        width: 100,
      },
      {
        title: "Won",
        dataIndex: "wonEntries",
        key: "wonEntries",
        // fixed: "right",
        width: 100,
      },
    ],
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
      scroll={{ x: "max-content", y: 400 }}
      className="custom-table"
    />
  );
};
