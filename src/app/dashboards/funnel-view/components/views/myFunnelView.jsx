import React from "react";
import { Row, Col } from "antd";
import { FullScreenLoading } from "@/components";
import { FunnelChart } from "..";
import { Doughnut } from "..";
import { ConversionRates } from "..";
import { useFetchMyFunnelView } from "@/hooks/dashboards";

export const MyFunnelView = ({
  myViewParticularDate,
  myView,
  canSeeMyView,
  refresh,
  filter,
  filters,
  setFilter,
  setRefresh,
}) => {
  const { loading, funnelViewData, conversionStats } = useFetchMyFunnelView({
    myViewParticularDate,
    myView,
    canSeeMyView,
    refresh,
    filters,
    filter,
    setRefresh,
    setFilter,
  });
  return loading ? (
    <FullScreenLoading />
  ) : (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <Row gutter={[18, 18]}>
        <Col xs={24} lg={18}>
          <FunnelChart funnelStats={funnelViewData?.funnelStats} />
        </Col>
        <Col xs={24} lg={6}>
          {funnelViewData?.funnelStats && (
            <Doughnut
              funnelStats={funnelViewData.funnelStats}
              wonCount={funnelViewData.wonCount}
            />
          )}
        </Col>
      </Row>
      {conversionStats && <ConversionRates data={conversionStats} />}
    </div>
  );
};
