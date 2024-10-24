import { TableActions } from "@/components";
import { convertCurrency } from "@/utilities/convertCurrency";

export const getColumns = ({ selectedCurrency, setTerritory, setVisible }) => {

    const columns = [
        {
            title: "Territory",
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
                const territoryRecord = {
                    label : record.text,
                    _id : record.value
                }
              
                record.updateConfigPopup = true;
                return <TableActions setTerritory={setTerritory} territoryRecord={territoryRecord} setVisible={setVisible} record={record} showUrl={`/admin-panel/configurations/territory/${record.value}`} />
            },
        },
       
    ];
    return columns;
}
