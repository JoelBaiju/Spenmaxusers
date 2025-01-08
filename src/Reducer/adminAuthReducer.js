import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminAuthenticated: false,
  adminUser: null
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.isAdminAuthenticated = true;
      state.adminUser = action.payload;
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false;
      state.adminUser = null;
    }
  }
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
