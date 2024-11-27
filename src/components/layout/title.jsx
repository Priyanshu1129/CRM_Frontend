import { colorConfig, outColors } from "@/config";
import { Space, theme, Typography } from "antd";

import { Avatar } from "antd";

const { useToken } = theme;

const name = "Raven";

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
        { collapsed && <div
          style={{
            
           
          }}
        >
           <Typography.Title
          style={{
            fontSize: "30px",
            marginBottom: "25px",
            marginLeft : "12px",
            // color : outColors.orange,
            color : colorConfig.primary,
            // color : "colorConfig.primary",
            // color: "#fff",
            fontWeight: 700,
          }}
          >
            R
          </Typography.Title>
         
        </div>}

        {!collapsed && (
          <Typography.Title
          style={{
            fontSize: "30px",
            marginBottom: 20,
            marginLeft : '23px',
            // color : outColors.orange,
            color : colorConfig.primary,
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
