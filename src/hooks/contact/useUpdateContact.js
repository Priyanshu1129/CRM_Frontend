import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "@/redux/slices/contactSlice";
import { updateContact, getAllContacts } from "@/redux/actions/contactAction";
import { getChangedValues } from "@/utilities/getChangedValues";
import { notification } from "antd";

export const useUpdateContact = ({ form, contact }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.contact.updateContact);

  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [mobileCountryCode, setMobileCountryCode] = useState("+1");

  const initialValues = useRef({});
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (contact) {
      const contactInitialValues = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        gender: contact.gender,
        client: contact.client,
        jobTitle: contact.jobTitle,
        workEmail: contact.workEmail,
        personalEmail: contact.personalEmail,
        archeType: contact.archeType,
        territory: contact.territory,
        relationshipDegree: contact.relationshipDegree,
        country: contact.country,
        memorableInfo: contact.memorableInfo,
        detailsConfirmation: contact.detailsConfirmation,
        avatar: contact.avatar,
        phone: contact.phone,
        mobilePhone: contact.mobilePhone,
        notes: contact.notes,
      };
      setPhoneCountryCode(contact.phoneCountryCode || phoneCountryCode);
      setMobileCountryCode(contact.mobileCountryCode || mobileCountryCode);
      form.setFieldsValue(contactInitialValues);
      initialValues.current = contactInitialValues;
    }
  }, [contact, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Contact updated successfully.",
      });
      dispatch(getAllContacts({}));
      dispatch(contactActions.clearUpdateContactStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update contact.",
      });
      dispatch(contactActions.clearUpdateContactStatus());
      dispatch(contactActions.clearUpdateContactError());
    }
  }, [status, error, dispatch]);

  const handleAvatarChange = (fileList) => {
    if (fileList.length > 0) {
      const newAvatar = fileList[0].originFileObj || fileList[0].url;
      setAvatarChanged(true);
      setAvatar(newAvatar);
    } else {
      setAvatarChanged(false);
      setAvatar(null);
    }
  };

  const onFinish = (values) => {
    // Compare current values with initial values and get only changed values

    const updatedValues = {
      ...values,
      phoneCountryCode,
      mobileCountryCode,
    };

    const changedValues = getChangedValues(initialValues, updatedValues);

    if (avatarChanged) {
      changedValues.avatar = avatar;
    }

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      setLoading(true);
      dispatch(updateContact(changedValues, contact._id));
    } else {
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  return {
    loading,
    onFinish,
    phoneCountryCode,
    setPhoneCountryCode,
    mobileCountryCode,
    setMobileCountryCode,
    handleAvatarChange,
  };
};
