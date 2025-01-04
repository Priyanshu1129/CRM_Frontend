import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCurrencies } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useCurrencies = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.currency.getAllCurrencies
  );
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
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Currencies",
      });
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
