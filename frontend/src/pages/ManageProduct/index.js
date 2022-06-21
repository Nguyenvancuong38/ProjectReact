/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import styles from './index.module.scss';
import ProductTable from './components/ProductTable';
import SearchValue from '../../components/Search';
import AddModal from './components/AddProduct';

function ManageProduct() {
  const [addSuccess, setAddSuccess] = useState(false);
  const handleCallAgain = (success) => {
    setAddSuccess(success);
  };
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <AddModal handleCallAgain={handleCallAgain} />
        <SearchValue />
      </div>
      <ProductTable showBtn addSuccess={addSuccess} />
    </div>
  );
}

export default ManageProduct;
