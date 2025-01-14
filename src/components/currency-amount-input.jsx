import React from "react";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";

export const CurrencyAmountInput = ({
  name,
  label,
  disabled = false,
  rules = [],
  restField = {},
}) => {
  const { currency: defaultCurrency } = useSelector(
    (state) => state.currency.viewCurrency
  );

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
