import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { useCart } from "../context/CartContext";

const Woman = () => {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  const getItems = async () => {
    try {
      const result = await axios.get(
        "https://fakestoreapi.com/products/category/women's%20clothing"
      );
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <section className="section" id="women">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h2>Women's Latest</h2>
                <span>
                  Details to details is what makes Hexashop different from the
                  other themes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="women-item-carousel">
                <div className="owl-women-item">
                  <OwlCarousel
                    className="owl-theme"
                    items={5}
                    dots={true}
                    loop={true}
                    nav={true}
                    margin={30}
                    responsive={{
                      0: {
                        items: 1,
                      },
                      600: {
                        items: 2,
                      },
                      1000: {
                        items: 3,
                      },
                    }}
                  >
                    {products.map((product, index) => {
                      return (
                        <div className="item" key={index}>
                          <div className="thumb">
                            <div className="hover-content">
                              <ul>
                                <li>
                                  <a href={`/purchase?id=${product.id}`}>
                                    <i className="fa fa-eye"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href={`/purchase?id=${product.id}`}>
                                    <i className="fa fa-star"></i>
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => addToCart(product)}>
                                    <i className="fa fa-shopping-cart"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <img
                              src={product.image}
                              alt=""
                              style={{ width: "100%", height: "400px" }}
                            />
                          </div>
                          <div className="down-content">
                            <h4>{product.title}</h4>
                            <span>${product.price}</span>
                            {/* <ul className="stars">
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                            </ul> */}
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Woman;
