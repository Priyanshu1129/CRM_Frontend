import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllIndustries } from "@/redux/actions/configurationAction";

export const useIndustries = (params = {}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { refresh = false, setRefresh=null} = params


    const { status, data } = useSelector(
        (state) => state.industry.getAllIndustries
    );
    const [industries, setIndustries] = useState(data?.data);

    const fetchAllIndustries = useCallback(() => {
        if (!data || refresh) {
            dispatch(getAllIndustries());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllIndustries();
    }, [fetchAllIndustries]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success" && data?.status === "success") {
            if (data?.data !== industries) {
                setIndustries(data?.data);
            }
            setLoading(false);
            setRefresh && setRefresh(false);
        } else {
            setLoading(false);
        }
    }, [status, data, industries]);

    const transformedIndustries = useMemo(() => {
        return industries?.map(({ _id, label }) => ({
            value: _id,
            text: label,
        }));
    }, [industries]);

    return { industries: transformedIndustries ?? [], loading };
};