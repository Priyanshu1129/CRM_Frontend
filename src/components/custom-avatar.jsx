import { Avatar as AntdAvatar } from "antd";

export const CustomAvatar = ({ name = "", ...rest }) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: rest?.src ? "transparent" : "black",
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
