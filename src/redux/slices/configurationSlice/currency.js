import { createSlice } from '@reduxjs/toolkit';

const initialCurrencyState = {
    getAllCurrencies: {
        status: "idle",
        error: null,
        data: null,
    }
}

const currencySlice = createSlice({
    name: "currency",
    initialState: initialCurrencyState,
    reducers: {
        getAllCurrenciesRequest: (state, action) => {
            state.getAllCurrencies.status = "pending";
        },
        getAllCurrenciesSuccess: (state, action) => {
            state.getAllCurrencies.status = 'success'
            state.getAllCurrencies.data = action.payload;
        },
        getAllCurrenciesFailure: (state, action) => {
            state.getAllCurrencies.status = 'failed';
        },
        clearGetAllCurrenciesStatus: (state) => {
            state.getAllCurrencies.status = "idle";
        },
        clearGetAllCurrenciesData: () => {
            state.getAllCurrencies.data = null;
        },
        clearGetAllCurrenciesError: (state) => {
            state.getAllCurrencies.error = null;
        }
    }
})

export const currencyActions = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;