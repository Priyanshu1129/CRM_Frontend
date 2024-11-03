import { Space, theme, Typography } from "antd";

import { Avatar } from "antd";

const { useToken } = theme;

const name = "Globex Corporation";

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
        height: "80px",
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
        <div
          style={{
            height: "24px",
            width: "24px",
            marginRight: "0px",
            color: "#000",
          }}
        >
          <Avatar
            src={
              <img
                src={
                  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                }
                alt="avatar"
              />
            }
          />
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              // color: "#fff",
              fontWeight: 700,
            }}
          >
            {name}
          </Typography.Title>
        )}
      </Space>
    </div>
  );
};
