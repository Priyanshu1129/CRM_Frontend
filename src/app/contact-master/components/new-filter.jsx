import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Grid, Popover, Menu } from "antd";

export const UnifiedFilter = ({
  filters,
  setFilters,
  setFilter,
  filterOptions,
  dataSources,
}) => {
  const screens = Grid.useBreakpoint();
  const [filterItems, setFilterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    filterOptions.reduce((acc, option) => {
      acc[option.key] = [];
      return acc;
    }, {})
  );
  const [open, setOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  // Fetch and prepare filter items based on provided data sources
  useEffect(() => {
    const fetchedItems = filterOptions.map((option) => ({
      key: option.key,
      label: option.label,
      children: dataSources[option.key]?.map(({ value, text }) => ({
        key: value,
        label: text,
      })) || [],
    }));

    if (JSON.stringify(fetchedItems) !== JSON.stringify(filterItems)) {
      setFilterItems(fetchedItems);
    }
  }, [filterOptions, dataSources, filterItems]);

  const onSelectChange = useCallback((parentKey, childKey, checked) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = checked
        ? [...prevSelectedItems[parentKey], childKey]
        : prevSelectedItems[parentKey].filter((item) => item !== childKey);

      return {
        ...prevSelectedItems,
        [parentKey]: updatedItems,
      };
    });
  }, []);

  const handleFilter = () => {
    const updatedFilters = filterOptions.reduce((acc, option) => {
      acc[option.filterKey] = selectedItems[option.key];
      return acc;
    }, { ...filters });
    setFilters(updatedFilters);

    setFilter(true);
    setOpen(false);
  };

  const handleReset = () => {
    const resetItems = filterOptions.reduce((acc, option) => {
      acc[option.key] = [];
      return acc;
    }, {});
    setSelectedItems(resetItems);

    const updatedFilters = filterOptions.reduce((acc, option) => {
      acc[option.filterKey] = [];
      return acc;
    }, { ...filters });
    setFilters(updatedFilters);
    setFilter(true);
    setOpen(false);
  };

  const onSubMenuOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const content = (
    <Menu
      style={{ borderRadius: "8px" }}
      openKeys={openKeys}
      onOpenChange={onSubMenuOpenChange}
    >
      {filterItems.map((parent) =>
        parent.children ? (
          <Menu.SubMenu key={parent.key} title={parent.label}>
            {parent.children.map((child) => (
              <Menu.Item key={child.key}>
                <Checkbox
                  checked={selectedItems[parent.key].includes(child.key)}
                  onChange={(e) =>
                    onSelectChange(parent.key, child.key, e.target.checked)
                  }
                >
                  {child.label}
                </Checkbox>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={parent.key}>
            <Checkbox
              checked={selectedItems[parent.key].includes(parent.key)}
              onChange={(e) =>
                onSelectChange(parent.key, parent.key, e.target.checked)
              }
            >
              {parent.label}
            </Checkbox>
          </Menu.Item>
        )
      )}
      <Menu.Divider />
      <Menu.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "4px",
          }}
        >
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleFilter}>
            OK
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={open}
      onVisibleChange={setOpen}
      overlayInnerStyle={{ padding: 0, borderRadius: "8px" }}
    >
      <Button size={screens.xs ? "middle" : "large"} icon={<FilterOutlined />}>
        {!screens.xs ? "Filter" : null}
        <DownOutlined />
      </Button>
    </Popover>
  );
};
