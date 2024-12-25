import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCart } from "../context/CartContext";

const Man = () => {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  const getItems = async () => {
    try {
      const result = await axios.get(
        "https://fakestoreapi.com/products/category/men's%20clothing"
      );
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleClick = (product) => {
    console.log(product);
  };

  const swiperRef = useRef(null); // Create a ref for the Swiper instance

  const goToNext = () => {
    swiperRef.current.swiper.slideNext(); // Move to the next slide
  };

  const goToPrev = () => {
    swiperRef.current.swiper.slidePrev(); // Move to the previous slide
  };

  return (
    <>
      <section className="section" id="men">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h2>Men's Latest</h2>
                <span>
                  Details to details is what makes Hexashop different from the
                  other themes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="men-item-carousel">
                <div class="owl-men-item">
                  <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                  >
                    {products.map((product, index) => {
                      return (
                        <SwiperSlide>
                          <div className="item" key={index}>
                            <div className="thumb">
                              <div className="hover-content">
                                <ul>
                                  <li>
                                    <a href={`/purchase?id=${product.id}`}>
                                      <i className="fa fa-eye" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href={`/purchase?id=${product.id}`}>
                                      <i className="fa fa-star" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => addToCart(product)}>
                                      <i className="fa fa-shopping-cart" />
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
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Man;
