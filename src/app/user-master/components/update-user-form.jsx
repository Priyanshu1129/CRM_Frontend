"use client";
import React, { useState, useEffect, useRef } from "react";
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
  DatePicker,
  notification,
} from "antd";
import moment from "moment";
import { ImageUpload } from "@/components";
import { userFormRules } from "@/utilities/formValidationRules";
import { updateUser } from "@/redux/actions/userAction";
import { userActions } from "@/redux/slices/userSlice";
import { getChangedValues } from "@/utilities/getChangedValues";
import { countryCode } from "@/config/data";

export const UpdateUserForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");

  const { status, error } = useSelector((state) => state.user.updateUser);

  const initialValues = useRef({});
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user) {
      const [extractedCountryCode, extractedPhoneNumber] =
        user.phone?.split(" ");
      const userInitialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        role: user.role,
        email: user.email,
        country: user.address?.country,
        state: user.address?.state,
        city: user.address?.city,
        avatar: user.avatar,
        phone: extractedPhoneNumber || "",
        phoneCountryCode: extractedCountryCode || "",
      };
      console.log("extractedCountryCode", typeof extractedCountryCode);
      setPhoneCountryCode(extractedCountryCode);
      form.setFieldsValue(userInitialValues);
      initialValues.current = userInitialValues;
    }
  }, [user, form]);
  console.log("code", phoneCountryCode);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "User updated successfully.",
      });
      dispatch(userActions.clearUpdateUserStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update user.",
      });
      dispatch(userActions.clearUpdateUserStatus());
      dispatch(userActions.clearUpdateUserError());
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

    // Compare current values with initial values and get only changed values

    const updatedValues = {
      ...values,
      phone: `${phoneCountryCode} ${values.phone}`,
    };

    const changedValues = getChangedValues(initialValues, updatedValues);

    if (avatarChanged) {
      changedValues.avatar = avatar;
    }

    console.log("Changed values:", changedValues);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      dispatch(updateUser(changedValues, user._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  const roles = [
    { label: "Viewer", value: "viewer" },
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="default">
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Upload User Profile" name="profileImage">
            <ImageUpload
              initialImage={user?.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={userFormRules.firstName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={userFormRules.lastName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Gender" name="gender" rules={userFormRules.gender}>
            <Select>
              <Select.Option value="M">Male</Select.Option>
              <Select.Option value="F">Female</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
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
        <Col span={colSpan}>
          <Form.Item name="phone" label="Phone" rules={userFormRules.phone}>
            <Input
              addonBefore={
                <Select value={phoneCountryCode} onChange={setPhoneCountryCode}>
                  {countryCode.map((country) => (
                    <Select.Option key={country.code} value={country.dial_code}>
                      {country.dial_code} {country.code}
                    </Select.Option>
                  ))}
                </Select>
              }
              type="number"
            />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Email" name="email" rules={userFormRules.email}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Country"
            name="country"
            rules={userFormRules.address}
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
                Update
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
  );
};
