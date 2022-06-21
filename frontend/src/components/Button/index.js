/* eslint-disable react/button-has-type */
/* eslint-disable object-curly-newline */
import React from 'react';
// eslint-disable-next-line react/prop-types
function ButtonCustom({ nameButton, className, onClick, type }) {
  return (
    <div>
      <button
        type={type}
        className={className}
        onClick={onClick}
      >
        {nameButton}
      </button>
    </div>
  );
}

export default ButtonCustom;
