import { axiosRequest } from "@/utilities/axiosHelper";
import { relationshipStatusActions } from "@/redux/slices/clientSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/client/config/relationship-status`;

export const getAllRelationshipStatus = () => async (dispatch) => {
  try {
    console.log("getAllRelationshipStatus");
    dispatch(relationshipStatusActions.getAllRelationshipStatusRequest());

    // Using axiosRequest helper to make the GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/`, // Endpoint to fetch relationship statuses
      null, // No request body for GET requests
      null // No query parameters for this request
    );

    console.log("get-all-relationshipStatus-res-data", response);
    dispatch(
      relationshipStatusActions.getAllRelationshipStatusSuccess(response)
    ); // Dispatch success action
  } catch (error) {
    dispatch(
      relationshipStatusActions.getAllRelationshipStatusFailure(
        error.message || "An error occurred"
      )
    );
    console.log("error", error);
  }
};

// export const getRelationshipStatus = (relationshipStatusId, token) => async (dispatch) => {
//     try {
//         console.log("get-relationshipStatus-data", relationshipStatusId, token);
//         dispatch(relationshipStatusActions.getRelationshipStatusRequest());

//         const data = await axios.get(`${route}/details/${relationshipStatusId}`, {
//             headers: {
//                 "authorization": token
//             }
//         });
//         console.log('get-relationshipStatus-details-res-data', data.data);
//         dispatch(relationshipStatusActions.getRelationshipStatusSuccess(data.data));
//     } catch (error) {
//         console.log("error", error)
//         let errorMessage = "An error occurred";
//         if (error.response) {
//             errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//             errorMessage = "Network error";
//         } else {
//             errorMessage = error.message || "Unknown error";
//         }
//         dispatch(relationshipStatusActions.getRelationshipStatusFailure(errorMessage));
//     }
// };

// export const createRelationshipStatus = (relationshipStatusData, token) => async (dispatch) => {
//     try {
//         console.log("create-relationshipStatusData", relationshipStatusData);
//         dispatch(relationshipStatusActions.createRelationshipStatusRequest());
//         const formData = new FormData();

//         // Append other form data to FormData
//         Object.entries(relationshipStatusData).forEach(([key, value]) => {
//             if (key != 'avatarUri') {
//                 formData.append(key, value);
//             }
//         });

//         const fileName = relationshipStatusData.avatarUri.split('/').pop();
//         // Determine file type based on file extension
//         const fileType = fileName.split('.').pop();

//         // Append avatar file to FormData
//         formData.append("avatar", {
//             uri: relationshipStatusData.avatarUri,
//             type: `image/${fileType}`,
//             name: fileName
//         });

//         console.log("form-data-----before")
//         console.log("form-data-----", formData)

//         const data = await axios.post(
//             `${route}/`,
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('create-relationshipStatus-res-data', data);
//         dispatch(relationshipStatusActions.createRelationshipStatusSuccess(data.data));
//     } catch (error) {
//         console.log("error", error)
//         let errorMessage = "An error occurred";
//         if (error.response) {
//             errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//             errorMessage = "Network error";
//         } else {
//             errorMessage = error.message || "Unknown error";
//         }
//         dispatch(relationshipStatusActions.createRelationshipStatusFailure(errorMessage));
//     }
// };

// export const updateRelationshipStatus = (relationshipStatusData, token, relationshipStatusId) => async (dispatch) => {

//     const formData = new FormData();
//     Object.entries(relationshipStatusData).forEach(([key, value]) => {
//         if (key != 'avatarUri') {
//             formData.append(key, value);
//         }
//     });

//     if (relationshipStatusData?.avatarUri) {
//         const fileName = relationshipStatusData.avatarUri.split('/').pop();
//         // Determine file type based on file extension
//         const fileType = fileName.split('.').pop();

//         // Append avatar file to FormData
//         formData.append("avatar", {
//             uri: relationshipStatusData.avatarUri,
//             type: `image/${fileType}`,
//             name: fileName
//         });
//     }

//     try {
//         console.log("update-relationshipStatusData%", relationshipStatusData,);
//         console.log("update-relationshipStatusData%", formData,);
//         dispatch(relationshipStatusActions.updateRelationshipStatusRequest());
//         console.log("update url----------", `${route}/${relationshipStatusId}`);
//         const data = await axios.put(
//             `${route}/${relationshipStatusId}`,
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('update-relationshipStatus-res-data', data.data);
//         dispatch(relationshipStatusActions.updateRelationshipStatusSuccess(data.data));
//     } catch (error) {
//         console.log("error", error)
//         let errorMessage = "An error occurred";
//         if (error.response) {
//             errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//             errorMessage = "Network error";
//         } else {
//             errorMessage = error.message || "Unknown error";
//         }
//         dispatch(relationshipStatusActions.updateRelationshipStatusFailure(errorMessage));
//     }
// };

// export const deleteRelationshipStatus = (relationshipStatusId, token) => async (dispatch) => {
//     try {
//         console.log("delete-relationshipStatusData", relationshipStatusId);
//         dispatch(relationshipStatusActions.deleteRelationshipStatusRequest());

//         const data = await axios.delete(
//             `${route}/${relationshipStatusId}`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('delete-relationshipStatus-res-data', data.data);
//         dispatch(relationshipStatusActions.deleteRelationshipStatusSuccess(data.data));
//     } catch (error) {
//         console.log("delete-relationshipStatus-error", error)
//         let errorMessage = "An error occurred";
//         if (error.response) {
//             errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//             errorMessage = "Network error";
//         } else {
//             errorMessage = error.message || "Unknown error";
//         }
//         dispatch(relationshipStatusActions.deleteRelationshipStatusFailure(errorMessage));
//     }
// };
