import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header>
        <div className="logo">
          <img src="./logo.png" alt="logo"/>
          <h1 className="logo">Ecommerce</h1>
        </div>

        <div className="nav-bar">
          <ul className="nav-links">
            <li>
              <a href="/home" className="links">
                Home
              </a>
            </li>
            <li>
              <a href="/about">Categorias</a>
            </li>
            <li>
              <a href="/services">Sobre</a>
            </li>
            <li>
              <a href="/contact">Contato</a>
            </li>
          </ul>
        </div>

        <div className="search-container">
          <div className="input-search">
            <img src="./search.png" alt="search"/>
            <input type="text" placeholder="procure um produto" />
          </div>
          <a href="/cart">
            <img src="./cart.png" alt="cart"/>
          </a>
          <img src="./user.png" alt="user"/>
        </div>
      </header>
    </>
  );
};

export default Header;
