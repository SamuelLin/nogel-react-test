import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../utils';

const MemorizeQuotoPrice = memo(function QuotePrice({ price }) {
  return <div className="flex1 quote_price">{numberWithCommas(price)}</div>;
});

MemorizeQuotoPrice.propTypes = {
  price: PropTypes.string.isRequired
};

const MemorizeQuotoSize = memo(function QuoteSize({ size, state }) {
  return <div className={`flex2 quote_size` + ` ${state}`}>{numberWithCommas(size)}</div>;
});

MemorizeQuotoSize.propTypes = {
  size: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};

function OrderBookQuote({ price, size, isBuy, accumulativeTotalSize, total }) {
  const quoteClassName = isBuy ? 'quote buy' : 'quote sell';
  const prevSize = useRef('');
  let sizeState = '';

  if (prevSize.current) {
    if (size > prevSize.current) {
      sizeState = 'buy';
    } else if (size < prevSize.current) {
      sizeState = 'sell';
    } else {
      sizeState = '';
    }
  }

  prevSize.current = size;

  return (
    <div className={quoteClassName}>
      <MemorizeQuotoPrice price={price} />
      <MemorizeQuotoSize key={size} size={size} state={sizeState} />
      <div className="flex3">
        {numberWithCommas(accumulativeTotalSize)}
        <div
          className="quoto__bar"
          style={{ width: `${Math.floor((accumulativeTotalSize / total) * 100)}%` }}></div>
      </div>
    </div>
  );
}

OrderBookQuote.propTypes = {
  price: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  accumulativeTotalSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isBuy: PropTypes.bool
};

export default OrderBookQuote;
