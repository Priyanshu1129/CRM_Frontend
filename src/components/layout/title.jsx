import { colorConfig, outColors } from "@/config";
import { Space, theme, Typography } from "antd";

import { Avatar } from "antd";

const { useToken } = theme;

const name = "GoldenEye";

export const Title = ({
  collapsed,
  // wrapperStyles,
}) => {
  const { token } = useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        gap: "18px",
        height: "180px",
      }}
      className="demo-logo-vertical"
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          gap: 6,
          // ...wrapperStyles,
        }}
      >
        {collapsed && (
          <div style={{}}>
            <Typography.Title
              style={{
                fontSize: "30px",
                marginBottom: "25px",
                marginLeft: "12px",
                color: "#F86041",
                fontWeight: 700,
              }}
            >
              Ge
            </Typography.Title>
          </div>
        )}

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "30px",
              marginBottom: 25,
              marginLeft: "23px",
              color: "#F86041",
              fontWeight: 600,
            }}
          >
            {name}
          </Typography.Title>
        )}
      </Space>
    </div>
  );
};
