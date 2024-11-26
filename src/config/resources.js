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
    ProjectFilled,
} from "@ant-design/icons";

export const resources = [
    {
        key: "cockpit",
        label: "Live Report",
        icon: <DashboardOutlined />,
        children: [
            {
                key: "dashboards/pipe-view",
                label: "Pipe View",
            },
            {
                key: "dashboards/funnel-view",
                label: "Funnel View",
            },
            {
                key: "dashboards/summary-view",
                label: "Summary View",
            },
            {
                key: "dashboards/compare-view",
                label: "Compare View",
            },
            {
                key: "dashboards/target-view",
                label: "Target View",
            },
            {
                key: "dashboards/trend-view",
                label: "Trend View",
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
        key: "client-master",
        label: "Clients",
        icon: <ShopOutlined />,
    },
    {
        key: "contact-master",
        label: "Contacts",
        icon: <TeamOutlined />,
    },
    {
        key: "opportunity-master",
        label: "Deals",
        icon: <FileOutlined />,
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
    {
        key: "registration-master",
        label: "Registrations",
        icon: <FormOutlined />,
    },
    {
        key: "tender-master",
        label: "Tenders",
        icon: <FileTextOutlined />,
    },
    {
        key: "business-development-master",
        label: "Mentions",
        icon: <ProjectFilled />,
    },
    // {
    //     key: "project-master",
    //     label: "Project Master",
    //     icon: <ProjectFilled />,
    // },
    {
        key: "admin-panel",
        label: "Admin Panel",
        icon: <CrownOutlined />
    }
];
