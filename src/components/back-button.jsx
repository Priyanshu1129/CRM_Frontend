import { Button, Grid } from "antd";
import { Text } from ".";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export const BackButton = ({ text = true, buttonText = null }) => {
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
        width: "fit-content",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: 400,
        }}
        className="hover-text-go-back-button"
      >
        {!screens.xs && text ? buttonText || "Go Back" : null}
      </div>
    </Button>
  );
};
