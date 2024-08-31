import { configureStore } from '@reduxjs/toolkit'
import commonReducer from "../features/common/CommonSlice"
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { authTokenApi } from "../api/gapi"

export const store = configureStore({
  reducer: {
    commonSlice: commonReducer,
    [authTokenApi.reducerPath]: authTokenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authTokenApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)