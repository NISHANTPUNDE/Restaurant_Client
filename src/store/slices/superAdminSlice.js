import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    superAdmin: null,
}

const superAdminSlice = createSlice({
    name: 'superAdmin',
    initialState,
    reducers: {
        setSuperAdmin(state, action) {
            state.superAdmin = action.payload
        },
    },
})

export const superAdminActions = superAdminSlice.actions
export default superAdminSlice.reducer