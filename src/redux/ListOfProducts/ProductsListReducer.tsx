import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../components/Products/ProductsList";

type ProductsListState = {
  productsList: Product[];
  status: "idle" | "loading" | "failed";
};

const initialState: ProductsListState = {
  productsList: [],
  status: "idle",
};

export const fetchProductsLists = createAsyncThunk(
  "productsList/fetchProductsLists",
  async (checkedCategory: string | null) => {
    const fetchedData = await fetch(
      `https://fakestoreapi.com/products${
        checkedCategory ? `/category/${checkedCategory}` : ""
      }`
    );
    const data = await fetchedData.json();
    return data;
  }
);

const productListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    addProductsList(state, action: PayloadAction<Product>) {
      state.productsList.push(action.payload);
    },
    setProductsList(state, action: PayloadAction<Product[]>) {
      state.productsList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsLists.fulfilled, (state, action) => {
      state.productsList = action.payload;
      state.status = "idle";
    });
  },
});

export const { addProductsList, setProductsList } = productListSlice.actions;
export default productListSlice.reducer;
