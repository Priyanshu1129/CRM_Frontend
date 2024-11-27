// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Button,
//   Form,
//   Input,
//   notification,
//   Space,
//   Grid,
//   theme,
//   Row,
//   Col,
// } from "antd";

// import { FormHeader } from "@/components";
// import {
//   IndustrySelector,
//   InputNotes,
//   SolutionSelector,
//   SubSolutionSelector,
//   TerritorySelector,
//   UserSelector,
//   ClientSelector,
//   ContactSelector,
//   BulkUploadModal,
//   CurrencyAmountInput,
// } from "@/components";
// import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
// import { createBusinessDevelopment } from "@/redux/actions/businessDevelopmentAction";
// import { businessDevelopmentFormRules } from "@/utilities/formValidationRules";
// const AddBusinessDevelopment = () => {
//   const [loading, setLoading] = useState(false);
//   const [uploadModal, setUploadModal] = useState(false);
//   const [currency, setCurrency] = useState(1);
//   const [form] = Form.useForm();
//   const screens = Grid.useBreakpoint();
//   const dispatch = useDispatch();

//   const { status, error } = useSelector(
//     (state) => state.businessDevelopment.createBusinessDevelopment
//   );

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   useEffect(() => {
//     if (status === "pending") {
//       setLoading(true);
//     } else if (status === "success") {
//       setLoading(false);
//       notification.success({
//         message: "Success",
//         description: "Business development added successfully.",
//       });
//       dispatch(
//         businessDevelopmentActions.clearCreateBusinessDevelopmentStatus()
//       );
//     } else if (status === "failed") {
//       setLoading(false);
//       notification.error({
//         message: "Error",
//         description: error || "Failed to add business development.",
//       });
//       dispatch(
//         businessDevelopmentActions.clearCreateBusinessDevelopmentStatus()
//       );
//       dispatch(
//         businessDevelopmentActions.clearCreateBusinessDevelopmentError()
//       );
//     }
//   }, [status, error, dispatch]);

//   const onFinish = (values) => {
//     setLoading(true);
//     const potentialTopLineInUSD = parseFloat(
//       values?.potentialTopLine / currency
//     ).toFixed(2);
//     const potentialOffsetInUSD = parseFloat(
//       values?.potentialOffset / currency
//     ).toFixed(2);

//     let newValues = {
//       ...values,
//       potentialTopLine: potentialTopLineInUSD,
//       potentialOffset: potentialOffsetInUSD,
//       entryDate: new Date().toISOString(),
//     };
//     dispatch(createBusinessDevelopment(newValues));
//   };

//   return (
//     <>
//       <FormHeader
//         fileUpload={true}
//         setUploadModal={setUploadModal}
//         backButtonText={"Return"}
//       />
//       <Space
//         direction="vertical"
//         style={{
//           marginTop: "28px",
//           width: "100%",
//           background: colorBgContainer,
//           borderRadius: borderRadiusLG,
//           padding: !screens.xs ? "32px" : "16px",
//         }}
//       >
//         <Form
//           // labelCol={{
//           //   span: 12,
//           // }}
//           // wrapperCol={{
//           //   span: 12,
//           // }}
//           layout="vertical"
//           initialValues={{}}
//           onFinish={onFinish}
//           // size={"default"}
//           form={form}
//         >
//           <Row gutter={24}>
//             <Col span={8}>
//               <ClientSelector
//                 name="client"
//                 label="Client Name"
//                 rules={businessDevelopmentFormRules.client}
//               />
//             </Col>
//             <Col span={8}>
//               <ContactSelector
//                 name="contact"
//                 label="Contact Name"
//                 rules={businessDevelopmentFormRules.contact}
//               />
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="connectionSource"
//                 label="How did we connect with client?"
//                 rules={businessDevelopmentFormRules.connectionSource}
//               >
//                 <Input placeholder="Connection Source" />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="potentialProject"
//                 label="Potential Project"
//                 rules={businessDevelopmentFormRules.potentialProject}
//               >
//                 <Input placeholder="Potential Project" />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <SolutionSelector
//                 name="solution"
//                 label="Solution"
//                 rules={businessDevelopmentFormRules.solution}
//               />
//             </Col>
//             <Col span={8}>
//               <SubSolutionSelector
//                 name="subSolution"
//                 label="Sub Solution"
//                 rules={businessDevelopmentFormRules.subSolution}
//               />
//             </Col>
//             <Col span={8}>
//               <IndustrySelector
//                 name="industry"
//                 label="Industry"
//                 rules={businessDevelopmentFormRules.industry}
//               />
//             </Col>
//             <Col span={8}>
//               <TerritorySelector
//                 name="territory"
//                 label="Territory"
//                 rules={businessDevelopmentFormRules.territory}
//               />
//             </Col>
//             <Col span={8}>
//               <UserSelector
//                 name="salesChamp"
//                 label="Sales Champ"
//                 rules={businessDevelopmentFormRules.salesChamp}
//               />
//             </Col>
//             <Col span={8}>
//               <CurrencyAmountInput
//                 name="potentialTopLine"
//                 label="Potential TopLine"
//                 rules={businessDevelopmentFormRules.potentialTopLine}
//                 currency={currency}
//                 setCurrency={setCurrency}
//               />
//             </Col>
//             <Col span={8}>
//               <CurrencyAmountInput
//                 name="potentialOffset"
//                 label="Potential Offsets"
//                 rules={businessDevelopmentFormRules.potentialOffset}
//                 currency={currency}
//                 setCurrency={setCurrency}
//               />
//             </Col>
//             <Col span={24}>
//               <Form.Item
//                 name="Notes"
//                 label="Notes"
//                 rules={businessDevelopmentFormRules.Notes}
//               >
//                 <InputNotes />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item>
//                 <Space>
//                   <Button type="primary" htmlType="submit" loading={loading}>
//                     Submit
//                   </Button>
//                   <Button
//                     type="default"
//                     htmlType="button"
//                     onClick={() => form.resetFields()}
//                     disabled={loading}
//                   >
//                     Reset
//                   </Button>
//                 </Space>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//         <BulkUploadModal
//           setUploadModal={setUploadModal}
//           uploadModal={uploadModal}
//           resource="bd"
//         />
//       </Space>
//     </>
//   );
// };
// export default AddBusinessDevelopment;

"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  notification,
  Space,
  Grid,
  theme,
  Row,
  Col,
  Divider,
} from "antd";

import { FormHeader } from "@/components";
import {
  IndustrySelector,
  InputNotes,
  SolutionSelector,
  SubSolutionSelector,
  TerritorySelector,
  UserSelector,
  ClientSelector,
  ContactSelector,
  BulkUploadModal,
  CurrencyAmountInput,
} from "@/components";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { createBusinessDevelopment } from "@/redux/actions/businessDevelopmentAction";
import { businessDevelopmentFormRules } from "@/utilities/formValidationRules";
import { colorConfig } from "@/config";
import { Text } from "@/components";

const AddBusinessDevelopment = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [currency, setCurrency] = useState(1);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.businessDevelopment.createBusinessDevelopment
  );

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
        description: "Business development added successfully.",
      });
      dispatch(
        businessDevelopmentActions.clearCreateBusinessDevelopmentStatus()
      );
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add business development.",
      });
      dispatch(
        businessDevelopmentActions.clearCreateBusinessDevelopmentStatus()
      );
      dispatch(
        businessDevelopmentActions.clearCreateBusinessDevelopmentError()
      );
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    const potentialTopLineInUSD = parseFloat(
      values?.potentialTopLine / currency
    ).toFixed(2);
    const potentialOffsetInUSD = parseFloat(
      values?.potentialOffset / currency
    ).toFixed(2);

    let newValues = {
      ...values,
      potentialTopLine: potentialTopLineInUSD,
      potentialOffset: potentialOffsetInUSD,
      entryDate: new Date().toISOString(),
    };
    dispatch(createBusinessDevelopment(newValues));
  };

  // Dynamic column span based on screen size
  const colSpan = {
    xs: 24,  // 1 field per row on mobile
    sm: 12,  // 2 fields per row on small tablets
    md: 8,   // 3 fields per row on desktops
  };

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
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
          form={form}
        >
          {/* Client Information Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Client Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <ClientSelector
                name="client"
                label="Client Name"
                rules={businessDevelopmentFormRules.client}
              />
            </Col>
            <Col {...colSpan}>
              <ContactSelector
                name="contact"
                label="Contact Name"
                rules={businessDevelopmentFormRules.contact}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="connectionSource"
                label="How did we connect with client?"
                rules={businessDevelopmentFormRules.connectionSource}
              >
                <Input placeholder="Connection Source" />
              </Form.Item>
            </Col>
          </Row>

          {/* Project and Solution Details Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Project and Solution Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="potentialProject"
                label="Potential Project"
                rules={businessDevelopmentFormRules.potentialProject}
              >
                <Input placeholder="Potential Project" />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <SolutionSelector
                name="solution"
                label="Solution"
                rules={businessDevelopmentFormRules.solution}
              />
            </Col>
            <Col {...colSpan}>
              <SubSolutionSelector
                name="subSolution"
                label="Sub Solution"
                rules={businessDevelopmentFormRules.subSolution}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...colSpan}>
              <IndustrySelector
                name="industry"
                label="Industry"
                rules={businessDevelopmentFormRules.industry}
              />
            </Col>
            <Col {...colSpan}>
              <TerritorySelector
                name="territory"
                label="Territory"
                rules={businessDevelopmentFormRules.territory}
              />
            </Col>
            <Col {...colSpan}>
              <UserSelector
                name="salesChamp"
                label="Sales Champ"
                rules={businessDevelopmentFormRules.salesChamp}
              />
            </Col>
          </Row>

          {/* Financial Information Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Financial Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <CurrencyAmountInput
                name="potentialTopLine"
                label="Potential TopLine"
                rules={businessDevelopmentFormRules.potentialTopLine}
                currency={currency}
                setCurrency={setCurrency}
              />
            </Col>
            <Col {...colSpan}>
              <CurrencyAmountInput
                name="potentialOffset"
                label="Potential Offsets"
                rules={businessDevelopmentFormRules.potentialOffset}
                currency={currency}
                setCurrency={setCurrency}
              />
            </Col>
          </Row>

          {/* Notes Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Notes
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="Notes"
                label="Notes"
                rules={businessDevelopmentFormRules.Notes}
              >
                <InputNotes />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Action Buttons */}
          <Row gutter={24}>
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
          resource="bd"
        />
      </Space>
    </>
  );
};

export default AddBusinessDevelopment;
