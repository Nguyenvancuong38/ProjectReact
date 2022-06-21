import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

function Header() {
  const [array, setArray] = useState({
    routes: [
      {
        id: 0,
        to: 'danh-sach-sp',
        name: 'SẢN PHẨM',
      },
      {
        id: 1,
        to: 'quan-ly-sp',
        name: 'QUẢN LÝ SẢN PHẨM',
      },
    ],
    activeObject: null,
  });
  const handleOnClick = (id) => {
    setArray({ ...array, activeObject: array.routes[id] });
  };
  const ToggleActive = (id) => {
    if (array.routes[id] === array.activeObject) {
      return `${styles.active}`;
    }
    return '';
  };

  const pathnameURL = useLocation().pathname;

  useEffect(() => {
    if (pathnameURL === '/quan-ly-sp') {
      handleOnClick(1);
    }
    if (pathnameURL === '/danh-sach-sp' || pathnameURL === '/') {
      handleOnClick(0);
    }
  }, [pathnameURL]);
  return (
    <div className={styles.header}>
      <div className={styles.header_heading}>
        <div className={styles.header__logo}>
          <svg
            className={styles.header__logo_img}
            width={34}
            height={34}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width={34} height={34} fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
              >
                <use xlinkHref="#image0_39_1606" transform="scale(0.0121951)" />
              </pattern>
              <image
                id="image0_39_1606"
                width={82}
                height={82}
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>

          <svg
            width={96}
            height={33}
            viewBox="0 0 96 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5723 32.096C26.0923 32.096 25.6443 32.064 25.2283 32C24.8123 31.968 24.4603 31.936 24.1723 31.904L6.84431 8.24L7.56431 7.712V29.984L7.18031 28.4L11.8843 29.36C11.8843 29.872 11.8203 30.336 11.6923 30.752C11.5643 31.168 11.3243 31.584 10.9723 32H0.412313C0.412313 31.296 0.476313 30.736 0.604313 30.32C0.764313 29.872 0.956313 29.616 1.18031 29.552L4.92431 28.544L4.15631 30.224V3.392L5.06831 4.832L0.412313 3.872C0.412313 3.328 0.476313 2.864 0.604313 2.48C0.732313 2.064 0.972313 1.648 1.32431 1.232H9.05231L27.6763 26.576L25.6603 27.2V3.296L25.9963 4.832L21.2923 3.872C21.2923 3.328 21.3563 2.864 21.4843 2.48C21.6123 2.064 21.8683 1.648 22.2523 1.232H32.8123C32.8123 1.936 32.7483 2.512 32.6203 2.96C32.4923 3.376 32.3003 3.616 32.0443 3.68L28.2523 4.688L29.0683 3.104V30.656C29.0683 30.976 28.9083 31.248 28.5883 31.472C28.2683 31.696 27.9003 31.856 27.4843 31.952C27.1003 32.048 26.7963 32.096 26.5723 32.096ZM51.7074 32.576C48.6674 32.576 46.0114 31.968 43.7394 30.752C41.4674 29.504 39.6914 27.776 38.4114 25.568C37.1634 23.328 36.5394 20.752 36.5394 17.84C36.5394 15.344 36.9714 13.056 37.8354 10.976C38.7314 8.864 39.9474 7.04 41.4834 5.504C43.0514 3.936 44.8914 2.72 47.0034 1.856C49.1474 0.991999 51.4674 0.559999 53.9634 0.559999C55.7234 0.559999 57.4034 0.767999 59.0034 1.184C60.6034 1.568 62.0114 2.144 63.2274 2.912L62.2674 10.544C61.5314 10.544 60.9394 10.464 60.4914 10.304C60.0434 10.144 59.7874 9.936 59.7234 9.68L59.1954 4.88L60.3474 6.512C59.4834 5.744 58.3794 5.152 57.0354 4.736C55.6914 4.288 54.2834 4.064 52.8114 4.064C50.8274 4.064 49.0994 4.544 47.6274 5.504C46.1874 6.464 45.0834 7.856 44.3154 9.68C43.5474 11.504 43.1634 13.68 43.1634 16.208C43.1634 18.832 43.5634 21.12 44.3634 23.072C45.1634 24.992 46.2674 26.48 47.6754 27.536C49.1154 28.592 50.8114 29.12 52.7634 29.12C54.3314 29.12 55.8034 28.8 57.1794 28.16C58.5554 27.52 59.6114 26.672 60.3474 25.616L59.1954 27.968L59.9154 20.816C60.8754 20.816 61.5474 20.88 61.9314 21.008C62.3474 21.104 62.6354 21.28 62.7954 21.536L63.1794 28.64C61.9954 29.856 60.3474 30.816 58.2354 31.52C56.1554 32.224 53.9794 32.576 51.7074 32.576ZM83.5356 32.576C80.4956 32.576 77.8396 31.968 75.5676 30.752C73.2956 29.504 71.5196 27.776 70.2396 25.568C68.9916 23.328 68.3676 20.752 68.3676 17.84C68.3676 15.344 68.7996 13.056 69.6636 10.976C70.5596 8.864 71.7756 7.04 73.3116 5.504C74.8796 3.936 76.7196 2.72 78.8316 1.856C80.9756 0.991999 83.2956 0.559999 85.7916 0.559999C87.5516 0.559999 89.2316 0.767999 90.8316 1.184C92.4316 1.568 93.8396 2.144 95.0556 2.912L94.0956 10.544C93.3596 10.544 92.7676 10.464 92.3196 10.304C91.8716 10.144 91.6156 9.936 91.5516 9.68L91.0236 4.88L92.1756 6.512C91.3116 5.744 90.2076 5.152 88.8636 4.736C87.5196 4.288 86.1116 4.064 84.6396 4.064C82.6556 4.064 80.9276 4.544 79.4556 5.504C78.0156 6.464 76.9116 7.856 76.1436 9.68C75.3756 11.504 74.9916 13.68 74.9916 16.208C74.9916 18.832 75.3916 21.12 76.1916 23.072C76.9916 24.992 78.0956 26.48 79.5036 27.536C80.9436 28.592 82.6396 29.12 84.5916 29.12C86.1596 29.12 87.6316 28.8 89.0076 28.16C90.3836 27.52 91.4396 26.672 92.1756 25.616L91.0236 27.968L91.7436 20.816C92.7036 20.816 93.3756 20.88 93.7596 21.008C94.1756 21.104 94.4636 21.28 94.6236 21.536L95.0076 28.64C93.8236 29.856 92.1756 30.816 90.0636 31.52C87.9836 32.224 85.8076 32.576 83.5356 32.576Z"
              fill="white"
            />
          </svg>
        </div>

        {
          array.routes.map((route) => (
            <Link
              key={route.id}
              className={`nav-link ${styles.header__product} ${ToggleActive(route.id)}`}
              to={route.to}
              onClick={() => handleOnClick(route.id)}
            >
              {route.name}
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Header;
