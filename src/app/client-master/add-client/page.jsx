"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
} from "antd";
import {
  ClassificationsSelector,
  IncorporationTypesSelector,
  RelationshipStatusSelector,
} from "./enums";
import {
  ListHeader,
  IndustrySelector,
  SubIndustrySelector,
  TerritorySelector,
} from "@/components";

const AddClient = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          // labelCol={{
          //   span: 12,
          // }}
          // wrapperCol={{
          //   span: 12,
          // }}
          layout="vertical"
          initialValues={{}}
          onValuesChange={() => {}}
          size={"default"}
          style={
            {
              // maxWidth: 600,
            }
          }
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Client Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Industry">
                <IndustrySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sub Industry">
                <SubIndustrySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="What do they offer ?">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Territory">
                <TerritorySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Incorporation Type">
                <IncorporationTypesSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Client Status">
                <Select>
                  <Select.Option value={true}>Listed</Select.Option>
                  <Select.Option value={false}>Unlisted</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
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
            </Col>
            <Col span={8}>
              <Form.Item label="Annual Revenue">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Classification">
                <ClassificationsSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Employee Strength">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="IT Employee Strength">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Primary Relationship">
                <Select>
                  <Select.Option value="demo">Listed</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Secondary Relationship (Pref Economic)">
                <Select>
                  <Select.Option value="demo">Listed</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Relationship Status">
                <RelationshipStatusSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Related Contacts">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Priority">
                <Select>
                  <Select.Option value="demo">Listed</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button>Save</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};
export default AddClient;