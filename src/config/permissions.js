export const routePermissions = {
  "/dashboards/pipe-view": [
    {
      entity: "PIPE VIEW",
      action: ["MY VIEW", "ALL VIEW"],
    },
  ],
  "/dashboards/funnel-view": [
    {
      entity: "FUNNEL VIEW",
      action: ["MY VIEW", "ALL VIEW"],
    },
  ],

  // all masters route

  // tender routes
  "/tender": [{ entity: "TENDER", action: ["GET ALL", "CREATE"] }],
  "/tender/add-tender": [{ entity: "TENDER", action: ["CREATE"] }],
  "/tender/tender-details/:id": [{ entity: "TENDER", action: ["READ"] }],

  // opportunity routes
  "/opportunity": [{ entity: "OPPORTUNITY", action: ["GET ALL", "CREATE"] }],
  "/opportunity/add-opportunity": [
    { entity: "OPPORTUNITY", action: ["CREATE"] },
  ],
  "/opportunity/opportunity-details/:id": [
    { entity: "OPPORTUNITY", action: ["READ"] },
  ],

  // client routes
  "/client": [{ entity: "CLIENT", action: ["GET ALL", "CREATE"] }],
  "/client/add-client": [{ entity: "CLIENT", action: ["CREATE"] }],
  "/client/client-details/:id": [{ entity: "CLIENT", action: ["READ"] }],

  "/contact": [{ entity: "CONTACT", action: ["GET ALL", "CREATE"] }],
  "/contact/add-contact": [{ entity: "CONTACT", action: ["CREATE"] }],
  "/contact/contact-details/:id": [{ entity: "CONTACT", action: ["READ"] }],

  "/registration": [{ entity: "REGISTRATION", action: ["GET ALL", "CREATE"] }],
  "/registration/add-registration": [
    { entity: "REGISTRATION", action: ["CREATE"] },
  ],
  "/registration/registration-details/:id": [
    { entity: "REGISTRATION", action: ["READ"] },
  ],

  // client routes
  "/mention": [
    { entity: "BUSINESS DEVELOPMENT", action: ["GET ALL", "CREATE"] },
  ],
  "/mention/add-mention": [
    { entity: "BUSINESS DEVELOPMENT", action: ["CREATE"] },
  ],
  "/mention/mention-details/:id": [
    { entity: "BUSINESS DEVELOPMENT", action: ["READ"] },
  ],

  "/user": [{ entity: "ROLE ENTITY", action: ["GET ALL", "CREATE"] }],
  "/user/add-user": [{ entity: "ROLE ENTITY", action: ["CREATE"] }],
  "/user/user-details/:roleId/:id": [
    { entity: "ROLE ENTITY", action: ["READ"] },
  ],

  // admin routes
  "/admin": [
    { entity: "CONFIGURATION", action: ["GET ALL", "CREATE"] },
    { entity: "ROLE", action: ["GET ALL", "CREATE"] },
  ],
  // admin configuration routes
  "/admin/configurations": [{ entity: "CONFIGURATION", action: ["GET ALL"] }],
  "/admin/configurations/add-configuration": [
    { entity: "CONFIGURATION", action: ["CREATE"] },
  ],
  "/admin/configurations/industry": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  "/admin/configurations/sub-industry": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  "/admin/configurations/solution": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  "/admin/configurations/sub-solution": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  "/admin/configurations/territory": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  "/admin/configurations/sales-stage": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  "/admin/configurations/sales-sub-stage": [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],

  // admin roles and permission routes
  "/admin/roles-permissions": [{ entity: "ROLE", action: ["GET ALL"] }],
  "/admin/roles-permissions/add-role": [{ entity: "ROLE", action: ["CREATE"] }],
  "/admin/roles-permissions/role-details/:id": [
    { entity: "ROLE", action: ["READ"] },
  ],
};

export const sideBarPermissions = {
  "dashboards/pipe-view": [
    { entity: "PIPE VIEW", action: ["ALL VIEW", "MY VIEW"] },
  ],
  "dashboards/funnel-view": [
    { entity: "FUNNEL VIEW", action: ["ALL VIEW", "MY VIEW"] },
  ],
  "dashboards/trend-view": [], // No permissions required for the dashboard
  "dashboards/leaderboard": [{ entity: "LEADERBOARD", action: ["ALL VIEW"] }], // No permissions required for the dashboard
  opportunity: [{ entity: "OPPORTUNITY", action: ["GET ALL", "CREATE"] }],
  tender: [{ entity: "TENDER", action: ["GET ALL", "CREATE"] }],
  mention: [{ entity: "BUSINESS DEVELOPMENT", action: ["GET ALL", "CREATE"] }],
  registration: [{ entity: "REGISTRATION", action: ["GET ALL", "CREATE"] }],
  client: [{ entity: "CLIENT", action: ["GET ALL", "CREATE"] }],
  contact: [{ entity: "CONTACT", action: ["GET ALL", "CREATE"] }],
  user: [{ entity: "ROLE ENTITY", action: ["GET ALL", "CREATE"] }],
  admin: [
    { entity: "CONFIGURATION", action: ["GET ALL", "CREATE"] },
    { entity: "ROLE", action: ["GET ALL", "CREATE"] },
  ],
};
