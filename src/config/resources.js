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
        label: "Cockpit",
        icon: <DashboardOutlined />,
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
        label: "Client Master",
        icon: <ShopOutlined />,
    },
    {
        key: "contact-master",
        label: "Contact Master",
        icon: <TeamOutlined />,
    },
    {
        key: "opportunity-master",
        label: "Opportunity Master",
        icon: <FileOutlined />,
    },
    // {
    //     key: "team-master",
    //     label: "Team Master",
    //     icon: <UsergroupAddOutlined />,
    // },
    {
        key: "staff-master",
        label: "Team Master",
        icon: <UserAddOutlined />,
    },
    {
        key: "registration-master",
        label: "Registration Master",
        icon: <FormOutlined />,
    },
    {
        key: "tender-master",
        label: "Tender Master",
        icon: <FileTextOutlined />,
    },
    {
        key: "business-development-master",
        label: "Business Development Master",
        icon: <ProjectFilled />,
    },
    // {
    //     key: "project-master",
    //     label: "Project Master",
    //     icon: <ProjectFilled />,
    // },
    {
        key: "administration",
        label: "Administration",
        icon: <CrownOutlined />,
        children: [
            {
                key: "settings",
                label: "Settings",
            },
            {
                key: "audits",
                label: "Audit Log",
            },
        ]
    }
];
