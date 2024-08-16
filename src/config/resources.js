import {
    ContainerOutlined,
    TeamOutlined,
    ShopOutlined,
    DashboardOutlined,
    CalendarOutlined,
    ProjectOutlined,
    CrownOutlined
} from "@ant-design/icons";

export const resources = [
    {
        key: "cockpit",
        label: "Cockpit",
        icon: <DashboardOutlined />,
    },
    // {
    //     key: "calender",
    //     label: "Calender",
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
        icon: <ShopOutlined />
    },
    {
        key: "contact-master",
        label: "Contact Master",
        icon: <TeamOutlined />,
    },
    {
        key: "opportunity-master",
        label: "Opportunity Master",
        icon: <ContainerOutlined />,
    },
    {
        key: "team-master",
        label: "Team Master",
        icon: <ContainerOutlined />,
    },
    {
        key: "staff-master",
        label: "Staff Master",
        icon: <ContainerOutlined />,
    },
    {
        key: "registration-master",
        label: "Registration Master",
        icon: <ContainerOutlined />,
    },
    {
        key: "tender-master",
        label: "Tender Master",
        icon: <ContainerOutlined />,
    },
    {
        key: "business-development-master",
        label: "Business Development Master",
        icon: <ContainerOutlined />,
    },
    {
        key: "project-master",
        label: "Project Master",
        icon: <ContainerOutlined />,
    },
    // {
    //     key: "administration",
    //     label: "Administration",
    //     icon: <CrownOutlined />,
    //     children: [
    //         {
    //             key: "settings",
    //             label: "Settings",
    //         },
    //         {
    //             key: "audits",
    //             label: "Audit Log",
    //         },
    //     ]
    // }
];