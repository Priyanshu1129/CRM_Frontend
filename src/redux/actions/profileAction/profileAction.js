import { profileActions } from "@/redux/slices/profileSIice";
import { axiosRequest } from "@/utilities/axiosHelper";
import { serverURL } from "@/config/config";

const route = `${serverURL}/user`;

export const getUserForProfile = () => async (dispatch) => {
  try {
    console.log("getUserForProfileRequest");
    dispatch(profileActions.profileRequest());
    const response = await axiosRequest(dispatch, "get", `${route}/profile`);
    dispatch(profileActions.profileSuccess(response.data));
    console.log("getUserProfileData", response);
  } catch (error) {
    console.log("getUserProfileError", error);
    dispatch(
      profileActions.clearProfileError(error.message || "An Error Occured")
    );
  }
};
