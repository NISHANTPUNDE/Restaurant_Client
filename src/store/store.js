import { configureStore } from '@reduxjs/toolkit'
import superAdminReducer from './slices/superAdminSlice'

export const store = configureStore({
    reducer: {
        superAdmin: superAdminReducer,
    },
})