import { createSlice } from '@reduxjs/toolkit';

const initialLeaderboardState = {
    getLeaderboard: {
        status: "idle",
        error: null,
        data: null,
    }
}

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState: initialLeaderboardState,
    reducers: {
        getLeaderboardRequest: (state, action) => {
            state.getLeaderboard.status = 'pending'
        },
        getLeaderboardSuccess: (state, action) => {
            state.getLeaderboard.status = 'success'
            state.getLeaderboard.data = action.payload;
        },
        getLeaderboardFailure: (state, action) => {
            state.getLeaderboard.status = 'failed'
            state.getLeaderboard.error = action.payload;
        },
        clearGetLeaderboardStatus: (state) => {
            state.getLeaderboard.status = "idle";
        },
        clearGetLeaderboardData: () => {
            state.getLeaderboard.data = null;
        },
        clearGetLeaderboardError: (state) => {
            state.getLeaderboard.error = null;
        }
    }
})

export const leaderboardActions = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;