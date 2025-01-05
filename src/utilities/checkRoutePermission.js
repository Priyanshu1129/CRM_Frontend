import { routePermissions } from "@/config/routePermissions";

export const hasRoutePermission = (permissions, route) => {
  const routePermission = routePermissions[route];
  if (!routePermission) return true; // No specific permissions required for this route

  const { entity, action } = routePermission;

  return permissions.some(
    (perm) =>
      perm.entity.entity === entity &&
      action.some((requiredAction) =>
        perm.allowedActions.includes(requiredAction)
      )
  );
};
