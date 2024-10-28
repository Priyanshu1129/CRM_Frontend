import { SettingOutlined } from "@ant-design/icons"
import { FcDataConfiguration } from "react-icons/fc";
import { GrDocumentConfig } from "react-icons/gr";
import { PiUserGearDuotone } from "react-icons/pi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTarget } from "react-icons/lu";
export const resources = [
    {
        key: "configurations",
        title: "Configurations",
        icon: <GrDocumentConfig />
    },
    {
        key: "roles-permissions",
        title: "Roles & Permissions",
        icon: <PiUserGearDuotone />
    },
    {
        key: "targets",
        title: "Set Targets",
        icon: <LuTarget />
    },
    {
        key: "db-backup",
        title: "DB Backup",
        icon: <FaCloudDownloadAlt />
    },
    {
        key: "report",
        title: "Report",
        icon: <TbReportAnalytics />
    }
]