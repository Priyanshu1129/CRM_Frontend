import { TableActions } from "@/components";
import { SettingOutlined } from "@ant-design/icons"


export const configResources = [
    {
        key: "industry",
        title: "Industry"
    },
    {
        key: "sub-industry",
        title: "Sub Industry"
    },
    {
        key: "solution",
        title: "Solution"
    },
    {
        key: "sub-solution",
        title: "Sub Solution"
    },
    {
        key: "territory",
        title: "Territory"
    }
]


export const getColumns = ({ counts }) => {

    const columns = [
        {
            title: "Config Type",
            dataIndex: "title",
            key: "title",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "Total",
            dataIndex: "key",
            key: "key",
            width: 150,
            render: (text) => counts && counts[text] || "N/A",
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => {
                return <TableActions deleteAction={false} showUrl={`/admin-panel/configurations/${record.key}`} />
            },
        },

    ];
    return columns;
}
