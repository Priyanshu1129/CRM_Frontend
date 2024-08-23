import { Avatar as AntdAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const CustomAvatar = ({ name = "", ...rest }) => {
  return (
    <AntdAvatar
      alt={""}
      icon={!name && <UserOutlined />}
      size="small"
      style={{
        // backgroundColor: rest?.src ? "transparent" : "black",
        display: "flex",
        alignItems: "center",
        border: "none",
      }}
      {...rest}
    >
      {name}
    </AntdAvatar>
  );
};
