import urls from "./urls";

export const routePermissions = {
  [urls.DASHBOARD_PIPE_VIEW]: [
    {
      entity: "PIPE VIEW",
      action: ["MY VIEW", "ALL VIEW"],
    },
  ],
  [urls.DASHBOARD_FUNNEL_VIEW]: [
    {
      entity: "FUNNEL VIEW",
      action: ["MY VIEW", "ALL VIEW"],
    },
  ],

  // all masters route

  // tender routes
  [urls.TENDER]: [{ entity: "TENDER", action: ["GET ALL", "CREATE"] }],
  [urls.TENDER_ADD]: [{ entity: "TENDER", action: ["CREATE"] }],
  [urls.TENDER_DETAILS]: [{ entity: "TENDER", action: ["READ"] }],
  [urls.TENDER_UPDATE]: [{ entity: "TENDER", action: ["UPDATE"] }], // fake route

  // opportunity routes
  [urls.DEAL]: [{ entity: "OPPORTUNITY", action: ["GET ALL", "CREATE"] }],
  [urls.DEAL_ADD]: [{ entity: "OPPORTUNITY", action: ["CREATE"] }],
  [urls.DEAL_DETAILS]: [{ entity: "OPPORTUNITY", action: ["READ"] }],
  [urls.DEAL_UPDATE]: [{ entity: "OPPORTUNITY", action: ["UPDATE"] }], // fake route

  // client routes
  [urls.CLIENT]: [{ entity: "CLIENT", action: ["GET ALL", "CREATE"] }],
  [urls.CLIENT_ADD]: [{ entity: "CLIENT", action: ["CREATE"] }],
  [urls.CLIENT_DETAILS]: [{ entity: "CLIENT", action: ["READ"] }],
  [urls.CLIENT_UPDATE]: [{ entity: "CLIENT", action: ["UPDATE"] }], // fake route

  [urls.CONTACT]: [{ entity: "CONTACT", action: ["GET ALL", "CREATE"] }],
  [urls.CONTACT_ADD]: [{ entity: "CONTACT", action: ["CREATE"] }],
  [urls.CONTACT_DETAILS]: [{ entity: "CONTACT", action: ["READ"] }],
  [urls.CONTACT_UPDATE]: [{ entity: "CONTACT", action: ["UPDATE"] }], // fake route

  [urls.REGISTRATION]: [
    { entity: "REGISTRATION", action: ["GET ALL", "CREATE"] },
  ],
  [urls.REGISTRATION_ADD]: [{ entity: "REGISTRATION", action: ["CREATE"] }],
  [urls.REGISTRATION_DETAILS]: [{ entity: "REGISTRATION", action: ["READ"] }],
  [urls.REGISTRATION_UPDATE]: [{ entity: "REGISTRATION", action: ["UPDATE"] }], // fake route

  // client routes
  [urls.MENTION]: [
    { entity: "BUSINESS DEVELOPMENT", action: ["GET ALL", "CREATE"] },
  ],
  [urls.MENTION_ADD]: [{ entity: "BUSINESS DEVELOPMENT", action: ["CREATE"] }],
  [urls.MENTION_DETAILS]: [
    { entity: "BUSINESS DEVELOPMENT", action: ["READ"] },
  ],
  [urls.MENTION_UPDATE]: [{ entity: "MENTION", action: ["UPDATE"] }], // fake route

  [urls.USER]: [{ entity: "ROLE ENTITY", action: ["GET ALL", "CREATE"] }],
  [urls.USER_ADD]: [{ entity: "ROLE ENTITY", action: ["CREATE"] }],
  [urls.USER_DETAILS]: [{ entity: "ROLE ENTITY", action: ["READ"] }],
  [urls.USER_UPDATE]: [{ entity: "ROLE ENTITY", action: ["UPDATE"] }], // fake route

  // admin routes
  [urls.ADMIN]: [
    { entity: "CONFIGURATION", action: ["GET ALL", "CREATE"] },
    { entity: "ROLE", action: ["GET ALL", "CREATE"] },
  ],

  // admin configuration routes
  [urls.ADMIN_CONFIGURATIONS]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_DETAILS]: [
    { entity: "CONFIGURATION", action: ["READ"] },
  ],
  [urls.ADMIN.ADMIN_CONFIGURATIONS_ADD]: [
    { entity: "CONFIGURATION", action: ["CREATE"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_UPDATE]: [
    { entity: "CONFIGURATION", action: ["UPDATE"] },
  ],

  [urls.ADMIN_CONFIGURATIONS_INDUSTRY]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_SUB_INDUSTRY]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_SOLUTION]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_SUB_SOLUTION]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_TERRITORY]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_SALES_STAGE]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],
  [urls.ADMIN_CONFIGURATIONS_SALES_SUB_STAGE]: [
    { entity: "CONFIGURATION", action: ["GET ALL"] },
  ],

  // admin roles and permission routes
  [urls.ADMIN_ROLES_PERMISSIONS]: [{ entity: "ROLE", action: ["GET ALL"] }],
  [urls.ADMIN_ROLES_PERMISSIONS_ADD]: [{ entity: "ROLE", action: ["CREATE"] }],
  [urls.ADMIN_ROLES_PERMISSIONS_DETAILS]: [
    { entity: "ROLE", action: ["READ"] },
  ],
  [urls.ADMIN_ROLES_PERMISSIONS_UPDATE]: [
    { entity: "ROLE", action: ["UPDATE"] },
  ], // fake route
};

export const sideBarPermissions = {
  // dashboard tab
  "dashboards/pipe-view": [
    { entity: "PIPE VIEW", action: ["ALL VIEW", "MY VIEW"] },
  ],
  "dashboards/funnel-view": [
    { entity: "FUNNEL VIEW", action: ["ALL VIEW", "MY VIEW"] },
  ],
  "dashboards/summary-view": [{ entity: "SUMMARY VIEW", action: ["ALL VIEW"] }],
  "dashboards/trend-view": [{ entity: "TREND VIEW", action: ["ALL VIEW"] }],
  "dashboards/leaderboard": [{ entity: "LEADERBOARD", action: ["ALL VIEW"] }],

  // for deal tab
  deal: [{ entity: "OPPORTUNITY", action: ["GET ALL", "CREATE"] }],

  // for tender tab
  tender: [{ entity: "TENDER", action: ["GET ALL", "CREATE"] }],

  // for opportunity mention tab
  "opportunity/mention": [
    { entity: "BUSINESS DEVELOPMENT", action: ["GET ALL", "CREATE"] },
  ],

  // for registration tab
  registration: [{ entity: "REGISTRATION", action: ["GET ALL", "CREATE"] }],

  // for client tab
  client: [{ entity: "CLIENT", action: ["GET ALL", "CREATE"] }],

  // for contact tab
  contact: [{ entity: "CONTACT", action: ["GET ALL", "CREATE"] }],

  // for user tab
  user: [{ entity: "ROLE ENTITY", action: ["GET ALL", "CREATE"] }],

  // for admin tab
  admin: [
    { entity: "CONFIGURATION", action: ["GET ALL", "CREATE"] },
    { entity: "ROLE", action: ["GET ALL", "CREATE"] },
  ],

  // for configurations tab
  configurations: [{ entity: "CONFIGURATION", action: ["GET ALL"] }],

  // for roles-permissions tab
  "roles-permissions": [{ entity: "ROLE", action: ["GET ALL"] }],

  // for targets tab
  targets: [{ entity: "TARGET", action: ["GET ALL"] }],

  // for db-backup tab
  "db-backup": [{ entity: "BACKUP", action: ["YES"] }],

  // for report tab
  report: [{ entity: "REPORT", action: ["YES"] }],

  // for system-config tab
  "system-config": [{ entity: "SYSTEM_CONFIG", action: ["YES"] }],
};
