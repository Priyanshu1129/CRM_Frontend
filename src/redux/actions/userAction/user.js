import axios from "axios";
import { userActions } from "@/redux/slices/userSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/user`
export const createUser = (userData) => async (dispatch) => {
    try {
        console.log("create-user-data", userData);
        dispatch(userActions.createUserRequest());

        const response = await axios.post(
            `${route}/`,
            userData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log('create-user-res-data', response);
        dispatch(userActions.createUserSuccess(response.data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(userActions.createUserFailure(errorMessage));
    }
};