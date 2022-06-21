/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import ProductCard from '../../components/ProductCard';
import { getCarById } from '../../api/index';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './index.module.scss';

function ProductDetail() {
  const [carItem, setCarItem] = useState({});
  const [carList, setCarList] = useState([]);

  const { search } = useLocation();
  const carId = new URLSearchParams(search).get('id') || '';
  const getACar = async (id) => {
    const { car, carRelate } = await getCarById(id);
    setCarItem(car);
    setCarList(carRelate);
  };

  useEffect(() => {
    getACar(carId);
  }, [carId]);

  return (
    <div className={styles.update_product_layout}>
      <div className={styles.container}>
        <Link className={styles.header} to="/danh-sach-sp">
          <ArrowBackIcon className={styles.header_icon} />
          Quay lại
        </Link>
        <div className={`row ${styles.content}`}>
          <div className={`col-4 ${styles.content_inform}`}>
            <h6 className={styles.content_inform_name}>{carItem.name}</h6>
            <p className={styles.content_inform_category}>Danh Mục: {carItem.typeCar}</p>
            <p className={styles.content_inform_category}>Hãng Sản Xuất: {carItem.supplier}</p>
            <p className={styles.content_inform_category}>Giá: {carItem.cost}</p>
            <p className={styles.content_inform_category}>Mô Tả Sản Phẩm:</p>
            <p className={styles.content_inform_category}>{carItem.description}</p>
          </div>
          <div className={`col-8 ${styles.content_img}`}>
            <Carousel
              showThumbs={false}
              showArrows={false}
              showStatus={false}
              autoPlay
              interval={2500}
            >
              {carItem.slide?.map((img, index) => (
                <div key={index}>
                  <img className={styles.slide_img} src={img} alt="slide1" />
                </div>
              ))}
            </Carousel>
            {/* <img className={styles.content_img_image} src={item.image} alt="anh xe" />
            <div className={styles.content_dot_list}>
              <div className={`${styles.content_dot_item} ${styles.active}`}></div>
              <div className={styles.content_dot_item}></div>
              <div className={styles.content_dot_item}></div>
            </div> */}
          </div>
        </div>
        <div className={styles.footer}>
          <h6 className={styles.footer_heading}>Gợi ý cho bạn:</h6>
          <div className={`row ${styles.footer_list}`}>
            {carList.map((item, indexs) => (
              <ProductCard showCost item={item} key={indexs} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
