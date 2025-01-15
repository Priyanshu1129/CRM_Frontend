// "use client";
// import React, { useEffect } from "react";
// import { Button, Card, Col, Row, Typography } from "antd";
// import { useParams } from "next/navigation";
// import { useDeleteOpportunity } from "@/hooks/opportunity/useDeleteOpportunity";
// import OpportunityCard from "./component/opportunityCard";
// import TenderCard from "./component/tenderCard";
// const { Title } = Typography;

// const DeleteOpportunityPage = () => {
//   const { id } = useParams();
//   const { loading, data, handleDeleteOpportunity } = useDeleteOpportunity();

//   // Automatically call handleDeleteOpportunity when the component renders
//   // useEffect(() => {
//   //   if (!data || id !== data?.opportunity?._id.toString()) {
//   //     handleDeleteOpportunity(id);
//   //   }
//   // }, [id]);
  
//   // Because when ever the page is rendered we have to cal the function 
//   useEffect(()=>{
//     handleDeleteOpportunity(id);
//   },[])

//   console.log("delete opportunity data", data);

//   return (
//     <div
//       style={{
//         padding: "24px",
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//       }}
//     >
//       <Card
//         title={<Title level={3}>Delete Opportunity and Associated Tender</Title>}
//         bordered={false}
//         style={{ marginBottom: "24px" }}
//       >
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={24} md={12}>
//             <OpportunityCard opportunity={data?.opportunity} />
//           </Col>
//           <Col xs={24} sm={24} md={12}>
//             <TenderCard tender={data?.tender} />
//           </Col>
//         </Row>
//       </Card>

//       <Row justify="center">
//         <Col>
//           <Button
//             type="primary"
//             danger
//             size="large"
//             onClick={() => handleDeleteOpportunity(id, 'true')}
//           >
//             Confirm Delete
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default DeleteOpportunityPage;


"use client";
import React, { useEffect } from "react";
import { Button, Card, Col, Row, Typography, Spin } from "antd";
import { useParams } from "next/navigation";
import { ReloadOutlined } from "@ant-design/icons";
import { useDeleteOpportunity } from "@/hooks/opportunity/useDeleteOpportunity";
import OpportunityCard from "@/app/client/delete-client/[id]/component/OpportunityCard";
import TenderCard from "@/app/client/delete-client/[id]/component/tenderCard";

const { Title } = Typography;

const DeleteOpportunityPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteOpportunity } = useDeleteOpportunity();

  // Call handleDeleteOpportunity when the page is rendered
  useEffect(() => {
    handleDeleteOpportunity(id);
  }, [id]);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3}>Delete Opportunity and Associated Tender</Title>
            </Col>
            <Col>
              <Button
                icon={<ReloadOutlined />}
                type="default"
                onClick={() => handleDeleteOpportunity(id)}
                loading={loading}
              >
                Reload
              </Button>
            </Col>
          </Row>
        }
        bordered={false}
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <OpportunityCard opportunity={data?.opportunity} />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <TenderCard tender={data?.tender} />
          </Col>
        </Row>
      </Card>

      <Row justify="center" style={{ marginTop: "24px" }}>
        <Col>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => handleDeleteOpportunity(id, "true")}
            loading={loading}
          >
            Confirm Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteOpportunityPage;
