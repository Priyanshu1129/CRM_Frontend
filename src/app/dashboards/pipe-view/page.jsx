"use client";
import React, { useState, useEffect } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchPipeView, useFetchMyPipeView } from "@/hooks/dashboards";
import { Text } from "@/components";
import { PageSkeleton } from "./components/skeleton";
import { KanbanBoard } from "./components/board";
import { KanbanColumn } from "./components/column";
import { DealKanbanCardMemo } from "./components/deal-kanban-card";
import { KanbanItem } from "./components/item";
import { stages, getStats } from "./stages";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ShowCurrency } from "../components";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCheckDashboardViewPermission } from "../hooks/useCheckViewPermission";
const PipeView = () => {
  const { hasAllView, disabledViewButton, viewChecking } =
    useCheckDashboardViewPermission("PIPE VIEW");
  const [myView, setMyView] = useState(!hasAllView);
  const particularDate = moment(
    useSelector((state) => state.pipeView.particularDate)
  );
  const myViewParticularDate = moment(
    useSelector((state) => state.pipeView.myViewParticularDate)
  );
  const dispatch = useDispatch();

  const {
    loading,
    setRefresh,
    opportunities: allViewOpportunities,
    filters,
    setFilter,
    setFilters,
  } = useFetchPipeView({
    myView,
    particularDate,
    viewChecking,
  });

  const {
    loading: myViewLoading,
    setRefresh: setMyViewRefresh,
    opportunities: myViewOpportunities,
    filters: myViewFilters,
    setFilter: setMyViewFilter,
    setFilters: setMyViewFilters,
  } = useFetchMyPipeView({
    myView,
    myViewParticularDate,
    viewChecking,
  });

  const [stats, setStats] = useState(null);
  const router = useRouter();

  const opportunities = myView ? myViewOpportunities : allViewOpportunities;
  useEffect(() => {
    if (!loading && opportunities) {
      setStats(getStats(opportunities));
    }
  }, [opportunities, loading]);

  const handleDateChange = (newDate) => {
    if (!myView) dispatch(pipeViewActions.setParticularDate(newDate));
    else dispatch(pipeViewActions.setMyViewParticularDate(newDate));
  };

  return (
    <>
      <DashboardHeader
        dashboard={"Pipe View"}
        setDate={handleDateChange}
        selectedDate={myView ? myViewParticularDate : particularDate}
        setRefresh={myView ? setMyViewRefresh : setRefresh}
        setFilter={myView ? setMyViewFilter : setFilter}
        setFilters={myView ? setMyViewFilters : setFilters}
        myView={myView}
        setMyView={setMyView}
        disabledViewButton={disabledViewButton}
        filters={myView ? myViewFilters : filters}
        FilterComponent={Filter}
        myViewButtonText="My Pipe View"
      />
      {loading || myViewLoading ? (
        <PageSkeleton />
      ) : (
        <KanbanBoard>
          {stages.data.map((stage, index) => {
            return (
              <KanbanColumn
                title={stage.title}
                id={stage.id}
                stageKey={stage.key}
                description={
                  <Text size="md" disabled={true}>
                    <ShowCurrency
                      value={stats ? stats[stage.key]?.totalRevenue : 0}
                    />
                  </Text>
                }
                count={stats ? stats[stage.key]?.count : 0}
                key={index}
                onAddClick={() => router.push("/opportunity/add-opportunity")}
              >
                {opportunities &&
                  Array.isArray(opportunities[stage?.key]) &&
                  opportunities[stage?.key]?.map((item, index) => {
                    return (
                      <KanbanItem id={item?._id} key={index}>
                        <DealKanbanCardMemo
                          title={item?.projectName}
                          id={item?._id}
                          itemSubStage={item?.salesSubStage}
                          company={{
                            name: item?.client?.name,
                            avatarUrl: item?.client?.avatar,
                          }}
                          user={{
                            name: item?.enteredBy?.name,
                            avatarUrl: item?.enteredBy?.avatar,
                          }}
                          date={item?.entryDate}
                          price={item?.totalRevenue || 0}
                        />
                      </KanbanItem>
                    );
                  })}
              </KanbanColumn>
            );
          })}
        </KanbanBoard>
      )}
    </>
  );
};

export default PipeView;
