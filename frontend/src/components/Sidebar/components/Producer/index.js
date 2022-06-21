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
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllProducer } from '../../../../api';
import styles from './index.module.scss';

function Producer({ nameNav }) {
  const [producers, setProducers] = useState([]);
  const [activeObject, setActiveObject] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const producerURL = new URLSearchParams(location.search).get('sup') || 'Tất cả';

  const getProducers = async () => {
    const producerList = await getAllProducer();
    producerList.unshift('Tất cả');
    setProducers(producerList);
  };

  const handleOnClick = (producer) => {
    setActiveObject(producer);
    const parsed = queryString.parse(location.search);
    parsed.sup = `${producer}`;
    parsed.currentPage = 1;
    history.push({ search: `${queryString.stringify(parsed)}` });
  };
  const ToggleActive = (id) => {
    if (producers[id] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  };

  useEffect(() => {
    getProducers();
  }, []);

  useEffect(() => {
    setActiveObject(producerURL);
  }, [producers, producerURL]);

  return (
    <ul className={`nav flex-column ${styles.sideBar__list}`}>
      <li className="nav-item">
        <div className={`nav-link d-flex justify-content-between ${styles.color__black}`}>
          <span className="danhMuc">{nameNav}</span>
          <ArrowDropDownIcon />
        </div>
      </li>
      {
        producers.map((producer, index) => (
          <li key={producer} className="nav-item" onClick={() => handleOnClick(producer)}>
            <div className={`nav-link ${styles.color__black} ${ToggleActive(index)}`}>
              {producer}
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default Producer;