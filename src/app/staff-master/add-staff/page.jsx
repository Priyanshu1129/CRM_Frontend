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
  DatePicker,
  notification,
} from "antd";
import { FormHeader, ImageUpload, BulkUploadModal } from "@/components";
import { staffFormRules } from "@/utilities/formValidationRules";
import { createStaff } from "@/redux/actions/staffAction";
import { staffActions } from "@/redux/slices/staffSlice";

const AddStaff = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.staff.createStaff
  );

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
        description: "Staff member created successfully.",
      });
      dispatch(staffActions.clearCreateStaffStatus());
      // dispatch(staffActions.clearCreateStaffData());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create staff member.",
      });
      dispatch(staffActions.clearCreateStaffStatus());
      dispatch(staffActions.clearCreateStaffError());
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
    };

    setLoading(true);
    dispatch(createStaff(formattedValues));
  };

  const roles = [
    { label: "Viewer", value: "viewer" },
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  return (
    <>
      <FormHeader setUploadModal={setUploadModal} backButtonText={"Return"} />
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
                rules={staffFormRules.firstName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={staffFormRules.lastName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={staffFormRules.gender}
              >
                <Select>
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                  <Select.Option value="O">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Role" name="role" rules={staffFormRules.role}>
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
              <Form.Item
                label="Phone"
                name="phone"
                rules={staffFormRules.phone}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={staffFormRules.email}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
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
        {/* <BulkUploadModal
          setUploadModal={setUploadModal}
          uploadModal={uploadModal}
        /> */}
      </Space>
    </>
  );
};

export default AddStaff;
