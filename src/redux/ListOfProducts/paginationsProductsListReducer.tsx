import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type paginationProductsList = {
  page: number;
};

const initialState: paginationProductsList = {
  page: 1,
};

const categoriesSlice = createSlice({
  name: "paginationProductsList",
  initialState,
  reducers: {
    addPage(state, action: PayloadAction<number>) {
      window.scrollTo(0, 0);
      state.page = action.payload;
    },
  },
});

export const { addPage } = categoriesSlice.actions;
export default categoriesSlice.reducer;
