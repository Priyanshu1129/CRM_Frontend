import { List } from "antd";

import { PaginationTotal } from "@/components";

import { ClientCard, ClientCardSkeleton } from "./card";

export const ClientsCardView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
}) => {
  return (
    <List
      style={{ marginTop: "28px" }}
      grid={{
        gutter: 32,
        column: 4,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <ClientCard client={item} />
        </List.Item>
      )}
      pagination={{
        // hideOnSinglePage: true,
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
        total: 100,
        showTotal: (total) => (
          <PaginationTotal total={total} entityName="company" />
        ),
        showQuickJumper: true,
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
          dataSource={Array.from({ length: 12 }).map((_, i) => ({
            id: i,
          }))}
          renderItem={() => (
            <List.Item>
              <ClientCardSkeleton />
            </List.Item>
          )}
        />
      ) : undefined}
    </List>
  );
};
