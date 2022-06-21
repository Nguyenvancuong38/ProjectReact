/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable eol-last */
/* eslint-disable indent */
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getAllCategory } from '../../../../api';
import styles from './index.module.scss';

function Category({ nameNav }) {
  const history = useHistory();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [activeObject, setActiveObject] = useState(null);

  const categoryURL = new URLSearchParams(location.search).get('cate') || 'Tất cả';

  const getCategories = async () => {
    const categoryList = await getAllCategory();
    categoryList.unshift('Tất cả');
    setCategories(categoryList);
  };

  const handleOnClick = (category) => {
    setActiveObject(category);
    const parsed = queryString.parse(location.search);
    parsed.cate = `${category}`;
    parsed.currentPage = 1;
    history.push({ search: `${queryString.stringify(parsed)}` });
  };
  const ToggleActive = (id) => {
    if (categories[id] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  };

  useEffect(() => {
    getCategories();
    // setCategories(categoryURL);
  }, []);

  useEffect(() => {
    setActiveObject(categoryURL);
  }, [categories, categoryURL]);

  return (
    <ul className={`nav flex-column ${styles.sideBar__list}`}>
      <li className="nav-item">
        <div className={`nav-link d-flex justify-content-between ${styles.color__black}`}>
          <span className="danhMuc">{nameNav}</span>
          <ArrowDropDownIcon />
        </div>
      </li>
      {
        categories.map((category, index) => (
          <li key={category} className="nav-item" onClick={() => handleOnClick(category)}>
            <div className={`nav-link ${styles.color__black} ${ToggleActive(index)}`}>
              {category}
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default Category;