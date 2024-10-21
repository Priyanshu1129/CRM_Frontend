import { Space, Checkbox } from "antd";
export const getColumns = ({ checkedActions, handleActionCheck, handleModuleCheck }) => {
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

    return columns;

}