import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationActions } from "@/redux/slices/registrationSlice";
import {
    updateRegistration,
    getAllRegistrations,
} from "@/redux/actions/registrationAction";
import { getChangedValues } from "@/utilities/getChangedValues";
import { notification } from "antd";
import moment from "moment";

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
                client: registration.client,
                registrationChamp: registration.registrationChamp,
                status: registration.status,
                link: registration.websiteDetails?.link,
                username: registration.websiteDetails?.username,
                password: registration.websiteDetails?.password,
                otherDetails: registration.otherDetails,
                registrationDate: registration.registrationDate
                    ? moment(registration.registrationDate)
                    : null,
                expiryDate: registration.expiryDate
                    ? moment(registration.expiryDate)
                    : null,
                primaryContact: registration.primaryContact,
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
            dispatch(getAllRegistrations({}));
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
}