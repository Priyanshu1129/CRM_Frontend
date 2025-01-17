import { axiosRequest } from "@/utilities/axiosHelper";
import { territoryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/territory`;

export const getAllTerritories =
  (config = false) =>
  async (dispatch) => {
    try {
      dispatch(territoryActions.getAllTerritoriesRequest());
      console.log("getAllTerritories");
      const params = { config };
      // Use axiosRequest helper function for GET request
      const response = await axiosRequest(
        dispatch,
        "GET", // HTTP method for GET request
        `${route}/`, // URL to get all territories
        null, // No data to send in the body for GET requests
        params // No query parameters
      );

      console.log("get-all-territory-res-data", response);
      dispatch(territoryActions.getAllTerritoriesSuccess(response));
    } catch (error) {
      console.log("error", error);
      dispatch(
        territoryActions.getAllTerritoriesFailure(
          error.message || "Failed to fetch territories"
        )
      );
    }
  };

export const getTerritory = (territoryId) => async (dispatch) => {
  try {
    console.log("get-territory-data", territoryId);
    dispatch(territoryActions.getTerritoryRequest());

    // Use axiosRequest helper function for GET request
    const data = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/details/${territoryId}`, // URL with territoryId
      null, // No data to send in the body for GET requests
      null // No query parameters
    );

    console.log("get-territory-details-res-data", data);
    dispatch(territoryActions.getTerritorySuccess(data));
  } catch (error) {
    console.log("error", error);
    dispatch(
      territoryActions.getTerritoryFailure(
        error.message || "Failed to fetch territory"
      )
    );
  }
};
export const createTerritory = (territoryData) => async (dispatch) => {
  try {
    console.log("create-territoryData", territoryData);
    dispatch(territoryActions.createTerritoryRequest());

    // Use axiosRequest helper function for POST request
    const data = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}/`, // URL to send the request
      territoryData, // Data to send in the request body
      null // No query parameters for this request
    );

    console.log("create-territory-res-data", data);
    dispatch(territoryActions.createTerritorySuccess(data));
    dispatch(
      territoryActions.updateTerritoryList({
        type: "add",
        payload: data?.data,
      })
    );
  } catch (error) {
    console.log("error", error);
    dispatch(
      territoryActions.createTerritoryFailure(
        error.message || "Failed to create territory"
      )
    );
  }
};
export const updateTerritory =
  (territoryData, territoryId) => async (dispatch) => {
    try {
      console.log("update-territoryData%", territoryData, territoryId);

      dispatch(territoryActions.updateTerritoryRequest());

      // Use axiosRequest helper function for PUT request
      const data = await axiosRequest(
        dispatch,
        "PUT", // HTTP method for PUT request
        `${route}/${territoryId}`, // URL for updating the territory with ID
        territoryData, // Data to update the territory
        null // No query parameters for this request
      );

      console.log("update-territory-res-data", data);
      dispatch(territoryActions.updateTerritorySuccess(data));
      dispatch(
        territoryActions.updateTerritoryList({
          type: "update",
          payload: data?.data,
        })
      );
    } catch (error) {
      console.log("error", error);
      dispatch(
        territoryActions.updateTerritoryFailure(
          error.message || "Failed to update territory"
        )
      );
    }
  };
export const deleteTerritory = (territoryId, confirm = 'true', undo = 'false') => async (dispatch) => {
  try {
    console.log("delete-territoryData", territoryId);
    dispatch(territoryActions.deleteTerritoryRequest());

    // Use axiosRequest helper function for DELETE request
    const data = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for DELETE request
      `${route}/${territoryId}?confirm=${confirm}&undo=${undo}`, // URL for deleting the territory with ID
    );

    console.log("delete-territory-res-data", data);
    dispatch(territoryActions.deleteTerritorySuccess(data));
  } catch (error) {
    console.log("delete-territory-error", error);
    dispatch(
      territoryActions.deleteTerritoryFailure(
        error.message || "Failed to delete territory"
      )
    );
  }
};
