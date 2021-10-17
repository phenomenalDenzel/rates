import React from 'react';
import NumberFormat from 'react-number-format';

export const formateCurrency = value => {
  return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'₦'} />;
};
