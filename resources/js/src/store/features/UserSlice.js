import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    name: "",
    email: "",
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
    setFirstId,
    stateEmail,
    stateName,
    statePasswor,
    statePasswordOld,
} = UserSlice.actions;
// export const { stateUser } = UserSlice.actions;
export default UserSlice.reducer;
