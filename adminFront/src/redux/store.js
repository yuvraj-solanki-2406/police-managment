import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin/adminSlice.js'

export const store = configureStore({
    reducer: {
        adminReducer
    },
})