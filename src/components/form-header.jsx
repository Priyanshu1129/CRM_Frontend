import React from "react";
import {
  LeftOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Grid } from "antd";
import { useRouter } from "next/navigation";
import { Text } from "./text";
import { ListSearch } from ".";

export const FormHeader = ({ buttonText }) => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  const CancelButton = () => (
    <Button
      icon={<CloseCircleOutlined />}
      onClick={() => {
        router.back();
      }}
      size={screens.xs ? "middle" : "large"}
      style={{
        marginTop: screens.xs ? "1.6rem" : "0rem",
      }}
      on
    >
      <Text
        style={{
          //   color: "#fff",
          fontSize: "16px",
          fontWeight: 400,
        }}
      >
        {!screens.xs ? buttonText : null}
      </Text>
    </Button>
  );
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CancelButton buttonText={buttonText} />
      <ListSearch />
    </div>
  );
};
