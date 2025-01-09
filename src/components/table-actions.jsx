import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const TableActions = ({
  setUpdateConfigData,
  updateConfigData,
  setShowUpdateConfigPopup = null,
  showUrl = "",
  deleteUrl = "",
  permissionUrl = null,
  record = {},
  deleteAction = true,
  detailsAction = true,
  updateAction = false,
}) => {
  const router = useRouter();
  const canSeeDetails = useCheckPermission(permissionUrl || showUrl);
  const canDelete = useCheckPermission(deleteUrl);

  return (
    <>
      <Space>
        {detailsAction && (
          <Button
            size="small"
            disabled={!canSeeDetails}
            onClick={() => {
              if (record.updateConfigPopup) {
                setUpdateConfigData(updateConfigData);
                setShowUpdateConfigPopup(true);
              } else {
                router.push(showUrl);
              }
            }}
            icon={<EyeOutlined />}
          />
        )}
        {updateAction && (
          <Button
            size="small"
            disabled={!canSeeDetails}
            onClick={() => {
              if (record.updateConfigPopup) {
                setUpdateConfigData(updateConfigData);
                setShowUpdateConfigPopup(true);
              }
            }}
            icon={<EditOutlined />}
          />
        )}
        {deleteAction && (
          <Button
            disabled={!canDelete}
            size="small"
            href=""
            danger
            icon={<DeleteOutlined />}
          />
        )}
      </Space>
    </>
  );
};
