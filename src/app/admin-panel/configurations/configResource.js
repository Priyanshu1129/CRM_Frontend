import { TableActions } from "@/components";
import { SettingOutlined } from "@ant-design/icons"


export const configResources = [
    {
        key: "industry",
        title: "Industry",
        total: '10'
    },
    {
        key: "sub-industry",
        title: "Sub Industry",
        total: '10'
    },
    {
        key: "solution",
        title: "Solution",
        total: '10'
    },
    {
        key: "sub-solution",
        title: "Sub Solution",
        total: '10'
    },
    {
        key: "territory",
        title: "Territory",
        total: '10'
    }
]


export const getColumns = () => {

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
            dataIndex: "total",
            key: "total",
            width: 150,
            render: (text) => text || "N/A",
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
