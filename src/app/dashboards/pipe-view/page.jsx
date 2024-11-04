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
import ShowCurrency from "../components/ShowCurrency";
import moment from "moment";
import { useRouter } from "next/navigation";

const PipeView = () => {
  const [particularDate, setParticularDate] = useState(moment());
  const { loading, setRefresh, opportunities, filters, setFilter, setFilters } =
    useFetchPipeView({
      particularDate,
    });
  const [stats, setStats] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (opportunities) {
      setStats(getStats(opportunities));
    }
  }, [opportunities]);

  return (
    <>
      <DashboardHeader
        dashboard={"Pipe View"}
        setDate={setParticularDate}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
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
                {opportunities && Array.isArray(opportunities[stage?.key]) &&
                  opportunities[stage?.key]?.map((item, index) => {
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
