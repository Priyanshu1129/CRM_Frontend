import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns = [
    {
        title: "First Name",
        // width: 100,
        dataIndex: "firstName",
        key: "firstName",
        // fixed: "left",
    },
    {
        title: "Last Name",
        width: 100,
        dataIndex: "lastName",
        key: "lastName",
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
    },
    {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
    },
    {
        title: "Client",
        dataIndex: "client",
        key: "client",
    },
    {
        title: "Relationship Degree",
        dataIndex: "relationshipDegree",
        key: "relationshipDegree",
    },
    {
        title: "Personal Email",
        dataIndex: "personalEmail",
        key: "personalEmail",
    },
    {
        title: "Work Email",
        dataIndex: "workEmail",
        key: "workEmail",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Mobile Phone",
        dataIndex: "mobilePhone",
        key: "mobilePhone",
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
    },
    {
        title: "Arch Type",
        dataIndex: "archType",
        key: "archType",
    },
    {
        title: "Details Confirmation",
        dataIndex: "detailsConfirmation",
        key: "detailsConfirmation",
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

