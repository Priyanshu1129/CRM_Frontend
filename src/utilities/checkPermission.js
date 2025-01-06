import { routePermissions, sideBarPermissions } from "@/config/permissions";

const matchDynamicRoute = (route) => {
  const routeKeys = Object.keys(routePermissions);
  // Find the first route pattern that matches the current route
  return routeKeys.find((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/:\w+/g, "\\w+")}$`); // Replace dynamic segments with regex matchers
    return regex.test(route);
  });
};

export const hasPermission = (permissions = [], requiredPermissions) => {
  return requiredPermissions?.some(({ entity, action }) => {
    if (entity == "ROLE ENTITY") {
      return permissions?.some(
        (perm) =>
          perm.entity.roleId !== null &&
          action?.some((requiredAction) =>
            perm.allowedActions.includes(requiredAction)
          )
      );
    } else {
      return permissions?.some(
        (perm) =>
          perm.entity.entity === entity &&
          action?.some((requiredAction) =>
            perm.allowedActions.includes(requiredAction)
          )
      );
    }
  });
};

export const hasRoutePermission = (permissions, route) => {
  // Match the dynamic route to its base pattern
  return true;
  const matchedRoute = matchDynamicRoute(route);
  if (!matchedRoute) return true; // If no permissions are defined for the route
  const routePermission = routePermissions[matchedRoute];
  if (!routePermission || routePermission.length == 0) return true; // No specific permissions required for this route

  return hasPermission(permissions, routePermission);
};

export const getAuthorizedResources = (resources, permissions) => {
  return resources
    .map((resource) => {
      if (resource.key === "dashboard") {
        // Handle dashboard and its children
        const authorizedChildren = resource.children.filter((child) =>
          hasPermission(permissions, sideBarPermissions[child.key])
        );

        if (authorizedChildren.length > 0) {
          // Return dashboard with only authorized children
          return {
            ...resource,
            children: authorizedChildren,
          };
        }

        // Do not include dashboard if no children are authorized
        return null;
      } else {
        // Handle other resources
        return hasPermission(permissions, sideBarPermissions[resource.key])
          ? resource
          : null;
      }
    })
    .filter(Boolean); // Remove null entries
};
