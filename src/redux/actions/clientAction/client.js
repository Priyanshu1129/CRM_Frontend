import axios from "axios";
import { clientActions } from "@/redux/slices/clientSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
import { axiosRequest } from "@/utilities/axiosHelper";

const route = `${serverURL}/client`;

export const getAllClients =
  ({
    page = null,
    limit = null,
    config = false,
    industry = "",
    subIndustry = "",
    territory = "",
    enteredBy = "",
    name,
    entryDate,
  }) =>
  async (dispatch) => {
    try {
      if (config) {
        dispatch(mastersConfigActions.getConfigClientsRequest());
      } else {
        dispatch(clientActions.getAllClientsRequest());
      }
      console.log("getAllClients-request-config", config);

      // Use axiosRequest helper function
      const response = await axiosRequest(dispatch, "GET", `${route}/`, null, {
        limit,
        page,
        config,
        industry,
        subIndustry,
        territory,
        enteredBy,
        name,
        entry_date: entryDate,
      });

      console.log("get-all-client-res-data", response);

      if (config) {
        dispatch(mastersConfigActions.getConfigClientsSuccess(response));
      } else {
        dispatch(clientActions.getAllClientsSuccess(response.data));
      }
    } catch (error) {
      console.log("getAllClients-error", error);

      if (config) {
        dispatch(mastersConfigActions.getConfigClientsFailure());
      } else {
        dispatch(
          clientActions.getAllClientsFailure(
            error.message || "Failed to fetch clients data"
          )
        );
      }
    }
  };

export const getClient = (clientId) => async (dispatch) => {
  try {
    console.log("get-client-data-req", clientId);
    dispatch(clientActions.getClientRequest());

    // Use axiosRequest helper function
    const response = await axiosRequest(
      dispatch,
      "GET",
      `${route}/${clientId}`
    );

    console.log("get-client-data-res", response);
    dispatch(clientActions.getClientSuccess(response));
  } catch (error) {
    console.log("get-client-error", error);

    // Error message already handled by axiosRequest
    dispatch(
      clientActions.getClientFailure(
        error.message || "Failed to fetch client data"
      )
    );
  }
};

export const createClient = (clientData) => async (dispatch) => {
  try {
    console.log("create-client-req-data", clientData);
    dispatch(clientActions.createClientRequest());

    // Use axiosRequest helper function
    const response = await axiosRequest(
      dispatch,
      "POST",
      `${route}/`,
      clientData
    );

    console.log("create-client-res-data", response.data);
    dispatch(clientActions.createClientSuccess(response));
    dispatch(
      clientActions.updateClientList({
        type: "add",
        payload: response.data,
      })
    );
  } catch (error) {
    console.log("create-client-error", error);

    // Error message already handled by axiosRequest
    dispatch(
      clientActions.createClientFailure(
        error.message || "Failed to create client"
      )
    );
  }
};

export const updateClient = (clientData, clientId) => async (dispatch) => {
  try {
    console.log("update-client-req-data", clientData);
    dispatch(clientActions.updateClientRequest());

    // Use axiosRequest helper function
    const response = await axiosRequest(
      dispatch,
      "PUT",
      `${route}/${clientId}`,
      clientData
    );

    console.log("update-client-res-data", response.data);
    dispatch(clientActions.getClientSuccess(response)); // If needed after update
    dispatch(clientActions.updateClientSuccess(response)); // Successful update
    dispatch(
      clientActions.updateClientList({
        type: "update",
        payload: response.data,
      })
    );
  } catch (error) {
    console.log("update-client-error", error);
    // Error message is already handled by axiosRequest
    dispatch(
      clientActions.updateClientFailure(
        error.message || "Failed to update client"
      )
    );
  }
};

export const deleteClient =
  (clientId, confirm = "false") =>
  async (dispatch) => {
    try {
      console.log("delete-ClientData", clientId);
      dispatch(clientActions.deleteClientRequest());

      // Make the API call using the axiosRequest helper
      const response = await axiosRequest(
        dispatch,
        "DELETE", // HTTP method for DELETE request
        `${route}/${clientId}?confirm=${confirm}` // Endpoint for deleting Client by ID
      );

      console.log("delete-Client-res-data", response.data);
      dispatch(clientActions.deleteClientSuccess(response.data));
    } catch (error) {
      dispatch(
        clientActions.deleteClientFailure(error.message || "An error occurred")
      );
    }
  };
