import React from "react";
import { Text } from "@/components";
import { useRouter } from "next/navigation";
import { Card, Avatar, Button } from "antd";
import { colorConfig } from "@/config";

export const AdminPanelCard = ({ resource }) => {
  const router = useRouter();
  const { key, title, icon, description } = resource;
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          gap: "16px",
        }}
      >
        <Avatar
          alt={""}
          icon={icon}
          // size={64}
          style={{
            backgroundColor: `${colorConfig.primaryBackground}`,
            display: "flex",
            alignItems: "center",
            border: "none",
            width: "60px",
            height: "60px",
          }}
          // shape="square"
        />
        <Text
          strong
          // size="md"
          // style={{
          //   marginTop: "16px",
          // }}
        >
          {title}
        </Text>
        <div style={{ fontSize: "14px", color: colorConfig.textGrayDark }}>
          {description}
        </div>
        <Button
          style={{ width: "100%", fontWeight: "500" }}
          onClick={() => router.push(`/admin/${key}`)}
        >
          Manage
        </Button>
      </div>
    </Card>
  );
};
