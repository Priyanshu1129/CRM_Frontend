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

// {
//   "lead": [],
//   "prospect": [],
//   "qualification": [
//       {
//           "_id": "671bcd6a8bfe1628fa712175",
//           "customId": null,
//           "entryDate": "2024-06-15T00:00:00.000Z",
//           "enteredBy": "670e85355a74d28e495aaf4e",
//           "partneredWith": "Apple",
//           "projectName": "Handling Costomer Care of apple ",
//           "solution": "670e7bd5551fb1aab907486b",
//           "subSolution": "670e7bd5551fb1aab907486b",
//           "salesChamp": "670e85355a74d28e495aaf4e",
//           "salesStage": "670e7df4f5e783c1a47cd493",
//           "salesSubStage": "670e81110a2c8e8563f16af7",
//           "stageClarification": "Initial discussions with client completed.",
//           "salesTopLine": 100000,
//           "offsets": 5000,
//           "revenue": [
//               "671bcd6a8bfe1628fa712176"
//           ],
//           "totalRevenue": 550000,
//           "confidenceLevel": 80,
//           "expectedSales": 440000,
//           "stageHistory": [
//               "671bcd6b8bfe1628fa71217d",
//               "671bcdf78bfe1628fa712225",
//               "671bce0a8bfe1628fa712237"
//           ],
//           "__v": 3,
//           "client": {
//               "_id": "671bc8168bfe1628fa711ecd",
//               "avatar": "https://res.cloudinary.com/dpgj9mrly/raw/upload/v1729873945/CRM/profile/client/671bc8168bfe1628fa711ecd.jpg",
//               "name": "Apple",
//               "clientCode": "GBAPYL",
//               "entryDate": "2024-10-25T16:32:22.298Z",
//               "enteredBy": "670e85355a74d28e495aaf4e",
//               "industry": "670e7b20118ef39f020d15fa",
//               "subIndustry": "670e7bb7a8dfb64bd1f1eb15",
//               "offering": "phone company",
//               "territory": "670e81864851752095a8bb71",
//               "incorporationType": "670e8207db3a5406983e706d",
//               "listedCompany": true,
//               "marketCap": "100-500M $",
//               "annualRevenue": "1373.63",
//               "classification": "670e8207db3a5406983e7075",
//               "totalEmployeeStrength": 5000,
//               "itEmployeeStrength": 50000,
//               "secondaryRelationship": "670e85355a74d28e495aaf4e",
//               "relatedContacts": [
//                   "671bc9c78bfe1628fa711ef5",
//                   "671bca738bfe1628fa711f18",
//                   "671bcbd18bfe1628fa712093"
//               ],
//               "relationshipStatus": "670e8207db3a5406983e706b",
//               "lifeTimeValue": 0,
//               "priority": "Very High",
//               "contacts": [],
//               "createdAt": "2024-10-25T16:32:25.809Z",
//               "updatedAt": "2024-10-25T16:49:06.107Z",
//               "__v": 2
//           }
//       }
//   ],
//   "proposal": [],
//   "followup": [
//       {
//           "_id": "671387d22cbc747cd7368796",
//           "customId": null,
//           "entryDate": "2024-06-15T00:00:00.000Z",
//           "enteredBy": "670e85355a74d28e495aaf4e",
//           "partneredWith": "Partner ABC",
//           "projectName": "Op-1",
//           "solution": "670e7bd5551fb1aab907486b",
//           "subSolution": "670e7bd5551fb1aab907486b",
//           "salesChamp": "670e85355a74d28e495aaf4e",
//           "salesStage": "670e7df5f5e783c1a47cd497",
//           "salesSubStage": "670e81110a2c8e8563f16af7",
//           "stageClarification": "Updated------",
//           "salesTopLine": 100000,
//           "offsets": 5000,
//           "revenue": [
//               "671387d22cbc747cd7368797"
//           ],
//           "totalRevenue": 550000,
//           "confidenceLevel": 80,
//           "expectedSales": 440000,
//           "stageHistory": [
//               "671387d22cbc747cd736879e",
//               "671388f22cbc747cd73687b0",
//               "671389092cbc747cd73687bd",
//               "671389922cbc747cd73687ee",
//               "671389b52cbc747cd73687fb"
//           ],
//           "__v": 7,
//           "client": null
//       }
//   ],
//   "closing": [
//       {
//           "_id": "6713a3494b612c708e824e46",
//           "customId": null,
//           "entryDate": "2024-06-15T00:00:00.000Z",
//           "enteredBy": "670e85355a74d28e495aaf4e",
//           "partneredWith": "Partner ABC",
//           "projectName": "Op-3",
//           "solution": "670e7bd5551fb1aab907486b",
//           "subSolution": "670e7bd5551fb1aab907486b",
//           "salesChamp": "670e85355a74d28e495aaf4e",
//           "salesStage": "670e7df5f5e783c1a47cd499",
//           "salesSubStage": "670e81110a2c8e8563f16af7",
//           "stageClarification": "Updated------",
//           "salesTopLine": 100000,
//           "offsets": 5000,
//           "revenue": [
//               "6713a3494b612c708e824e47"
//           ],
//           "totalRevenue": 550000,
//           "confidenceLevel": 80,
//           "expectedSales": 440000,
//           "stageHistory": [
//               "6713a3494b612c708e824e4e",
//               "6713a587c7c72ffec981c1b6",
//               "6713a5bdc7c72ffec981c1c8",
//               "6713a5dcc7c72ffec981c1d5",
//               "6713a5e5c7c72ffec981c1e2",
//               "6713a5f0c7c72ffec981c1ef"
//           ],
//           "__v": 6,
//           "client": {
//               "_id": "67176360bb0e071793060cdd",
//               "avatar": "",
//               "name": "avatar uplod",
//               "clientCode": "GGZYIV",
//               "entryDate": "2024-08-12T14:30:00.000Z",
//               "enteredBy": "64c7b3c43a6f9a3e0d842113",
//               "industry": "64c7b3c43a6f9a3e0d842113",
//               "subIndustry": "64c7b3c43a6f9a3e0d842113",
//               "territory": "64c7b3c43a6f9a3e0d842113",
//               "incorporationType": "64c7b3c43a6f9a3e0d842113",
//               "listedCompany": true,
//               "marketCap": "20000000",
//               "annualRevenue": "20000000",
//               "classification": "64c7b3c43a6f9a3e0d842113",
//               "totalEmployeeStrength": 400,
//               "itEmployeeStrength": 500,
//               "relatedContacts": [],
//               "lifeTimeValue": 0,
//               "priority": "High",
//               "contacts": [],
//               "createdAt": "2024-10-22T08:33:36.583Z",
//               "updatedAt": "2024-10-22T08:33:36.583Z",
//               "__v": 0
//           }
//       },
//       {
//           "_id": "67139a334b612c708e824de0",
//           "customId": null,
//           "entryDate": "2024-06-15T00:00:00.000Z",
//           "enteredBy": "670e85355a74d28e495aaf4e",
//           "partneredWith": "Partner ABC",
//           "projectName": "Op-2",
//           "solution": "670e7bd5551fb1aab907486b",
//           "subSolution": "670e7bd5551fb1aab907486b",
//           "salesChamp": "670e85355a74d28e495aaf4e",
//           "salesStage": "670e7df5f5e783c1a47cd499",
//           "salesSubStage": "670e81110a2c8e8563f16af7",
//           "stageClarification": "Updated------",
//           "salesTopLine": 100000,
//           "offsets": 5000,
//           "revenue": [
//               "67139a334b612c708e824de1"
//           ],
//           "totalRevenue": 550000,
//           "confidenceLevel": 80,
//           "expectedSales": 440000,
//           "stageHistory": [
//               "67139a344b612c708e824de8",
//               "67139a874b612c708e824df6",
//               "67139aa24b612c708e824e03",
//               "67139b2f4b612c708e824e10",
//               "67139b534b612c708e824e1d",
//               "67139b6f4b612c708e824e2a"
//           ],
//           "__v": 6,
//           "client": null
//       }
//   ]
// }
export const getStats = (opportunities) => {
  if (opportunities) {
    const stats = stages.data.reduce((acc, stage) => {
      const stageOpportunities = opportunities[stage.key] || [];
      const count = stageOpportunities.length;
      const totalRevenue = stageOpportunities.reduce((acc, item) => acc + (item.totalRevenue || 0), 0);

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
