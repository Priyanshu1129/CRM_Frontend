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
      <div
        style={{
          fontSize: "16px",
          fontWeight: 400,
        }}
        className="hover-text-go-back-button"
      >
        {!screens.xs && text ? "Go Back" : null}
      </div>
    </Button>
  );
};
