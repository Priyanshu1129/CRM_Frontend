import { TableActions, CustomAvatar, Text } from "@/components";
import { Space } from "antd";
export const columns = [
    {
        title: <div style={{ paddingLeft: "24px" }}>Name</div>,
        // dataIndex: "firstName",
        key: "firstName",
        width: 200,
        render: (_, record) =>
        (
            <Space>
                <CustomAvatar src={record.avatar} />
                <Text>{`${record.firstName} ${record.lastName}` || "N/A"}</Text>
            </Space>
        )
    },
    // {
    //     title: "Last Name",
    //     dataIndex: "lastName",
    //     key: "lastName",
    //     width: 150,
    // },
    {
        title: "Entry Date",
        dataIndex: "entryDate",
        key: "entryDate",
        width: 120,
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
        width: 150,
        render: (enteredBy) => enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : "N/A",
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        width: 100,
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
        width: 200,
    },
    {
        title: "Client",
        dataIndex: ["client", "name"],
        key: "client",
        render: (text) => text || "N/A",
        width: 200,
    },
    {
        title: "Relationship Degree",
        dataIndex: ["relationshipDegree", "label"],
        key: "relationshipDegree",
        render: (text) => text || "N/A",
        width: 200,
    },
    {
        title: "Personal Email",
        dataIndex: "personalEmail",
        key: "personalEmail",
        width: 250,
    },
    {
        title: "Work Email",
        dataIndex: "workEmail",
        key: "workEmail",
        width: 250,
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: 150,
    },
    {
        title: "Mobile Phone",
        dataIndex: "mobilePhone",
        key: "mobilePhone",
        width: 150,
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
        width: 150,
    },
    {
        title: "Arche Type",
        dataIndex: ["archeType", "label"],
        key: "archeType",
        render: (text) => text || "N/A",
        width: 150,
    },
    {
        title: "Details Confirmation",
        dataIndex: "detailsConfirmation",
        key: "detailsConfirmation",
        width: 200,
        render: (value) => (value ? "Yes" : "No"),
    },
    {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (_, record) => (
            <TableActions showUrl={`/contact-master/contact-details/${record._id}`} />
        ),
    },
];
