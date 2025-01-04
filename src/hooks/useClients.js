import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllClients } from "@/redux/actions/clientAction";

export const useClients = () => {
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
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setClients(data?.clients);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data, clients]);

  const transformedClients = useMemo(() => {
    return clients?.map(({ _id, name }) => ({
      value: _id,
      text: name,
    }));
  }, [clients]);

  return { clients: transformedClients ?? [], loading };
};
