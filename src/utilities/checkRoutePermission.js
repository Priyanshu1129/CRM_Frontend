import { routePermissions } from "@/config/routePermissions";

export const hasRoutePermission = (permissions, route) => {
  console.log("route", route);
  const routePermission = routePermissions[route];
  if (!routePermission || routePermission.length == 0) return true; // No specific permissions required for this route

  return routePermission.some(({ entity, action }) => {
    return permissions.some(
      (perm) =>
        perm.entity.entity === entity &&
        action.some((requiredAction) =>
          perm.allowedActions.includes(requiredAction)
        )
    );
  });
};
