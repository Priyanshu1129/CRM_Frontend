import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getEntityPermissions } from "../../app/dashboards/utilites/getDashboardViewPermission";

export const useCheckViewPermissions = (entity) => {
  const { permissions, data } = useSelector((state) => state.auth.authDetails);

  const [canSeeMyView, setCanSeeMyView] = useState(false);
  const [canSeeAllView, setCanSeeAllView] = useState(false);
  const [myView, setMyView] = useState(false);

  useEffect(() => {
    if (data?.role?.name === "SUPER ADMIN") {
      setCanSeeAllView(true);
      setCanSeeMyView(true);
    } else if (permissions) {
      const pipeViewPermissions = getEntityPermissions(permissions, entity);

      setCanSeeMyView(pipeViewPermissions.includes("MY VIEW"));
      setCanSeeAllView(pipeViewPermissions.includes("ALL VIEW"));
    }
  }, [permissions]);

  useEffect(() => {
    if (!canSeeMyView && canSeeAllView) setMyView(false); // Force All View if only "ALL VIEW" is allowed
    if (canSeeMyView && !canSeeAllView) setMyView(true); // Force My View if only "MY VIEW" is allowed
  }, [canSeeMyView, canSeeAllView]);

  return { canSeeMyView, canSeeAllView, myView, setMyView };
};
