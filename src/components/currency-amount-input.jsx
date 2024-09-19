import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";

export const CurrencyAmountInput = ({
  name,
  label,
  setCurrency,
  disabled = false,
  rules = [],
  restField = {},
}) => {
  const { currency: defaultCurrency } = useSelector(
    (state) => state.currency.viewCurrency
  );

  useEffect(() => {
    if (defaultCurrency) {
      setCurrency(defaultCurrency?.value);
    }
  }, [setCurrency, defaultCurrency]);

  return (
    <Form.Item {...restField} name={name} label={label} rules={rules}>
      <Input
        prefix={defaultCurrency?.key}
        type="number"
        placeholder="Enter amount"
        disabled={disabled}
      />
    </Form.Item>
  );
};
