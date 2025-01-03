import { axiosRequest } from "@/utilities/axiosHelper";
import { incorporationTypeActions } from "@/redux/slices/clientSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/client/config/incorporation-type`;

export const getAllIncorporationTypes = () => async (dispatch) => {
  try {
    console.log("getAllIncorporationTypes");
    dispatch(incorporationTypeActions.getAllIncorporationTypesRequest());

    // Using axiosRequest helper to make the GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/`, // Endpoint to fetch incorporation types
      null, // No request body for GET requests
      null // No query parameters for this request
    );

    console.log("get-all-incorporationType-res-data", response);
    dispatch(
      incorporationTypeActions.getAllIncorporationTypesSuccess(response)
    ); // Dispatch success action
  } catch (error) {
    dispatch(
      incorporationTypeActions.getAllIncorporationTypesFailure(
        error.message || "An error occurred"
      )
    );
    console.log("error", error);
  }
};

// export const getIncorporationType = (incorporationTypeId, token) => async (dispatch) => {
//     try {
//         console.log("get-incorporationType-data", incorporationTypeId, token);
//         dispatch(incorporationTypeActions.getIncorporationTypeRequest());

//         const data = await axios.get(`${route}/details/${incorporationTypeId}`, {
//             headers: {
//                 "authorization": token
//             }
//         });
//         console.log('get-incorporationType-details-res-data', data.data);
//         dispatch(incorporationTypeActions.getIncorporationTypeSuccess(data.data));
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
//         dispatch(incorporationTypeActions.getIncorporationTypeFailure(errorMessage));
//     }
// };

// export const createIncorporationType = (incorporationTypeData, token) => async (dispatch) => {
//     try {
//         console.log("create-incorporationTypeData", incorporationTypeData);
//         dispatch(incorporationTypeActions.createIncorporationTypeRequest());
//         const formData = new FormData();

//         // Append other form data to FormData
//         Object.entries(incorporationTypeData).forEach(([key, value]) => {
//             if (key != 'avatarUri') {
//                 formData.append(key, value);
//             }
//         });

//         const fileName = incorporationTypeData.avatarUri.split('/').pop();
//         // Determine file type based on file extension
//         const fileType = fileName.split('.').pop();

//         // Append avatar file to FormData
//         formData.append("avatar", {
//             uri: incorporationTypeData.avatarUri,
//             type: `image/${fileType}`,
//             name: fileName
//         });

//         console.log("formdata-----before")
//         console.log("formdata-----", formData)

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
//         console.log('create-incorporationType-res-data', data);
//         dispatch(incorporationTypeActions.createIncorporationTypeSuccess(data.data));
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
//         dispatch(incorporationTypeActions.createIncorporationTypeFailure(errorMessage));
//     }
// };

// export const updateIncorporationType = (incorporationTypeData, token, incorporationTypeId) => async (dispatch) => {

//     const formData = new FormData();
//     Object.entries(incorporationTypeData).forEach(([key, value]) => {
//         if (key != 'avatarUri') {
//             formData.append(key, value);
//         }
//     });

//     if (incorporationTypeData?.avatarUri) {
//         const fileName = incorporationTypeData.avatarUri.split('/').pop();
//         // Determine file type based on file extension
//         const fileType = fileName.split('.').pop();

//         // Append avatar file to FormData
//         formData.append("avatar", {
//             uri: incorporationTypeData.avatarUri,
//             type: `image/${fileType}`,
//             name: fileName
//         });
//     }

//     try {
//         console.log("update-incorporationTypeData%", incorporationTypeData,);
//         console.log("update-incorporationTypeData%", formData,);
//         dispatch(incorporationTypeActions.updateIncorporationTypeRequest());
//         console.log("update url----------", `${route}/${incorporationTypeId}`);
//         const data = await axios.put(
//             `${route}/${incorporationTypeId}`,
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('update-incorporationType-res-data', data.data);
//         dispatch(incorporationTypeActions.updateIncorporationTypeSuccess(data.data));
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
//         dispatch(incorporationTypeActions.updateIncorporationTypeFailure(errorMessage));
//     }
// };

// export const deleteIncorporationType = (incorporationTypeId, token) => async (dispatch) => {
//     try {
//         console.log("delete-incorporationTypeData", incorporationTypeId);
//         dispatch(incorporationTypeActions.deleteIncorporationTypeRequest());

//         const data = await axios.delete(
//             `${route}/${incorporationTypeId}`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('delete-incorporationType-res-data', data.data);
//         dispatch(incorporationTypeActions.deleteIncorporationTypeSuccess(data.data));
//     } catch (error) {
//         console.log("delete-incorporationType-error", error)
//         let errorMessage = "An error occurred";
//         if (error.response) {
//             errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//             errorMessage = "Network error";
//         } else {
//             errorMessage = error.message || "Unknown error";
//         }
//         dispatch(incorporationTypeActions.deleteIncorporationTypeFailure(errorMessage));
//     }
// };
