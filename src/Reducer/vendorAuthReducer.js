import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVendoAuthenticated: false,
    vendor: null
};

const vendorAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        vendorlogin(state, action) {
            state.isVendoAuthenticated = true;
            state.vendor = action.payload;
        },
        vendorlogout(state) {
            state.isVendoAuthenticated = false;
            state.vendor = null;
        }
    }
});

export const { vendorlogin, vendorlogout } = vendorAuthSlice.actions;
export default vendorAuthSlice.reducer;
