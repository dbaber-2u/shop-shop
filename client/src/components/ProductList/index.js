import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { idbPromise } from "../../utils/helpers";

import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_PRODUCTS,
  selectCurrentCategory,
  selectProducts
} from '../../utils/redux_state';

function ProductList() {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const currentCategory = useSelector(selectCurrentCategory);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(UPDATE_PRODUCTS({ products: data.products }));

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        dispatch(UPDATE_PRODUCTS({ products: products }));
      });
    }
  }, [data, loading, dispatch]);


  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
