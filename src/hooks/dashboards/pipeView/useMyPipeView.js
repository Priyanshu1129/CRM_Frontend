import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPipeView } from "@/redux/actions/dashboardAction";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import moment from "moment";

export const useFetchMyPipeView = ({
  myViewParticularDate,
  myView,
  canSeeMyView,
  filters,
  filter,
  setFilter,
  refresh,
  setRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const rawCurrentDate = useSelector(
    (state) => state.pipeView.myViewCurrentDate
  );
  const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;
  const { status, data, error } = useSelector(
    (state) => state.pipeView.getMyPipeView
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

  const fetchMyPipeView = useCallback(() => {
    dispatch(
      getMyPipeView({ particularDate: myViewParticularDate, ...filters })
    );
  }, [dispatch, myViewParticularDate, filters]);

  useEffect(() => {
    if (
      refresh ||
      !currentDate?.isSame(myViewParticularDate, "day") ||
      (filter && filters)
    ) {
      if (myView && canSeeMyView) {
        fetchMyPipeView();
        dispatch(
          pipeViewActions.setMyViewCurrentDate(
            myViewParticularDate.toISOString()
          )
        );
      }
    }
    setFilter(false);
    setRefresh(false);
  }, [
    currentDate,
    dispatch,
    myViewParticularDate,
    refresh,
    fetchMyPipeView,
    filter,
    filters,
    myView,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setOpportunities(data?.data);
      setLoading(false);
      dispatch(pipeViewActions.clearGetMyPipeViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch pipe view data.",
      });
      dispatch(pipeViewActions.clearGetMyPipeViewStatus());
      dispatch(pipeViewActions.clearGetMyPipeViewError());
    }
  }, [status, data, error, dispatch]);

  if (!canSeeMyView || !myView) {
    return {
      loading: false,
      opportunities: null,
    };
  }

  return { loading, opportunities };
};

// import { useState, useEffect, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getMyPipeView } from "@/redux/actions/dashboardAction";
// import { pipeViewActions } from "@/redux/slices/dashboardSlice";
// import { notification } from "antd";
// import moment from "moment";

// export const useFetchMyPipeView = ({
//   myViewParticularDate,
//   myView,
//   canSeeMyView,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const rawCurrentDate = useSelector(
//     (state) => state.pipeView.myViewCurrentDate
//   );
//   const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;
//   const [refresh, setRefresh] = useState(false);
//   const [filters, setFilters] = useState({});
//   const [filter, setFilter] = useState(false);
//   const { status, data, error } = useSelector(
//     (state) => state.pipeView.getMyPipeView
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

//   // Early exit logic
//   if (!canSeeMyView || !myView) {
//     return {
//       loading: false,
//       opportunities: null,
//       setRefresh,
//       setFilters,
//       setFilter,
//       filters,
//     };
//   }

//   const fetchMyPipeView = useCallback(() => {
//     dispatch(
//       getMyPipeView({ particularDate: myViewParticularDate, ...filters })
//     );
//   }, [dispatch, myViewParticularDate, filters]);

//   useEffect(() => {
//     if (
//       refresh ||
//       !currentDate?.isSame(myViewParticularDate, "day") ||
//       (filter && filters)
//     ) {
//       if (myView) {
//         fetchMyPipeView();
//         dispatch(
//           pipeViewActions.setMyViewCurrentDate(
//             myViewParticularDate.toISOString()
//           )
//         );
//       }
//     }
//     setFilter(false);
//     setRefresh(false);
//   }, [
//     currentDate,
//     dispatch,
//     myViewParticularDate,
//     refresh,
//     fetchMyPipeView,
//     filter,
//     filters,
//     myView,
//   ]);

//   useEffect(() => {
//     if (status === "pending") {
//       setLoading(true);
//     } else if (status === "success") {
//       setOpportunities(data?.data);
//       setLoading(false);
//       dispatch(pipeViewActions.clearGetMyPipeViewStatus());
//     } else if (status === "failed") {
//       setLoading(false);
//       notification.error({
//         message: "Error",
//         description: error || "Failed to fetch pipe view data.",
//       });
//       dispatch(pipeViewActions.clearGetMyPipeViewStatus());
//       dispatch(pipeViewActions.clearGetMyPipeViewError());
//     }
//   }, [status, data, error, dispatch]);

//   return { loading, opportunities, setRefresh, setFilters, setFilter, filters };
// };
