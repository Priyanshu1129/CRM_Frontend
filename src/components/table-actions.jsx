import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
// import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const TableActions = ({
  setUpdateConfigData,
  updateConfigData,
  setShowUpdateConfigPopup = null,
  showUrl = "",
  deleteUrl = "",
  record = {},
  deleteAction = true,
}) => {
  const router = useRouter();
  // const canSeeDetails = useCheckPermission(showUrl);
  // const canDelete = useCheckPermission(deleteUrl);
  const canSeeDetails = true;
  const canDelete = true;

  return (
    <>
      <Space>
        {canSeeDetails && (
          <Button
            size="small"
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
        {canDelete && deleteAction && (
          <Button
            disabled
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
