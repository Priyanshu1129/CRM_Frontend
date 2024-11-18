import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useCurrencies } from "@/hooks";
import { useSelector } from "react-redux";

export const CurrencyAmountInput = ({
  name,
  label,
  rules = [],
  setCurrency,
  disabled = false,
}) => {
  const { currencies, loading: currenciesLoading } = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState(null); // Initially set to null
  const [options, setOptions] = useState([]);
  const { currency: defaultCurrency } = useSelector(
    (state) => state.currency.viewCurrency
  );

  // Update options and set default currency when currencies are fetched
  useEffect(() => {
    if (currencies?.length) {
      setOptions(currencies);
      setSelectedCurrency(defaultCurrency?.value);
      setCurrency(defaultCurrency?.value);
    }
  }, [currencies, setCurrency, defaultCurrency]);

  const handleSearch = (inputValue) => {
    const filteredOptions = currencies?.filter(
      (currency) =>
        currency.value.toString().includes(inputValue.toLowerCase()) ||
        currency.text.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
    setCurrency && setCurrency(value);
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input
        addonBefore={
          <Select
            style={{ width: "70px" , backgroundColor : "red" }}
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            filterOption={false}
            onSearch={handleSearch}
            loading={currenciesLoading}
            disabled
          >
            {options?.length ? (
              options.map((currency, idx) => (
                <Select.Option key={idx} value={currency.value}>
                  {currency.text}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>No options available</Select.Option>
            )}
          </Select>
        }
        type="number"
        placeholder="Enter amount"
        disabled={disabled}
      />
    </Form.Item>
  );
};
