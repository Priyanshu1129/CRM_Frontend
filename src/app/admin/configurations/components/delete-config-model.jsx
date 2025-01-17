import React from "react";
import { Modal, Button, Typography } from "antd";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { useDeleteSolution } from "@/hooks/adminPanel/configurations/solution/useDeleteSolution";
import { useDeleteIndustry } from "@/hooks/adminPanel/configurations/industry/useDeleteIndustry";
import { useDeleteTerritory } from "@/hooks/adminPanel/configurations/territory/useDeleteTerritroy";
import { useDeleteSubIndustry } from "@/hooks/adminPanel/configurations/sub-industry/useDeleteSubIndustry";
import { useDeleteSubSolution } from "@/hooks/adminPanel/configurations/sub-solution/useDeleteSubSolution";

const { Text } = Typography;

const DeleteConfigModal = () => {
  const dispatch = useDispatch();
  const { open, configData, configType } = useSelector(
    (state) => state.configuration.deleteConfigPopup
  );
  const description = `Are you sure you want to delete ${configType} : ${configData?.text}`;

  const { loading: l1, handleDeleteSolution } = useDeleteSolution();
  const { loading: l2, handleDeleteSubSolution } = useDeleteSubSolution();
  const { loading: l3, handleDeleteIndustry } = useDeleteIndustry();
  const { loading: l4, handleDeleteSubIndustry } = useDeleteSubIndustry();
  const { loading: l5, handleDeleteTerritory } = useDeleteTerritory();
  const loading = l1 || l2 || l3 || l4 || l5;

  const handleDelete = (configId) => {
    switch (configType) {
      case "solution":
        handleDeleteSolution(configId, "true", "false");
        break;

      case "sub-solution":
        handleDeleteSubSolution(configId, "true", "false");
        break;

      case "industry":
        handleDeleteIndustry(configId, "true", "false");
        break;

      case "sub-industry":
        handleDeleteSubIndustry(configId, "true", "false");
        break;

      case "territory":
        handleDeleteTerritory(configId, "true", "false");
        break;
    }
  };

  const handleClose = () => {
    dispatch(configurationActions.resetDeleteConfigPopup());
  };

  return (
    <Modal
      visible={open}
      title={
        <span>
          <ExclamationCircleOutlined
            style={{ color: "red", marginRight: "8px" }}
          />
          Confirm Deletion
        </span>
      }
      onCancel={handleClose}
      footer={null}
      centered
    >
      <Text strong>{description}</Text>
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <Button
          onClick={handleClose}
          icon={<CloseOutlined />}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleDelete(configData?.value)}
          type="primary"
          danger
          loading={loading}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfigModal;
