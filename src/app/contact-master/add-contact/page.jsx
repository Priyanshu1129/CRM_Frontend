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
  Checkbox,
} from "antd";

import {} from "./enums";
import {
  ListHeader,
  IndustrySelector,
  SubIndustrySelector,
  InputNotes,
} from "@/components";

const AddContact = () => {
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
      <ListHeader toPath={"add-contact"} buttonText={"Add new contact"} />
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
              <Form.Item label="First Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gender">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                  <Select.Option value={"F"}>Female</Select.Option>
                  <Select.Option value={"O"}>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Client Name">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Job Title">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mobile Phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Work Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Personal Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Arch Type">
                <SubIndustrySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Relationship Degree">
                <SubIndustrySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="City">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Something memorable about him/her">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="detailsConfirmation" valuePropName="checked">
                <Checkbox>Details are upto date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <InputNotes />
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
export default AddContact;
