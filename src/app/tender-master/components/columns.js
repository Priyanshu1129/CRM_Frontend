import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
export const columns = [
    {
        title: "Custom ID",
        dataIndex: "customId",
        key: "customId",
    },
    {
        title: "Opportunity",
        dataIndex: "opportunity",
        key: "opportunity",
    },
    {
        title: "RFP Date",
        dataIndex: "rfpDate",
        key: "rfpDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Entry Date",
        dataIndex: "entryDate",
        key: "entryDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
    },
    {
        title: "Submission Due Date",
        dataIndex: "submissionDueDate",
        key: "submissionDueDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Client",
        dataIndex: "client",
        key: "client",
    },
    {
        title: "Reference",
        dataIndex: "reference",
        key: "reference",
    },
    {
        title: "RFP Title",
        dataIndex: "rfpTitle",
        key: "rfpTitle",
    },
    {
        title: "RFP Source",
        dataIndex: "rfpSource",
        key: "rfpSource",
    },
    {
        title: "Associated Opportunity",
        dataIndex: "associatedOpportunity",
        key: "associatedOpportunity",
    },
    {
        title: "Bond",
        dataIndex: "bond",
        key: "bond",
        render: (text) => (text ? "Yes" : "No"),
    },
    {
        title: "Bond Value",
        dataIndex: "bondValue",
        key: "bondValue",
    },
    {
        title: "Bond Issue Date",
        dataIndex: "bondIssueDate",
        key: "bondIssueDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Bond Expiry",
        dataIndex: "bondExpiry",
        key: "bondExpiry",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Submission Mode",
        dataIndex: "submissionMode",
        key: "submissionMode",
    },
    {
        title: "Evaluation Date",
        dataIndex: "evaluationDate",
        key: "evaluationDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Officer",
        dataIndex: "officer",
        key: "officer",
    },
    {
        title: "Bid Manager",
        dataIndex: "bidManager",
        key: "bidManager",
    },
    {
        title: "Stage",
        dataIndex: "stage",
        key: "stage",
    },
    {
        title: "Stage Explanation",
        dataIndex: "stageExplanation",
        key: "stageExplanation",
    },
    {
        title: "Submission Date",
        dataIndex: "submissionDate",
        key: "submissionDate",
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => (
            <Space>
                <Button size="small" href="" icon={<EyeOutlined />} />
                <Button size="small" href="" danger icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];

