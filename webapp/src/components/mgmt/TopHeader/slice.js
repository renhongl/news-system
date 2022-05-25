

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '首页'
}

const topHeaderSlice = createSlice({
    name: 'topHeaderSlice',
    initialState,
    reducers: {
        changeTitle: (state, action) => {
            state.title = action.payload
        }
    }
})

export const { changeTitle } = topHeaderSlice.actions

export default topHeaderSlice.reducer