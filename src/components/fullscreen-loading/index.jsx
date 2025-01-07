import { Spin } from "antd";

export const FullScreenLoading = ({center = false}) => {
  return (
    <Spin
      size="large"
      style={{
        height: `${center ? "100%" : "100vh"}`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};
