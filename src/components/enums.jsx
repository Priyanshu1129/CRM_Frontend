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
import { getAllUsers } from "@/redux/actions/userAction";
import { getAllClients } from "@/redux/actions/clientAction";
import { getAllContacts } from "@/redux/actions/contactAction";
import { getAllTenders } from "@/redux/actions/tenderAction";
import { getAllOpportunities } from "@/redux/actions/opportunityAction";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";
import { CodeSandboxCircleFilled } from "@ant-design/icons";

export const IndustrySelector = ({
  name = "industry",
  label,
  rules,
  multiple = false,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.industry.getAllIndustries
  );
  const [industries, setIndustries] = useState(data?.data);

  const fetchAllIndustries = useCallback(() => {
    if (!industries) {
      let config = true;
      dispatch(getAllIndustries(config));
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
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Select
        mode={multiple ? "multiple" : undefined}
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
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
      setSubIndustries(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {subIndustries?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SolutionSelector = ({ name, label, rules, multiple = false }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.solution.getAllSolutions
  );
  const [solutions, setSolutions] = useState(data?.data);

  const fetchAllSolutions = useCallback(() => {
    if (!solutions) {
      let config = true;
      dispatch(getAllSolutions(config));
    }
  }, [dispatch, solutions]);

  useEffect(() => {
    fetchAllSolutions();
  }, [fetchAllSolutions]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setSolutions(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        showSearch
        mode={multiple ? "multiple" : undefined}
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
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
      let config = true;
      dispatch(getAllSubSolutions(config));
    }
  }, [dispatch, subSolutions]);

  useEffect(() => {
    fetchAllSubSolutions();
  }, [fetchAllSubSolutions]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setSubSolutions(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {subSolutions?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const SalesStageSelector = ({ name, label, rules, form }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesStage.getAllSalesStages
  );
  const [salesStages, setSalesStages] = useState(data?.data);

  const fetchAllSalesStages = useCallback(() => {
    if (!salesStages) {
      let config = true;
      dispatch(getAllSalesStages(config));
    }
  }, [dispatch, salesStages]);

  useEffect(() => {
    fetchAllSalesStages();
  }, [fetchAllSalesStages]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setSalesStages(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  // to get form initial value
  useEffect(() => {
    const initialValue = form?.getFieldValue(name);
  }, [form, name]);

  // this helps to algn the sales sub stage with the selected sales stage
  const handleSelectChange = (id) => {
    dispatch(salesSubStageActions.filterSalesSubStages(id));
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
        onChange={handleSelectChange}
      >
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
  const { data: filteredData } = useSelector(
    (state) => state.salesSubStage.getFilteredSalesSubStages
  );

  const { status, data, error } = useSelector(
    (state) => state.salesSubStage.getAllSalesSubStages
  );
  const [salesSubStages, setSubSalesStages] = useState(data?.data);
  const [filteredSalesSubStages, setFilteredSubSalesStages] =
    useState(filteredData);

  const fetchAllSalesSubStages = useCallback(() => {
    if (!salesSubStages) {
      let config = true;
      dispatch(getAllSalesSubStages(config));
    }
  }, [dispatch, salesSubStages]);

  useEffect(() => {
    fetchAllSalesSubStages();
  }, [fetchAllSalesSubStages]);

  useEffect(() => {
    setFilteredSubSalesStages(filteredData);
  }, [filteredData]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setSubSalesStages(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {filteredSalesSubStages?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const TerritorySelector = ({ name, label, rules, multiple = false }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.territory.getAllTerritories
  );
  const [territories, setTerritories] = useState(data?.data);

  const fetchAllTerritories = useCallback(() => {
    if (!territories) {
      let config = true;
      dispatch(getAllTerritories(config));
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
      <Select
        showSearch
        mode={multiple ? "multiple" : undefined}
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {territories?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const UserSelector = ({
  name = "",
  label = "",
  rules = [],
  size = "medium",
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.mastersConfig.getConfigUsers
  );
  const [users, setUsers] = useState(data?.users);

  const fetchAllUsers = useCallback(() => {
    if (!users) {
      dispatch(getAllUsers({ config: true }));
    }
  }, [dispatch, users]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setUsers(data?.users);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Select
        size={size}
        placeholder={name ? `Search user` : ""}
        loading={loading}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {users?.map(({ _id, firstName, lastName }, idx) => (
          <Select.Option key={_id} value={_id}>
            {firstName || lastName
              ? firstName + " " + lastName
              : "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const ClientSelector = ({
  name = "",
  label = "",
  rules = [],
  size = "medium",
  setInput = null,
}) => {
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
  const handleSelect = (item) => {
    if (setInput != null) {
      setInput(item);
    }
  };

  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Select
        size={size}
        placeholder={name ? `Search client` : ""}
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
        onSelect={handleSelect}
      >
        {clients?.map(({ name, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {name ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const ContactSelector = ({
  name = "",
  label = "",
  rules = [],
  size = "medium",
  mode = "default",
}) => {
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
    } else if (status == "success") {
      setContacts(data?.contacts);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Select
        size={size}
        placeholder={name ? `Search contact` : ""}
        showSearch
        mode={mode}
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
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

export const TenderSelector = ({
  name = "",
  label = "",
  rules = [],
  size = "medium",
}) => {
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
    } else if (status == "success") {
      setTenders(data?.tenders);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Select
        size={size}
        showSearch
        placeholder={name ? `Search tender` : ""}
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {tenders?.map(({ customId, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {customId ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const OpportunitySelector = ({
  name = "",
  label = "",
  rules = [],
  size = "medium",
}) => {
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
    } else if (status == "success") {
      setOpportunities(data?.opportunities);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Select
        size={size}
        placeholder={name ? `Search opportunity` : ""}
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {opportunities?.map(({ customId, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {customId ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
