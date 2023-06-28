import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: false,
};

export const FilmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setFilms } = FilmsSlice.actions;
export default FilmsSlice.reducer;
