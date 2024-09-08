import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../components/Products/ProductsList";

type CartState = {
  cart: Product[];
};

const loadCartState = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? { cart: JSON.parse(savedCart) } : { cart: [] };
};

const saveCartState = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

const initialState = loadCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddProductToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      saveCartState(state);
    },
    addProduct(state, action: PayloadAction<Product>) {
      const existingProduct = state.cart.find(
        (p) => p.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity = action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const productIndex = state.cart.findIndex((p) => p.id === productId);

      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        product.quantity += quantity;

        if (product.quantity <= 0) {
          state.cart.splice(productIndex, 1);
        }
      }
    },
    ResetCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  AddProductToCart,
  ResetCart,
  addProduct,
  removeProduct,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
