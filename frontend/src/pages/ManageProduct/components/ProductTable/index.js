/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCar } from '../../../../api';
import { OverLayContext } from '../../../../components/OverLay/provider';
import Pagination from '../../../../components/Pagination';
import ProductCard from '../../../../components/ProductCard';
import styles from './index.module.scss';

function ProductTable({ showCost, showBtn, addSuccess }) {
  const [carList, setCarList] = useState([]);
  const [totalCar, setTotalCar] = useState(0);
  const { search } = useLocation();

  const { setLoading } = useContext(OverLayContext);
  const currentPage = new URLSearchParams(search).get('currentPage');
  const cate = new URLSearchParams(search).get('cate');
  const sup = new URLSearchParams(search).get('sup');
  const searchValue = new URLSearchParams(search).get('searchValue');
  // const pageSize = new URLSearchParams(search).get('pageSize');

  const getCarList = async () => {
    setLoading(true);
    const dataGet = await getAllCar(cate, sup, searchValue, currentPage);
    setCarList(dataGet.data);
    setTotalCar(dataGet.total);
    setLoading(false);
  };

  useEffect(() => {
    getCarList();
  }, [currentPage, cate, sup, searchValue, addSuccess]);
  return (
    <div className={`container ${styles.container}`}>
      {(carList.length !== 0) ? (
        <div className={`row ${styles.product__list}`}>
          {carList.map((item, index) => (
            <ProductCard
              showCost={showCost}
              showBtn={showBtn}
              key={index}
              item={item}
              getCarList={getCarList}
            />
          ))}
        </div>
      ) : (
        <div className={`row ${styles.product__list}`}>
          <div className={styles.product__list_notFound}>
            <img className={styles.product__list_notFound_img} src="https://myaccount.academicit.co.uk/crm/modules/products/uploads/no-product.png" alt="No PRODUCT" />
          </div>
        </div>
      )}
      <Pagination
        totalItems={totalCar}
        itemsPerPage={6}
      />
    </div>
  );
}

export default ProductTable;
