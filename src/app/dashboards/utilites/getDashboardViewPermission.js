export const getEntityPermissions = (permissions, entityName) => {
  const entityPermission = permissions?.find(
    (permission) => permission?.entity?.entity === entityName
  );
  return entityPermission ? entityPermission.allowedActions : [];
};
