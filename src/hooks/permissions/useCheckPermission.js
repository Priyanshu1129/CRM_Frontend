import { useSelector } from "react-redux";

export const usePermission = (entity, action) => {
  const permissions = useSelector(
    (state) => state.auth.authDetails.permissions
  );
  return permissions.some(
    (perm) =>
      perm.entity.entity === entity && perm.allowedActions.includes(action)
  );
};
