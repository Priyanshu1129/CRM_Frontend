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
import { staffFormRules } from "@/utilities/formValidationRules";
import { updateStaff } from "@/redux/actions/staffAction";
import { staffActions } from "@/redux/slices/staffSlice";
import { getChangedValues } from "@/utilities/getChangedValues";

export const UpdateStaffForm = ({ staff }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.staff.updateStaff);

  const initialValues = useRef({});
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (staff) {
      const staffInitialValues = {
        firstName: staff.firstName,
        lastName: staff.lastName,
        gender: staff.gender,
        role: staff.role,
        phone: staff.phone,
        email: staff.email,
        DOB: staff.DOB ? moment(staff.DOB) : null,
        address: staff.address,
        avatar: staff.avatar,
      };
      form.setFieldsValue(staffInitialValues);
      initialValues.current = staffInitialValues;
    }
  }, [staff, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Member updated successfully.",
      });
      dispatch(staffActions.clearUpdateStaffStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update member.",
      });
      dispatch(staffActions.clearUpdateStaffStatus());
      dispatch(staffActions.clearUpdateStaffError());
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

    const changedValues = getChangedValues(initialValues, values);

    if (avatarChanged) {
      changedValues.avatar = avatar;
    }

    console.log("Changed values:", changedValues);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      dispatch(updateStaff(changedValues, staff._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };
  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="default">
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Upload Staff Profile" name="profileImage">
            <ImageUpload
              initialImage={staff?.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={staffFormRules.firstName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={staffFormRules.lastName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Gender" name="gender" rules={staffFormRules.gender}>
            <Select>
              <Select.Option value="M">Male</Select.Option>
              <Select.Option value="F">Female</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Role" name="role" rules={staffFormRules.role}>
            <Select>
              <Select.Option value="R1">Role 1</Select.Option>
              <Select.Option value="R2">Role 2</Select.Option>
              <Select.Option value="R3">Role 3</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Phone" name="phone" rules={staffFormRules.phone}>
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Email" name="email" rules={staffFormRules.email}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="DOB" name="DOB" rules={staffFormRules.DOB}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="Address"
            name="address"
            rules={staffFormRules.address}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Space>
              <Button
                // disabled
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Update
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                loading={loading}
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
