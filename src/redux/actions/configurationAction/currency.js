import axios from "axios";
import { currencyActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/currency`

export const getAllCurrencies = () => async (dispatch) => {
    try {
        dispatch(currencyActions.getAllCurrenciesRequest());
        console.log('getAllCurrencies');
        const response = await axios.get(`${route}/`, {
            withCredentials: true
        });

        console.log('get-all-currency-res-data', response.data);
        dispatch(currencyActions.getAllCurrenciesSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(currencyActions.getAllCurrenciesFailure(errorMessage));
    }
};