"use client";

import OpportunityCard from "@/app/client/delete-client/[id]/component/OpportunityCard";
import TenderCard from "@/app/client/delete-client/[id]/component/tenderCard";
import { useEffect } from "react";
import { Divider, Typography, Row, Col, Button } from "antd";

const { useDeleteTender } = require("@/hooks/tender/useDeleteTender");
const { useParams } = require("next/navigation");

const DeleteTenderPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteTender } = useDeleteTender();

  // Fetch tender details when page is loaded
  useEffect(() => {
    handleDeleteTender(id);
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Section */}
      <Typography.Title level={2}>Delete Tender Page</Typography.Title>
      <Typography.Text style={{ fontSize: '14px', color: '#888' }}>
        Please check the tender and related items before deletion.
      </Typography.Text>
      <Divider style={{ margin: '20px 0' }} />

      {/* Tender Details Section */}
      <section>
        <Typography.Title level={4}>Tender Details</Typography.Title>
        <Typography.Text>
          Review the tender details below before confirming the deletion.
        </Typography.Text>
        <div>
          {data?.data.tender && <TenderCard tender={data?.data?.tender} />}
        </div>
      </section>
      
      <Divider />

      {/* Associated Opportunity Section */}
      {data?.data?.tender?.associatedOpportunity && (
        <section>
          <Typography.Title level={4}>Associated Opportunity</Typography.Title>
          <Typography.Text>
            Below are the details of the opportunity associated with this tender.
          </Typography.Text>
          <div>
            <OpportunityCard opportunity={data?.data?.tender?.associatedOpportunity} />
          </div>
        </section>
      )}
      
      {/* Confirmation or Delete Button Section */}
      {/* Optionally, add a confirmation or delete button at the end */}
      <Row justify="center" style={{ marginTop: "24px" }}>
        <Col>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => handleDeleteTender(id, "true")}
            loading={loading}
          >
            Confirm Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteTenderPage;
