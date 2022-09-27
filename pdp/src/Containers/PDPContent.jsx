import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

import {getProductById} from "home/products";
import placeAddToCart from "addtocart/placeAddToCart";
import {addToCart, useLoggedIn} from "cart/cart";
import {RadioGroup} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {notify} from "home/notify"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


const dummyProduct = {
  name: 'Basic Tee 6-Pack ',
  price: '$192',
  rating: 3.9,
  reviewCount: 117,
  href: '#',
  imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    {name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400'},
    {name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400'},
    {name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900'},
  ],
  sizes: [
    {name: 'XXS', inStock: true},
    {name: 'XS', inStock: true},
    {name: 'S', inStock: true},
    {name: 'M', inStock: true},
    {name: 'L', inStock: true},
    {name: 'XL', inStock: true},
    {name: 'XXL', inStock: true},
    {name: 'XXXL', inStock: false},
  ],
};

export default function PDPContent() {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(dummyProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(dummyProduct.sizes[2]);
  const [singleProduct, setSingleProduct] = useState(null);

  let {id} = useParams();
  const addToCartOther = useRef(null);

  useEffect(() => {
    if (id){
      getProductById(id).then(setSingleProduct);
    }
  }, [id]);

    useEffect(() => {
      console.log("singleProduct",singleProduct)
    if (addToCartOther.current && singleProduct?.id) {
      console.log("Placing add to cart")
      placeAddToCart(addToCartOther.current, singleProduct?.id);
    }
  }, [singleProduct]);

  const addProductToCart = (e) => {
    console.log("add to cart clicked")
    e.preventDefault();
    addToCart(id).then((res) => {
      notify('Added to cart');
      // console.log("added to cart")
    });
  };

  const loggedIn = useLoggedIn();

  return (
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="">
          <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                onClick={() => setOpen(false)}>
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
              <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img
                    src={singleProduct?.image}
                    className="object-cover object-center"
                />
              </div>
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                  {singleProduct?.title}
                </h2>

                <section aria-labelledby="information-heading" className="mt-2">
                  <h3 id="information-heading" className="sr-only">
                    Product information
                  </h3>

                  <p className="text-2xl text-gray-900">
                    ${singleProduct?.price}
                  </p>

                  {/* Reviews */}
                  <p>{singleProduct?.description}</p>
                </section>

                <section aria-labelledby="options-heading" className="mt-10">
                  <h3 id="options-heading" className="sr-only">
                    Product options
                  </h3>

                  {/*<form>*/}
                    {/* Sizes */}
                    <div className="mt-10">
                      <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4">
                        <RadioGroup.Label className="sr-only">
                          {' '}
                          Choose a size{' '}
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4">
                          {dummyProduct.sizes.map((size) => (
                              <RadioGroup.Option
                                  key={size.name}
                                  value={size}
                                  disabled={!size.inStock}
                                  className={({active}) =>
                                      classNames(
                                          size.inStock
                                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                          active ? 'ring-2 ring-indigo-500' : '',
                                          'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1',
                                      )
                                  }>
                                {({active, checked}) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {size.name}
                                      </RadioGroup.Label>
                                      {size.inStock ? (
                                          <span
                                              className={classNames(
                                                  active ? 'border' : 'border-2',
                                                  checked
                                                      ? 'border-indigo-500'
                                                      : 'border-transparent',
                                                  'pointer-events-none absolute -inset-px rounded-md',
                                              )}
                                              aria-hidden="true"
                                          />
                                      ) : (
                                          <span
                                              aria-hidden="true"
                                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                    <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor">
                                      <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                      )}
                                    </>
                                )}
                              </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {loggedIn && (
                        <>
                          <button
                              type="submit"
                              onClick={addProductToCart}
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Add to bag
                          </button>
                          <div ref={addToCartOther}></div>
                        </>
                    )}
                  {/*</form>*/}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
