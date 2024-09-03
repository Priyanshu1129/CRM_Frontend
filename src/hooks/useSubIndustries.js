import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubIndustries } from '@/redux/actions/configurationAction';

export const useSubIndustries = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, data } = useSelector((state) => state.subIndustry.getAllSubIndustries);
    const [subIndustries, setSubIndustries] = useState(data?.data);

    const fetchAllSubIndustries = useCallback(() => {
        if (!subIndustries) {
            dispatch(getAllSubIndustries());
        }
    }, [dispatch, subIndustries]);

    useEffect(() => {
        fetchAllSubIndustries();
    }, [fetchAllSubIndustries]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success" && data?.status === "success") {
            setSubIndustries(data?.data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [status, data]);

    const transformedSubIndustries = useMemo(() => {
        return subIndustries?.map(({ _id, label }) => ({
            value: _id,
            text: label,
        }));
    }, [subIndustries]);

    return { subIndustries: transformedSubIndustries ?? [], loading };
};
