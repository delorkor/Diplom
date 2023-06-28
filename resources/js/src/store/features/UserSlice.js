import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  access_token: "",
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
  },
});
export const { setFirstId } = UserSlice.actions;
export default UserSlice.reducer;
