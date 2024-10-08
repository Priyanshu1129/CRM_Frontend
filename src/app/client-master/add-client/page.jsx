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
  notification,
} from "antd";
import {
  ClassificationsSelector,
  IncorporationTypesSelector,
  RelationshipStatusSelector,
  MarketCapSelector,
} from "../enums";
import {
  FormHeader,
  IndustrySelector,
  SubIndustrySelector,
  TerritorySelector,
  UserSelector,
  ContactSelector,
  ImageUpload,
  BulkUploadModal,
  CurrencyAmountInput,
} from "@/components";
import { clientActions } from "@/redux/slices/clientSlice";
import { clientFormRules } from "@/utilities/formValidationRules";
import { createClient } from "@/redux/actions/clientAction";

const AddClient = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(1);

  const { status, error } = useSelector((state) => state.client.createClient);

  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Client added successfully.",
      });
      dispatch(clientActions.clearCreateClientStatus());
      // dispatch(clientActions.clearCreateClientData());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add client.",
      });
      dispatch(clientActions.clearCreateClientStatus());
      dispatch(clientActions.clearCreateClientError());
    }
  }, [status, error, dispatch]);

  const handleAvatarChange = (fileList) => {
    if (fileList.length > 0) {
      const newAvatar = fileList[0].originFileObj || fileList[0].url;
      setAvatarChanged(true);
      setAvatar(newAvatar);
    } else {
      setAvatarChanged(false);
      setAvatar(null);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    const annualRevenueInUSD = parseFloat(
      values?.annualRevenue / currency
    ).toFixed(2);

    let newValues = {
      ...values,
      annualRevenue: annualRevenueInUSD,
      entryDate: new Date().toISOString(),
      avatar: avatarChanged ? avatar : null,
    };
    dispatch(createClient(newValues));
  };

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <FormHeader
        fileUpload={true}
        setUploadModal={setUploadModal}
        backButtonText={"Return"}
      />
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
          form={form}
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
          size={"default"}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Upload Client Profile">
                <ImageUpload onAvatarChange={handleAvatarChange} />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <Form.Item
                label="Client Name"
                name="name"
                rules={clientFormRules.clientName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <IndustrySelector
                label="Industry"
                name="industry"
                rules={clientFormRules.industry}
              />
            </Col>
            <Col span={colSpan}>
              <SubIndustrySelector
                label="Sub Industry"
                name="subIndustry"
                rules={clientFormRules.subIndustry}
              />
            </Col>
            <Col span={colSpan}>
              <Form.Item
                name="offering"
                label="About"
                rules={clientFormRules.offering}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <TerritorySelector
                label="Territory"
                name="territory"
                rules={clientFormRules.territory}
              />
            </Col>
            <Col span={colSpan}>
              <IncorporationTypesSelector
                label="Incorporation Type"
                name="incorporationType"
                rules={clientFormRules.incorporationType}
              />
            </Col>
            <Col span={colSpan}>
              <Form.Item
                label="Client Status"
                name="listedCompany"
                rules={clientFormRules.clientStatus}
              >
                <Select>
                  <Select.Option value={true}>Listed</Select.Option>
                  <Select.Option value={false}>Unlisted</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <MarketCapSelector
                name="marketCap"
                label="Market Cap"
                rules={clientFormRules.marketCap}
              />
            </Col>
            <Col span={colSpan}>
              <CurrencyAmountInput
                name="annualRevenue"
                label="Annual Revenue"
                rules={clientFormRules.annualRevenue}
                currency={currency}
                setCurrency={setCurrency}
              />
            </Col>
            <Col span={colSpan}>
              <ClassificationsSelector
                label="Classification"
                name="classification"
                rules={clientFormRules.classification}
              />
            </Col>
            <Col span={colSpan}>
              <Form.Item
                label="Total Employee Strength"
                name="totalEmployeeStrength"
                rules={clientFormRules.totalEmployeeStrength}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <Form.Item
                label="IT Employee Strength"
                name="itEmployeeStrength"
                rules={clientFormRules.itEmployeeStrength}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <UserSelector
                label="Primary Relationship"
                name="primaryRelationship"
                rules={clientFormRules.primaryRelationship}
              />
            </Col>
            <Col span={colSpan}>
              <UserSelector
                label="Secondary Relationship (Pref Economic)"
                name="secondaryRelationship"
                rules={clientFormRules.secondaryRelationship}
              />
            </Col>
            <Col span={colSpan}>
              <RelationshipStatusSelector
                label="Relationship Status"
                name="relationshipStatus"
                rules={clientFormRules.relationshipStatus}
              />
            </Col>
            <Col span={colSpan}>
              <ContactSelector
                label="Related Contacts"
                name="relatedContacts"
                rules={clientFormRules.relatedContacts}
                mode="multiple"
              />
            </Col>
            <Col span={colSpan}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={clientFormRules.priority}
              >
                <Select>
                  <Select.Option value="Very High">Very High</Select.Option>
                  <Select.Option value="High">High</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                  <Select.Option value="Low">Low</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={() => form.resetFields()}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <BulkUploadModal
          setUploadModal={setUploadModal}
          uploadModal={uploadModal}
          resource="client"
        />
      </Space>
    </>
  );
};
export default AddClient;
