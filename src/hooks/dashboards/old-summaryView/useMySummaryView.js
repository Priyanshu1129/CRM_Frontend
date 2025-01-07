// import { useState, useEffect, useCallback } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { getMySummaryView } from "@/redux/actions/dashboardAction"
// import { summaryViewActions } from "@/redux/slices/dashboardSlice"
// import { notification } from "antd"

// export const useFetchMySummaryView = ({ myViewStartDate, myViewEndDate, myView }) => {
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();
//     const [sDate, setSDate] = useState("2010-01-01"); // start date
//     const [eDate, setEDate] = useState(Date.now()); // end date
//     const [refresh, setRefresh] = useState(false);
//     const [filters, setFilters] = useState({});
//     const [filter, setFilter] = useState(false);
//     const { status, data, error } = useSelector((state) => state?.summaryView?.getMySummaryView || {});
//     const [summaryViewData, setSummaryViewData] = useState(data?.data);

//     const fetchMySummaryView = useCallback(() => {
//         dispatch(getMySummaryView({ startDate: myViewStartDate, endDate: myViewEndDate, ...filters }));
//     }, [dispatch, myViewEndDate, myViewStartDate, filters])

//     useEffect(() => {
//         if (refresh || myViewStartDate != sDate || myViewEndDate != eDate || (filter && filters)) {
//             if (myView) {
//                 fetchMySummaryView();
//                 setSDate(myViewStartDate);
//                 setEDate(myViewEndDate);
//             }
//         }
//         setFilter(false);
//     }, [sDate, eDate, myViewStartDate, myViewEndDate, refresh, fetchMySummaryView, filter, filters, myView])

//     useEffect(() => {
//         if (status === "pending") {
//             setLoading(true);
//         } else if (status === "success") {
//             setSummaryViewData(data?.data)
//             setLoading(false);
//             setRefresh(false);
//             dispatch(summaryViewActions.clearGetSummaryViewStatus());
//         } else if (status === "failed") {
//             setLoading(false);
//             setRefresh(false);
//             notification.error({
//                 message: "Error",
//                 description: error || "Failed to fetch summary view data."
//             })
//             dispatch(summaryViewActions.clearGetSummaryViewStatus());
//             dispatch(summaryViewActions.clearGetSummaryViewError());
//         }
//     }, [status, data, error, dispatch])

//     return { loading, summaryViewData, setRefresh, setFilters, setFilter, filters };
// }
