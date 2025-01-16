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
import { BackButton } from "@/components";

const { Title, Text } = Typography;

const DeleteContactPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteContact } = useDeleteContact();

  // Fetch contact and related data when the page is loaded
  useEffect(() => {
    handleDeleteContact(id);
  }, [id]);

  return (
    <>
      {/* Top Action Bar */}
      <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <BackButton buttonText={"Go Back"} />
              <Button
                icon={<ReloadOutlined />}
                type="default"
                onClick={() => handleDeleteRole(id)}
                loading={loading}
              >
                Reload
              </Button>
            </div>
      
      <div
        style={{
          marginTop: "24px",
          padding: "24px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
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

        {/* Warning Alert */}
        <Alert
          message="Warning: On deleting this contact, it will be removed from the following"
          type="warning"
          showIcon
          closable
        />
        <br />

        {/* Registrations Section */}
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

        <Divider />

        {/* Clients Section */}
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

        <Divider />

        {/* Business Developments Section */}
        <section style={{ marginBottom: "24px" }}>
          <Title level={4}>Business Developments</Title>
          <Text style={{ color: "#888" }}>
            Below are the business developments associated with this contact.
          </Text>
          <div style={{ marginTop: "16px" }}>
            <BDList businessDevelopments={data?.data?.businessDevelopments} />
          </div>
        </section>

        <Divider />

        {/* Confirm Deletion Button Section */}
        <section style={{ marginTop: "24px", textAlign: "center" }}>
          <Button
            type="primary"
            danger
            size="large"
            loading={loading}
            onClick={() => handleDeleteContact(id, "true")}
          >
            Confirm Delete
          </Button>
        </section>
      </div>
    </>
  );
};

export default DeleteContactPage;
