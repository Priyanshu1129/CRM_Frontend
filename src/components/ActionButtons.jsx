import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";

const ActionButtons = ({ showUrl = "", deleteUrl = "" }) => {
  const router = useRouter();
  return (
    <Space>
      <Button
        size="small"
        onClick={() => {
          router.push(showUrl);
        }}
        icon={<EyeOutlined />}
      />

      <Button
        onClick={() => {
          router.push(deleteUrl);
        }}
        size="small"
        danger
        icon={<DeleteOutlined />}
      />
    </Space>
  );
};

export default ActionButtons;
