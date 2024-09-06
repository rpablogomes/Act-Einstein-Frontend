import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header>
        <div>
          <img src="./logo.png" />
          <h1 className="logo">Ecommerce</h1>
        </div>
        {/*       <nav className="navbar"> */}

        <div>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">Categorias</a>
            </li>
            <li>
              <a href="#services">Sobre</a>
            </li>
            <li>
              <a href="#contact">Contato</a>
            </li>
          </ul>
        </div>

        <div>
          <div>
            <img src="./search.png" />
            <input type="text" placeholder="procure um produto" />
          </div>
          <img src="./cart.png" />
          <img src="./user.png" />
        </div>

        {/* </nav> */}
      </header>
    </>
  );
};

export default Header;
