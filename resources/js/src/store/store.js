import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";
import FilmsSlice from "./features/FilmsSlice";
export const store = configureStore({
  reducer: {
    user: UserSlice,
    films: FilmsSlice,
  },
});
