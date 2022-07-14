import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../utils';
import { ReactComponent as Arrow } from '../assets/IconArrowDown.svg';

function OrderBookLastPrice() {
  const { price, side } = useSelector((state) => state.lastPrice);
  const prevPrice = useRef('');
  let state = '';

  if (price > prevPrice.current) {
    state = 'buy';
  } else if (price < prevPrice.current) {
    state = 'sell';
  } else {
    state = prevPrice.current === '' ? side.toLowerCase() : 'normal';
  }

  prevPrice.current = price;

  return (
    <div className={'last-price ' + state}>
      <span>{numberWithCommas(price.toFixed(1, 0))}</span>
      <Arrow className="last-price__icon" width="15" height="15" />
    </div>
  );
}

export default OrderBookLastPrice;
