import React from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "antd";

export const MessageModal = ({ isModalOpen, setIsModalOpen, message }) => {
  const router = useRouter();
  return (
    <Modal
      type="success"
      open={isModalOpen}
      footer={[
        <Button
          key={"back"}
          type="primary"
          onClick={() => {
            router.push("/login");
            setIsModalOpen(false);
          }}
        >
          Back to login
        </Button>,
      ]}
    >
      {message}
    </Modal>
  );
};
