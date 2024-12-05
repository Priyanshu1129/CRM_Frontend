// "use client";
// import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Select,
//   Space,
//   Grid,
//   theme,
//   Row,
//   Col,
//   Checkbox,
// } from "antd";
// import { ArcheTypeSelector, RelationshipDegreeSelector } from "../enums";
// import {
//   FormHeader,
//   InputNotes,
//   ImageUpload,
//   BulkUploadModal,
//   TerritorySelector,
// } from "@/components";
// import { contactFormRules } from "@/utilities/formValidationRules";
// import { ClientSelector } from "@/components";
// import { useAddContact } from "@/hooks/contact";
// import { InputPhoneNumber } from "@/components";

// const AddContact = () => {
//   const [uploadModal, setUploadModal] = useState(false);
//   const [form] = Form.useForm();
//   const screens = Grid.useBreakpoint();

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

//   const {
//     loading,
//     onFinish,
//     handleAvatarChange,
//     mobileCountryCode,
//     setMobileCountryCode,
//     phoneCountryCode,
//     setPhoneCountryCode,
//   } = useAddContact();

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
//           layout="vertical"
//           initialValues={{}}
//           form={form}
//           // size={"default"}
//           onFinish={onFinish}
//         >
//           <Row gutter={24}>
//             <Col span={24}>
//               <Form.Item label="Upload Contact Profile">
//                 <ImageUpload onAvatarChange={handleAvatarChange} />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={contactFormRules.firstName}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="lastName"
//                 label="Last Name"
//                 rules={contactFormRules.lastName}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="gender"
//                 label="Gender"
//                 rules={contactFormRules.gender}
//               >
//                 <Select>
//                   <Select.Option value="M">Male</Select.Option>
//                   <Select.Option value="F">Female</Select.Option>
//                   <Select.Option value="O">Other</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <ClientSelector
//                 name="client"
//                 label="Client Name"
//                 rules={contactFormRules.contactName}
//               />
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="jobTitle"
//                 label="Job Title"
//                 rules={contactFormRules.jobTitle}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <InputPhoneNumber
//                 name="phone"
//                 label="Phone Number"
//                 rules={contactFormRules.phone}
//                 phoneCountryCode={phoneCountryCode}
//                 setPhoneCountryCode={setPhoneCountryCode}
//               />
//             </Col>
//             <Col span={8}>
//               <InputPhoneNumber
//                 name="mobilePhone"
//                 label="Mobile Phone"
//                 rules={contactFormRules.mobilePhone}
//                 phoneCountryCode={mobileCountryCode}
//                 setPhoneCountryCode={setMobileCountryCode}
//               />
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="workEmail"
//                 label="Work Email"
//                 rules={contactFormRules.workEmail}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="personalEmail"
//                 label="Personal Email"
//                 rules={contactFormRules.personalEmail}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <ArcheTypeSelector
//                 name="archeType"
//                 label="Arche Type"
//                 rules={contactFormRules.archeType}
//               />
//             </Col>
//             <Col span={8}>
//               <RelationshipDegreeSelector
//                 name="relationshipDegree"
//                 label="Relationship Degree"
//                 rules={contactFormRules.relationshipDegree}
//               />
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="country"
//                 label="Country"
//                 rules={contactFormRules.city}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <TerritorySelector
//                 label="Territory"
//                 name="territory"
//                 rules={contactFormRules.territory}
//               />
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="memorableInfo"
//                 label="Something memorable about him/her"
//                 rules={contactFormRules.memorableInfo}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item
//                 rules={[{ required: true, message: "Please check the box!" }]}
//                 name="detailsConfirmation"
//                 valuePropName="checked"
//               >
//                 <Checkbox>Details are up to date</Checkbox>
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <InputNotes />
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
//           resource="contact"
//         />
//       </Space>
//     </>
//   );
// };
// export default AddContact;
// "use client";
// import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Select,
//   Space,
//   Grid,
//   theme,
//   Row,
//   Col,
//   Checkbox,
//   Divider,
// } from "antd";
// import { ArcheTypeSelector, RelationshipDegreeSelector } from "../enums";
// import {
//   FormHeader,
//   InputNotes,
//   ImageUpload,
//   BulkUploadModal,
//   TerritorySelector,
// } from "@/components";
// import { contactFormRules } from "@/utilities/formValidationRules";
// import { ClientSelector } from "@/components";
// import { useAddContact } from "@/hooks/contact";
// import { InputPhoneNumber } from "@/components";
// import { colorConfig } from "@/config";
// import { Text } from "@/components";
// const AddContact = ({  }) => {
//   const [uploadModal, setUploadModal] = useState(false);
//   const [form] = Form.useForm();
//   const screens = Grid.useBreakpoint();

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const {
//     loading,
//     onFinish,
//     handleAvatarChange,
//     mobileCountryCode,
//     setMobileCountryCode,
//     phoneCountryCode,
//     setPhoneCountryCode,
//   } = useAddContact();

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
//           background: colorConfig?.background || colorBgContainer,
//           borderRadius: borderRadiusLG,
//           padding: screens.xs ? "16px" : "32px",
//         }}
//       >
//         <Form
//           layout="vertical"
//           form={form}
//           onFinish={onFinish}
//           style={{ color: colorConfig?.textColor || "#000" }}
//         >
//           {/* Centered Image Upload */}
//           <Row justify="center">
//             <Col>
//               <Form.Item
//                 label={<span style={{ fontWeight: "400" }}>Upload Contact Profile</span>}
//               >
//                 <ImageUpload onAvatarChange={handleAvatarChange} />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Section: Personal Information */}
//           <Space> <Text style={{color : colorConfig?.primary, fontWeight : '500'}}>Personal Information</Text></Space>
//           <Divider style={{margin : "10px"}}></Divider>
//           <Row gutter={24}>
//             <Col span={6}>
//               <Form.Item
//                 name="firstName"
//                 label={<span style={{ fontWeight: "400" }}>First Name</span>}
//                 rules={contactFormRules.firstName}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 name="lastName"
//                 label={<span style={{ fontWeight: "400" }}>Last Name</span>}
//                 rules={contactFormRules.lastName}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 name="gender"
//                 label={<span style={{ fontWeight: "400" }}>Gender</span>}
//                 rules={contactFormRules.gender}
//               >
//                 <Select>
//                   <Select.Option value="M">Male</Select.Option>
//                   <Select.Option value="F">Female</Select.Option>
//                   <Select.Option value="O">Other</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 name="memorableInfo"
//                 label={
//                   <span style={{ fontWeight: "400" }}>Something Memorable</span>
//                 }
//                 rules={contactFormRules.memorableInfo}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Section: Contact Information */}

//           <Space> <Text style={{color : colorConfig?.primary, fontWeight : '500'}}>Contact Information</Text></Space>
//           <Divider style={{margin : "10px"}}></Divider>
//           <Row gutter={24}>
//             <Col span={6}>
//               <InputPhoneNumber
//                 name="phone"
//                 label={<span style={{ fontWeight: "400" }}>Phone Number</span>}
//                 rules={contactFormRules.phone}
//                 phoneCountryCode={phoneCountryCode}
//                 setPhoneCountryCode={setPhoneCountryCode}
//               />
//             </Col>
//             <Col span={6}>
//               <InputPhoneNumber
//                 name="mobilePhone"
//                 label={<span style={{ fontWeight: "400" }}>Mobile Phone</span>}
//                 rules={contactFormRules.mobilePhone}
//                 phoneCountryCode={mobileCountryCode}
//                 setPhoneCountryCode={setMobileCountryCode}
//               />
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 name="workEmail"
//                 label={<span style={{ fontWeight: "400" }}>Work Email</span>}
//                 rules={contactFormRules.workEmail}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 name="personalEmail"
//                 label={<span style={{ fontWeight: "400" }}>Personal Email</span>}
//                 rules={contactFormRules.personalEmail}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Section: Professional Information */}
//           <Space> <Text style={{color : colorConfig?.primary, fontWeight : '500'}}>Professional Information</Text></Space>
//           <Divider style={{margin : "10px"}}></Divider>
//           <Row gutter={24}>
//             <Col span={6}>
//               <ClientSelector
//                 name="client"
//                 label={<span style={{ fontWeight: "400" }}>Client Name</span>}
//                 rules={contactFormRules.contactName}
//               />
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 name="jobTitle"
//                 label={<span style={{ fontWeight: "400" }}>Job Title</span>}
//                 rules={contactFormRules.jobTitle}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <ArcheTypeSelector
//                 name="archeType"
//                 label={<span style={{ fontWeight: "400" }}>Arche Type</span>}
//                 rules={contactFormRules.archeType}
//               />
//             </Col>
//             <Col span={6}>
//               <RelationshipDegreeSelector
//                 name="relationshipDegree"
//                 label={
//                   <span style={{ fontWeight: "400" }}>Relationship Degree</span>
//                 }
//                 rules={contactFormRules.relationshipDegree}
//               />
//             </Col>
//           </Row>

//           {/* Section: Location Details */}
//           <Space> <Text style={{color : colorConfig?.primary, fontWeight : '500'}}>Location Details</Text></Space>
//           <Divider style={{margin : "10px"}}></Divider>
//           <Row gutter={24}>
//             <Col span={6}>
//               <Form.Item
//                 name="country"
//                 label={<span style={{ fontWeight: "400" }}>Country</span>}
//                 rules={contactFormRules.city}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <TerritorySelector
//                 label={<span style={{ fontWeight: "400" }}>Territory</span>}
//                 name="territory"
//                 rules={contactFormRules.territory}
//               />
//             </Col>
//           </Row>

//           {/* Section: Notes and Actions */}
//           <Space> <Text style={{color : colorConfig?.primary, fontWeight : '500'}}>Additional Details</Text></Space>
//           <Divider style={{margin : "10px"}}></Divider>
//           <Row gutter={24}>
//             <Col span={24}>
//               <Form.Item
//                 rules={[{ required: true, message: "Please check the box!" }]}
//                 name="detailsConfirmation"
//                 valuePropName="checked"
//               >
//                 <Checkbox>Details are up to date</Checkbox>
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <InputNotes />
//             </Col>
//             <Col span={24}>
//               <Form.Item>
//                 <Space>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     loading={loading}
//                     style={{ backgroundColor: colorConfig?.primaryColor }}
//                   >
//                     Submit
//                   </Button>
//                   <Button
//                     type="default"
//                     htmlType="button"
//                     onClick={() => form.resetFields()}
//                     disabled={loading}
//                     style={{ color: colorConfig?.secondaryColor }}
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
//           resource="contact"
//         />
//       </Space>
//     </>
//   );
// };

// export default AddContact;

"use client";
import React, { useState } from "react";
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
  Checkbox,
  Divider,
} from "antd";
import { ArcheTypeSelector, RelationshipDegreeSelector } from "../enums";
import {
  FormHeader,
  InputNotes,
  ImageUpload,
  BulkUploadModal,
  TerritorySelector,
} from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { ClientSelector } from "@/components";
import { useAddContact } from "@/hooks/contact";
import { InputPhoneNumber } from "@/components";
import { colorConfig } from "@/config";
import { Text } from "@/components";

const AddContact = ({}) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint(); // Get current screen size

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    loading,
    onFinish,
    handleAvatarChange,
    mobileCountryCode,
    setMobileCountryCode,
    phoneCountryCode,
    setPhoneCountryCode,
  } = useAddContact();

  // Define dynamic span for different screen sizes
  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 8, // 4 fields per row on desktop and larger
    lg: 6,
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
          background: colorConfig?.background || colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ color: colorConfig?.textColor || "#000" }}
        >
          {/* Centered Image Upload */}
          <Row>
            <Col>
              <Form.Item
                label={
                  <span style={{ fontWeight: "400" }}>
                    Upload Contact Profile
                  </span>
                }
              >
                <ImageUpload onAvatarChange={handleAvatarChange} />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Personal Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Personal Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="firstName"
                label={<span style={{ fontWeight: "400" }}>First Name</span>}
                rules={contactFormRules.firstName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="lastName"
                label={<span style={{ fontWeight: "400" }}>Last Name</span>}
                rules={contactFormRules.lastName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="gender"
                label={<span style={{ fontWeight: "400" }}>Gender</span>}
                rules={contactFormRules.gender}
              >
                <Select>
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                  <Select.Option value="O">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="memorableInfo"
                label={
                  <span style={{ fontWeight: "400" }}>Something Memorable</span>
                }
                rules={contactFormRules.memorableInfo}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Contact Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Contact Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <InputPhoneNumber
                name="phone"
                label={<span style={{ fontWeight: "400" }}>Phone Number</span>}
                rules={contactFormRules.phone}
                phoneCountryCode={phoneCountryCode}
                setPhoneCountryCode={setPhoneCountryCode}
              />
            </Col>
            <Col {...colSpan}>
              <InputPhoneNumber
                name="mobilePhone"
                label={<span style={{ fontWeight: "400" }}>Mobile Phone</span>}
                rules={contactFormRules.mobilePhone}
                phoneCountryCode={mobileCountryCode}
                setPhoneCountryCode={setMobileCountryCode}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="workEmail"
                label={<span style={{ fontWeight: "400" }}>Work Email</span>}
                rules={contactFormRules.workEmail}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="personalEmail"
                label={
                  <span style={{ fontWeight: "400" }}>Personal Email</span>
                }
                rules={contactFormRules.personalEmail}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Professional Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Professional Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <ClientSelector
                name="client"
                label={<span style={{ fontWeight: "400" }}>Client Name</span>}
                rules={contactFormRules.contactName}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="jobTitle"
                label={<span style={{ fontWeight: "400" }}>Job Title</span>}
                rules={contactFormRules.jobTitle}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <ArcheTypeSelector
                name="archeType"
                label={<span style={{ fontWeight: "400" }}>Arche Type</span>}
                rules={contactFormRules.archeType}
              />
            </Col>
            <Col {...colSpan}>
              <RelationshipDegreeSelector
                name="relationshipDegree"
                label={
                  <span style={{ fontWeight: "400" }}>Relationship Degree</span>
                }
                rules={contactFormRules.relationshipDegree}
              />
            </Col>
          </Row>

          {/* Section: Location Details */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Location Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="country"
                label={<span style={{ fontWeight: "400" }}>Country</span>}
                rules={contactFormRules.city}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <TerritorySelector
                label={<span style={{ fontWeight: "400" }}>Territory</span>}
                name="territory"
                rules={contactFormRules.territory}
              />
            </Col>
          </Row>

          {/* Section: Notes and Actions */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Additional Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                rules={[{ required: true, message: "Please check the box!" }]}
                name="detailsConfirmation"
                valuePropName="checked"
              >
                <Checkbox>Details are up to date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <InputNotes />
            </Col>
          </Row>

          {/* Submit and Reset buttons */}
          <Row>
            <Col>
              <Space>
                <Button htmlType="submit" loading={loading} type="primary">
                  Save Contact
                </Button>
                <Button
                  type="default"
                  disabled={loading}
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Space>

      {/* Bulk Upload Modal */}
      <BulkUploadModal open={uploadModal} setOpen={setUploadModal} />
    </>
  );
};

export default AddContact;
