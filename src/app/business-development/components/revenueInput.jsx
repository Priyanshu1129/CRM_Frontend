import React from "react";
import { MinusCircleOutlined, MinusCircleTwoTone, PlusCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Col, Row } from "antd";
const onFinish = (values) => {
  console.log("Received values of form:", values);
};
export const RevenueInput = () => (
  <Form.List name="users">
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, ...restField }) => (
          <Row gutter={24} key={key}>
            <Col span={12}>
              <Form.Item
                label="Year"
                {...restField}
                name={[name, "first"]}
                rules={[
                  {
                    required: true,
                    message: "Missing first name",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <MinusCircleTwoTone onClick={() => remove(name)} />
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 1"
                name={[name, "last"]}
                rules={[
                  {
                    required: true,
                    message: "Missing last name",
                  },
                ]}
              >
                <Input placeholder="Revenue" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 2"
                name={[name, "last"]}
                rules={[
                  {
                    required: true,
                    message: "Missing last name",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 3"
                name={[name, "last"]}
                rules={[
                  {
                    required: true,
                    message: "Missing last name",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...restField}
                label="Quarter 4"
                name={[name, "last"]}
                rules={[
                  {
                    required: true,
                    message: "Missing last name",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
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
              icon={<PlusCircleTwoTone />}
            >
              Add Revenue
            </Button>
          </Form.Item>
        </Col>
      </>
    )}
  </Form.List>
);
