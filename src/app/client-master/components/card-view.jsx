import { List } from "antd";

import { PaginationTotal } from "@/components";

import { ClientCard, ClientCardSkeleton } from "./card";
import { FullScreenLoading } from "@/components";

export const ClientsCardView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
  totalClients,
}) => {
  // Skeleton data for loading state
  const skeletonData = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
  }));

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        scrollbarWidth: "none",
        marginTop: "28px",
      }}
    >
      {loading ? (
        <List
          grid={{
            gutter: 32,
            column: 4,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 4,
          }}
          dataSource={skeletonData} // Skeleton data when loading
          renderItem={() => (
            <List.Item>
              <ClientCardSkeleton />
            </List.Item>
          )}
        />
      ) : (
        <List
          grid={{
            gutter: 32,
            column: 4,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 4,
          }}
          dataSource={data} // Real data when not loading
          renderItem={(item) => (
            <List.Item>
              <ClientCard client={item} />
            </List.Item>
          )}
          pagination={{
            itemRender: undefined,
            position: "bottom",
            style: { display: "flex", marginTop: "1rem" },
            pageSizeOptions: ["12", "24", "48"],
            defaultPageSize: 12,
            defaultCurrent: 1,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            total: totalClients,
            showTotal: (total) => (
              <PaginationTotal total={total} entityName="client" />
            ),
            showQuickJumper: true,
          }}
        />
      )}
    </div>
  );
};
