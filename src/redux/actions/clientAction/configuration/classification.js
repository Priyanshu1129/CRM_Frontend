import { axiosRequest } from "@/utilities/axiosHelper";
import { classificationActions } from "@/redux/slices/clientSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/client/config/classification`;

export const getAllClassifications = () => async (dispatch) => {
  try {
    console.log("getAllClassifications Request");
    dispatch(classificationActions.getAllClassificationsRequest());

    // Using axiosRequest helper to make the GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/`, // Endpoint to fetch classifications
      null, // No request body for GET requests
      null // No query parameters for this request
    );

    console.log("get-all-classification-res-data", response);
    dispatch(classificationActions.getAllClassificationsSuccess(response)); // Dispatch success action
  } catch (error) {
    dispatch(
      classificationActions.getAllClassificationsFailure(
        error.message || "An error occurred"
      )
    );
    console.log("error", error);
  }
};

// export const getClassification = (classificationId, token) => async (dispatch) => {
//     try {
//         console.log("get-classification-data", classificationId, token);
//         dispatch(classificationActions.getClassificationRequest());

//         const data = await axios.get(`${route}/details/${classificationId}`, {
//             withCredentials: true,
//         });
//         console.log('get-classification-details-res-data', data.data);
//         dispatch(classificationActions.getClassificationSuccess(data.data));
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
//         dispatch(classificationActions.getClassificationFailure(errorMessage));
//     }
// };

// export const createClassification = (classificationData, token) => async (dispatch) => {
//     try {
//         console.log("create-classificationData", classificationData);
//         dispatch(classificationActions.createClassificationRequest());
//         const formData = new FormData();

//         // Append other form data to FormData
//         Object.entries(classificationData).forEach(([key, value]) => {
//             if (key != 'avatarUri') {
//                 formData.append(key, value);
//             }
//         });

//         const fileName = classificationData.avatarUri.split('/').pop();
//         // Determine file type based on file extension
//         const fileType = fileName.split('.').pop();

//         // Append avatar file to FormData
//         formData.append("avatar", {
//             uri: classificationData.avatarUri,
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
//         console.log('create-classification-res-data', data);
//         dispatch(classificationActions.createClassificationSuccess(data.data));
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
//         dispatch(classificationActions.createClassificationFailure(errorMessage));
//     }
// };

// export const updateClassification = (classificationData, token, classificationId) => async (dispatch) => {

//     const formData = new FormData();
//     Object.entries(classificationData).forEach(([key, value]) => {
//         if (key != 'avatarUri') {
//             formData.append(key, value);
//         }
//     });

//     if (classificationData?.avatarUri) {
//         const fileName = classificationData.avatarUri.split('/').pop();
//         // Determine file type based on file extension
//         const fileType = fileName.split('.').pop();

//         // Append avatar file to FormData
//         formData.append("avatar", {
//             uri: classificationData.avatarUri,
//             type: `image/${fileType}`,
//             name: fileName
//         });
//     }

//     try {
//         console.log("update-classificationData%", classificationData,);
//         console.log("update-classificationData%", formData,);
//         dispatch(classificationActions.updateClassificationRequest());
//         console.log("update url----------", `${route}/${classificationId}`);
//         const data = await axios.put(
//             `${route}/${classificationId}`,
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('update-classification-res-data', data.data);
//         dispatch(classificationActions.updateClassificationSuccess(data.data));
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
//         dispatch(classificationActions.updateClassificationFailure(errorMessage));
//     }
// };

// export const deleteClassification = (classificationId, token) => async (dispatch) => {
//     try {
//         console.log("delete-classificationData", classificationId);
//         dispatch(classificationActions.deleteClassificationRequest());

//         const data = await axios.delete(
//             `${route}/${classificationId}`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "authorization": token
//                 },
//             }
//         );
//         console.log('delete-classification-res-data', data.data);
//         dispatch(classificationActions.deleteClassificationSuccess(data.data));
//     } catch (error) {
//         console.log("delete-classification-error", error)
//         let errorMessage = "An error occurred";
//         if (error.response) {
//             errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//             errorMessage = "Network error";
//         } else {
//             errorMessage = error.message || "Unknown error";
//         }
//         dispatch(classificationActions.deleteClassificationFailure(errorMessage));
//     }
// };
