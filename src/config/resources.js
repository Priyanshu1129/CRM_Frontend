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
                icon: <MdOutlineCircle />
            },
            {
                key: "dashboards/funnel-view",
                label: "Funnel View",
                icon: <MdOutlineCircle />
            },
            {
                key: "dashboards/summary-view",
                label: "Summary View",
                icon: <MdOutlineCircle />
            },
            {
                key: "dashboards/leaderboard",
                label: "Leaderboard",
                icon: <MdOutlineCircle />
            },
            {
                key: "dashboards/target-view",
                label: "Target View",
                icon: <MdOutlineCircle />
            },
            {
                key: "dashboards/trend-view",
                label: "Trend View",
                icon: <MdOutlineCircle />
            }
        ]
    },
    // {
    //     key: "calendar",
    //     label: "Calendar",
    //     icon: <CalendarOutlined />,
    // },
    // {
    //     key: "scrumboard",
    //     label: "Scrum Board",
    //     icon: <ProjectOutlined />,
    //     children: [
    //         {
    //             key: "9",
    //             label: "Project Kanban",
    //         },
    //         {
    //             key: "10",
    //             label: "Sales Pipeline",
    //         }
    //     ],
    // },
    {
        key: "opportunity-master",
        label: "Deals",
        icon: <FileOutlined />,
        // style: { marginTop: "15px", fontWeight: "600" },
    },
    {
        key: "tender-master",
        label: "Tenders",
        icon: <FileTextOutlined />,
    },
    {
        key: "business-development-master",
        label: "Mentions",
        icon: <ProjectOutlined />,
    },
    {
        key: "registration-master",
        label: "Registrations",
        icon: <FormOutlined />,
    },
    {
        key: "client-master",
        label: "Clients",
        icon: <ShopOutlined />,
    },
    {
        key: "contact-master",
        label: "Contacts",
        icon: <TeamOutlined />,
    },
    // {
    //     key: "team-master",
    //     label: "Team Master",
    //     icon: <UsergroupAddOutlined />,
    // },
    {
        key: "user-master",
        label: "Team",
        icon: <UserAddOutlined />,
    },
    // {
    //     key: "project-master",
    //     label: "Project Master",
    //     icon: <ProjectFilled />,
    // },
    {
        key: "admin",
        label: "Admin",
        icon: <CrownOutlined />
    }
];
