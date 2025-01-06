import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const useCheckDashboardViewPermission = (entity) => {
  const { permissions } = useSelector((state) => state.auth.authDetails);
  const router = useRouter();
  const [disabledViewButton, setDisableViewButton] = useState(true);
  let hasAllView = true;
  let hasMyView;
  let viewChecking = true;

  useEffect(() => {
    console.log("inside check view hook", entity);
    if (permissions) {
      const permissionEntity = permissions?.find(
        (perm) => perm.entity.entity === entity
      );
      console.log("permission entity", permissionEntity);
      hasAllView = permissionEntity?.allowedActions?.includes("ALL VIEW");
      hasMyView = permissionEntity?.allowedActions?.includes("MY VIEW");
      console.log(hasAllView, hasMyView);
      if (!hasAllView && !hasMyView) {
        router.replace("/unauthorized");
        return {};
      }
      if (hasMyView && hasAllView) {
        setDisableViewButton(false);
      }
      viewChecking = false;
    }
  }, [permissions]);

  return { disabledViewButton, hasAllView, viewChecking };
};
