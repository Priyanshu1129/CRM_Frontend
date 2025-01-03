import { axiosRequest } from "@/utilities/axiosHelper";
import { currencyActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/currency`;

export const getAllCurrencies = () => async (dispatch) => {
  try {
    dispatch(currencyActions.getAllCurrenciesRequest());
    console.log("getAllCurrencies");

    // Use axiosRequest helper function to make the GET request
    const response = await axiosRequest(dispatch, "GET", `${route}/`);

    console.log("get-all-currency-res-data", response);
    dispatch(currencyActions.getAllCurrenciesSuccess(response));
  } catch (error) {
    console.log("get-all-currencies-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      currencyActions.getAllCurrenciesFailure(
        error.message || "Failed to get currencies"
      )
    );
  }
};
