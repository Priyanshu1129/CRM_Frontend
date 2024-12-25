export const stages = {
  data: [
    { id: 1, title: "Lead", key: "lead" },
    { id: 2, title: "Prospect", key: "prospect" },
    { id: 3, title: "Qualification", key: "qualification" },
    { id: 4, title: "Follow Up", key: "followup" },
    { id: 5, title: "Proposal", key: "proposal" },
    { id: 6, title: "Closing", key: "closing" },
    // { id: 7, title: "WON" },
    // { id: 8, title: "LOST" },
  ],
};
export const getStats = (opportunities) => {
  if (opportunities) {
    const stats = stages.data.reduce((acc, stage) => {
      const stageOpportunities = opportunities[stage.key] || [];
      // console.log("stageOpportunities : ", stageOpportunities);
      const count = stageOpportunities.length;
      const totalRevenue = Array.isArray(stageOpportunities) ? stageOpportunities.reduce((acc, item) => acc + (item.totalRevenue || 0), 0) : 0;

      acc[stage.key] = {
        count,
        totalRevenue,
      };

      return acc;
    }, {});
    
    return stats;
  }
  return {};
};
