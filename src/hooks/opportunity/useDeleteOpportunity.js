import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { deleteOpportunity } from "@/redux/actions/opportunityAction";

export const useDeleteOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error, confirm } = useSelector(
    (state) => state.opportunity.deleteOpportunity
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${confirm ? "opportunity and related entities deleted successfully" : "Items to be deleted fetched successfully"}`,
      });
      dispatch(opportunityActions.clearDeleteOpportunityError());
      dispatch(opportunityActions.clearDeleteOpportunityStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${confirm ? "fetch deletion Opp. data to be deleted" : "Delete Opp. and related data"}`,
      });
      dispatch(opportunityActions.clearDeleteOpportunityStatus());
      dispatch(opportunityActions.clearDeleteOpportunityError());
    }
  }, [status, error, dispatch]);

  const handleDeleteOpportunity = (opportunityId, confirm = 'false') => {
      dispatch(deleteOpportunity(opportunityId, confirm));
  };

  return {loading, data, handleDeleteOpportunity};
};
