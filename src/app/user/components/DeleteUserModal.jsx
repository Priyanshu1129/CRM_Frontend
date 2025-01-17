import React from "react";
import { Modal, Button, Typography } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { userActions } from "@/redux/slices/userSlice";

const { Text } = Typography;

const DeleteUserModel = ({  onCancel }) => {
  const {open, configData, configType} = useSelector((state)=> state.configuration.deleteConfigPopup);
  const {loading , handleDeleteUser} = useDeleteUser();
  const dispatch = useDispatch();
  
  const handleClose = ()=>{
    dispatch(userActions.setDeleteUserPopup({open : false, user : null}))
  }

  return (
    <Modal
      visible={open}
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: "red", marginRight: "8px" }} />
          Confirm Deletion
        </span>
      }
      onCancel={handleClose}
      footer={null}
      centered
    >
      <Text strong>Are you sure you want to delete <span style={{ color: "#1890ff" }}>{user?.firstName} {user?.lastName}</span>?</Text>
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <Button
          onClick={handleClose}
          icon={<CloseOutlined />}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={()=>handleDeleteUser(user?._id?.toString(), 'true', 'false')}
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

export default DeleteUserModel;
