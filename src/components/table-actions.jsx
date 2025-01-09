import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";
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

  return (
    <>
      <Space>
        {useCheckPermission(showUrl) && (
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
        {useCheckPermission(deleteUrl) && deleteAction && (
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
