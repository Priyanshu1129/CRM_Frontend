import React, { useState } from "react";
import { Select, Button } from "antd";

const { Option } = Select;

export const CurrencyFilterDropdown = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
  };

  console.log("filter", currencies);
  return (
    <div style={{ padding: 8 }}>
      <Select
        placeholder="Select currency"
        onChange={handleCurrencyChange}
        open
        style={{ width: 120, marginBottom: 8 }}
        defaultValue={selectedCurrency}
      >
        {currencies?.map((currency) => (
          <Option key={currency.value} value={currency.value}>
            {currency.text}
          </Option>
        ))}
      </Select>
      {/* <Button
        type="primary"
        onClick={() => confirm()}
        style={{ marginRight: 8 }}
      >
        Apply
      </Button>
      <Button onClick={() => clearFilters()}>Reset</Button> */}
    </div>
  );
};
