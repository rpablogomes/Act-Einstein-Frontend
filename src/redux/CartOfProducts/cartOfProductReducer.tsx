import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/Products/ProductsList";

type CartOfProductsIds = {
  productId: number;
  quantity: number;
};

type ProductState = {
  cartOfProducts: Product[];
  status: "idle" | "loading" | "failed";
};

const initialState: ProductState = {
  cartOfProducts: [],
  status: "idle",
};

export const fetchCartOfProducts = createAsyncThunk(
  "cartOfProducts/fetchCartOfProducts",
  async (cart: CartOfProductsIds[]) => {
    const cartOfProducts = await Promise.all(
      cart.map(async (product) => {
        const fetchedData = await fetch(
          `https://fakestoreapi.com/cartOfProducts/${product.productId}`
        );
        const data = await fetchedData.json();
        return {
          ...data,
          quantity: product.quantity,
        };
      })
    );
    return cartOfProducts;
  }
);

const productSlice = createSlice({
  name: "cartOfProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartOfProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartOfProducts.fulfilled, (state, action) => {
        state.cartOfProducts = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCartOfProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
