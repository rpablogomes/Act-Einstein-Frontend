import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoriesState = {
  categories: string[];
  checkedCategory: string;
};

const initialState: CategoriesState = {
  categories: [],
  checkedCategory: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const fetchedData = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await fetchedData.json();
    return data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories(state, action: PayloadAction<string>) {
      state.categories.push(action.payload);
    },
    setCategory(state, action: PayloadAction<string>) {
      state.checkedCategory === action.payload
        ? (state.checkedCategory = "")
        : (state.checkedCategory = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { addCategories, setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
