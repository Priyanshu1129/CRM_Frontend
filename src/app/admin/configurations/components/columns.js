import { TableActions } from "@/components";
import dayjs from "dayjs";
import moment from "moment";

export const getColumns = ({
  setUpdateConfigData,
  setShowUpdateConfigPopup,
  configType,
}) => {
  const columns = [
    {
      title: `${configType}`,
      dataIndex: "text",
      key: "label",
      render: (text) => text || "N/A",
      // width: 150,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      // render: (text) => text || "N/A",
      render: (text) =>
        text
          ? new Date(text).toLocaleDateString()
          : moment().format("YYYY-MM-DD"),
    },
    {
      title: "Last Edit",
      dataIndex: "updatedAt",
      key: "last-edit",
      width: 120,
      // render: (text) => text || "N/A",
      render: (text) =>
        text
          ? new Date(text).toLocaleDateString()
          : moment().format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        const updateConfigData = {
          label: record.text,
          _id: record.value,
          salesStage: record.salesStage || null,
        };
        record.updateConfigPopup = true;
        return (
          <TableActions
            setUpdateConfigData={setUpdateConfigData}
            updateConfigData={updateConfigData}
            setShowUpdateConfigPopup={setShowUpdateConfigPopup}
            record={record}
            deleteAction={configType == "sales-stage" ? false : true}
            // showUrl={`/admin/configurations/territory/${record.value}`}
            showUrl={`/admin/configurations/update`}
            updateAction={true}
            detailsAction={false}
            deletePopupFor={configType}
          />
        );
      },
    },
  ];
  if (configType == "sales-sub-stage") {
    const col = {
      title: `Sales Stage`,
      dataIndex: "salesStageLabel",
      key: "sales-stage",
      render: (text) => text || "N/A",
      width: 150,
    };
    columns.splice(2, 0, col);
  }
  return columns;
};
