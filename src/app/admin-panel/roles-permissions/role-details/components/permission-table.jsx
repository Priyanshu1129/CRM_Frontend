import React, { useState } from "react";
import { Button, Table, Checkbox, Space } from "antd";
import { useEditPermissions } from "@/hooks/adminPanel/roles-Permissions";
import { getColumns } from "./columns";

export const PermissionTable = ({ role, permissionEntities }) => {
  let dataSource = permissionEntities?.map((entity, index) => ({
    key: index,
    ...entity,
  }));

  // Initialize checkedActions as an array of objects with entity and allowedActions
  const initialCheckedActions = dataSource?.map((entity) => {
    const permission = role.permissions.find(
      (permission) => permission.entity === entity._id
    );
    return {
      entity: entity._id,
      allowedActions: permission?.allowedActions || [],
    };
  });

  const [checkedActions, setCheckedActions] = useState(initialCheckedActions);

  // Find the index of an entity in checkedActions by its _id
  const findEntityIndex = (entityId) => {
    return checkedActions.findIndex((item) => item.entity === entityId);
  };

  // Handle module checkbox change - when clicked, it toggles all action checkboxes for that row
  const handleModuleCheck = (rowIndex, checked) => {
    const newCheckedActions = [...checkedActions];
    const entityId = dataSource[rowIndex]._id;
    const actions = dataSource[rowIndex].actions;

    const entityIndex = findEntityIndex(entityId);

    if (checked) {
      // Check all actions for the current module row
      newCheckedActions[entityIndex] = {
        entity: entityId,
        allowedActions: actions,
      };
    } else {
      // Uncheck all actions for the current module row
      newCheckedActions[entityIndex] = {
        entity: entityId,
        allowedActions: [],
      };
    }

    setCheckedActions(newCheckedActions);
    // console.log("module check", newCheckedActions);
  };

  // Handle individual action checkbox change
  const handleActionCheck = (rowIndex, action, checked) => {
    const newCheckedActions = [...checkedActions];
    const entityId = dataSource[rowIndex]._id;
    const entityIndex = findEntityIndex(entityId);

    const currentAllowedActions = newCheckedActions[entityIndex].allowedActions;

    if (checked) {
      // Add the action to the allowedActions list for this entity
      newCheckedActions[entityIndex].allowedActions = [
        ...currentAllowedActions,
        action,
      ];
    } else {
      // Remove the action from the allowedActions list
      newCheckedActions[entityIndex].allowedActions =
        currentAllowedActions.filter((a) => a !== action);
    }

    setCheckedActions(newCheckedActions);
    // console.log("checked", newCheckedActions);
  };

  // Handle update action (this could be replaced with an API call)

  // Handle reset action
  const handleReset = () => {
    setCheckedActions(initialCheckedActions);
  };

  const { handleUpdate } = useEditPermissions({ checkedActions });

  const columns = getColumns({
    checkedActions,
    handleActionCheck,
    handleModuleCheck,
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={{ marginTop: 16 }}>
        <Space style={{ marginLeft: 16 }}>
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </div>
    </div>
  );
};
