/* eslint-disable react/no-array-index-key */
import React from 'react';
import ProductTable from '../ManageProduct/components/ProductTable';
import SearchValue from '../../components/Search';
import styles from './index.module.scss';

function ProductList() {
  // const objectContext = useContext(AppContext);

  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <SearchValue />
      </div>
      <ProductTable showCost />

    </div>
  );
}

// eslint-disable-next-line eol-last
export default ProductList;