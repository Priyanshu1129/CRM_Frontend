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
import { filter } from "lodash";

const PipeView = () => {
  const [particularDate, setParticularDate] = useState(moment());
  const [myViewParticularDate, setMyViewParticularDate] = useState(moment());
  
  
  const [ myView , setMyView] = useState(false);
  const [opportunities, setOpportunities] = useState(null);

  const { loading, setRefresh, opportunities : allViewOpportunities, filters, setFilter, setFilters } =
  useFetchPipeView({
      particularDate,
      myView
  });
  
  const { loading: myViewLoading, setRefresh: setMyViewRefresh, opportunities: myViewOpportunities, filters: myViewFilters, setFilter: setMyViewFilter, setFilters: setMyViewFilters } =
    useFetchMyPipeView({
      myView,
      myViewParticularDate
  });

  const [stats, setStats] = useState(null);
  const router = useRouter();

  useEffect(()=>{
      if(!loading) setOpportunities(myView ? myViewOpportunities : allViewOpportunities);
  },[myViewOpportunities, allViewOpportunities, myView]);

  useEffect(() => {
    if (!loading && opportunities) {
      setStats(getStats(opportunities));
    }
  }, [opportunities]);
   
  return (
    <>
      <DashboardHeader
        dashboard={"Pipe View"}
        setDate={myView? setMyViewParticularDate: setParticularDate}
        setRefresh={myView ? setMyViewRefresh : setRefresh}
        setFilter={myView ? setMyViewFilter : setFilter}
        setFilters={myView ? setMyViewFilters : setFilters}
        myView={myView}
        setMyView={setMyView}
        filters={myView ? myViewFilters : filters}
        FilterComponent={Filter}
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
