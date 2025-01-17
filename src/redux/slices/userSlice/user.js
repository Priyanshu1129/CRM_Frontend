import { createSlice } from "@reduxjs/toolkit";

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
  },
  deleteUserPopup : {
    open : false,
    user : null
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setDeleteUserPopup : (state, action) => {
         const {open, user} = action.payload;
         state.deleteUserPopup.open = open;
         state.deleteUserPopup.user = user;
    },

    getUserRequest: (state, action) => {
      state.getUser.status = "pending";
    },
    getUserSuccess: (state, action) => {
      state.getUser.status = "success";
      state.getUser.data = action.payload;
    },
    getUserFailure: (state, action) => {
      state.getUser.status = "failed";
      state.getUser.error = action.payload;
    },
    getAllUsersRequest: (state) => {
      state.getAllUsers.status = "pending";
    },
    getAllUsersSuccess: (state, action) => {
      state.getAllUsers.status = "success";
      state.getAllUsers.data = action.payload;
    },
    getAllUsersFailure: (state, action) => {
      state.getAllUsers.status = "failed";
      state.getAllUsers.error = action.payload;
    },
    createUserRequest: (state) => {
      state.createUser.status = "pending";
    },
    createUserSuccess: (state, action) => {
      state.createUser.status = "success";
      state.createUser.data = action.payload;
    },
    createUserFailure: (state, action) => {
      state.createUser.status = "failed";
      state.createUser.data = null;
      state.createUser.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.updateUser.status = "pending";
    },
    updateUserSuccess: (state, action) => {
      state.updateUser.status = "success";
      state.updateUser.data = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.updateUser.status = "failed";
      state.updateUser.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.deleteUser.status = "pending";
    },
    deleteUserSuccess: (state, action) => {
      state.deleteUser.status = "success";
      // const deletedUser = action.payload.user;
      // state.getAllUsers.data.users = state?.getAllUsers?.data?.users?.filter((user) => {
      //   console.log("deleted user : ", deletedUser._id, " ", user._id);
      //   return user?._id?.toString() != deletedUser?._id?.toString();
      // })
      state.deleteUser.data = action.payload;
    },
    deleteUserFailure: (state, action) => {
      state.deleteUser.status = "failed";
      state.deleteUser.error = action.payload;
    },
    clearGetUserStatus: (state) => {
      state.getUser.status = "idle";
    },
    clearGetUserData: (state) => {
      state.getUser.data = null;
    },
    clearGetUserError: (state) => {
      state.getUser.error = null;
    },

    clearGetAllUsersStatus: (state) => {
      state.getAllUsers.status = "idle";
    },

    clearGetAllUsersData: (state) => {
      state.getAllUsers.data = null;
    },
    clearGetAllUsersError: (state) => {
      state.getAllUsers.error = null;
    },
    clearCreateUserStatus: (state) => {
      state.createUser.status = "idle";
    },
    clearCreateUserData: (state) => {
      state.createUser.data = null;
    },
    clearCreateUserError: (state) => {
      state.createUser.error = null;
    },
    clearUpdateUserStatus: (state) => {
      state.updateUser.status = "idle";
    },
    clearUpdateUserData: (state) => {
      state.updateUser.data = null;
    },
    clearUpdateUserError: (state) => {
      state.updateUser.error = null;
    },
    clearDeleteUserStatus: (state) => {
      state.deleteUser.status = "idle";
    },
    clearDeleteUserData: (state) => {
      state.deleteUser.data = null;
    },
    clearDeleteUserError: (state) => {
      state.deleteUser.error = null;
    },
    updateUserList: (state, action) => {
      const { type, payload } = action.payload;
      console.log('update list ', type , payload)
      // Ensure `state.getAllUsers.data.users` exists and is an array
      if (!Array.isArray(state.getAllUsers?.data?.users)) {
        state.getAllUsers.data = {
          ...state.getAllUsers.data,
          users: [],
          totalCount: 0,
        };
      }

      switch (type) {
        case "add": {
          state.getAllUsers.data.users = [
            payload,
            ...state.getAllUsers.data.users,
          ];
          state.getAllUsers.data.totalCount++;
          break;
        }

        case "update": {
          const index = state.getAllUsers.data.users.findIndex(
            (user) => user._id.toString() === payload._id.toString()
          );
          if (index !== -1) {
            state.getAllUsers.data.users[index] = payload;
          }
          break;
        }

        case "delete": {
          console.log("filter",state.getAllUsers.data.users.filter(
            (user) => user._id.toString() !== payload._id.toString()
          ))
          state.getAllUsers.data.users = [...state.getAllUsers.data.users.filter(
            (user) => user._id.toString() !== payload._id.toString()
          )]
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    }, 
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
