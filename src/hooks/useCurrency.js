import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrencies } from '@/redux/actions/configurationAction';
import { Ojuju } from 'next/font/google';

export const useCurrencies = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, data } = useSelector((state) => state.currency.getAllCurrencies);
    const [currencies, setCurrencies] = useState(data?.data.conversionRates);

    const fetchAllCurrencies = useCallback(() => {
        if (!data) {
            dispatch(getAllCurrencies());
        }
    }, [dispatch, data]);

    useEffect(() => {
        fetchAllCurrencies();
    }, [fetchAllCurrencies]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success" && data?.status === "success") {
            setCurrencies(data?.data.conversionRates);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [status, data]);

    const transformedCurrencies = useMemo(() => {
        if (currencies)
            return Object.keys(currencies)?.map((key) => ({
                value: currencies[key],
                text: key,
            }));
        else return [];
    }, [currencies]);

    return { currencies: transformedCurrencies ?? [], loading };
};
