"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Grid } from "antd";

import { Text } from "./text";

export const ListTitleButton = ({ buttonText, toPath }) => {
  const screens = Grid.useBreakpoint();

  return (
    <Button
      type="primary"
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon={<PlusCircleOutlined />}
      onClick={() => {}}
      size={screens.xs ? "middle" : "large"}
      style={{
        marginTop: screens.xs ? "1.6rem" : "0rem",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: "16px",
          fontWeight: 400,
        }}
      >
        {!screens.xs ? buttonText : null}
      </Text>
    </Button>
  );
};
