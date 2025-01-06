import {
  ContainerOutlined,
  TeamOutlined,
  ShopOutlined,
  DashboardOutlined,
  CalendarOutlined,
  ProjectOutlined,
  CrownOutlined,
  FileOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  FormOutlined,
  FileTextOutlined,
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
    key: "opportunity",
    label: "Deals",
    icon: <FileOutlined />,
  },
  {
    key: "tender",
    label: "Tenders",
    icon: <FileTextOutlined />,
  },
  {
    key: "mention",
    label: "Mentions",
    icon: <ProjectOutlined />,
  },
  {
    key: "registration",
    label: "Registrations",
    icon: <FormOutlined />,
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
    key: "admin",
    label: "Admin",
    icon: <CrownOutlined />,
  },
];
