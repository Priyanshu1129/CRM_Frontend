import React, { useState } from "react";
import {
  Modal,
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
import UpdateConfigPopup from "./updateConfigPopup";
import { useUpdateTerritory } from "@/hooks/adminPanel/configurations/territory/useUpdateTerritory";
import { roleFormRules } from "@/utilities/formValidationRules";

const ConfigModal = ({territory, visible, setVisible}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  
  const {loading, onFinish} = useUpdateTerritory({setVisible, territory})

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null} 
      >
        <p>{modalText}</p>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          size={"default"}
          initialValues={{...territory}}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Label"
                name="label"
                rules={roleFormRules.roleName}
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
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ConfigModal;
