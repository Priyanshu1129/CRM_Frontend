import React, { useState, useEffect } from "react";
import { Select, Button, Space } from "antd";
import { useCurrencies } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "@/redux/slices/configurationSlice";

export const CurrencyChangeDropDown = () => {
  const { currencies, loading } = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState(null); // Currently selected (but unconfirmed)
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  // Update options and set default currency when currencies are fetched
  useEffect(() => {
    if (currencies?.length) {
      setOptions(currencies);

      // Set default currency as QAR when currencies are loaded
      const defaultCurrency = currencies.find(
        (currency) => currency.text === "QAR"
      );
      setSelectedCurrency({
        key: defaultCurrency?.text,
        value: defaultCurrency?.value,
      });
    }
  }, [currencies]);

  useEffect(() => {
    if (selectedCurrency) {
      dispatch(currencyActions.setViewCurrency(selectedCurrency));
    }
  }, [selectedCurrency, dispatch]);

  const handleSearch = (inputValue) => {
    const filteredOptions = currencies?.filter(
      (currency) =>
        currency.value.toString().includes(inputValue.toLowerCase()) ||
        currency.text.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  const handleCurrencyChange = (value, option) => {
    setSelectedCurrency({ value, key: option.key });
  };

  return (
    <div>
      <Select
        value={selectedCurrency?.value}
        onChange={handleCurrencyChange}
        loading={loading}
        style={{ width: 100, marginRight: "20px" }}
        filterOption={false}
        showSearch
        onSearch={handleSearch}
      >
        {options?.map((currency) => (
          <Select.Option key={currency.text} value={currency.value}>
            {currency.text}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
