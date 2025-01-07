import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPipeView } from "@/redux/actions/dashboardAction";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import moment from "moment";

export const useFetchPipeView = ({
  myView,
  allViewParticularDate,
  canSeeAllView,
  refresh,
  setRefresh,
  filters,
  filter,
  setFilter,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const rawCurrentDate = useSelector(
    (state) => state.pipeView.allViewCurrentDate
  );
  const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;
  const { status, data, error } = useSelector(
    (state) => state.pipeView.getPipeView
  );
  const [opportunities, setOpportunities] = useState(
    data?.data || {
      lead: [],
      prospect: [],
      qualification: [],
      followup: [],
      proposal: [],
      closing: [],
    }
  );

  if (!canSeeAllView || myView) {
    return {
      loading: false,
      opportunities: null,
    };
  }

  const fetchPipeView = useCallback(() => {
    dispatch(
      getPipeView({ particularDate: allViewParticularDate, ...filters })
    );
  }, [dispatch, filters, allViewParticularDate]);

  useEffect(() => {
    if (
      refresh ||
      !currentDate?.isSame(allViewParticularDate, "day") ||
      (filter && filters)
    ) {
      if (!myView && canSeeAllView) {
        fetchPipeView();
        dispatch(
          pipeViewActions.setAllViewCurrentDate(
            allViewParticularDate.toISOString()
          )
        );
      }
    }
    setFilter(false);
    setRefresh(false);
  }, [
    refresh,
    fetchPipeView,
    filter,
    filters,
    myView,
    currentDate,
    allViewParticularDate,
    dispatch,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setOpportunities(data?.data);
      setLoading(false);
      dispatch(pipeViewActions.clearGetPipeViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch pipe view data.",
      });
      dispatch(pipeViewActions.clearGetPipeViewStatus());
      dispatch(pipeViewActions.clearGetPipeViewError());
    }
  }, [status, data, error, dispatch]);

  return { loading, opportunities };
};

// import { useState, useEffect, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getPipeView } from "@/redux/actions/dashboardAction";
// import { pipeViewActions } from "@/redux/slices/dashboardSlice";
// import { notification } from "antd";
// import moment from "moment";

// export const useFetchPipeView = ({ myView, particularDate, canSeeAllView }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const rawCurrentDate = useSelector((state) => state.pipeView.currentDate);
//   const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;
//   const [refresh, setRefresh] = useState(false);
//   const [filters, setFilters] = useState({});
//   const [filter, setFilter] = useState(false);
//   const { status, data, error } = useSelector(
//     (state) => state.pipeView.getPipeView
//   );
//   const [opportunities, setOpportunities] = useState(
//     data?.data || {
//       lead: [],
//       prospect: [],
//       qualification: [],
//       followup: [],
//       proposal: [],
//       closing: [],
//     }
//   );

//   if (!canSeeAllView || myView) {
//     return {
//       loading: false,
//       opportunities: null,
//       setRefresh,
//       setFilters,
//       setFilter,
//       filters,
//     };
//   }

//   const fetchPipeView = useCallback(() => {
//     dispatch(getPipeView({ particularDate, ...filters }));
//   }, [dispatch, filters, particularDate]);

//   useEffect(() => {
//     if (
//       refresh ||
//       !currentDate?.isSame(particularDate, "day") ||
//       (filter && filters)
//     ) {
//       if (!myView) {
//         fetchPipeView();
//         dispatch(pipeViewActions.setCurrentDate(particularDate.toISOString()));
//       }
//     }
//     setFilter(false);
//     setRefresh(false);
//   }, [
//     refresh,
//     fetchPipeView,
//     filter,
//     filters,
//     myView,
//     currentDate,
//     particularDate,
//     dispatch,
//   ]);

//   useEffect(() => {
//     if (status === "pending") {
//       setLoading(true);
//     } else if (status === "success") {
//       setOpportunities(data?.data);
//       setLoading(false);
//       dispatch(pipeViewActions.clearGetPipeViewStatus());
//     } else if (status === "failed") {
//       setLoading(false);
//       notification.error({
//         message: "Error",
//         description: error || "Failed to fetch pipe view data.",
//       });
//       dispatch(pipeViewActions.clearGetPipeViewStatus());
//       dispatch(pipeViewActions.clearGetPipeViewError());
//     }
//   }, [status, data, error, dispatch]);

//   return { loading, opportunities, setRefresh, setFilters, setFilter, filters };
// };
