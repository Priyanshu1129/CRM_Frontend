import { SettingOutlined } from "@ant-design/icons"
import { FcDataConfiguration } from "react-icons/fc";
import { GrDocumentConfig } from "react-icons/gr";
import { PiUserGearDuotone } from "react-icons/pi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTarget } from "react-icons/lu";

import { colorConfig } from "@/config";
export const resources = [
    {
        key: "configurations",
        title: "Configurations",
        icon: <GrDocumentConfig color={colorConfig.primary} size={24}/>
    },
    {
        key: "roles-permissions",
        title: "Roles & Permissions",
        icon: <PiUserGearDuotone color={colorConfig.primary} size={24} />
    },
    {
        key: "targets",
        title: "Set Targets",
        icon: <LuTarget color={colorConfig.primary} size={24}/>
    },
    {
        key: "db-backup",
        title: "DB Backup",
        icon: <FaCloudDownloadAlt color={colorConfig.primary} size={24} />
    },
    {
        key: "report",
        title: "Report",
        icon: <TbReportAnalytics color={colorConfig.primary} size={24}/>
    }
]