import { routePermissions, sideBarPermissions } from "@/config/permissions";

// export const hasPermission = (
//   permissions = [],
//   requiredPermissions,
//   dynamicParams = {}
// ) => {
//   return requiredPermissions?.some(({ entity, action }) => {
//     if (entity === "ROLE ENTITY" && dynamicParams.roleId) {
//       return permissions?.some(
//         (perm) =>
//           perm?.entity?.roleId === dynamicParams.roleId && // Match roleId dynamically
//           action?.some((requiredAction) =>
//             perm.allowedActions.includes(requiredAction)
//           )
//       );
//     } else {
//       return permissions?.some(
//         (perm) =>
//           perm?.entity?.entity === entity &&
//           action?.some((requiredAction) =>
//             perm?.allowedActions.includes(requiredAction)
//           )
//       );
//     }
//   });
// };

export const hasPermission = (
  permissions = [],
  requiredPermissions,
  dynamicParams = {}
) => {
  return requiredPermissions?.some(({ entity, action }) => {
    if (entity === "ROLE ENTITY") {
      if (dynamicParams?.roleId) {
        // Check for roleId in permissions
        return permissions?.some(
          (perm) =>
            perm?.entity?.roleId === dynamicParams.roleId &&
            action?.some((requiredAction) =>
              perm.allowedActions.includes(requiredAction)
            )
        );
      } else {
        // Check for ROLE ENTITY permissions where roleId is not null or undefined
        return permissions?.some(
          (perm) =>
            perm?.entity?.roleId && // Ensure roleId exists
            action?.some((requiredAction) =>
              perm.allowedActions.includes(requiredAction)
            )
        );
      }
    } else {
      // General entity and action match
      return permissions?.some(
        (perm) =>
          perm?.entity?.entity === entity &&
          action?.some((requiredAction) =>
            perm.allowedActions.includes(requiredAction)
          )
      );
    }
  });
};

const extractDynamicParams = (route, matchedRoute) => {
  const routeSegments = route.split("/");
  const patternSegments = matchedRoute.split("/");
  const dynamicParams = {};

  patternSegments.forEach((segment, index) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1); // Remove the ":" prefix
      dynamicParams[paramName] = routeSegments[index];
    }
  });

  return dynamicParams;
};

const matchDynamicRoute = (route) => {
  const routeKeys = Object.keys(routePermissions);
  // Find the first route pattern that matches the current route
  return routeKeys.find((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/:\w+/g, "\\w+")}$`); // Replace dynamic segments with regex matchers
    return regex.test(route);
  });
};

export const hasRoutePermission = (permissions, route) => {
  const matchedRoute = matchDynamicRoute(route);
  if (!matchedRoute) return true; // If no permissions are defined for the route
  const routePermission = routePermissions[matchedRoute];
  if (!routePermission || routePermission.length === 0) return true; // No specific permissions required for this route
  // Extract dynamic parameters from the route
  const dynamicParams = extractDynamicParams(route, matchedRoute);
  console.log("dynamic params", dynamicParams);
  return hasPermission(permissions, routePermission, dynamicParams);
};

// for sidebar resources
export const getAuthorizedResources = (resources, permissions) => {
  console.log("admin-resources", resources);
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
        console.log("items", sideBarPermissions[resource.key]);
        // Handle other resources
        return hasPermission(permissions, sideBarPermissions[resource.key])
          ? resource
          : null;
      }
    })
    .filter(Boolean); // Remove null entries
};

// for dashboard view
export const getEntityPermissions = (permissions, entityName) => {
  const entityPermission = permissions?.find(
    (permission) => permission?.entity?.entity === entityName
  );
  return entityPermission ? entityPermission.allowedActions : [];
};

// export const hasPermission = (permissions = [], requiredPermissions) => {
//   return requiredPermissions?.some(({ entity, action }) => {
//     if (entity == "ROLE ENTITY") {
//       return permissions?.some(
//         (perm) =>
//           perm?.entity?.roleId !== roleId &&
//           action?.some((requiredAction) =>
//             perm.allowedActions.includes(requiredAction)
//           )
//       );
//     } else {
//       return permissions?.some(
//         (perm) =>
//           perm?.entity?.entity === entity &&
//           action?.some((requiredAction) =>
//             perm?.allowedActions.includes(requiredAction)
//           )
//       );
//     }
//   });
// };

// for routing
// export const hasRoutePermission = (permissions, route) => {
//   // Match the dynamic route to its base pattern
//   const matchedRoute = matchDynamicRoute(route);
//   console.log(matchedRoute);
//   if (!matchedRoute) return true; // If no permissions are defined for the route
//   const routePermission = routePermissions[matchedRoute];
//   if (!routePermission || routePermission.length == 0) return true; // No specific permissions required for this route
//   return hasPermission(permissions, routePermission);
// };
