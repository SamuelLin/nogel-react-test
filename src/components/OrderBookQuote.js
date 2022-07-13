import PropTypes from 'prop-types';
import { numberWithCommas } from '../utils';

function OrderBookQuote({ price, size, isBuy }) {
  const quoteClassName = isBuy ? 'quote buy' : 'quote sell';

  return (
    <div className={quoteClassName}>
      <div className="flex1 quote_price">{numberWithCommas(price)}</div>
      <div className="flex2">{numberWithCommas(size)}</div>
      <div className="flex3">
        5,657
        <div className="quoto__bar"></div>
      </div>
    </div>
  );
}

OrderBookQuote.propTypes = {
  price: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  isBuy: PropTypes.bool
};

export default OrderBookQuote;
