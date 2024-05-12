import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    _id: string;
    email: string;
}

interface AuthState {
    userInfo: UserInfo | null;
}

// Assuming the initial state uses a type
const initialState: AuthState = {
    //@ts-ignore
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout(state) {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
