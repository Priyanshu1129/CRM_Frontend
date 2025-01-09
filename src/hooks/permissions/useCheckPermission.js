// import { hasRoutePermission } from "@/utilities/checkPermission";
// import { useSelector } from "react-redux";

export const useCheckPermission = (route) => {
  // const { permissions, data } = useSelector((state) => state.auth.authDetails);
  // if (data.role.name === "SUPER ADMIN") return true;
  // return hasPermission(permissions, [action]);
  // return permissions.some(
  //   (perm) =>
  //     perm.entity.entity === entity && perm.allowedActions.includes(action)
  // );
  // return hasRoutePermission(permissions, route);
  return true;
};
