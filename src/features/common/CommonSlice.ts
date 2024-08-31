import { createSlice } from '@reduxjs/toolkit'

export interface stateInterface {
    tutorial: boolean
}

// const status:string | null = localStorage.getItem("tutorial")

const initialState: stateInterface = {
    tutorial: false,
    // tutorial: JSON.parse(status),
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        tutorialStatus: (state) => {
            if (state.tutorial) {
                state.tutorial = false
                localStorage.setItem("tutorial", "false")
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { tutorialStatus } = commonSlice.actions

export default commonSlice.reducer