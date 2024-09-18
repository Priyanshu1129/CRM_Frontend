import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useCurrencies } from "@/hooks";

export const CurrencyAmountInput = ({ name, label, rules, setCurrency }) => {
  const { currencies, loading: currenciesLoading } = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState(null); // Initially set to null
  const [options, setOptions] = useState([]);

  // Update options and set default currency when currencies are fetched
  useEffect(() => {
    if (currencies?.length) {
      setOptions(currencies);

      // Set default currency as QAR when currencies are loaded
      const defaultCurrency = currencies.find(
        (currency) => currency.text === "QAR"
      )?.value;
      setSelectedCurrency(defaultCurrency);
      setCurrency(defaultCurrency);
    }
  }, [currencies, setCurrency]);

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
        onChange={() => setCurrency}
        addonBefore={
          <Select
            style={{ width: "70px" }}
            showSearch
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            filterOption={false}
            onSearch={handleSearch}
            loading={currenciesLoading}
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
      />
    </Form.Item>
  );
};
