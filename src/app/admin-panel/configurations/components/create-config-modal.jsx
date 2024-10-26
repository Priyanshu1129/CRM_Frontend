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
import { useUpdateTerritory } from "@/hooks/adminPanel/configurations/territory/useUpdateTerritory";
import { roleFormRules } from "@/utilities/formValidationRules";
import { useCreateTerritory } from "@/hooks/adminPanel/configurations/territory/useCreateTerritory";
import { useCreateIndustry } from "@/hooks/adminPanel/configurations/industry/useCreateIndustry";
import { useCreateSubIndustry } from "@/hooks/adminPanel/configurations/sub-industry/useCreateSubIndustry";
import { useCreateSolution } from "@/hooks/adminPanel/configurations/solution/useCreateSolution";

const CreateConfigModal = ({showCreateConfigPopup, setShowCreateConfigPopup, configType}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  var loadAndFinish;
 
  switch(configType){
    case "territory" :
      loadAndFinish = useCreateTerritory({setShowCreateConfigPopup})
      break;
    case "industry" :
      loadAndFinish = useCreateIndustry({setShowCreateConfigPopup})
      break;
    case "sub-industry" :
      loadAndFinish = useCreateSubIndustry({setShowCreateConfigPopup})
      break;
    case "solution" :
      loadAndFinish = useCreateSolution({setShowCreateConfigPopup})
      break;
  }
  const loading = loadAndFinish.loading
  const onFinish = loadAndFinish.onFinish
  
  const showModal = () => {
    setShowCreateConfigPopup(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
        setShowCreateConfigPopup(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShowCreateConfigPopup(false);
  };

  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Modal
        title={`Add new ${configType}`}
        visible={showCreateConfigPopup}
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
          // initialValues={{...territory}}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={`${configType}`}
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

export default CreateConfigModal;
