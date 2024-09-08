import React, { useEffect } from "react";
import "./ProductsList.scss";
import Location from "../Location/Location";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsLists } from "../../redux/ListOfProducts/ProductsListReducer";
import {
  fetchCategories,
  setCategory,
} from "../../redux/ListOfProducts/categoriesReducer";

import { AddProductToCart } from "../../redux/CartOfProducts/cartOfIdsOfProductsReducer";
import { addPage } from "../../redux/ListOfProducts/paginationsProductsListReducer";

export type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  quantity: number;
};

const ProductsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const productList = useSelector((state: RootState) => state.productList);
  const categories = useSelector((state: RootState) => state.categories);
  const page = useSelector((state: RootState) => state.pagination.page);

  useEffect(() => {
    dispatch(fetchProductsLists(categories.checkedCategory));
  }, [categories.checkedCategory, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <>
      <Location location={"Home"} />
      <div className="container-products-list">
        <div className="categories">
          <ul>
            {categories.categories.map((category, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={categories.checkedCategory === category}
                  onChange={(e) => {
                    dispatch(setCategory(e.target.value));
                    dispatch(addPage(1));
                  }}
                />
                <p>{category}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-products-and-pagination">
          <div className="products">
            <>
              {productList.productsList
                .slice((page - 1) * 9, page * 9)
                .map((product) => (
                  <div key={product.id} className="product-item">
                    <img src={product.image} alt={product.title} />
                    <div className="info-itens">
                      <h3 className="title">{product.title}</h3>
                      <div className="price-and-stock">
                        <span className="stock">In Stock</span>
                        <p className="price">${product.price}</p>
                      </div>
                      <button
                        className="add-button"
                        onClick={() => {
                          dispatch(AddProductToCart(product));
                        }}
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                ))}
            </>
          </div>
          <div className="pagination">
            <img
              src="./next.png"
              className="left-bottom"
              onClick={() => page > 1 && dispatch(addPage(page - 1))}
              alt="left sign"
            />
            {Array.from(
              { length: Math.ceil(productList.productsList.length / 9) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => dispatch(addPage(i + 1))}
                  className={page === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
            <img
              src="./next.png"
              onClick={() =>
                page <= productList.productsList.length / 9 &&
                dispatch(addPage(page + 1))
              }
              alt="right sign"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
