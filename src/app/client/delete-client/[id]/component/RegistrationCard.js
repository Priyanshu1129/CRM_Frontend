import React, { useState } from 'react';
import { Card, Row, Col, Typography, Avatar, Button, Space } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { colorConfig } from '@/config';
import { useRouter } from 'next/navigation';


const { Title, Text } = Typography;

const RegistrationCard = ({ registration }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
 const router = useRouter();
  if (!registration) return null;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const labelStyle = { color: '#808080', fontWeight: '500' }; // Greyish color for labels
  const fieldValueStyle = { fontWeight: '500' };

  const {
    enteredBy,
    registrationChamp,
    websiteDetails,
    submittedDocuments,
    status,
    entryDate,
    expiryDate,
    client,
    otherDetails,
  } = registration;

  return (
    <Row justify="center" style={{ marginBottom: '16px' }}>
      <Col span={24}>
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                Registration Details
              </Title>
              <Button
               onClick={()=>{
                router.push(`/registration/registration-details/${registration._id.toString()}`)
              }}
                type="text"
                icon={<EyeOutlined style={{ fontSize: 18, color: '#fff' }} />}
              />
            </div>
          }
          bordered
          headStyle={{ backgroundColor: colorConfig.primary }}
          style={{
            
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            borderWidth:'1px', borderColor : colorConfig.primary
          }}
          bodyStyle={{ padding: '16px' }}
        >
          {/* Basic Information */}
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={6}>
              <Avatar size={64} src={registrationChamp?.avatar || enteredBy?.avatar} />
            </Col>
            <Col xs={24} sm={18}>
              <Text style={labelStyle}>Registration Champion:</Text>{' '}
              {registrationChamp
                ? `${registrationChamp.firstName} ${registrationChamp.lastName}`
                : 'N/A'}
              <br />
              <Text style={labelStyle}>Entered By:</Text>{' '}
              {enteredBy ? `${enteredBy.firstName} ${enteredBy.lastName}` : 'N/A'}
              <br />
              <Text style={labelStyle}>Status:</Text> {status || 'N/A'}
              <br />
              <Text style={labelStyle}>Submitted Documents:</Text> {submittedDocuments || 'N/A'}
            </Col>
          </Row>

          {/* Website Details (Hidden by Default) */}
          {isExpanded && (
            <div style={{ marginTop: '16px' }}>
              <Title level={5} style={{ color: colorConfig.primary }}>
                Website Details
              </Title>
              <Text style={labelStyle}>Link:</Text>{' '}
              <a href={websiteDetails?.link} target="_blank" rel="noopener noreferrer">
                {websiteDetails?.link || 'N/A'}
              </a>
              <br />
              <Text style={labelStyle}>Username:</Text> {websiteDetails?.username || 'N/A'}
              <br />
              <Text style={labelStyle}>Password:</Text>{' '}
              <Space>
                <span style={fieldValueStyle}>
                  {isPasswordVisible
                    ? websiteDetails?.password || 'N/A'
                    : '•'.repeat(8)} {/* Show dots if hidden */}
                </span>
                <Button
                  type="text"
                  icon={isPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  onClick={togglePasswordVisibility}
                />
              </Space>
            </div>
          )}

          {/* Additional Details (Expanded Section) */}
          {isExpanded && (
            <div style={{ marginTop: '16px' }}>
              <Text style={labelStyle}>Entry Date:</Text> {new Date(entryDate).toLocaleDateString()}
              <br />
              <Text style={labelStyle}>Expiry Date:</Text>{' '}
              {new Date(expiryDate).toLocaleDateString()}
              <br />
              <Text style={labelStyle}>Other Details:</Text> {otherDetails || 'N/A'}
            </div>
          )}

          {/* Show More / Show Less Button */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              type="text"
              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
              onClick={toggleExpand}
              style={{ color: '#007CA6' }}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default RegistrationCard;
