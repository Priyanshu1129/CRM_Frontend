"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Form } from "antd";
import {
  getAllIndustries,
  getAllSubIndustries,
  getAllSolutions,
  getAllSubSolutions,
  getAllSalesStages,
  getAllSalesSubStages,
  getAllTerritories,
} from "@/redux/actions/configurationAction";
import { getAllStaffs } from "@/redux/actions/staffAction";
import { getAllClients } from "@/redux/actions/clientAction";
import { getAllContacts } from "@/redux/actions/contactAction";
import { getAllTenders } from "@/redux/actions/tenderAction";
import { getAllOpportunities } from "@/redux/actions/opportunityAction";

export const IndustrySelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.industry.getAllIndustries
  );
  const [industries, setIndustries] = useState(data?.data);

  const fetchAllIndustries = useCallback(() => {
    if (!industries) {
      dispatch(getAllIndustries());
    }
  }, [dispatch, industries]);

  useEffect(() => {
    fetchAllIndustries();
  }, [fetchAllIndustries]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setIndustries(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {industries?.map((industry, idx) => (
          <Select.Option key={idx} value={industry._id}>
            {industry.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SubIndustrySelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subIndustry.getAllSubIndustries
  );
  const [subIndustries, setSubIndustries] = useState(data?.data);

  const fetchAllSubIndustries = useCallback(() => {
    if (!subIndustries) {
      dispatch(getAllSubIndustries());
    }
  }, [dispatch, subIndustries]);

  useEffect(() => {
    fetchAllSubIndustries();
  }, [fetchAllSubIndustries]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setSubIndustries(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {subIndustries?.map((subIndustry, idx) => (
          <Select.Option key={idx} value={subIndustry._id}>
            {subIndustry.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SolutionSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.solution.getAllSolutions
  );
  const [solutions, setSolutions] = useState(data?.data);

  const fetchAllSolutions = useCallback(() => {
    if (!solutions) {
      dispatch(getAllSolutions());
    }
  }, [dispatch, solutions]);

  useEffect(() => {
    fetchAllSolutions();
  }, [fetchAllSolutions]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setSolutions(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {solutions?.map((solution, idx) => (
          <Select.Option key={idx} value={solution._id}>
            {solution.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SubSolutionSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subSolution.getAllSubSolutions
  );
  const [subSolutions, setSubSolutions] = useState(data?.data);

  const fetchAllSubSolutions = useCallback(() => {
    if (!subSolutions) {
      dispatch(getAllSubSolutions());
    }
  }, [dispatch, subSolutions]);

  useEffect(() => {
    fetchAllSubSolutions();
  }, [fetchAllSubSolutions]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside-sub-solute", data);
      setSubSolutions(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {subSolutions?.map((subSolution, idx) => (
          <Select.Option key={idx} value={subSolution._id}>
            {subSolution.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SalesStageSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesStage.getAllSalesStages
  );
  const [salesStages, setSalesStages] = useState(data?.data);

  const fetchAllSalesStages = useCallback(() => {
    if (!salesStages) {
      dispatch(getAllSalesStages());
    }
  }, [dispatch, salesStages]);

  useEffect(() => {
    fetchAllSalesStages();
  }, [fetchAllSalesStages]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setSalesStages(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {salesStages?.map((salesStage, idx) => (
          <Select.Option key={idx} value={salesStage._id}>
            {salesStage.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SalesSubStageSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesSubStage.getAllSalesSubStages
  );
  const [salesSubStages, setSubSalesStages] = useState(data?.data);

  const fetchAllSalesSubStages = useCallback(() => {
    if (!salesSubStages) {
      dispatch(getAllSalesSubStages());
    }
  }, [dispatch, salesSubStages]);

  useEffect(() => {
    fetchAllSalesSubStages();
  }, [fetchAllSalesSubStages]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setSubSalesStages(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {salesSubStages?.map((salesSubStage, idx) => (
          <Select.Option key={idx} value={salesSubStage._id}>
            {salesSubStage.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const TerritorySelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.territory.getAllTerritories
  );
  const [territories, setTerritories] = useState(data?.data);

  const fetchAllTerritories = useCallback(() => {
    if (!territories) {
      dispatch(getAllTerritories());
    }
  }, [dispatch, territories]);

  useEffect(() => {
    fetchAllTerritories();
  }, [fetchAllTerritories]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setTerritories(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {territories?.map((territory, idx) => (
          <Select.Option key={idx} value={territory._id}>
            {territory.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const StaffSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.staff.getAllStaffs
  );
  const [staffs, setStaffs] = useState(data?.data);

  const fetchAllStaffs = useCallback(() => {
    if (!staffs) {
      dispatch(getAllStaffs());
    }
  }, [dispatch, staffs]);

  useEffect(() => {
    fetchAllStaffs();
  }, [fetchAllStaffs]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setStaffs(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  console.log("select", staffs);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {staffs?.map(({ _id, firstName, lastName }, idx) => (
          <Select.Option key={idx} value={_id}>
            {firstName || lastName
              ? firstName + " " + lastName
              : "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const ClientSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.client.getAllClients
  );
  const [clients, setClients] = useState(data?.data);

  const fetchAllClients = useCallback(() => {
    if (!clients) {
      dispatch(getAllClients());
    }
  }, [dispatch, clients]);

  useEffect(() => {
    fetchAllClients();
  }, [fetchAllClients]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setClients(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {clients?.map((client, idx) => (
          <Select.Option key={idx} value={client._id}>
            {client.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const ContactSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.client.getAllContacts
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
      setContacts(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {contacts?.map((contact, idx) => (
          <Select.Option key={idx} value={contact._id}>
            {contact.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const TenderSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.tender.getAllTenders
  );
  const [tenders, setTenders] = useState(data?.data);

  const fetchAllTenders = useCallback(() => {
    if (!tenders) {
      dispatch(getAllTenders());
    }
  }, [dispatch, tenders]);

  useEffect(() => {
    fetchAllTenders();
  }, [fetchAllTenders]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setTenders(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select loading={loading}>
        {tenders?.map((tender, idx) => (
          <Select.Option key={idx} value={tender._id}>
            {tender.customId}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const OpportunitySelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.opportunity.getAllOpportunities
  );
  const [opportunities, setOpportunities] = useState(data?.data);

  const fetchAllOpportunities = useCallback(() => {
    if (!opportunities) {
      dispatch(getAllOpportunities());
    }
  }, [dispatch, opportunities]);

  useEffect(() => {
    fetchAllOpportunities();
  }, [fetchAllOpportunities]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setOpportunities(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select>
        {opportunities?.map((opportunity, idx) => (
          <Select.Option key={idx} value={opportunity._id}>
            {opportunity.customId}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
