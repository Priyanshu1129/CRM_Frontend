import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    getUser: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllUsers: {
        status: "idle",
        error: null,
        data: null,
    },
    createUser: {
        status: "idle",
        error: null,
        data: null,
    },
    updateUser: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteUser: {
        status: "idle",
        error: null,
        data: null,
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        getUserRequest: (state, action) => {
            state.getUser.status = 'pending'
        },
        getUserSuccess: (state, action) => {
            state.getUser.status = 'success'
            state.getUser.data = action.payload;
        },
        getUserFailure: (state, action) => {
            state.getUser.status = 'failed'
            state.getUser.error = action.payload;
        },
        getAllUsersRequest: (state, action) => {
            state.getAllUsers.status = "pending";
        },
        getAllUsersSuccess: (state, action) => {
            state.getAllUsers.status = "success"
            state.getAllUsers.data = action.payload;
        },
        getAllUsersFailure: (state) => {
            state.getAllUsers.status = "failed";
        },
        createUserRequest: (state, action) => {
            state.createUser.status = 'pending'
        },
        createUserSuccess: (state, action) => {
            state.createUser.status = 'success'
            state.createUser.data = action.payload;
        },
        createUserFailure: (state, action) => {
            state.createUser.status = 'failed'
            state.createUser.data = null
            state.createUser.error = action.payload;
        },
        updateUserRequest: (state, action) => {
            state.updateUser.status = 'pending'
        },
        updateUserSuccess: (state, action) => {
            state.updateUser.status = 'success'
            state.updateUser.data = action.payload
        },
        updateUserFailure: (state, action) => {
            state.updateUser.status = 'failed'
            state.updateUser.error = action.payload
        },
        deleteUserRequest: (state) => {
            state.deleteUser.status = 'pending'
        },
        deleteUserSuccess: (state, action) => {
            state.deleteUser.status = 'success'
            state.deleteUser.data = action.payload
        },
        deleteUserFailure: (state, action) => {
            state.deleteUser.status = 'failed'
            state.deleteUser.error = action.payload
        },

        clearGetUserStatus: (state) => {
            state.getUser.status = "idle";
        },
        clearGetUserData: () => {
            state.getUser.data = null;
        },
        clearGetUserError: (state) => {
            state.getUser.error = null;
        },
        
        clearGetAllUsersStatus: (state) => {
            state.getAllUsers.status = "idle";
        },
    
        clearGetAllUsersData: () => {
            state.getAllUsers.data = null;
        },
        clearGetAllUsersError: (state) => {
            state.getAllUsers.error = null;
        },
        clearCreateUserStatus: (state) => {
            state.createUser.status = "idle";
        },
        clearCreateUserData: () => {
            state.createUser.data = null;
        },
        clearCreateUserError: (state) => {
            state.createUser.error = null;
        },
        clearUpdateUserStatus: (state) => {
            state.updateUser.status = "idle";
        },
        clearUpdateUserData: () => {
            state.updateUser.data = null;
        },
        clearUpdateUserError: (state) => {
            state.updateUser.error = null;
        },
        clearDeleteUserStatus: (state) => {
            state.deleteUser.status = "idle";
        },
        clearDeleteUserData: () => {
            state.deleteUser.data = null;
        },
        clearDeleteUserError: (state) => {
            state.deleteUser.error = null;
        },
    }
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;