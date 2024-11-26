import React, { useState } from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import { Button, Card, Dropdown, Skeleton } from "antd";
import cn from "classnames";
import { Text } from "@/components";
import styles from "./index.module.css";
import { colorConfig } from "@/config";
import { SubStageSelector } from "@/app/dashboards/components";

const KanbanColumn = ({
  children,
  id,
  stageKey,
  title,
  description,
  count,
  data,
  variant = "default",
  contextMenuItems = [],
  onAddClick,
}) => {
  const [filter, setFilter] = useState([]);
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  const onFilterChange = (value) => {
    setFilter(value);
  }


  const filteredChildren = React.Children.toArray(children).filter((child) => {
    // Replace with appropriate filtering logic for your data
    const subStageValue = child?.props?.children?.props?.itemSubStage;
    return filter.length === 0 || filter.includes(subStageValue);
  });



  return (
    <Card bodyStyle={{ padding: "8px", height:"100%"}} style={{ marginRight: "12px", borderRadius: "12px", background: colorConfig.baseColor }} ref={setNodeRef} className={cn(styles.container, styles[variant])}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Text>

            {!!count && (
              <div className={styles.count} style={{ background: colorConfig.primaryBackground }}>
                <Text size="xs">{count}</Text>
              </div>
            )}
          </div>
          <div className={styles.actionContainer}>
            {contextMenuItems && (
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: contextMenuItems,
                  onPointerDown: (e) => {
                    e.stopPropagation();
                  },
                  onClick: (e) => {
                    e.domEvent.stopPropagation();
                  },
                }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={
                    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                    <MoreOutlined
                      style={{
                        transform: "rotate(90deg)",
                      }}
                    />
                  }
                />
              </Dropdown>
            )}
            <Button
              shape="circle"
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              icon={<PlusOutlined style={{ color: colorConfig.primary }} />}
              size="small"
              onClick={onAddClickHandler}
            />
          </div>
        </div>
        <Text>{description}</Text>
        <SubStageSelector onChange={onFilterChange} stage={stageKey} />
      </div>
      <div
        className={cn(styles.columnScrollableContainer, {
          [styles.isOver]: isOver,
          [styles.active]: active,
        })}
      >
        <div className={cn(styles.childrenWrapper)}>{filteredChildren}</div>
      </div>
    </Card>
  );
};

const KanbanColumnSkeleton = ({ children, type, variant = "default" }) => {
  return (
    <div className={cn(styles.container, styles[variant])}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Skeleton.Button
            //  size="small" 
            style={{ width: "125px" }} />
          <Button
            disabled
            type="text"
            shape="circle"
            icon={
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              <MoreOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
            }
          />
          {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
          <Button disabled shape="circle" icon={<PlusOutlined />} />
        </div>
        {type === "deal" && (
          <Skeleton.Button
            //  size="small" 
            style={{ width: "175px" }} />
        )}
      </div>
      <div className={cn(styles.columnScrollableContainer)}>
        <div className={cn(styles.childrenWrapper)}>{children}</div>
      </div>
    </div>
  );
};

export { KanbanColumn, KanbanColumnSkeleton };
