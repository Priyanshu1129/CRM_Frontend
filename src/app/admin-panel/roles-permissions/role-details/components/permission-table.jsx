import React, { useState } from "react";
import { Button, Table, Checkbox, Space } from "antd";
import { editRolePermissions } from "@/redux/actions/roleAndPermissionAction";
import { useDispatch } from "react-redux";

export const PermissionTable = ({ role, permissionEntities }) => {
  const dispatch = useDispatch();

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
  const handleUpdate = () => {
    console.log("initial state", role);
    console.log("Updated permissions:", { permissionUpdates: checkedActions });

    const filterPermissions = (permissions) => {
      return permissions.filter(
        (permission) => permission.allowedActions.length > 0
      );
    };
    const filteredPermissions = filterPermissions(checkedActions);

    dispatch(
      editRolePermissions({ permissionUpdates: filteredPermissions }, role._id)
    );
  };

  // Handle reset action
  const handleReset = () => {
    setCheckedActions(initialCheckedActions);
    console.log("Permissions reset to initial state");
  };

  // Columns configuration for the table
  const columns = [
    {
      title: "Modules",
      dataIndex: "entity",
      key: "entity",
      render: (text, record, index) => (
        <Checkbox
          checked={
            checkedActions[index].allowedActions.length ===
              record.actions.length && record.actions.length > 0
          }
          onChange={(e) => handleModuleCheck(index, e.target.checked)}
        >
          {text}
        </Checkbox>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions, record, index) => (
        <Space>
          {actions.map((action) => (
            <Checkbox
              key={action}
              checked={checkedActions[index].allowedActions.includes(action)}
              onChange={(e) =>
                handleActionCheck(index, action, e.target.checked)
              }
            >
              {action}
            </Checkbox>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={{ marginTop: 16 }}>
        <Space style={{ marginLeft: 16 }}>
          {/* Update and Reset buttons */}
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </div>
    </div>
  );
};
