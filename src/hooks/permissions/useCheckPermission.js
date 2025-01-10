import { hasRoutePermission } from "@/utilities/checkPermission";
import { useSelector } from "react-redux";

export const useCheckPermission = (route) => {
  const { permissions, data } = useSelector((state) => state.auth.authDetails);
  if (data.role.name === "SUPER ADMIN") return true;

  return hasRoutePermission(permissions, route);
};
