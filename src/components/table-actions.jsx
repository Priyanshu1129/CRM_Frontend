import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";
import { useDispatch } from "react-redux";
import { userActions } from "@/redux/slices/userSlice";
import { configurationActions } from "@/redux/slices/configurationSlice";

export const TableActions = ({
  setUpdateConfigData,
  updateConfigData,
  setShowUpdateConfigPopup = null,
  showUrl = "",
  deleteUrl = "",
  onDelete = null,
  permissionUrl = null,
  record = {},
  deleteAction = true,
  detailsAction = true,
  updateAction = false,
  deletePopupFor = 'n/a',
  
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const canSeeDetails = useCheckPermission(permissionUrl || showUrl);
  const canDelete = useCheckPermission(deleteUrl);
  console.log("delete popup for : ", deletePopupFor)
  return (
    <>
      <Space>
        {detailsAction && (
          <Button
            size="small"
            disabled={!canSeeDetails}
            onClick={() => {
              if (record.updateConfigPopup) {
                setUpdateConfigData(updateConfigData);
                setShowUpdateConfigPopup(true);
              } else {
                router.push(showUrl);
              }
            }}
            icon={<EyeOutlined />}
          />
        )}
        {updateAction && (
          <Button
            size="small"
            disabled={!canSeeDetails}
            onClick={() => {
              if (record.updateConfigPopup) {
                setUpdateConfigData(updateConfigData);
                setShowUpdateConfigPopup(true);
              }
            }}
            icon={<EditOutlined />}
          />
        )}
        {deleteAction && (
          <Button
            onClick={()=> {
              console.log("deletion clicked")
              if(deletePopupFor == 'n/a'){
                console.log("delete separate page : ", deletePopupFor)
                router.push(deleteUrl)
              }else{
                if(deletePopupFor == 'user'){
                  console.log("delete popup page : ", deletePopupFor)
                  dispatch(userActions.setDeleteUserPopup({open : true, user : record}))
                }else{
                  dispatch(configurationActions.setDeleteConfigPopup({open : true, configType : deletePopupFor, configData : record }))
                }
              }
            }}
            disabled={!canDelete}
            size="small"
            danger
            icon={<DeleteOutlined />}
          />
        )}
      </Space>
    </>
  );
};
