import {
  TeamOutlined,
  ShopOutlined,
  DashboardOutlined,
  ProjectOutlined,
  CrownOutlined,
  FileOutlined,
  UserAddOutlined,
  FormOutlined,
  FileTextOutlined,
  SettingOutlined,
  SolutionOutlined,
  GiftOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import { MdOutlineCircle } from "react-icons/md";

export const resources = [
  {
    key: "dashboard",
    label: "Live Report",
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
    icon: <FileOutlined />,
  },
  {
    key: "tender",
    label: "Tenders",
    icon: <FileTextOutlined />,
  },
  {
    key: "opportunity",
    label: "Opportunities",
    icon: <ProjectOutlined />,
    children: [
      {
        key: "opportunity/lead",
        label: "Lead",
        icon: <MdOutlineCircle />,
        disabled: true,
      },
      {
        key: "opportunity/interaction",
        label: "Interaction",
        icon: <MdOutlineCircle />,
        disabled: true,
      },
      {
        key: "opportunity/mention",
        label: "Mention",
        icon: <MdOutlineCircle />,
      },
    ],
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
    icon: <TeamOutlined />,
  },
  {
    key: "user",
    label: "Team",
    icon: <UserAddOutlined />,
  },
  {
    key: "account-management",
    label: "Account Management",
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
    label: "Incentive",
    icon: <GiftOutlined />,
    disabled: true,
  },
  {
    key: "task",
    label: "Task",
    icon: <CheckSquareOutlined />,
    disabled: true,
  },
  {
    key: "admin",
    label: "Admin",
    icon: <CrownOutlined />,
  },
];
