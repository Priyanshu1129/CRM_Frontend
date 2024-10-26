import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

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
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 120,
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
