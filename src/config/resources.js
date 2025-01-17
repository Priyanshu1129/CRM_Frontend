import {
  ContactsOutlined,
  ShopOutlined,
  DashboardOutlined,
  ProjectOutlined,
  FileAddOutlined,
  CrownOutlined,
  FileOutlined,
  EditOutlined,
  SnippetsOutlined,
  UserAddOutlined,
  FormOutlined,
  FileTextOutlined,
  SettingOutlined,
  SolutionOutlined,
  GiftOutlined,
  CheckSquareOutlined,
  InteractionOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { VscMention } from "react-icons/vsc";

import { MdOutlineCircle } from "react-icons/md";

export const resources = [
  {
    key: "dashboard",
    label: "Live Reports",
    icon: <DashboardOutlined />,
    children: [
      {
        key: "dashboards/pipe-view",
        label: "Pipe View",
        icon: <MdOutlineCircle />,
      },
      {
        key: "dashboards/funnel-view",
        label: "Funnel View",
        icon: <MdOutlineCircle />,
      },
      {
        key: "dashboards/summary-view",
        label: "Summary View",
        icon: <MdOutlineCircle />,
      },
      {
        key: "dashboards/leaderboard",
        label: "Leaderboard",
        icon: <MdOutlineCircle />,
      },
      {
        key: "dashboards/trend-view",
        label: "Trend View",
        icon: <MdOutlineCircle />,
      },
    ],
  },
  {
    key: "deal",
    label: "Deals",
    icon: <SnippetsOutlined />,
  },
  {
    key: "opportunity",
    label: "Opportunities",
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: "opportunity/lead",
        label: "Leads",
        icon: <FileAddOutlined />,
        disabled: true,
      },
      {
        key: "opportunity/interaction",
        label: "Interactions",
        icon: <InteractionOutlined />,
        disabled: true,
      },
      {
        key: "opportunity/mention",
        label: "Mentions",
        icon: <ProjectOutlined />,
      },
    ],
  },
  {
    key: "tender",
    label: "Tenders",
    icon: <FileTextOutlined />,
  },
  {
    key: "registration",
    label: "Registrations",
    icon: <FormOutlined />,
    // children: [
    //   {
    //     key: "entitlements",
    //     label: "Entitlements",
    //     icon: <MdOutlineCircle />,
    //   },
    // ],
  },
  {
    key: "client",
    label: "Clients",
    icon: <ShopOutlined />,
  },
  {
    key: "contact",
    label: "Contacts",
    icon: <ContactsOutlined />,
  },
  {
    key: "user",
    label: "Team",
    icon: <UserAddOutlined />,
  },
  {
    key: "account-management",
    label: "Accounts Management",
    icon: <SettingOutlined />,
    disabled: true,
  },
  {
    key: "customer-360",
    label: "Customer 360",
    icon: <SolutionOutlined />,
    disabled: true,
  },
  {
    key: "incentive",
    label: "Incentives",
    icon: <GiftOutlined />,
    disabled: true,
  },
  {
    key: "task",
    label: "Tasks",
    icon: <CheckSquareOutlined />,
    disabled: true,
  },
  {
    key: "admin",
    label: "Admin",
    icon: <CrownOutlined />,
  },
];

// categorized resources
// Preprocessed Categories
// export const resources = [
//   {
//     category: "Live Reports",
//     items: [
//       {
//         key: "dashboard",
//         label: "Live Report",
//         icon: <DashboardOutlined />,
//         children: [
//           {
//             key: "dashboards/pipe-view",
//             label: "Pipe View",
//             icon: <MdOutlineCircle />,
//           },
//           {
//             key: "dashboards/funnel-view",
//             label: "Funnel View",
//             icon: <MdOutlineCircle />,
//           },
//           {
//             key: "dashboards/summary-view",
//             label: "Summary View",
//             icon: <MdOutlineCircle />,
//           },
//           {
//             key: "dashboards/leaderboard",
//             label: "Leaderboard",
//             icon: <MdOutlineCircle />,
//           },
//           {
//             key: "dashboards/trend-view",
//             label: "Trend View",
//             icon: <MdOutlineCircle />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: "Sales",
//     items: [
//       { key: "deal", label: "Deals", icon: <FileOutlined /> },
//       { key: "tender", label: "Tenders", icon: <FileTextOutlined /> },
//     ],
//   },
//   {
//     category: "Opportunities",
//     items: [
//       {
//         key: "opportunity/lead",
//         label: "Lead",
//         icon: <MdOutlineCircle />,
//         disabled: true,
//       },
//       {
//         key: "opportunity/interaction",
//         label: "Interaction",
//         icon: <MdOutlineCircle />,
//         disabled: true,
//       },
//       {
//         key: "opportunity/mention",
//         label: "Mention",
//         icon: <MdOutlineCircle />,
//       },
//     ],
//   },
//   {
//     category: "Management",
//     items: [
//       { key: "registration", label: "Registrations", icon: <FormOutlined /> },
//       { key: "client", label: "Clients", icon: <ShopOutlined /> },
//       { key: "contact", label: "Contacts", icon: <TeamOutlined /> },
//       { key: "user", label: "Team", icon: <UserAddOutlined /> },
//       {
//         key: "account-management",
//         label: "Account Management",
//         icon: <SettingOutlined />,
//         disabled: true,
//       },
//     ],
//   },
//   {
//     category: "Others",
//     items: [
//       {
//         key: "customer-360",
//         label: "Customer 360",
//         icon: <SolutionOutlined />,
//         disabled: true,
//       },
//       {
//         key: "incentive",
//         label: "Incentive",
//         icon: <GiftOutlined />,
//         disabled: true,
//       },
//       {
//         key: "task",
//         label: "Task",
//         icon: <CheckSquareOutlined />,
//         disabled: true,
//       },
//       { key: "admin", label: "Admin", icon: <CrownOutlined /> },
//     ],
//   },
// ];
