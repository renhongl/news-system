

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signin } from './signinApi'

const initialState = {
    loading: 'idle'
}

export const signinAsync = createAsyncThunk('signin/signin', async (data) => {
    const res =  await signin(data.username, data.password)
    return res.data
})

const slice = createSlice({
    name: 'singinSlice',
    initialState,
    reducers: {
        clearToken: (state) => {
            state.token = ''
            state.loading = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinAsync.pending, (state) => {
                state.loading = 'loading'
            })
            .addCase(signinAsync.fulfilled, (state, action) => {
                state.loading = 'done'
                state.token = action.payload[0]
            })
            .addCase(signinAsync.rejected, (state) => {
                state.loading = 'rejected'
            })
    }
})

export const { clearToken } = slice.actions

export default slice.reducer