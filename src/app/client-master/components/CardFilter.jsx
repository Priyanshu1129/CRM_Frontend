// import React, { useState, useEffect, useRef } from "react";
// import { DownOutlined, FilterOutlined } from "@ant-design/icons";
// import { Button, Dropdown, Checkbox, Grid } from "antd";
// import { useDispatch } from "react-redux";
// import {
//   useIndustries,
//   useSubIndustries,
//   useTerritories,
//   useUsers,
// } from "@/hooks";

// export const Filter = () => {
//   const prevFiltersRef = useRef({});
//   const dispatch = useDispatch();
//   const screens = Grid.useBreakpoint();
//   const [filterItems, setFilterItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({
//     industry: [],
//     "sub-industry": [],
//     territory: [],
//     users: [],
//   });

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
//       const items = [
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
//           key: "users",
//           label: "Users",
//           children: users.map(({ value, text }) => ({
//             key: value,
//             label: text,
//           })),
//         },
//       ];

//       setFilterItems(items);
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

//   const renderMenuItem = (parentKey, item) => {
//     return {
//       key: item.key,
//       label: (
//         <Checkbox
//           checked={selectedItems[parentKey].includes(item.key)}
//           onChange={(e) =>
//             onSelectChange(parentKey, item.key, e.target.checked)
//           }
//         >
//           {item.label}
//         </Checkbox>
//       ),
//     };
//   };

//   const renderParentMenuItem = (item) => {
//     if (item.children) {
//       return {
//         key: item.key,
//         label: item.label,
//         children: item.children.map((child) => renderMenuItem(item.key, child)),
//       };
//     }
//     return renderMenuItem(item.key, item);
//   };

//   const menuItemsWithCheckboxes = filterItems?.map(renderParentMenuItem);

//   const handleFilter = () => {
//     console.log({
//       industry: selectedItems.industry,
//       subIndustry: selectedItems["sub-industry"],
//       territory: selectedItems.territory,
//       enteredBy: selectedItems.users,
//     });

//     // dispatch();
//     // getAllClients()
//   };

//   useEffect(() => {
//     handleFilter();
//   }, [handleFilter, selectedItems]);

//   return (
//     <Dropdown
//       menu={{
//         items: menuItemsWithCheckboxes,
//       }}
//     >
//       <Button size={screens.xs ? "middle" : "large"} icon={<FilterOutlined />}>
//         {!screens.xs ? "Filter Clients" : null}
//         <DownOutlined />
//       </Button>
//     </Dropdown>
//   );
// };

import React, { useState, useEffect } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Checkbox, Grid } from "antd";
import { useDispatch } from "react-redux";
import {
  useIndustries,
  useSubIndustries,
  useTerritories,
  useUsers,
} from "@/hooks";
import { getAllClients } from "@/redux/actions/clientAction";

export const Filter = () => {
  const dispatch = useDispatch();
  const screens = Grid.useBreakpoint();
  const [filterItems, setFilterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    industry: [],
    "sub-industry": [],
    territory: [],
    users: [],
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch data using custom hooks
  const { industries, loading: industriesLoading } = useIndustries();
  const { subIndustries, loading: subIndustriesLoading } = useSubIndustries();
  const { territories, loading: territoriesLoading } = useTerritories();
  const { users, loading: usersLoading } = useUsers();

  useEffect(() => {
    if (
      !industriesLoading &&
      !subIndustriesLoading &&
      !territoriesLoading &&
      !usersLoading
    ) {
      const items = [
        {
          key: "industry",
          label: "Industry",
          children: industries.map(({ value, text }) => ({
            key: value, // Ensure 'value' is defined and unique
            label: text,
          })),
        },
        {
          key: "sub-industry",
          label: "Sub-Industry",
          children: subIndustries.map(({ value, text }) => ({
            key: value, // Ensure 'value' is defined and unique
            label: text,
          })),
        },
        {
          key: "territory",
          label: "Territory",
          children: territories.map(({ value, text }) => ({
            key: value, // Ensure 'value' is defined and unique
            label: text,
          })),
        },
        {
          key: "users",
          label: "Users",
          children: users.map(({ value, text }) => ({
            key: value, // Ensure 'value' is defined and unique
            label: text,
          })),
        },
      ];

      setFilterItems(items);
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
  ]);

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
    const filters = {
      industry: selectedItems.industry.join(","),
      subIndustry: selectedItems["sub-industry"].join(","),
      territory: selectedItems.territory.join(","),
      enteredBy: selectedItems.users.join(","),
    };
    console.log(selectedItems);
    // dispatch(getAllClients(filters));
    setDropdownOpen(false);
  };

  const handleReset = () => {
    setSelectedItems({
      industry: [],
      "sub-industry": [],
      territory: [],
      users: [],
    });
    setDropdownOpen(false); // Close the dropdown when "Cancel" is clicked
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      trigger={"click"}
      open={dropdownOpen}
      onOpenChange={(open) => setDropdownOpen(open)}
      dropdownRender={() => menu}
    >
      <Button size={screens.xs ? "middle" : "large"} icon={<FilterOutlined />}>
        {!screens.xs ? "Filter Clients" : null}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
