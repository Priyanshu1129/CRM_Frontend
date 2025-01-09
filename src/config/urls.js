const urls = {
  // Dashboard Routes
  DASHBOARD_PIPE_VIEW: "/dashboards/pipe-view",
  DASHBOARD_FUNNEL_VIEW: "/dashboards/funnel-view",
  DASHBOARD_SUMMARY_VIEW: "/dashboards/summary-view",
  DASHBOARD_TREND_VIEW: "/dashboards/trend-view",
  DASHBOARD_LEADERBOARD: "/dashboards/leaderboard",

  // Tender Routes
  TENDER: "/tender",
  TENDER_ADD: "/tender/add-tender",
  TENDER_DETAILS: "/tender/tender-details/:id",

  // Opportunity Routes
  OPPORTUNITY: "/opportunity",
  OPPORTUNITY_ADD: "/opportunity/add-opportunity",
  OPPORTUNITY_DETAILS: "/opportunity/opportunity-details/:id",

  // Client Routes
  CLIENT: "/client",
  CLIENT_ADD: "/client/add-client",
  CLIENT_DETAILS: "/client/client-details/:id",

  // Contact Routes
  CONTACT: "/contact",
  CONTACT_ADD: "/contact/add-contact",
  CONTACT_DETAILS: "/contact/contact-details/:id",

  // Registration Routes
  REGISTRATION: "/registration",
  REGISTRATION_ADD: "/registration/add-registration",
  REGISTRATION_DETAILS: "/registration/registration-details/:id",

  // Mention Routes (Business Development)
  MENTION: "/mention",
  MENTION_ADD: "/mention/add-mention",
  MENTION_DETAILS: "/mention/mention-details/:id",

  // User Routes
  USER: "/user",
  USER_ADD: "/user/add-user",
  USER_DETAILS: "/user/user-details/:roleId/:id",

  // Admin Routes
  ADMIN: "/admin",

  // Admin Configuration Routes
  ADMIN_CONFIGURATIONS: "/admin/configurations",
  ADMIN_CONFIGURATIONS_ADD: "/admin/configurations/add-configuration",
  ADMIN_CONFIGURATIONS_INDUSTRY: "/admin/configurations/industry",
  ADMIN_CONFIGURATIONS_SUB_INDUSTRY: "/admin/configurations/sub-industry",
  ADMIN_CONFIGURATIONS_SOLUTION: "/admin/configurations/solution",
  ADMIN_CONFIGURATIONS_SUB_SOLUTION: "/admin/configurations/sub-solution",
  ADMIN_CONFIGURATIONS_TERRITORY: "/admin/configurations/territory",
  ADMIN_CONFIGURATIONS_SALES_STAGE: "/admin/configurations/sales-stage",
  ADMIN_CONFIGURATIONS_SALES_SUB_STAGE: "/admin/configurations/sales-sub-stage",

  // Admin Roles and Permissions Routes
  ADMIN_ROLES_PERMISSIONS: "/admin/roles-permissions",
  ADMIN_ROLES_PERMISSIONS_ADD: "/admin/roles-permissions/add-role",
  ADMIN_ROLES_PERMISSIONS_DETAILS: "/admin/roles-permissions/role-details/:id",
};

export default urls;
