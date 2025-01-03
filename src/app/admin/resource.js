import { SettingOutlined } from "@ant-design/icons";
import { FcDataConfiguration } from "react-icons/fc";
import { GrDocumentConfig } from "react-icons/gr";
import { PiUserGearDuotone } from "react-icons/pi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTarget } from "react-icons/lu";
import { GrSystem } from "react-icons/gr";

import { colorConfig } from "@/config";
export const resources = [
  {
    key: "configurations",
    title: "Configurations",
    icon: <GrSystem color={colorConfig.primary} size={22} />,
    description: "Manage system configurations",
  },
  {
    key: "roles-permissions",
    title: "Roles & Permissions",
    icon: <PiUserGearDuotone color={colorConfig.primary} size={24} />,
    description: "Manage user roles and permissions",
  },
  {
    key: "targets",
    title: "Targets",
    icon: <LuTarget color={colorConfig.primary} size={24} />,
    description: "Set targets for the team",
  },
  {
    key: "db-backup",
    title: "DB Backup",
    icon: <FaCloudDownloadAlt color={colorConfig.primary} size={24} />,
    description: "Backup the database",
  },
  {
    key: "report",
    title: "Report",
    icon: <TbReportAnalytics color={colorConfig.primary} size={24} />,
    description: "Generate reports",
  },
  {
    key: "system-config",
    title: "System Config",
    icon: <TbReportAnalytics color={colorConfig.primary} size={24} />,
    description: "Setup your system",
  },
];
