import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTerritories } from '@/redux/actions/configurationAction';

export const useTerritories = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, data } = useSelector((state) => state.territory.getAllTerritories);
    const [territories, setTerritories] = useState(data?.data);

    const fetchAllTerritories = useCallback(() => {
        if (!data) {
            dispatch(getAllTerritories());
        }
    }, [dispatch, data]);

    useEffect(() => {
        fetchAllTerritories();
    }, [fetchAllTerritories]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success" && data?.status === "success") {
            setTerritories(data?.data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [status, data]);

    const transformedTerritories = useMemo(() => {
        return territories?.map(({ _id, label }) => ({
            value: _id,
            text: label,
        }));
    }, [territories]);

    return { territories: transformedTerritories ?? [], loading };
};
