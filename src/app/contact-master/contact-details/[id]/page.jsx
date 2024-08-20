"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { contactActions } from "@/redux/slices/contactSlice";
import { UpdateContactForm } from "../../components/update-form";
import { getContact } from "@/redux/actions/contactAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const ContactDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.contact.getContact
  );
  const { id } = useParams();

  const [contact, setContact] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchContactDetails = useCallback(() => {
    if ((!contact && id) || id !== String(contact?._id)) {
      dispatch(getContact(id));
    }
  }, [dispatch, id, contact]);

  useEffect(() => {
    fetchContactDetails();
  }, [fetchContactDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setContact(data?.data);
      setLoading(false);
      dispatch(contactActions.clearGetContactStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch contact.",
      });
      dispatch(contactActions.clearGetContactStatus());
      dispatch(contactActions.clearGetContactError());
    }
  }, [status, error, data?.data, dispatch]);
  console.log(data?.data);

  return (
    <>
      <FormHeader backButtonText="Back to Contacts" />
      <Space
        direction="vertical"
        style={{
          marginTop: "28px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
        }}
      >
        {loading ? (
          <FullScreenLoading />
        ) : (
          <UpdateContactForm contact={contact} />
        )}
      </Space>
    </>
  );
};
export default ContactDetails;
