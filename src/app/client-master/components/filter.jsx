// import React, { useState, useEffect } from "react";
// import { DownOutlined, FilterOutlined } from "@ant-design/icons";
// import { Button, Dropdown, Menu, Checkbox, Grid } from "antd";
// import {
//   useIndustries,
//   useSubIndustries,
//   useTerritories,
//   useUsers,
// } from "@/hooks";

// export const Filter = ({ filters, setFilters, setFilter }) => {
//   const screens = Grid.useBreakpoint();
//   const [filterItems, setFilterItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({
//     industry: [],
//     "sub-industry": [],
//     territory: [],
//     user: [],
//   });
//   const [open, setOpen] = useState(false);

//   // Fetch data using custom hooks
//   const { industries, loading: industriesLoading } = useIndustries();
//   const { subIndustries, loading: subIndustriesLoading } = useSubIndustries();
//   const { territories, loading: territoriesLoading } = useTerritories();
//   const { users, loading: usersLoading } = useUsers();

//   useEffect(() => {
//     if (
//       !industriesLoading &&
//       !subIndustriesLoading &&
//       !territoriesLoading &&
//       !usersLoading
//     ) {
//       const newItems = [
//         {
//           key: "industry",
//           label: "Industry",
//           children: industries.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//         {
//           key: "sub-industry",
//           label: "Sub-Industry",
//           children: subIndustries.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
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
//           label: "Users",
//           children: users.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//       ];

//       // Only update if the items have changed
//       if (JSON.stringify(newItems) !== JSON.stringify(filterItems)) {
//         setFilterItems(newItems);
//       }
//     }
//   }, [
//     industries,
//     subIndustries,
//     territories,
//     users,
//     industriesLoading,
//     subIndustriesLoading,
//     territoriesLoading,
//     usersLoading,
//     filterItems,
//   ]);

//   const onSelectChange = (parentKey, childKey, checked) => {
//     setOpen(true);
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
//       industry: selectedItems.industry,
//       subIndustry: selectedItems["sub-industry"],
//       territory: selectedItems.territory,
//       enteredBy: selectedItems.user,
//     };
//     setFilters(updatedFilters);

//     setFilter(true);
//     setOpen(false);
//   };
//   const handleReset = () => {
//     const {
//       industry,
//       "sub-industry": subIndustry,
//       territory,
//       user,
//     } = selectedItems;

//     // Check if any array contains items
//     if (
//       industry.length !== 0 ||
//       subIndustry.length !== 0 ||
//       territory.length !== 0 ||
//       user.length !== 0
//     ) {
//       // Reset selected items
//       setSelectedItems({
//         industry: [],
//         "sub-industry": [],
//         territory: [],
//         user: [],
//       });

//       // Update the filters after resetting
//       const updatedFilters = {
//         ...filters,
//         industry: [],
//         subIndustry: [],
//         territory: [],
//         enteredBy: [],
//       };
//       setFilters(updatedFilters);
//       setFilter(true);
//     }

//     // Always close the dropdown when "Reset" is clicked
//     setOpen(false);
//   };

//   const menu = (
//     <Menu>
//       {filterItems.map((parent) =>
//         parent.children ? (
//           <Menu.SubMenu
//             onTitleClick={() => setOpen(true)}
//             key={parent.key}
//             title={parent.label}
//           >
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
//       open={open}
//       onOpenChange={setOpen}
//       dropdownRender={() => menu}
//       trigger={["click"]}
//     >
//       <Button
//         size={screens.xs ? "middle" : "large"}
//         icon={<FilterOutlined />}
//         onClick={() => setOpen(!open)}
//       >
//         {!screens.xs ? "Filter" : null}
//         <DownOutlined />
//       </Button>
//     </Dropdown>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { DownOutlined, FilterOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Grid, Popover, Menu } from "antd";
// import {
//   useIndustries,
//   useSubIndustries,
//   useTerritories,
//   useUsers,
// } from "@/hooks";

// export const Filter = ({ filters, setFilters, setFilter }) => {
//   const screens = Grid.useBreakpoint();
//   const [filterItems, setFilterItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({
//     industry: [],
//     "sub-industry": [],
//     territory: [],
//     user: [],
//   });
//   const [open, setOpen] = useState(false);

//   // Fetch data using custom hooks
//   const { industries, loading: industriesLoading } = useIndustries();
//   const { subIndustries, loading: subIndustriesLoading } = useSubIndustries();
//   const { territories, loading: territoriesLoading } = useTerritories();
//   const { users, loading: usersLoading } = useUsers();

//   useEffect(() => {
//     if (
//       !industriesLoading &&
//       !subIndustriesLoading &&
//       !territoriesLoading &&
//       !usersLoading
//     ) {
//       const newItems = [
//         {
//           key: "industry",
//           label: "Industry",
//           children: industries.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//         {
//           key: "sub-industry",
//           label: "Sub-Industry",
//           children: subIndustries.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
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
//           label: "Users",
//           children: users.map(({ value, text }) => ({
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
//     industries,
//     subIndustries,
//     territories,
//     users,
//     industriesLoading,
//     subIndustriesLoading,
//     territoriesLoading,
//     usersLoading,
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
//       industry: selectedItems.industry,
//       subIndustry: selectedItems["sub-industry"],
//       territory: selectedItems.territory,
//       enteredBy: selectedItems.user,
//     };
//     setFilters(updatedFilters);

//     setFilter(true);
//     setOpen(false);
//   };

//   const handleReset = () => {
//     setSelectedItems({
//       industry: [],
//       "sub-industry": [],
//       territory: [],
//       user: [],
//     });

//     const updatedFilters = {
//       industry: [],
//       subIndustry: [],
//       territory: [],
//       enteredBy: [],
//     };
//     setFilters(updatedFilters);
//     setFilter(true);
//     setOpen(false);
//   };

//   const content = (
//     <Menu>
//       {filterItems.map((parent) =>
//         parent.children ? (
//           <Menu.SubMenu
//             onTitleClick={() => setOpen(true)}
//             key={parent.key}
//             title={parent.label}
//           >
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
//             // gap: "4px",
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
//     <Popover
//       content={content}
//       // title="Filter Options"
//       trigger="click"
//       visible={open}
//       onVisibleChange={setOpen}
//     >
//       <Button size={screens.xs ? "middle" : "large"} icon={<FilterOutlined />}>
//         {!screens.xs ? "Filter" : null}
//         <DownOutlined />
//       </Button>
//     </Popover>
//   );
// };

import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Grid, Popover, Menu } from "antd";
import {
  useIndustries,
  useSubIndustries,
  useTerritories,
  useUsers,
} from "@/hooks";

export const Filter = ({ filters, setFilters, setFilter }) => {
  const screens = Grid.useBreakpoint();

  const [filterItems, setFilterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    industry: [],
    "sub-industry": [],
    territory: [],
    user: [],
  });
  const [open, setOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  // Fetch data using custom hooks
  const { industries, loading: industriesLoading } = useIndustries();
  const { subIndustries, loading: subIndustriesLoading } = useSubIndustries();
  const { territories, loading: territoriesLoading } = useTerritories();
  const { users, loading: usersLoading } = useUsers();

  // Fetch and prepare filter items
  useEffect(() => {
    if (
      !industriesLoading &&
      !subIndustriesLoading &&
      !territoriesLoading &&
      !usersLoading
    ) {
      const newItems = [
        {
          key: "industry",
          label: "Industry",
          children: industries.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
        {
          key: "sub-industry",
          label: "Sub-Industry",
          children: subIndustries.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
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
          label: "Entered By",
          children: users.map(({ value, text }) => ({
            key: value,
            label: text,
          })),
        },
      ];

      // Only update if the items have changed
      if (JSON.stringify(newItems) !== JSON.stringify(filterItems)) {
        setFilterItems(newItems);
      }
    }
  }, [
    industries,
    subIndustries,
    territories,
    users,
    industriesLoading,
    subIndustriesLoading,
    territoriesLoading,
    usersLoading,
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
      industry: selectedItems.industry,
      subIndustry: selectedItems["sub-industry"],
      territory: selectedItems.territory,
      enteredBy: selectedItems.user,
    };
    setFilters(updatedFilters);

    setFilter(true);
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedItems({
      industry: [],
      "sub-industry": [],
      territory: [],
      user: [],
    });

    const updatedFilters = {
      industry: [],
      subIndustry: [],
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

  // Memoizing content to avoid unnecessary re-renders
  const content = React.useMemo(
    () => (
      <Menu
        style={{ borderRadius: "8px" }}
        openKeys={openKeys}
        onOpenChange={onSubMenuOpenChange}
      >
        {filterItems.map((parent) =>
          parent.children ? (
            <Menu.SubMenu
              onTitleClick={() => setOpen(true)}
              key={parent.key}
              title={parent.label}
            >
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
              // background: "red",
              display: "flex",
              justifyContent: "space-between",
              gap: "6px",
              padding: "0",
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
