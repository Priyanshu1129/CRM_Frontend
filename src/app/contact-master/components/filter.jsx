// import React, { useState, useEffect } from "react";
// import { DownOutlined, FilterOutlined } from "@ant-design/icons";
// import { Button, Dropdown, Menu, Checkbox, Grid } from "antd";
// import { useTerritories, useUsers, useClients } from "@/hooks";

// export const Filter = ({ filters, setFilters, setFilter }) => {
//   const screens = Grid.useBreakpoint();
//   const [filterItems, setFilterItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({
//     territory: [],
//     user: [],
//     client: [],
//   });
//   const [visible, setVisible] = useState(false);

//   // Fetch data using custom hooks
//   const { territories, loading: territoriesLoading } = useTerritories();
//   const { users, loading: usersLoading } = useUsers();
//   const { clients, loading: clientsLoading } = useClients();

//   useEffect(() => {
//     if (!territoriesLoading && !usersLoading && !clientsLoading) {
//       const newItems = [
//         {
//           key: "territory",
//           label: "Territory",
//           children: territories.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//         {
//           key: "user",
//           label: "User",
//           children: users.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//         {
//           key: "client",
//           label: "Client",
//           children: clients.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//       ];

//       if (JSON.stringify(newItems) !== JSON.stringify(filterItems)) {
//         setFilterItems(newItems);
//       }
//     }
//   }, [
//     territories,
//     users,
//     clients,
//     territoriesLoading,
//     usersLoading,
//     clientsLoading,
//     filterItems,
//   ]);

//   const onSelectChange = (parentKey, childKey, checked) => {
//     setSelectedItems((prevSelectedItems) => {
//       const updatedItems = checked
//         ? [...prevSelectedItems[parentKey], childKey]
//         : prevSelectedItems[parentKey].filter((item) => item !== childKey);

//       return {
//         ...prevSelectedItems,
//         [parentKey]: updatedItems,
//       };
//     });
//   };

//   const handleFilter = () => {
//     const updatedFilters = {
//       ...filters,
//       client: selectedItems.client,
//       territory: selectedItems.territory,
//       enteredBy: selectedItems.user,
//     };
//     setFilters(updatedFilters);

//     setFilter(true);
//     setVisible(false);
//   };
//   const handleReset = () => {
//     const { client, territory, user } = selectedItems;

//     // Check if any array contains items
//     if (client.length !== 0 || territory.length !== 0 || user.length !== 0) {
//       // Reset selected items
//       setSelectedItems({
//         client: [],
//         territory: [],
//         user: [],
//       });

//       // Update the filters after resetting
//       const updatedFilters = {
//         ...filters,
//         client: [],
//         territory: [],
//         enteredBy: [],
//       };
//       setFilters(updatedFilters);
//       setFilter(true);
//     }

//     // Always close the dropdown when "Reset" is clicked
//     setVisible(false);
//   };

//   const menu = (
//     <Menu>
//       {filterItems.map((parent) =>
//         parent.children ? (
//           <Menu.SubMenu key={parent.key} title={parent.label}>
//             {parent.children.map((child) => (
//               <Menu.Item key={child.key}>
//                 <Checkbox
//                   checked={selectedItems[parent.key].includes(child.key)}
//                   onChange={(e) =>
//                     onSelectChange(parent.key, child.key, e.target.checked)
//                   }
//                 >
//                   {child.label}
//                 </Checkbox>
//               </Menu.Item>
//             ))}
//           </Menu.SubMenu>
//         ) : (
//           <Menu.Item key={parent.key}>
//             <Checkbox
//               checked={selectedItems[parent.key].includes(parent.key)}
//               onChange={(e) =>
//                 onSelectChange(parent.key, parent.key, e.target.checked)
//               }
//             >
//               {parent.label}
//             </Checkbox>
//           </Menu.Item>
//         )
//       )}
//       <Menu.Divider />
//       <Menu.Item>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "4px",
//           }}
//         >
//           <Button onClick={handleReset}>Reset</Button>
//           <Button type="primary" onClick={handleFilter}>
//             OK
//           </Button>
//         </div>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Dropdown
//       visible={visible}
//       onVisibleChange={setVisible}
//       dropdownRender={() => menu}
//     >
//       <Button
//         size={screens.xs ? "middle" : "large"}
//         icon={<FilterOutlined />}
//         onClick={() => setVisible(true)} // Open dropdown on button click
//       >
//         {!screens.xs ? "Filter" : null}
//         <DownOutlined />
//       </Button>
//     </Dropdown>
//   );
// };

import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Grid, Popover, Menu } from "antd";
import { useTerritories, useUsers, useClients } from "@/hooks";

export const Filter = ({ filters, setFilters, setFilter }) => {
  const screens = Grid.useBreakpoint();
  const [filterItems, setFilterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    territory: [],
    user: [],
    client: [],
  });
  const [open, setOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  // Fetch data using custom hooks
  const { territories, loading: territoriesLoading } = useTerritories();
  const { users, loading: usersLoading } = useUsers();
  const { clients, loading: clientsLoading } = useClients();

  useEffect(() => {
    if (!territoriesLoading && !usersLoading && !clientsLoading) {
      const newItems = [
        {
          key: "territory",
          label: "Territory",
          children: territories.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
        {
          key: "user",
          label: "User",
          children: users.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
        {
          key: "client",
          label: "Client",
          children: clients.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
      ];

      if (JSON.stringify(newItems) !== JSON.stringify(filterItems)) {
        setFilterItems(newItems);
      }
    }
  }, [
    territories,
    users,
    clients,
    territoriesLoading,
    usersLoading,
    clientsLoading,
    filterItems,
  ]);

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
    const updatedFilters = {
      ...filters,
      client: selectedItems.client,
      territory: selectedItems.territory,
      enteredBy: selectedItems.user,
    };
    setFilters(updatedFilters);
    setFilter(true);
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedItems({
      client: [],
      territory: [],
      user: [],
    });

    const updatedFilters = {
      client: [],
      territory: [],
      enteredBy: [],
    };
    setFilters(updatedFilters);
    setFilter(true);
    setOpen(false);
  };

  const onSubMenuOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const content = React.useMemo(
    () => (
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
    ),
    [filterItems, selectedItems, onSelectChange, openKeys]
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={open}
      style={{ borderRadius: "16px" }}
      overlayStyle={{ borderRadius: "8px" }}
      overlayInnerStyle={{ padding: 0, borderRadius: "8px" }}
      onVisibleChange={setOpen}
    >
      <Button size={screens.xs ? "middle" : "large"} icon={<FilterOutlined />}>
        {!screens.xs ? "Filter" : null}
        <DownOutlined />
      </Button>
    </Popover>
  );
};
