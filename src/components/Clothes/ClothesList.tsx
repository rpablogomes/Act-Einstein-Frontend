import React, { useEffect, useState } from "react";
import "./ClothesList.scss";
import Location from "../Location/Location";

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

const ClothesList: React.FC = () => {
  const [listOfClothes, setListofClothes] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProducts = await fetch(
          `https://fakestoreapi.com/products${
            checkedCategories ? `/category/${checkedCategories}` : ""
          }`
        );
        const dataProducts = await responseProducts.json();
        setListofClothes(dataProducts);

        const responseCategories = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const dataCategories = await responseCategories.json();
        setCategories(dataCategories);

        console.log(dataProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [checkedCategories]);


  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Location location={"Home"} />
      <div className="container">
        <div className="categories">
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={checkedCategories === category}
                  onChange={(e) => {
                    setCheckedCategories(e.target.value);
                    setCurrentPage(1); // Reset to the first page when category changes
                  }}
                />
                <a>{category}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="products">
          {listOfClothes.slice(currentPage * 9 ,currentPage - 9).map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.title} />
              <div>
                <h3 className="title">{product.title}</h3>
                <div className="priceAndStock">
                  <p className="stock">In Stock</p>
                  <p className="price">Price: ${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <img
          src="./previous.png"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        />
        {Array.from({ length: Math.ceil(listOfClothes.length / 9) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <img
          src="./next.png"
          onClick={() =>
            currentPage <= listOfClothes.length % 9 && paginate(currentPage + 1)
          }
        />
      </div>
    </>
  );
};

export default ClothesList;
