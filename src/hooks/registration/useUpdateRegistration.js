import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationActions } from "@/redux/slices/registrationSlice";
import {
  updateRegistration,
  getAllRegistrations,
} from "@/redux/actions/registrationAction";
import { getChangedValues } from "@/utilities/getChangedValues";
import { notification } from "antd";
import dayjs from "dayjs";

export const useUpdateRegistration = ({ registration, form }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.registration.updateRegistration
  );

  const initialValues = useRef({});

  useEffect(() => {
    if (registration) {
      const registrationInitialValues = {
        client: registration.client?._id,
        registrationChamp: registration.registrationChamp?._id,
        status: registration.status?._id,
        link: registration.websiteDetails?.link,
        username: registration.websiteDetails?.username,
        password: registration.websiteDetails?.password,
        otherDetails: registration.otherDetails,
        registrationDate: registration.registrationDate
          ? dayjs(registration.registrationDate)
          : null,
        expiryDate: registration.expiryDate
          ? dayjs(registration.expiryDate)
          : null,
        primaryContact: registration.primaryContact?._id,
        submittedDocuments: registration.submittedDocuments,
        notes: registration.notes,
      };
      form.setFieldsValue(registrationInitialValues);
      initialValues.current = registrationInitialValues;
    }
  }, [registration, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Registration updated successfully.",
      });
      dispatch(registrationActions.clearUpdateRegistrationStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update registration.",
      });
      dispatch(registrationActions.clearUpdateRegistrationStatus());
      dispatch(registrationActions.clearUpdateRegistrationError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);

    const changedValues = getChangedValues(initialValues, values);

    if (Object.keys(changedValues).length > 0) {
      dispatch(updateRegistration(changedValues, registration._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };
  return { loading, onFinish };
};
