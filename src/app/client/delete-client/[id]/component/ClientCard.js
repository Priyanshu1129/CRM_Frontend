import React, { useState } from 'react';
import { Card, Row, Button, Avatar, Typography, Col } from 'antd';
import { EyeOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { colorConfig } from '@/config';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const ClientCard = ({ client }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  if (!client) return null;
  
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const labelStyle = { color: '#808080', fontWeight: '500' }; // Greyish color for labels

  return (
    <Row justify="center" style={{ marginBottom: '16px' }}>
      <Col span={24}>
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                {client.name}
              </Title>
              <Button
               onClick={()=>{
                router.push(`/client/client-details/${client._id.toString()}`)
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
          <Row gutter={[16, 8]} align="middle">
            <Col xs={24} sm={6}>
              <Avatar size={64} src={client.avatar} />
            </Col>
            <Col xs={24} sm={18}>
              <Text style={labelStyle}>Industry:</Text> {client.industry?.label}
              <br />
              <Text style={labelStyle}>Sub-Industry:</Text> {client.subIndustry?.label}
              <br />
              <Text style={labelStyle}>Offering:</Text> {client.offering}
              <br />
              <Text style={labelStyle}>Annual Revenue:</Text> ${client.annualRevenue}
            </Col>
          </Row>

          {isExpanded && (
            <div style={{ marginTop: '16px' }}>
              <Text style={labelStyle}>Territory:</Text> {client.territory?.label || 'N/A'}
              <br />
              <Text style={labelStyle}>Incorporation Type:</Text> {client.incorporationType?.label}
              <br />
              <Text style={labelStyle}>Classification:</Text> {client.classification?.label}
              <br />
              <Text style={labelStyle}>Relationship Status:</Text> {client.relationshipStatus?.label || 'N/A'}
              <br />
              <Text style={labelStyle}>Priority:</Text> {client.priority}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              type="text"
              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
              onClick={toggleExpand}
              style={{ color: colorConfig.primary }}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ClientCard;
