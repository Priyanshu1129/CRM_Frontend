const ActionButtons = ({ showUrl = "", deleteUrl = "" }) => {
  return (
    <Space>
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

      <Button
        onClick={() => {
          console.log("delete opp url : ", deleteUrl);
          router.push(deleteUrl);
        }}
        disabled={!canDelete}
        size="small"
        danger
        icon={<DeleteOutlined />}
      />
    </Space>
  );
};

export default ActionButtons;