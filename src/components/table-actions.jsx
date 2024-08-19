import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
export const TableActions = ({ showUrl, deleteUrl }) => {
  const router = useRouter();
  return (
    <>
      <Space>
        <Button
          size="small"
          href=""
          onClick={() => router.push(showUrl)}
          icon={<EyeOutlined />}
        />
        <Button size="small" href="" danger icon={<DeleteOutlined />} />
      </Space>
    </>
  );
};
