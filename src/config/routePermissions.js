export const routePermissions = {
  "/dashboards/pipe-view/all-view": [
    {
      entity: "PIPE VIEW",
      action: ["ALL VIEW"],
    },
  ],
  "/tender": [{ entity: "TENDER", action: ["GET ALL", "CREATE"] }],
  "/opportunity": [{ entity: "OPPORTUNITY", action: ["GET ALL", "CREATE"] }],
  "/client": [{ entity: "CLIENT", action: ["GET ALL", "CREATE"] }],
  "/contact": [{ entity: "CONTACT", action: ["GET ALL", "CREATE"] }],
  "/registration": [{ entity: "REGISTRATION", action: ["GET ALL", "CREATE"] }],
  "/user": [{ entity: "USER", action: ["GET ALL", "CREATE"] }],
  "/user/add-user": [{ entity: "USER", action: ["CREATE"] }],
  "/user/user-details": [{ entity: "USER", action: ["READ"] }],
  "/admin": [
    { entity: "CONFIGURATION", action: ["GET ALL", "CREATE"] },
    { entity: "ROLE", action: ["GET ALL", "CREATE"] },
  ],
};
