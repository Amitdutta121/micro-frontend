import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

import { getProducts, currency } from "../api/products";
import { addToCart, useLoggedIn } from "cart/cart";
import {notify} from "../utils";

export default function HomeContent() {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

    const goToProductDetails = (productId) => {
    history.push(`/product/${productId}`);
  };
    const addToBag = (productId) => {
    addToCart(productId).then((res) => {
      notify('Added to cart');
    });
  };

  return (
  <div className="bg-white">
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products &&
            products?.map((product) => (
                <div key={product.id} className="group">
                  <div
                      className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
                      onClick={() => {
                        goToProductDetails(product.id);
                      }}>
                    <img
                        src={product.image}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product?.title}</h3>
                  <p className="text-gray-400">
                    {product.description.slice(0, 50)}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    $ {product.price}
                  </p>
                  {loggedIn && (
                      <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            addToBag(product.id);
                          }}>
                        Add to bag
                      </button>
                  )}
                </div>
            ))}
      </div>
    </div>
  </div>
  );
}
