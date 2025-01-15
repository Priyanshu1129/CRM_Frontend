import { TableActions, CustomAvatar, Text } from "@/components";
import { Space } from "antd";

const calculateDynamicWidth = (title, dataIndex, data) => {
  const maxValueLength = data?.reduce((max, record) => {
    const value = Array.isArray(dataIndex)
      ? dataIndex.reduce((obj, key) => (obj ? obj[key] : ""), record)
      : record[dataIndex];

    const length = value ? value.toString().length : 0;
    return Math.max(max, length);
  }, 0);

  const titleLength = title.length;
  const maxLength = Math.max(maxValueLength, titleLength) ?? 100;

  const widthFactor = 10; // Base width factor
  return maxLength * widthFactor;
};

export const getColumns = ({ data }) => {
  const columns = [
    {
      title: <div style={{ paddingLeft: "24px" }}>Name</div>,
      // dataIndex: "firstName",
      key: "firstName",
      width: calculateDynamicWidth("Name", "firstName", data),
      sorter: (a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB); // String comparison for alphabetical order
      },
      render: (_, record) => (
        <Space>
          <CustomAvatar src={record.avatar} />
          <Text>{`${record.firstName} ${record.lastName}` || "N/A"}</Text>
        </Space>
      ),
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 120,
      render: (text) => {
        if (!text) return "NA";

        switch (text) {
          case "M":
            return "Male";
          case "F":
            return "Female";
          case "O":
            return "Other";
          default:
            return text;
        }
      },
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      width: calculateDynamicWidth("Job Title", "jobTitle", data),
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Client", ["client", "name"], data),
    },
    {
      title: "Relationship Degree",
      dataIndex: ["relationshipDegree", "label"],
      key: "relationshipDegree",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth(
        "Relationship Degree",
        ["relationshipDegree", "label"],
        data
      ),
    },
    {
      title: "Personal Email",
      dataIndex: "personalEmail",
      key: "personalEmail",
      width: calculateDynamicWidth("Personal Email", "personalEmail", data),
    },
    {
      title: "Work Email",
      dataIndex: "workEmail",
      key: "workEmail",
      width: calculateDynamicWidth("Work Email", "workEmail", data),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: calculateDynamicWidth("Phone", "phone", data),
      render: (_, record) => (
        <Space>
          <Text>{`${record?.phoneCountryCode} ${record?.phone}` || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Mobile Phone",
      dataIndex: "mobilePhone",
      key: "mobilePhone",
      width: calculateDynamicWidth("Mobile Phone", "mobilePhone", data),
      render: (_, record) => (
        <Space>
          <Text>
            {`${record?.mobileCountryCode} ${record?.mobilePhone}` || "N/A"}
          </Text>
        </Space>
      ),
    },
    {
      title: "Territory",
      dataIndex: ["territory", "label"],
      key: "territory",
      width: calculateDynamicWidth("Territory", ["territory", "label"], data),
      render: (territory) => territory || "N/A",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: calculateDynamicWidth("Country", "country", data),
      render: (territory) => territory || "N/A",
    },
    {
      title: "Arche Type",
      dataIndex: ["archeType", "label"],
      key: "archeType",
      render: (text) => text || "N/A",
      width: calculateDynamicWidth("Arche Type", ["archeType", "label"], data),
    },
    // {
    //     title: "Details Confirmation",
    //     dataIndex: "detailsConfirmation",
    //     key: "detailsConfirmation",
    //     width: 200,
    //     render: (value) => (value ? "Yes" : "No"),
    // },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableActions
          showUrl={`/contact/contact-details/${record._id}`}
          deleteUrl={`/contact/delete-contact/${record._id}`}
        />
      ),
    },
  ];
  return columns;
};
