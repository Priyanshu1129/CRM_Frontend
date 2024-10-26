import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";
import dayjs from "dayjs";
import moment from "moment";

export const getColumns = ({ selectedCurrency, setUpdateConfigData, setShowUpdateConfigPopup, configType }) => {
    
    const columns = [
        {
            title: `${configType}`,
            dataIndex: "text",
            key: "label",
            render: (text) => text || 'N/A',
            width: 150,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            // render: (text) => text || "N/A",
            render: (text) => (text ? new Date(text).toLocaleDateString() : moment().format("YYYY-MM-DD")),
        },
        {
            title: "Last Edit",
            dataIndex: "updatedAt",
            key: "last-edit",
            width: 150,
            // render: (text) => text || "N/A",
            render: (text) => (text ? new Date(text).toLocaleDateString() : moment().format("YYYY-MM-DD")),
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => {
                const updateConfigData = {
                    label : record.text,
                    _id : record.value
                }
                record.updateConfigPopup = true;
                return <TableActions setUpdateConfigData={setUpdateConfigData} updateConfigData={updateConfigData} setShowUpdateConfigPopup={setShowUpdateConfigPopup} record={record} showUrl={`/admin-panel/configurations/territory/${record.value}`} />
            },
        },
       
    ];
    return columns;
}
