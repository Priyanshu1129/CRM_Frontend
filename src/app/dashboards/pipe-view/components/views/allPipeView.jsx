import React, { useEffect, useState } from "react";
import { useFetchPipeView } from "@/hooks/dashboards";
import { Text } from "@/components";
import { PageSkeleton } from "../skeleton";
import { KanbanBoard } from "../board";
import { KanbanColumn } from "../column";
import { DealKanbanCardMemo } from "../deal-kanban-card";
import { KanbanItem } from "../item";
import { ShowCurrency } from "@/app/dashboards/components";
import { stages, getStats } from "../../stages";

export const AllPipeView = ({
  myView,
  allViewParticularDate,
  canSeeAllView,
  setRefresh,
  filters,
  setFilter,
  filter,
  refresh,
}) => {
  const [stats, setStats] = useState(null);
  const { loading, opportunities } = useFetchPipeView({
    myView,
    allViewParticularDate,
    canSeeAllView,
    setRefresh,
    filters,
    setFilter,
    filter,
    refresh,
  });

  useEffect(() => {
    if (!loading && opportunities) {
      setStats(getStats(opportunities));
    }
  }, [opportunities, loading]);

  return loading ? (
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
  );
};
