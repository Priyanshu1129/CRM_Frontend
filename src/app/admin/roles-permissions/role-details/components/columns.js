import { Space, Checkbox } from "antd";

let actionLabels = {
  YES: "ALLOW",
  CREATE: "ADD NEW",
  READ: "DETAILS VIEW",
  "GET ALL": "LIST VIEW",
  UPDATE: "UPDATE",
  DELETA: "DELETE",
};

export const getColumns = ({
  checkedActions,
  handleActionCheck,
  handleModuleCheck,
  canUpdateRole,
}) => {
  // Columns configuration for the table
  const columns = [
    {
      title: "Modules",
      dataIndex: "label",
      key: "entity",
      render: (text, record, index) => (
        <Checkbox
          disabled={!canUpdateRole}
          checked={
            checkedActions[index].allowedActions.length ===
              record.actions.length && record.actions.length > 0
          }
          onChange={(e) => handleModuleCheck(index, e.target.checked)}
        >
          {record.roleId ? `${text} (User)` : text}
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
              disabled={!canUpdateRole}
              checked={checkedActions[index].allowedActions.includes(action)}
              onChange={(e) =>
                handleActionCheck(index, action, e.target.checked)
              }
            >
              {actionLabels[action] ?? action}
            </Checkbox>
          ))}
        </Space>
      ),
    },
  ];

  return columns;
};
