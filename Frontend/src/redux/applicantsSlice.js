import { createSlice } from "@reduxjs/toolkit"
const applicantsSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: []
    },
    reducers: {
        // actions
        setAllApplicants: (state, action) => {
            state.applicants = action.payload
        }

    }
});
export const { setAllApplicants } = applicantsSlice.actions;
export default applicantsSlice.reducer;