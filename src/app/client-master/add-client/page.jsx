"use client";
import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Space,
  Grid,
  theme,
} from "antd";
import { ListHeader } from "@/components";
const AddClient = () => {
  const [componentSize, setComponentSize] = useState("default");
  const screens = Grid.useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="billion">B</Select.Option>
        <Select.Option value="million">M</Select.Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <ListHeader toPath={"add-client"} buttonText={"Add new client"} />
      <Space
        direction="vertical"
        style={{
          marginTop: "28px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: !screens.xs ? "32px" : "16px",
        }}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Client Name">
            <Input />
          </Form.Item>
          <Form.Item label="Industry">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Sub Industry">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="What do they offer ?">
            <Input />
          </Form.Item>
          <Form.Item label="Territory">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Incorporation Type">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Client Status">
            <Select>
              <Select.Option value="demo">Listed</Select.Option>
              <Select.Option value="demo">Unlisted</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="market-cap"
            label="Market Cap"
            rules={[
              {
                required: true,
                message: "Please input market cap!",
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item label="Annual Revenue">
            <Input />
          </Form.Item>
          <Form.Item label="Classification">
            <Select>
              <Select.Option value="demo">Listed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Total Employee Strength">
            <Input />
          </Form.Item>
          <Form.Item label="IT Employee Strength">
            <Input />
          </Form.Item>
          <Form.Item label="Primary Relationship">
            <Select>
              <Select.Option value="demo">Listed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Secondary Relationship(Pref Economic)">
            <Select>
              <Select.Option value="demo">Listed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Relationship Status">
            <Select>
              <Select.Option value="demo">Listed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Related Contacts">
            <Input />
          </Form.Item>
          <Form.Item label="Priority">
            <Select>
              <Select.Option value="demo">Listed</Select.Option>
            </Select>
          </Form.Item>          
          <Form.Item>
            <Button>Save</Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};
export default AddClient;
