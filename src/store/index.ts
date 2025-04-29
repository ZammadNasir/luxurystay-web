import { configureStore } from "@reduxjs/toolkit"
import drawerReducer from "../store/drawerReducer"

// ==============================|| REDUX - MAIN STORE ||============================== //

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
