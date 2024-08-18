"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { ContactsTableView, ContactsCardView } from "./components";
import { notification } from "antd";
import { getAllContacts } from "@/redux/actions/contactAction";
import { contactActions } from "@/redux/slices/contactSlice";

const ContactMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.contact.getAllContacts
  );
  const [contacts, setContacts] = useState(data?.data);

  const fetchAllContacts = useCallback(() => {
    if (!contacts) {
      dispatch(getAllContacts());
    }
  }, [dispatch, contacts]);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setContacts(data?.contacts);
      setLoading(false);
      dispatch(contactActions.clearGetAllContactsStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch contacts.",
      });
      dispatch(contactActions.clearGetAllContactsStatus());
      dispatch(contactActions.clearGetAllContactsError());
    }
  }, [dispatch, status]);

  return (
    <>
      <ListHeader
        toPath={"/contact-master/add-contact"}
        buttonText={"Add new contact"}
      />
      {view == "table" ? (
        <ContactsTableView loading={loading} data={contacts} />
      ) : (
        <ContactsCardView />
      )}
    </>
  );
};

export default ContactMaster;
