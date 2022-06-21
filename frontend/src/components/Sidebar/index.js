/* eslint-disable arrow-body-style */
// import { useEffect } from 'react';
import styles from './index.module.scss';
// import { getSidebar } from '../../api/index';
import Category from './components/Category';
import Producer from './components/Producer';

function SideBar() {
  // const getAllSidebar = async (currentTypeCar) => {
  //   // const { typeCar, producer } =
  //   await getSidebar(currentTypeCar);
  //   // console.log(typeCar);
  //   // console.log(producer);
  //   // categoryList.unshift('Tất cả');
  //   // setCategories(categoryList);
  // };

  // useEffect(() => {
  //   getAllSidebar('');
  // });

  return (
    <div className={styles.sidebar}>
      <div className={styles.boder__bottom}>
        <Category nameNav="Danh Mục" />
      </div>
      <Producer nameNav="Hãng Sản Xuất" />
    </div>
  );
}

export default SideBar;
