import React, { useState, useEffect } from "react";
import { Select, Button, Space } from "antd";
import { useCurrencies } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "@/redux/slices/configurationSlice";

export const CurrencyChangeDropDown = () => {
  const { currencies, loading } = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState(null); // Currently selected (but unconfirmed)
  const [confirmedCurrency, setConfirmedCurrency] = useState(null); // Confirmed currency
  const [options, setOptions] = useState([]);

  const { currency: dispatchedCurrency } = useSelector(
    (state) => state.currency.viewCurrency
  );

  console.log("dc", dispatchedCurrency);

  const dispatch = useDispatch();

  // Update options and set default currency when currencies are fetched
  useEffect(() => {
    if (currencies?.length) {
      setOptions(currencies);

      // Set default currency as QAR when currencies are loaded
      const defaultCurrency = currencies.find(
        (currency) => currency.text === "QAR"
      )?.value;
      setSelectedCurrency(defaultCurrency);
      setConfirmedCurrency(defaultCurrency); // Set both selected and confirmed as default
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

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value); // Change selection but do not confirm yet
  };

  const handleConfirm = () => {
    setConfirmedCurrency(selectedCurrency); // Confirm the selected currency
  };

  const handleCancel = () => {
    setSelectedCurrency(confirmedCurrency); // Reset to the previously confirmed currency
  };

  console.log("Confirmed Currency: ", confirmedCurrency); // This will show the confirmed selection

  return (
    <div>
      <Select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        loading={loading}
        style={{ width: 100, marginRight: "20px" }}
        filterOption={false}
        showSearch
        onSearch={handleSearch}
      >
        {options?.map((currency) => (
          <Select.Option
            key={currency.text + currency.value}
            value={currency.value}
          >
            {currency.text}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
