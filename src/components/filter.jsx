import React, { useState, useEffect } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Checkbox, Grid } from "antd";

export const Filter = ({ filterOptions, filters, setFilters, setFilter }) => {
  const screens = Grid.useBreakpoint();
  const [filterItems, setFilterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initialize selectedItems state based on filterOptions
    const initialSelectedItems = {};
    filterOptions.forEach((option) => {
      initialSelectedItems[option.key] = [];
    });
    setSelectedItems(initialSelectedItems);
  }, [filterOptions]);

  useEffect(() => {
    if (filterOptions && filterOptions.length > 0) {
      // Set filterItems dynamically based on props
      const items = filterOptions.map((option) => ({
        key: option.key,
        label: option.label,
        children: option.data.map(({ value, text }) => ({
          key: value,
          label: text,
        })),
      }));
      setFilterItems(items);
    }
  }, [filterOptions]);

  const onSelectChange = (parentKey, childKey, checked) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = checked
        ? [...prevSelectedItems[parentKey], childKey]
        : prevSelectedItems[parentKey].filter((item) => item !== childKey);

      return {
        ...prevSelectedItems,
        [parentKey]: updatedItems,
      };
    });
  };

  const handleFilter = () => {
    const updatedFilters = {
      ...filters,
      ...selectedItems, // Update filters with selectedItems
    };
    setFilters(updatedFilters);
    setFilter(true);
    setVisible(false); // Close the dropdown when "OK" is clicked
  };

  const handleCancel = () => {
    const hasItems = Object.values(selectedItems).some(
      (items) => items.length > 0
    );
    if (hasItems) {
      const resetItems = {};
      filterOptions.forEach((option) => {
        resetItems[option.key] = [];
      });
      setSelectedItems(resetItems);
    }
    handleFilter();
    setVisible(false);
  };

  const menu = (
    <Menu>
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
        ) : null
      )}
      <Menu.Divider />
      <Menu.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleCancel}>Reset</Button>
          <Button type="primary" onClick={handleFilter}>
            OK
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={setVisible}
      dropdownRender={() => menu}
    >
      <Button
        size={screens.xs ? "middle" : "large"}
        icon={<FilterOutlined />}
        onClick={() => setVisible(true)} // Open dropdown on button click
      >
        {!screens.xs ? "Filter Items" : null}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
