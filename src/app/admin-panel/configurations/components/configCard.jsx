import React from "react";
import { Text } from "@/components";
import { useRouter } from "next/navigation";
import { Card, Avatar } from "antd";

export const ConfigCard = ({ resource }) => {
  const router = useRouter();
  const { key, title, icon } = resource;
  return (
    <Card size="large" onClick={() => router.push(`/admin-panel/configurations/${key}`)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Avatar
          alt={""}
          icon={icon}
          size={64}
          style={{
            // backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            border: "none",
            width: "48px",
            height: "48px",
          }}
          // shape="square"
        />
        <Text
          strong
          size="md"
          style={{
            marginTop: "16px",
          }}
        >
          {title}
        </Text>
      </div>
    </Card>
  );
};
