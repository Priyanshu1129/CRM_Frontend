import React, { useState } from 'react';
import { Table, Select, Input, Button } from 'antd';

const { Option } = Select;

const CurrencyFilterDropdown = ({ currencies, onChange }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('1'); // Default to USD

    const handleCurrencyChange = (value) => {
        setSelectedCurrency(value);
        onChange(value);
    };

    return (
        <div style={{ padding: 8 }}>
            <Select
                placeholder="Select currency"
                onChange={handleCurrencyChange}
                style={{ width: 120, marginBottom: 8 }}
                defaultValue={selectedCurrency}
            >
                {currencies.map(currency => (
                    <Option key={currency.value} value={currency.value}>
                        {currency.text}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

const MyTable = ({ data, currencies }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('1'); // Default to USD

    const handleCurrencyChange = (value) => {
        setSelectedCurrency(value);
    };

    // const convertValue = (value) => {
    //     const currency = currencies.find(c => c.value === selectedCurrency);
    //     const conversionRate = currency ? parseFloat(currency.value) : 1;
    //     return value ? `$${(value * conversionRate).toFixed(2)}` : 'N/A';
    // };

    const columns = [
        {
            title: "Bond Value",
            dataIndex: "bondValue",
            key: "bondValue",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <CurrencyFilterDropdown
                        currencies={currencies}
                        onChange={(value) => {
                            setSelectedKeys([value]); // Use selectedKeys to trigger filtering
                            confirm(); // Close dropdown
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        style={{ marginRight: 8 }}
                    >
                        Apply
                    </Button>
                    <Button onClick={() => clearFilters()}>
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: filtered => (
                <Select
                    placeholder="Select currency"
                    style={{ width: 120 }}
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                >
                    {currencies.map(currency => (
                        <Option key={currency.value} value={currency.value}>
                            {currency.text}
                        </Option>
                    ))}
                </Select>
            ),
            render: (value) => convertValue(value),
            width: 120,
        },
        // other columns
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default MyTable;
