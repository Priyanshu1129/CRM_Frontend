import React, { useState, useEffect } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Checkbox, Grid } from "antd";
import { useUsers } from "@/hooks";

export const Filter = ({ filters, setFilters, setFilter }) => {
  const screens = Grid.useBreakpoint();
  const [filterItems, setFilterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    user: [],
  });
  const [visible, setVisible] = useState(false);

  // Fetch data using custom hooks
  const { users, loading: usersLoading } = useUsers();

  useEffect(() => {
    if (!usersLoading) {
      const items = [
        {
          key: "user",
          label: "Users",
          children: users.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
      ];

      if (JSON.stringify(items) !== JSON.stringify(filterItems)) {
        setFilterItems(items);
      }
    }
  }, [users, usersLoading, filterItems]);

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
    console.log("filters", filters);
    const updatedFilters = {
      ...filters,
      enteredBy: selectedItems.user,
    };
    console.log("updatedFilters", updatedFilters);
    setFilters(updatedFilters);

    setFilter(true);
    setVisible(false);
  };
  const handleReset = () => {
    const { user } = selectedItems;

    if (user.length !== 0) {
      setSelectedItems({
        user: [],
      });

      const updatedFilters = {
        ...filters,
        enteredBy: [],
      };
      setFilters(updatedFilters);
      setFilter(true);
    }

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
        {!screens.xs ? "Filter" : null}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
