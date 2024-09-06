import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClothesList from "./components/Clothes/ClothesList";
// import Promotion from './components/Promotion /Promotion';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<ClothesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
