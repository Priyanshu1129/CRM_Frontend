"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIndustries,
  getAllSubIndustries,
  getAllSolutions,
  getAllSubSolutions,
  getAllSalesStages,
  getAllSalesSubStages,
  getAllTerritories,
} from "@/redux/actions/configurationAction";
import { Select } from "antd";

export const IndustrySelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.industry.getAllIndustries
  );
  const [industries, setIndustries] = useState(data?.data || []);

  const fetchAllIndustries = useCallback(() => {
    if (!industries.length) {
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
      console.log("success-inside");
      setIndustries(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Select>
      {industries.map((industry, idx) => (
        <Select.Option key={idx} value={industry._id}>
          {industry.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SubIndustrySelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subIndustry.getAllSubIndustries
  );
  const [subIndustries, setSubIndustries] = useState(data?.data || []);

  const fetchAllSubIndustries = useCallback(() => {
    if (!subIndustries.length) {
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
    <Select>
      {subIndustries.map((subIndustry, idx) => (
        <Select.Option key={idx} value={subIndustry._id}>
          {subIndustry.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SolutionSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.solution.getAllSolutions
  );
  const [solutions, setSolutions] = useState(data?.data || []);

  const fetchAllSolutions = useCallback(() => {
    if (!solutions.length) {
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
    <Select>
      {solutions.map((solution, idx) => (
        <Select.Option key={idx} value={solution._id}>
          {solution.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SubSolutionSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subSolution.getAllSubSolutions
  );
  const [subSolutions, setSubSolutions] = useState(data?.data || []);

  const fetchAllSubSolutions = useCallback(() => {
    if (!subSolutions.length) {
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
      console.log("success-inside");
      setSubSolutions(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Select>
      {subSolutions.map((subSolution, idx) => (
        <Select.Option key={idx} value={subSolution._id}>
          {subSolution.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SalesStageSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesStage.getAllSalesStages
  );
  const [salesStages, setSalesStages] = useState(data?.data || []);

  const fetchAllSalesStages = useCallback(() => {
    if (!salesStages.length) {
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
    <Select>
      {salesStages.map((salesStage, idx) => (
        <Select.Option key={idx} value={salesStage._id}>
          {salesStage.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SalesSubStageSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesSubStage.getAllSalesSubStages
  );
  const [salesSubStages, setSubSalesStages] = useState(data?.data || []);

  const fetchAllSalesSubStages = useCallback(() => {
    if (!salesSubStages.length) {
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
    <Select>
      {salesSubStages.map((salesSubStage, idx) => (
        <Select.Option key={idx} value={salesSubStage._id}>
          {salesSubStage.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const TerritorySelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.territory.getAllTerritories
  );
  const [territories, setTerritories] = useState(data?.data || []);

  const fetchAllTerritories = useCallback(() => {
    if (!territories.length) {
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
    <Select>
      {territories.map((territory, idx) => (
        <Select.Option key={idx} value={territory._id}>
          {territory.label}
        </Select.Option>
      ))}
    </Select>
  );
};
