import { TableActions, CustomAvatar, Text } from "@/components";
import { Space } from "antd";
export const columns = [
  {
    title: <div style={{ paddingLeft: "24px" }}>Name</div>,
    // dataIndex: "firstName",
    key: "firstName",
    width: 200,
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
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 100,
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
    width: 250,
    render: (text) => text || "N/A",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150,
    render: (text) => text || "N/A",
  },
  {
    title: "Country",
    dataIndex: ["address", "country"],
    key: "country",
    width: 250,
    render: (text) => text || "N/A",
  },
  {
    title: "State",
    dataIndex: ["address", "state"],
    key: "state",
    width: 250,
    render: (text) => text || "N/A",
  },
  {
    title: "City",
    dataIndex: ["address", "city"],
    key: "city",
    width: 250,
    render: (text) => text || "N/A",
  },
  {
    title: "Role",
    dataIndex: ["role", "name"],
    key: "role",
    width: 150,
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
      const roleId = record.role._id;
      const userId = record._id;
      return (
        <TableActions showUrl={`/user/user-details/${roleId}/${userId}`} />
      );
    },
  },
];
