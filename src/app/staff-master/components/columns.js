import { TableActions } from "@/components";
export const columns = [
    {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        width: 150,
        render: (text) => text || "N/A",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        width: 150,
        render: (text) => text || "N/A",
    },
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
        title: "Date of Birth",
        dataIndex: "DOB",
        key: "DOB",
        width: 150,
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
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
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 250,
        render: (text) => text || "N/A",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: 150,
        render: (text) => text || "N/A",
    },
    {
        title: "Teams",
        dataIndex: "teams",
        key: "teams",
        width: 200,
        render: (teams) => (teams && teams.length > 0 ? teams.map((team) => team.name).join(", ") : "N/A"),
    },
    {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => (
            <TableActions showUrl={"/staff-master/staff-details"} />
        ),
    },
];
