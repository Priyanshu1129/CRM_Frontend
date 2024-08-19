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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.contact.getAllContacts
  );
  const [contacts, setContacts] = useState(data?.contacts);

  const fetchAllContacts = useCallback(() => {
    if (!contacts || 
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit)
    ) {
      dispatch(getAllContacts({ page: currentPage, limit: pageSize }));
    }
  }, [dispatch, contacts, currentPage, pageSize, data?.page, data?.limit]);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
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
  }, [dispatch, status, data?.contacts, error]);

  return (
    <>
      <ListHeader
        toPath={"/contact-master/add-contact"}
        buttonText={"Add new contact"}
      />
      {view == "table" ? (
        <ContactsTableView
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          data={contacts}
          total={data?.totalCount}
        />
      ) : (
        <ContactsCardView />
      )}
    </>
  );
};

export default ContactMaster;
