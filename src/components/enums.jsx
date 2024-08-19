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
      <Select showSearch loading={loading}>
        {industries?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
      <Select showSearch loading={loading}>
        {subIndustries?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
      <Select showSearch loading={loading}>
        {solutions?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
      <Select showSearch loading={loading}>
        {subSolutions?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
      <Select showSearch loading={loading}>
        {salesStages?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
      <Select showSearch loading={loading}>
        {salesSubStages?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
      <Select showSearch loading={loading}>
        {territories?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
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
    (state) => state.mastersConfig.getConfigStaffs
  );
  const [staffs, setStaffs] = useState(data?.staffs);

  const fetchAllStaffs = useCallback(() => {
    if (!staffs) {
      dispatch(getAllStaffs({ config: true }));
    }
  }, [dispatch, staffs]);

  useEffect(() => {
    fetchAllStaffs();
  }, [fetchAllStaffs]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setStaffs(data?.staffs);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  console.log("select", staffs);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select loading={loading} showSearch>
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
    (state) => state.mastersConfig.getConfigClients
  );

  const [clients, setClients] = useState(data?.clients);
  const fetchAllClients = useCallback(() => {
    if (!clients) {
      dispatch(getAllClients({ config: true }));
    }
  }, [dispatch, clients]);

  useEffect(() => {
    fetchAllClients();
  }, [fetchAllClients]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setClients(data?.clients);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select showSearch loading={loading}>
        {clients?.map(({ name, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {name ?? "Missing Value"}
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
    (state) => state.mastersConfig.getConfigContacts
  );
  const [contacts, setContacts] = useState(data?.contacts);

  const fetchAllContacts = useCallback(() => {
    if (!contacts) {
      dispatch(getAllContacts({ config: true }));
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
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select showSearch loading={loading}>
        {contacts?.map(({ firstName, lastName, _id }, idx) => (
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

export const TenderSelector = ({ name, label, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.mastersConfig.getConfigTenders
  );
  const [tenders, setTenders] = useState(data?.tenders);

  const fetchAllTenders = useCallback(() => {
    if (!tenders) {
      dispatch(getAllTenders({ config: true }));
    }
  }, [dispatch, tenders]);

  useEffect(() => {
    fetchAllTenders();
  }, [fetchAllTenders]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setTenders(data?.tenders);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select showSearch loading={loading}>
        {tenders?.map(({ customId, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {customId ?? "Missing Value"}
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
    (state) => state.mastersConfig.getConfigOpportunities
  );
  const [opportunities, setOpportunities] = useState(data?.opportunities);

  const fetchAllOpportunities = useCallback(() => {
    if (!opportunities) {
      dispatch(getAllOpportunities({ config: true }));
    }
  }, [dispatch, opportunities]);

  useEffect(() => {
    fetchAllOpportunities();
  }, [fetchAllOpportunities]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setOpportunities(data?.opportunities);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select showSearch loading={loading}>
        {opportunities?.map(({ customId, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {customId ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
