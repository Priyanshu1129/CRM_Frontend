import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import { getUserForProfile } from "@/redux/actions/profileAction";
import { profileActions } from "@/redux/slices/profileSIice";

export const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.profile.profile);

  const [profileData, setProfileData] = useState(data);

  const fetchProfileData = useCallback(() => {
    if (!profileData) {
      dispatch(getUserForProfile());
    }
  }, [dispatch, profileData]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setProfileData(data);
      dispatch(profileActions.clearProfileStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: error,
        description: error || "Error Occured while fetching the profile",
      });
      dispatch(profileActions.clearProfileStatus());
      dispatch(profileActions.clearProfileError());
    }
  }, [status, error, dispatch, data]);

  return { loading, profileData };
};
