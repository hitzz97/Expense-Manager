import { createSlice } from "@reduxjs/toolkit";

const insightSlice = createSlice({
    name: "insight",
    initialState: {
        sort: "latest",
        group: {
            dmy: "none",
            label: "none",
        },
        filters: {
            credits: true,
            debits: true,
            minAmt: 0,
            maxAmt: 99999999,
            startDate: '1990-03-13',
            endDate: '2050-01-13',
        }
    },
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setGroup: (state, action) => {
            state.group = { ...state.group, ...action.payload };
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        }
    }
})

export const { setSort, setFilters, setGroup } = insightSlice.actions;
export default insightSlice;