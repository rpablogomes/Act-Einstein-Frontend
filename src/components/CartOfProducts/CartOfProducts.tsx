import React, { useEffect } from "react";
import "./CartOfProducts.scss";
import Location from "../Location/Location";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  removeProduct,
  updateQuantity,
} from "../../redux/CartOfProducts/cartOfIdsOfProductsReducer";
import { getInvoice } from "../../redux/CartOfProducts/invoiceReducer";

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const invoice = useSelector((state: RootState) => state.invoice);

  useEffect(() => {
    dispatch(getInvoice(cart));
  }, [cart, dispatch]);

  return (
    <>
      <Location location={"Seu Carrinho"} />
      <div className="cart-invoice">
        <div className="product-list">
          {!cart.length ? (
            <div className="empty-cart">Seu Carrinho está vazio</div>
          ) : (
            <>
              <div className="titleMeuCarrinho">
                <h2>Seu Carrinho</h2>
              </div>

              {cart.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="container-img">
                    <img src={product.image} alt="product" />
                  </div>
                  <div className="product-info">
                    <div className="title">
                      <h3>{product.title}</h3>
                    </div>
                    <p className="price">R${product.price}</p>
                    <div className="product-counter">
                      <div className="counter">
                        <p
                          className="counter-button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: product.id,
                                quantity: -1,
                              })
                            )
                          }
                        >
                          -
                        </p>
                        <p className="quantity">{product.quantity}</p>
                        <p
                          className="counter-button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: product.id,
                                quantity: 1,
                              })
                            )
                          }
                        >
                          +
                        </p>
                      </div>

                      <div
                        className="exit-button"
                        onClick={() => dispatch(removeProduct(product.id))}
                      >
                        <img src="./close.png" alt="remove item" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="invoice-summary">
          <h2>Invoice Summary</h2>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span className="value">
              R${invoice.totalPriceProducts.toFixed(2)}
            </span>
          </div>
          <div className="summary-item">
            <span>Shipping Cost:</span>
            <span className="value">R${invoice.shippingCost.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span className="value">R${invoice.taxes.toFixed(2)}</span>
          </div>
          <div className="line" />
          <div className="summary-item total">
            <span className="value">Total:</span>
            <span className="value">
              R${invoice.totalWithAllCosts.toFixed(2)}
            </span>
          </div>
          <button className="checkout-button">Checkout</button>
          <div className="home-button">
            <a href="/">Continue no site</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
