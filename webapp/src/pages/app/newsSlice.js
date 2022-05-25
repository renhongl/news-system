

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNews } from './newsApi'

const initialState = {
    value: 0,
    news: [],
    status: 'idle'
}

export const fetchNewsAsync = createAsyncThunk('news/fetchNews', async () => {
    const res = await fetchNews()
    return res.data
})

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value += 1
        },
        decrement: (state, action) => {
            state.value -= 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchNewsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.news = action.payload
            })
    }
})

export const { increment, decrement } = newsSlice.actions

export default newsSlice.reducer