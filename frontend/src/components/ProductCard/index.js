/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable eol-last */
import { Link } from 'react-router-dom';
import ButtonCustom from '../Button';
import ModalConfirm from '../ModalConfirm';
import styles from './index.module.scss';

function ProductCard({ item, showBtn, showCost, getCarList }) {
  return (
    <div className={`col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 ${styles.product__list__item}`}>
      <Link className={styles.product__list__container} to={`/chi-tiet-sp?id=${item.id}`}>
        <div className={styles.product_list__content}>
          <img className={styles.product__image} src={item.thumbnail} alt="igm_car" />
          <p className={styles.product__list__name}>{item.name}</p>
          {showCost && <p className={styles.product__list__cost}>{item.cost}</p>}
        </div>
      </Link>
      {showBtn && (
        <div className={styles.product_button}>
          <Link className={styles.product_button_update} to={`/cap-nhat-san-pham?id=${item.id}`}>
            <ButtonCustom nameButton="Cập nhật" className="btn btn-success fix_width noPadding_left_right" />
          </Link>
          <div className={styles.product_button_delete}>
            <ModalConfirm idItem={item.id} getCarList={getCarList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
