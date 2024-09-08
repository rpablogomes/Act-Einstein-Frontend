import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../components/Products/ProductsList";

type Invoice = {
  totalPriceProducts: number;
  shippingCost: number;
  taxes: number;
  totalWithAllCosts: number;
};

const initialState: Invoice = {
  totalPriceProducts: 0,
  shippingCost: 0,
  taxes: 0,
  totalWithAllCosts: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getInvoice(state, action: PayloadAction<Product[]>) {
      const totalPriceProducts = action.payload.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      const shippingCost =
        action.payload.reduce((sum, product) => sum + product.quantity, 0) * 20; //$20 per unit;
      const taxes = totalPriceProducts * 0.1; //Assuming the tax is 10%
      const totalWithAllCosts = totalPriceProducts + shippingCost + taxes;

      state.totalPriceProducts = totalPriceProducts;
      state.shippingCost = shippingCost;
      state.taxes = taxes;
      state.totalWithAllCosts = totalWithAllCosts;
    },
  },
});

export const { getInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
