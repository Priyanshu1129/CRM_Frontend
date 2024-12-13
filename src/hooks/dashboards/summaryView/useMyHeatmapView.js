import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMyHeatmapView } from "@/redux/actions/dashboardAction"
import { summaryViewActions } from "@/redux/slices/dashboardSlice"
import { notification } from "antd"

export const useFetchMyHeatmapView = ({ myViewYear, myViewStageId, myView }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear] = useState(myViewYear);
    const [selectedStage, setSelectedStage] = useState(myViewStageId);
    const [refresh, setRefresh] = useState(true);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);
    const { status, data, error } = useSelector((state) => state.summaryView.getMyHeatmapView);
    const [heatmapViewData, setHeatmapViewData] = useState(data?.data);

    const fetchMyHeatmapView = useCallback(() => {
        dispatch(getMyHeatmapView({ year: myViewYear, stageId: myViewStageId, ...filters }));
    }, [dispatch, myViewYear, myViewStageId, filters])

    useEffect(() => {
        if (refresh || selectedStage != myViewStageId || selectedYear != myViewYear || (filter && filters)) {
            if (myView) {
                fetchMyHeatmapView();
                setSelectedYear(myViewYear);
                setSelectedStage(myViewStageId);
            }
        }
        setFilter(false);
    }, [selectedStage, myViewStageId, selectedYear, myViewYear, refresh, fetchMyHeatmapView, filter, filters, myView])

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setHeatmapViewData(data?.data)
            setLoading(false);
            setRefresh(false);
            dispatch(summaryViewActions.clearGetHeatmapViewStatus());
        } else if (status === "failed") {
            setLoading(false);
            setRefresh(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch heatmap view data."
            })
            dispatch(summaryViewActions.clearGetHeatmapViewStatus());
            dispatch(summaryViewActions.clearGetHeatmapViewError());
        }
    }, [status, data, error, dispatch])

    return { loading, heatmapViewData, setRefresh, setFilters, setFilter, filters };
}