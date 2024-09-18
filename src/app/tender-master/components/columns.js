import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";
import { DownOutlined } from "@ant-design/icons";

export const getColumns = ({ currencies, selectedCurrency, setSelectedCurrency }) => {


    const columns = [
        {
            title: "Custom ID",
            dataIndex: "customId",
            key: "customId",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "RFP Date",
            dataIndex: "rfpDate",
            key: "rfpDate",
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
            width: 120,
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
            title: "Submission Due Date",
            dataIndex: "submissionDueDate",
            key: "submissionDueDate",
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
            width: 150,
        },
        {
            title: "Client",
            dataIndex: ["client", "name"],
            key: "client",
            render: (clientName) => clientName || 'N/A',
            width: 200,
        },
        {
            title: "Reference",
            dataIndex: "reference",
            key: "reference",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "RFP Title",
            dataIndex: "rfpTitle",
            key: "rfpTitle",
            render: (text) => text || 'N/A',
            width: 200,
        },
        {
            title: "RFP Source",
            dataIndex: "rfpSource",
            key: "rfpSource",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "Associated Opportunity",
            dataIndex: ["associatedOpportunity", "customId"],
            key: "associatedOpportunity",
            render: (text) => text || 'N/A',
            width: 200,
        },
        {
            title: "Bond",
            dataIndex: "bond",
            key: "bond",
            render: (text) => text ? "Yes" : "No",
            width: 100,
        },
        {
            title: "Bond Value",
            dataIndex: "bondValue",
            filters: currencies || [],
            onFilter: (value, record) => {
                setSelectedCurrency(value)
                return true
            },
            filterIcon: () => <DownOutlined />,
            filterSearch: true,
            filterMultiple: false,
            render: (value) => value ? convertCurrency(value, selectedCurrency, currencies) : 'N/A',
            key: "bondValue",
            width: 140,
        },
        {
            title: "Bond Issue Date",
            dataIndex: "bondIssueDate",
            key: "bondIssueDate",
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
            width: 150,
        },
        {
            title: "Bond Expiry",
            dataIndex: "bondExpiry",
            key: "bondExpiry",
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
            width: 150,
        },
        {
            title: "Submission Mode",
            dataIndex: "submissionMode",
            key: "submissionMode",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "Evaluation Date",
            dataIndex: "evaluationDate",
            key: "evaluationDate",
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
            width: 150,
        },
        {
            title: "Officer",
            dataIndex: "officer",
            key: "officer",
            render: (officer) => officer ? `${officer.firstName || "N/A"} ${officer.lastName || "N/A"}` : "N/A",
            width: 150,
        },
        {
            title: "Bid Manager",
            dataIndex: "bidManager",
            key: "bidManager",
            render: (manager) => manager ? `${manager.firstName || "N/A"} ${manager.lastName || "N/A"}` : "N/A",
            width: 150,
        },
        {
            title: "Stage",
            dataIndex: ["stage", "label"],
            key: "stage",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "Stage Explanation",
            dataIndex: "stageExplanation",
            key: "stageExplanation",
            render: (text) => text || 'N/A',
            width: 200,
        },
        {
            title: "Submission Date",
            dataIndex: "submissionDate",
            key: "submissionDate",
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
            width: 120,
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 120,
            render: (_, record) => (
                <TableActions showUrl={`/tender-master/tender-details/${record._id}`} />
            ),
        },
    ];
    return columns;
}
