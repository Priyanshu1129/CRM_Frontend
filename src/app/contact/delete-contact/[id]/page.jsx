"use client";

import ContactCard from "@/app/client/delete-client/[id]/component/ContactCard";
import { useDeleteContact } from "@/hooks/contact/useDeleteContact";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Typography, Divider, Row, Col, Alert } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import RegistrationsList from "./component/RegistrationsList";
import ClientList from "./component/ClientList";
import BDList from "./component/BdList";
import { colorConfig } from "@/config";

const { Title, Text } = Typography;

const DeleteContactPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteContact } = useDeleteContact();

  // Fetch contact and related data when the page is loaded
  useEffect(() => {
    handleDeleteContact(id);
  }, [id]);
``
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        <Col>
          <Title level={3}>Delete Contact</Title>
          <Text style={{ color: "#888" }}>
            Please review the contact and related entries where this contact is
            used before confirming the deletion.
          </Text>
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            type="default"
            onClick={() => handleDeleteContact(id)}
            loading={loading}
          >
            Reload
          </Button>
        </Col>
      </Row>
      <Divider />

      {/* Contact Details Section */}
      <section style={{ marginBottom: "24px" }}>
        <Title level={4}>Contact Details</Title>
        <Text style={{ color: "#888" }}>
          Below are the details of the contact. Please verify all fields before
          proceeding with deletion.
        </Text>
        <div style={{ marginTop: "16px" }}>
          {data?.data?.contact ? (
            <ContactCard contact={data?.data?.contact} />
            
          ) : (
            <Alert
              message="No Contact Information Available"
              type="info"
              showIcon
            />
          )}
        </div>
      </section>

      <Alert message="Warning : On deleting this contact it will be removed from following" type="warning" showIcon closable />
      <br />

      {/* Registrations Section */}
      { (
        <section style={{ marginBottom: "24px" }}>
          <Title level={4}>Associated Registrations</Title>
          <Text style={{ color: "#888" }}>
            Below are the registrations associated with this contact. Please
            review the details.
          </Text>
          <div style={{ marginTop: "16px" }}>
            <RegistrationsList registrations={data?.data?.registrations} />
          </div>
        </section>
      )}

      <Divider />

      {/* Clients Section */}
      { (
        <section style={{ marginBottom: "24px" }}>
          <Title level={4}>Associated Clients</Title>
          <Text style={{ color: "#888" }}>
            This contact is associated with the following clients. Review the
            client details below.
          </Text>
          <div style={{ marginTop: "16px" }}>
            <ClientList clients={data?.data?.clients} />
          </div>
        </section>
      )}

      <Divider />

      {/* Business Developments Section */}
      { (
        <section style={{ marginBottom: "24px" }}>
          <Title level={4}>Business Developments</Title>
          <Text style={{ color: "#888" }}>
            Below are the business developments associated with this contact.
          </Text>
          <div style={{ marginTop: "16px" }}>
            <BDList businessDevelopments={data?.data?.businessDevelopments} />
          </div>
        </section>
      )}

      <Divider />

      {/* Confirm Deletion Button Section */}
      <Row justify="center" style={{ marginTop: "24px" }}>
        <Col>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => handleDeleteContact(id, "true")}
            loading={loading}
          >
            Confirm Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteContactPage;
