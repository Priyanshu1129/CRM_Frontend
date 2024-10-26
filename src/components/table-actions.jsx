import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
export const TableActions = ({
  setUpdateConfigData,
  updateConfigData,
  setShowUpdateConfigPopup = null,
  showUrl = "",
  deleteUrl = "",
  record = {},
}) => {
  const router = useRouter();
  return (
    <>
      <Space>
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
        <Button size="small" href="" danger icon={<DeleteOutlined />} />
      </Space>
    </>
  );
};
