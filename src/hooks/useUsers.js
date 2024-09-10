import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/redux/actions/userAction';

export const useUsers = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, data } = useSelector((state) => state.mastersConfig.getConfigUsers);
    const [users, setUsers] = useState(data?.users);

    const fetchAllUsers = useCallback(() => {
        if (!data) {
            dispatch(getAllUsers({ config: true }));
        }
    }, [dispatch, data]);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setUsers(data?.users);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [status, data]);

    const transformedUsers = useMemo(() => {
        return users?.map(({ _id, firstName, lastName }) => ({
            value: _id,
            text: `${firstName} ${lastName}`,
        }));
    }, [users]);

    return { users: transformedUsers ?? [], loading };
};
