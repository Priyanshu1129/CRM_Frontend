import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Col, Row } from "antd";

export const RevenueInput = () => (
  <Form.List
    name="revenue"
  >
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, ...restField }) => (
          <Row gutter={24} key={key}>
            <Col span={12}>
              <Form.Item
                label="Year"
                {...restField}
                name={[name, "year"]}
                rules={[
                  {
                    required: true,
                    message: "Please input year",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 1"
                name={[name, "Q1"]}
                rules={[
                  {
                    required: true,
                    message: "Please input quarter 1 revenue",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 2"
                name={[name, "Q2"]}
                rules={[
                  {
                    required: true,
                    message: "Please input quarter 2 revenue",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 3"
                name={[name, "Q3"]}
                rules={[
                  {
                    required: true,
                    message: "Please input quarter 3 revenue",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 4"
                name={[name, "Q4"]}
                rules={[
                  {
                    required: true,
                    message: "Please input quarter 4 revenue",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        ))}
        <Col span={24}>
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Revenue
            </Button>
          </Form.Item>
        </Col>
      </>
    )}
  </Form.List>
);
