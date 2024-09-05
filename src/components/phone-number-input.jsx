import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { countryCode } from "@/config/data";

export const InputPhoneNumber = ({
  name,
  label,
  rules,
  phoneCountryCode,
  setPhoneCountryCode,
}) => {
  const [options, setOptions] = useState(countryCode);

  const handleSearch = (inputValue) => {
    const filteredOptions = countryCode.filter(
      (country) =>
        country.dial_code.toLowerCase().includes(inputValue.toLowerCase()) ||
        country.code.toLowerCase().includes(inputValue.toLowerCase()) ||
        country.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input
        addonBefore={
          <Select
            showSearch
            value={phoneCountryCode}
            onChange={setPhoneCountryCode}
            filterOption={false}
            onSearch={handleSearch}
          >
            {options.map((country) => (
              <Select.Option key={country.code} value={country.dial_code}>
                {country.dial_code} {country.code}
              </Select.Option>
            ))}
          </Select>
        }
        type="number"
      />
    </Form.Item>
  );
};
