import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  selectCategories
} from '../../utils/redux_state';

import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(UPDATE_CATEGORIES({ categories: categoryData.categories }));
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(UPDATE_CATEGORIES({ categories: categories }));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch(UPDATE_CURRENT_CATEGORY({ currentCategory: id }));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
