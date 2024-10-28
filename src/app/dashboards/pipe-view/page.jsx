"use client";
import React, { useState, useEffect } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchPipeView } from "@/hooks/dashboards";
import { Text } from "@/components";
import { PageSkeleton } from "./components/skeleton";
import { KanbanBoard } from "./components/board";
import { KanbanColumn } from "./components/column";
import { DealKanbanCardMemo } from "./components/deal-kanban-card";
import { KanbanItem } from "./components/item";
import { stages, getStats } from "./stages";
import moment from "moment";

const PipeView = () => {
  const [particularDate, setParticularDate] = useState(moment());
  const { loading, setRefresh, opportunities } = useFetchPipeView({
    particularDate,
  });
  const [stats, setStats] = useState(null);
  const [filters, setFilter] = useState([])
  useEffect(() => {
    if (opportunities) {
      setStats(getStats(opportunities));
    }
  }, [opportunities]);

  console.log("stats", stats);
  return (
    <>
      <DashboardHeader
        dashboard={"Pipe View"}
        setDate={setParticularDate}
        setRefresh={setRefresh}
        filters={[]}
        setFilter={false}
        FilterComponent={Filter}
      />
      {loading ? (
        <PageSkeleton />
      ) : (
        <KanbanBoard>
          {stages.data.map((stage, index) => {
            return (
              <KanbanColumn
                title={stage.title}
                description={
                  <Text size="md" disabled={true}>
                    {0}
                  </Text>
                }
                count={stats ? stats[stage.key]?.count : 0}
                key={index}
              >
                {opportunities &&
                  opportunities[stage.key]?.map((item, index) => {
                    return (
                      <KanbanItem id={item?._id} key={index}>
                        <DealKanbanCardMemo
                          title={item?.projectName}
                          id={item?._id}
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
