import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    role: "",
    name: "",
    email: "",
    // massage: "",
    access_token: "",
    password: "",
    password_now: "",
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setFirstId: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        setAuth: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        stateMassage: (state, action) => {
            state.massage = action.payload.massage;
        },
        stateEmail: (state, action) => {
            state.email = action.payload.email;
        },
        stateName: (state, action) => {
            state.name = action.payload.name;
        },
        statePasswordOld: (state, action) => {
            state.password = action.payload.password;
        },
        statePasswor: (state, action) => {
            state.password_now = action.payload.password_now;
        },
    },
});
export const {
    setAuth,
    setFirstId,
    stateEmail,
    stateName,
    statePasswor,
    statePasswordOld,
    stateMassage,
} = UserSlice.actions;
// export const { stateUser } = UserSlice.actions;
export default UserSlice.reducer;
