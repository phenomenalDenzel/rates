import React from 'react';
import './loader.scss';

export default function Loader(props) {
  return (
    <div className={`spinner-border loading ${props.color}`} role="status">
      <span className="sr-only"> Loading...</span>
    </div>
  );
}

Loader.defaultProps = {
  color: 'color',
};
