import { useState } from 'react';
import OrderBookQuote from './components/OrderBookQuote';
import OrderBookLastPrice from './components/OrderBookLastPrice';

function OrderBook() {
  const [buyArray, setBuyArray] = useState([
    ['19742.0', '231'],
    ['19737.0', '541'],
    ['19732.0', '20'],
    ['19730.0', '1558'],
    ['19728.5', '1781'],
    ['19728.0', '2887'],
    ['19727.5', '1303'],
    ['19727.0', '2278'],
    ['19726.5', '3230'],
    ['19726.0', '1264']
  ]);
  const [sellArray, setSellArray] = useState([
    ['19827.5', '3675'],
    ['19825.5', '301'],
    ['19824.0', '3129'],
    ['19821.0', '2128'],
    ['19820.0', '7933'],
    ['19817.5', '1994'],
    ['19817.0', '7505'],
    ['19814.0', '9011'],
    ['19811.0', '7697'],
    ['19808.0', '5917']
  ]);

  return (
    <div className="order-book">
      <div className="order-book__header">
        <b>Order Book</b>
      </div>

      <div className="quote-table">
        <div className="quote-table__header">
          <div>Price (USD)</div>
          <div className="flex2">Size</div>
          <div className="flex3">Total</div>
        </div>

        {sellArray.map((quote) => {
          return <OrderBookQuote key={quote[0]} price={quote[0]} size={quote[1]} />;
        })}

        <OrderBookLastPrice />

        {buyArray.map((quote) => {
          return <OrderBookQuote key={quote[0]} price={quote[0]} size={quote[1]} isBuy />;
        })}
      </div>
    </div>
  );
}

export default OrderBook;
