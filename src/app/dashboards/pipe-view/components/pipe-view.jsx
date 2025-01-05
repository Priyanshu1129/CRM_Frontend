"use client";
import React, { useState, useEffect } from "react";
import { Filter, DashboardHeader } from "../../components";
import { Text } from "@/components";
import { PageSkeleton } from "./skeleton";
import { KanbanBoard } from "./board";
import { KanbanColumn } from "./column";
import { DealKanbanCardMemo } from "./deal-kanban-card";
import { KanbanItem } from "./item";
import { stages, getStats } from "../stages";
import { useRouter } from "next/navigation";
import { ShowCurrency } from "../../components";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";

const PipeView = ({
  opportunities,
  setRefresh,
  setFilter,
  setFilters,
  filters,
  loading,
  myView,
  particularDate,
}) => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(null);
  const router = useRouter();
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
        selectedDate={particularDate}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        myView={myView}
        filters={filters}
        FilterComponent={Filter}
        myViewButtonText="My Pipe View"
      />
      {loading ? (
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
                onAddClick={() =>
                  router.push("/opportunity-master/add-opportunity")
                }
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
