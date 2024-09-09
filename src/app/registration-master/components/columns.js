import { TableActions, GetUsers } from "@/components";

export const getColumns = () => {

    const columns = [
        {
            title: "Client",
            dataIndex: ["client", "name"],
            key: "client",
            width: 200,
            render: (text) => text || "N/A",
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
            title: "Registration Champ",
            dataIndex: ["registrationChamp", "firstName"],
            key: "registrationChamp",
            width: 200,
            render: (text, record) => record.registrationChamp ? `${record.registrationChamp.firstName || "N/A"} ${record.registrationChamp.lastName || "N/A"}` : "N/A",
        },
        {
            title: "Status",
            dataIndex: ["status", "label"],
            key: "status",
            width: 150,
            render: (text) => text || "N/A",
        },
        {
            title: "Website Username",
            dataIndex: ["websiteDetails", "username"],
            key: "websiteUsername",
            width: 200,
            render: (text) => text || "N/A",
        },
        // {
        //     title: "Website Password",
        //     dataIndex: ["websiteDetails", "password"],
        //     key: "websitePassword",
        //     width: 150,
        //     render: () => "••••••", // Masking the password for security
        // },
        {
            title: "Other Details",
            dataIndex: "otherDetails",
            key: "otherDetails",
            width: 250,
            render: (text) => text || "N/A",
        },
        {
            title: "Registration Date",
            dataIndex: "registrationDate",
            key: "registrationDate",
            width: 120,
            render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
        },
        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
            key: "expiryDate",
            width: 120,
            render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
        },
        {
            title: "Primary Contact",
            dataIndex: ["primaryContact", "firstName"],
            key: "primaryContact",
            width: 200,
            render: (text, record) => record.primaryContact ? `${record.primaryContact.firstName || "N/A"} ${record.primaryContact.lastName || "N/A"}` : "N/A",
        },
        {
            title: "Submitted Documents",
            dataIndex: "submittedDocuments",
            key: "submittedDocuments",
            width: 200,
            render: (text) => text || "N/A",
        },
        // {
        //     title: "Notes",
        //     dataIndex: "notes",
        //     key: "notes",
        //     width: 300,
        //     render: (notes) => notes.length ? notes.join(", ") : "N/A",
        // },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => (
                <TableActions showUrl={`/registration-master/registration-details/${record._id}`} />
            ),
        },
    ];
    return columns;
}
