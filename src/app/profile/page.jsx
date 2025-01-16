"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Typography,
  Card,
  Button,
  Input,
  Modal,
  Descriptions,
  Divider,
  Tag,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  HomeOutlined,
  GlobalOutlined,
  BankOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ImageUpload } from "@/components";
import { useGetUserProfile, useUpdateUser } from "@/hooks/user";
import { userFormRules } from "@/utilities/formValidationRules";
import { Color } from "antd/es/color-picker";
import { colorConfig } from "@/config";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const { Title } = Typography;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const { loading, profileData } = useGetUserProfile();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { setAvatar, setAvatarChanged, handleUpdateUser } = useUpdateUser({
    user: profileData,
    form,
  });

  useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        avatar: profileData?.avatar,
        firstName: profileData?.firstName,
        lastName: profileData?.lastName,
      });
    }
  }, [profileData, form]);

  const onFinish = (values) => {
    handleUpdateUser({ ...values });
    setIsModalVisible(false);
  };

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

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{
        padding: screens.xs ? 0 : screens.md ? 16 : 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        marginTop: screens.xs ? 8 : 24,
        backgroundColor: "#fff",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {/* Static Display Section */}
      <div
        style={{
          display: "flex",
          gap: screens.xs ? "8px" : "26px",
          flexDirection: screens.xs ? "column" : "row",
          alignItems: "center",
          padding: screens.xs ? "12px" : screens.md ? "16px" : "24px",
        }}
      >
        <div
          style={{
            justifySelf: "center",
            alignSelf: "flex-start",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={profileData?.avatar}
            alt="Profile"
            style={{
              width: 200,
              height: 200,
              borderRadius: "5%",
              border: `3px solid ${colorConfig.primary}`,
              objectFit: "cover",
            }}
          />
          <Title level={3} style={{ margin: 2, marginTop: 6 }}>{`
            ${profileData?.firstName} ${profileData?.lastName}
          `}</Title>
          <Title
            level={5}
            style={{
              marginTop: 0,
              fontSize: "16px",
              color: colorConfig.textGrayLight,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tag color="green">
              {`
             ${profileData?.role?.name}
          `}
            </Tag>
          </Title>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Edit Profile
          </Button>
        </div>

        {/* Modal for Editing Profile */}
        <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="avatar">
              <ImageUpload
                initialImage={profileData?.avatar}
                onAvatarChange={handleAvatarChange}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "2px solid #ddd",
                }}
              />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstName"
              rules={userFormRules.firstName}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={userFormRules.lastName}
            >
              <Input size="large" />
            </Form.Item>

            <Row justify="end">
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
            </Row>
          </Form>
        </Modal>

        {/* Personal Information Section */}
        <Card
          style={{
            maxWidth: screens.xs ? "100%" : "900px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Descriptions
            contentStyle={{}}
            labelStyle={{ color: colorConfig.primary }}
            style={{ color: colorConfig.primary, marginBottom: "12px" }}
            title="Personal Information"
            bordered
          >
            <Descriptions.Item
              label={
                <>
                  <MailOutlined /> Email
                </>
              }
            >
              {profileData?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined /> Phone
                </>
              }
            >
              {profileData?.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  {profileData?.gender === "Male" ? (
                    <ManOutlined />
                  ) : (
                    <WomanOutlined />
                  )}{" "}
                  Gender
                </>
              }
            >
              {profileData?.gender}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ color: colorConfig.primary, marginBottom: "12px" }}
            labelStyle={{ color: colorConfig.primary }}
            title="Address Information"
            bordered
          >
            <Descriptions.Item
              label={
                <>
                  <GlobalOutlined /> Country
                </>
              }
            >
              {profileData?.address?.country}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <BankOutlined /> State
                </>
              }
            >
              {profileData?.address?.state}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <HomeOutlined /> City
                </>
              }
            >
              {profileData?.address?.city}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            labelStyle={{ color: colorConfig.primary }}
            title="Relevant Information"
            bordered
          >
            <Descriptions.Item
              label={
                <>
                  <SolutionOutlined /> Industry
                </>
              }
            >
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {profileData?.industry?.map((item, index) => (
                  <li key={index}>{item.label}</li>
                ))}
              </ul>
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            labelStyle={{ color: colorConfig.primary }}
            style={{ marginTop: "16px" }}
            bordered
          >
            <Descriptions.Item
              label={
                <>
                  <TeamOutlined /> Solution
                </>
              }
            >
              <div
                style={{
                  maxHeight: "150px",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {profileData?.solution?.map((item, index) => (
                    <li key={index}>{item.label}</li>
                  ))}
                </ul>
              </div>
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            labelStyle={{ color: colorConfig.primary }}
            style={{ marginTop: "16px" }}
            bordered
          >
            <Descriptions.Item
              label={
                <>
                  <HomeOutlined /> Territory
                </>
              }
            >
              {" "}
              <div
                style={{
                  maxHeight: "150px",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {profileData?.territory?.map((item, index) => (
                    <li key={index}>{item.label}</li>
                  ))}
                </ul>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Card>
  );
};

export default ProfilePage;
