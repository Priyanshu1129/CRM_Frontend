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
      key: "firstName",
      width: calculateDynamicWidth("Name", "firstName", data) + 20,
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
    // {
    //     title: "Last Name",
    //     dataIndex: "lastName",
    //     key: "lastName",
    //     width: 150,
    //     render: (text) => text || "N/A",
    // },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      // sorter: (a, b) => {},
      // sortDirections: ["ascend", "descend"],
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      width: "150px",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 120,
      render: (text) => {
        if (!text) return "N/A";
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: calculateDynamicWidth("Email", "email", data),
      render: (text) => text || "N/A",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: calculateDynamicWidth("Phone", "phone", data),
      // render: (text) => text || "N/A",
      render: (_, record) => (
        <Space>
          <Text>{`${record?.phoneCountryCode} ${record?.phone}` || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Country",
      dataIndex: ["address", "country"],
      key: "country",
      width: calculateDynamicWidth("Country", ["address", "country"], data),
      render: (text) => text || "N/A",
    },
    {
      title: "State",
      dataIndex: ["address", "state"],
      key: "state",
      width: calculateDynamicWidth("State", ["address", "state"], data),
      render: (text) => text || "N/A",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
      width: calculateDynamicWidth("City", ["address", "city"], data),
      render: (text) => text || "N/A",
    },
    {
      title: "Role",
      dataIndex: ["role", "name"],
      key: "role",
      width: calculateDynamicWidth("Role", ["role", "name"], data),
      render: (text) => text || "N/A",
    },
    //   {
    //     title: "Teams",
    //     dataIndex: "teams",
    //     key: "teams",
    //     width: 200,
    //     render: (teams) =>
    //       teams && teams.length > 0
    //         ? teams.map((team) => team.name).join(", ")
    //         : "N/A",
    //   },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        const roleId = record?.role?._id;
        const userId = record?._id;
        return (
          <TableActions deletePopupFor="user" record={record} showUrl={`/user/user-details/${roleId}/${userId}`} />
        );
      },
    },
  ];

  return columns;
};
