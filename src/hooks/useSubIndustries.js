import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubIndustries } from '@/redux/actions/configurationAction';

export const useSubIndustries = (params = {}) => {
    const { refresh = false, setRefresh = null, configType = null } = params;

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, data } = useSelector((state) => state.subIndustry.getAllSubIndustries);
    const [subIndustries, setSubIndustries] = useState(data?.data);

    const fetchAllSubIndustries = useCallback(() => {
        if (!data || refresh) {
            dispatch(getAllSubIndustries());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        if (!configType || configType == "subIndustry")
            fetchAllSubIndustries();
    }, [fetchAllSubIndustries, configType]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success" && data?.status === "success") {
            setSubIndustries(data?.data);
            setLoading(false);
            setRefresh && setRefresh(false);
        } else {
            setLoading(false);
        }
    }, [status, data, setRefresh]);

    const transformedSubIndustries = useMemo(() => {
        return subIndustries?.map(({ _id, label }) => ({
            value: _id,
            text: label,
        }));
    }, [subIndustries]);

    return { subIndustries: transformedSubIndustries ?? [], loading };
};
