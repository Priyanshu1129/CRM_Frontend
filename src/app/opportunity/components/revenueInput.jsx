import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Col, Row } from "antd";
import { CurrencyAmountInput } from "@/components";
export const RevenueInput = ({ rules, form }) => {
  return (
    <Form.List name="revenue">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={24} key={key}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label="Year"
                  {...restField}
                  name={[name, "year"]}
                  rules={rules.year}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={16} lg={18} style={{ display: "flex" }}>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Col>
              <Col span={6}>
                <CurrencyAmountInput
                  restField={restField}
                  label="Quarter 1"
                  name={[name, "Q1"]}
                  rules={rules.quarter}
                />
              </Col>
              <Col span={6}>
                <CurrencyAmountInput
                  restField={restField}
                  label="Quarter 2"
                  name={[name, "Q2"]}
                  rules={rules.quarter}
                />
              </Col>
              <Col span={6}>
                <CurrencyAmountInput
                  restField={restField}
                  label="Quarter 3"
                  name={[name, "Q3"]}
                  rules={rules.quarter}
                />
              </Col>
              <Col span={6}>
                <CurrencyAmountInput
                  restField={restField}
                  label="Quarter 4"
                  name={[name, "Q4"]}
                  rules={rules.quarter}
                />
              </Col>
            </Row>
          ))}
          <div style={{ padding: 0, width: "100%" }}>
            <Form.Item>
              <Button
                style={{ maxWidth: "200px" }}
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Revenue
              </Button>
            </Form.Item>
          </div>
        </>
      )}
    </Form.List>
  );
};
