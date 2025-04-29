import { createSlice } from "@reduxjs/toolkit"

export interface DrawerState {
  opened: boolean
  isOpen: any
  defaultId: "default"
}

const initialState: DrawerState = {
  opened: true,
  isOpen: [],
  defaultId: "default",
}

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    handleOpen: (state: DrawerState) => {
      return {
        ...state,
        opened: true,
      }
    },

    handleClose: (state: DrawerState) => {
      return {
        ...state,
        opened: false,
      }
    },

    handleMenuClick: (state: DrawerState, action: any) => {
      return {
        ...state,
        isOpen: [action.payload],
      }
    },
  },
})

export const { handleOpen, handleClose, handleMenuClick } = drawerSlice.actions

export default drawerSlice.reducer
