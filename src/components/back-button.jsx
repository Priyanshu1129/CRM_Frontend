import { Button, Grid } from "antd";
import { Text } from ".";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export const BackButton = ({ text = true }) => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={() => {
        router.back();
      }}
      style={{
        marginTop: screens.xs ? "1.6rem" : "0rem",
      }}
    >
      <Text
        style={{
          //   color: "#fff",
          fontSize: "16px",
          fontWeight: 400,
        }}
      >
        {!screens.xs && text ? "Go Back" : null}
      </Text>
    </Button>
  );
};
