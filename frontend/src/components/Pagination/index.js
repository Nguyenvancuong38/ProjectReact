/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import styles from './index.module.scss';

// eslint-disable-next-line react/prop-types
function Pagination({ totalItems, itemsPerPage }) {
  const history = useHistory();
  const location = useLocation();
  const currentPageUrl = new URLSearchParams(location.search).get('currentPage') || 1;
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(currentPageUrl);
  }, [currentPageUrl]);

  const pushCurrentPageURL = () => {
    const parsed = queryString.parse(location.search);
    parsed.currentPage = currentPage;
    history.push({ search: `${queryString.stringify(parsed)}` });
  };

  useEffect(() => {
    pushCurrentPageURL();
  }, [currentPage]);

  const numberOfPages = [];
  for (
    let i = 1;
    i <= Math.ceil(totalItems / itemsPerPage);
    i += 1
  ) {
    numberOfPages.push(i);
  }
  const [arrOfCurrentPage, setArrOfCurrentPage] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...numberOfPages];

    if (numberOfPages.length >= 5) {
      if (currentPage === 1 && currentPage <= 2) {
        tempNumberOfPages = [1, 2, '...', numberOfPages.length];
      } else if (currentPage === 2) {
        tempNumberOfPages = [1, 2, 3, '...', numberOfPages.length];
      } else if (currentPage === 3 && numberOfPages.length > 5) {
        const sliced = numberOfPages.slice(0, 4);
        tempNumberOfPages = [...sliced, '...', numberOfPages.length];
      } else if (
        currentPage > 3 &&
        currentPage <= numberOfPages.length - 3
      ) {
        const sliced1 = numberOfPages.slice(
          currentPage - 2,
          currentPage
        );
        const sliced2 = numberOfPages.slice(
          currentPage,
          currentPage + 1
        );
        tempNumberOfPages = [
          1,
          '...',
          ...sliced1,
          ...sliced2,
          '...',
          numberOfPages.length,
        ];
      } else if (
        currentPage === numberOfPages.length - 2 &&
        numberOfPages.length > 5
      ) {
        const sliced3 = numberOfPages.slice(
          numberOfPages.length - 4,
          numberOfPages.length
        );
        tempNumberOfPages = [1, '...', ...sliced3];
      } else if (currentPage === numberOfPages.length - 1) {
        const sliced4 = numberOfPages.slice(
          numberOfPages.length - 3,
          numberOfPages.length
        );
        tempNumberOfPages = [1, '...', ...sliced4];
      } else if (currentPage === numberOfPages.length) {
        tempNumberOfPages = [
          1,
          '...',
          numberOfPages.length - 1,
          numberOfPages.length,
        ];
      }
    }

    setArrOfCurrentPage(tempNumberOfPages);
  }, [currentPage, totalItems]);

  return (
    <div className={styles.pagination}>
      {numberOfPages.length >= 2 && (
        <span
          className={
            currentPage === 1
              ? `${styles.page_item} ${styles.disable}`
              : styles.page_item
          }
          onClick={() => paginate((prev) => (prev === 1 ? prev : prev - 1))
          }
        >
          Prev
        </span>
      )}
      {arrOfCurrentPage.map((number, index) => (
        <span
          key={index}
          className={
            number === parseInt(currentPage, 10)
              ? `${styles.page_item} ${styles.highlight}`
              : styles.page_item
          }
          onClick={() => paginate(number)}
        >
          {number}
        </span>
      ))}
      {numberOfPages.length >= 2 && (
        <span
          className={
            currentPage === numberOfPages.length
              ? `${styles.page_item} ${styles.disable}`
              : styles.page_item
          }
          onClick={() =>
            paginate((prev) =>
              (prev === numberOfPages.length ? prev : prev + 1)
            )
          }
        >
          Next
        </span>
      )}
    </div>
  );
}

export default Pagination;
