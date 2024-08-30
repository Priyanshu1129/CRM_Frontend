import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllIndustries,
  getAllSubIndustries,
  getAllTerritories,
} from "@/redux/actions/configurationAction";
import { getAllUsers } from "@/redux/actions/userAction";
export const GetIndustries = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.industry.getAllIndustries
  );
  let [industries, setIndustries] = useState(data?.data);

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

  industries = industries?.map(({ _id, label }) => ({
    value: _id,
    text: label,
  }));

  return industries ?? [];
};

export const GetSubIndustries = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subIndustry.getAllSubIndustries
  );
  let [subIndustries, setSubIndustries] = useState(data?.data);

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

  subIndustries = subIndustries?.map(({ _id, label }) => ({
    value: _id,
    text: label,
  }));

  return subIndustries ?? [];
};

export const GetTerritories = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.territory.getAllTerritories
  );
  let [territories, setTerritories] = useState(data?.data);

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
      setTerritories(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  territories = territories?.map(({ _id, label }) => ({
    value: _id,
    text: label,
  }));

  return territories ?? [];
};

export const GetUsers = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.mastersConfig.getConfigUsers
  );
  let [users, setUsers] = useState(data?.users);

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

  users = users?.map(({ _id, firstName, lastName }) => ({
    value: _id,
    text: `${firstName} ${lastName}`,
  }));

  return users ?? [];
};
