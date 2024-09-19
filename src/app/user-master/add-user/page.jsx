"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
  notification,
} from "antd";
import { FormHeader, ImageUpload } from "@/components";
import { userFormRules } from "@/utilities/formValidationRules";
import { createUser } from "@/redux/actions/userAction/user";
import { userActions } from "@/redux/slices/userSlice";
import { InputPhoneNumber } from "@/components";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.user.createUser);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "User created successfully.",
      });
      dispatch(userActions.clearCreateUserStatus());
      // dispatch(userActions.clearCreateUserData());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add user.",
      });
      dispatch(userActions.clearCreateUserStatus());
      dispatch(userActions.clearCreateUserError());
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
    const formattedValues = {
      ...values,
      avatar: avatarChanged ? avatar : null,
      phone: `${phoneCountryCode} ${values.phone}`,
    };

    setLoading(true);
    dispatch(createUser(formattedValues));
  };

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Super User", value: "superuser" },
    { label: "User", value: "user" },
    { label: "Viewer", value: "viewer" },
  ];

  return (
    <>
      <FormHeader backButtonText={"Return"} />
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
          initialValues={{}}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          size={"default"}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Upload Client Profile">
                <ImageUpload onAvatarChange={handleAvatarChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={userFormRules.firstName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={userFormRules.lastName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={userFormRules.gender}
              >
                <Select>
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                  <Select.Option value="O">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Role" name="role" rules={userFormRules.role}>
                <Select>
                  {roles.map(({ label, value }, idx) => (
                    <Select.Option key={idx} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <InputPhoneNumber
                name="phone"
                label="Phone Number"
                rules={userFormRules.phone}
                phoneCountryCode={phoneCountryCode}
                setPhoneCountryCode={setPhoneCountryCode}
              />
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email" rules={userFormRules.email}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Country"
                name="country"
                rules={userFormRules.country}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="State" name="state" rules={userFormRules.state}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="City" name="city" rules={userFormRules.city}>
                <Input />
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
      </Space>
    </>
  );
};

export default AddUser;
