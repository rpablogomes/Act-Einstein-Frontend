import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClothesList from "./components/Products/ProductsList";
import Cart from "./components/CartOfProducts/CartOfProducts";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import Promotion from "./components/Promotion /Promotion";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Promotion />
          <Header />
          <div className="App">
            <Routes>
              <Route path="/" element={<ClothesList />} />
              <Route path="/home" element={<ClothesList />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </Provider>
      </PersistGate>
    </BrowserRouter>
  );
}

export default App;
