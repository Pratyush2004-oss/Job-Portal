import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: '',
        searchQuery: '',
        allAppliedJobs: [],
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
    }
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;