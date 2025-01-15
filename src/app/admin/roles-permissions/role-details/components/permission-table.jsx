import React, { useEffect, useState } from "react";
import { Button, Table, Space } from "antd";
import { useEditPermissions } from "@/hooks/adminPanel/roles-Permissions";
import { getColumns } from "./columns";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";
import { useSelector } from "react-redux";

export const PermissionTable = ({ role, permissionEntities }) => {
  let dataSource = permissionEntities?.map((entity, index) => ({
    key: index,
    ...entity,
  }));

  console.log("permissionEntities", permissionEntities);
  console.log("role", role);
  const canUpdateRole = useCheckPermission("/admin/roles-permissions/update");
  const { data } = useSelector((state) => state.auth.authDetails);
  const [isMyRole, setIsMyRole] = useState(true);

  useEffect(() => {
    if (data && role)
      setIsMyRole(data?.role?._id.toString() == role?._id.toString());
  }, [role, data]);

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
  const oldHandleActionCheck = (rowIndex, action, checked) => {
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

  const handleActionCheck = (rowIndex, action, checked) => {
    const newCheckedActions = [...checkedActions];
    const entityId = dataSource[rowIndex]._id;
    const entityIndex = findEntityIndex(entityId);

    const currentAllowedActions = newCheckedActions[entityIndex].allowedActions;

    // Ensure List View is checked when any other action is selected
    const ensureListView = () => {
      if (!currentAllowedActions.includes("GET ALL")) {
        return [...currentAllowedActions, "GET ALL"];
      }
      return currentAllowedActions;
    };

    // Ensure Details View and List View are checked when Update or Delete is selected
    const ensureDetailsAndListView = () => {
      let updatedActions = ensureListView();
      if (!updatedActions.includes("READ")) {
        updatedActions = [...updatedActions, "READ"];
      }
      return updatedActions;
    };

    if (checked) {
      // Add the action to the allowedActions list
      let updatedActions;
      if (action === "CREATE" || action === "READ") {
        updatedActions = ensureListView();
        updatedActions = [...updatedActions, action];
      } else if (action === "UPDATE" || action === "DELETE") {
        updatedActions = ensureDetailsAndListView();
        updatedActions = [...updatedActions, action];
      } else {
        updatedActions = [...currentAllowedActions, action];
      }
      updatedActions = Array.from(new Set(updatedActions)); // Remove duplicates
      newCheckedActions[entityIndex].allowedActions = updatedActions;
    } else {
      // Remove the action and adjust dependent rules
      let updatedActions = currentAllowedActions.filter((a) => a !== action);
      if (action === "READ") {
        updatedActions = updatedActions.filter(
          (a) => a !== "UPDATE" && a !== "DELETE"
        );
      }
      if (action === "GET ALL") {
        updatedActions = [];
      }
      newCheckedActions[entityIndex].allowedActions = updatedActions;
    }

    setCheckedActions(newCheckedActions);
    // console.log("updated permissions:", newCheckedActions);
  };

  // Handle reset action
  const handleReset = () => {
    setCheckedActions(initialCheckedActions);
  };

  const { handleUpdate, loading } = useEditPermissions({
    checkedActions,
    role,
  });

  const columns = getColumns({
    checkedActions,
    handleActionCheck,
    handleModuleCheck,
    canUpdateRole,
    isMyRole,
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={{ marginTop: 16 }}>
        <Space style={{ marginLeft: 16 }}>
          <Button
            loading={loading}
            type="primary"
            onClick={handleUpdate}
            disabled={!canUpdateRole || isMyRole}
          >
            Update
          </Button>
          <Button
            disabled={loading || !canUpdateRole || isMyRole}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Space>
      </div>
    </div>
  );
};
