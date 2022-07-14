import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderBookQuote from './components/OrderBookQuote';
import OrderBookLastPrice from './components/OrderBookLastPrice';

function OrderBookSellSection() {
  const quotes = useSelector((state) => state.orderBook.asks);
  let total = 0;
  let accumulativeTotalSize = 0;

  // 最大size排序
  const quotesList = Object.keys(quotes).sort((a, b) => quotes[b] - quotes[a]);
  quotesList.forEach((key) => {
    total += +quotes[key];
  });

  return quotesList
    .slice(0, 8) // 取最大size 8筆
    .sort((a, b) => a - b) // 價錢排序
    .map((key) => {
      accumulativeTotalSize += +quotes[key];
      return (
        <OrderBookQuote
          key={key}
          price={key}
          size={quotes[key]}
          accumulativeTotalSize={accumulativeTotalSize}
          total={total}
        />
      );
    })
    .reverse();
}

function OrderBookBuySection() {
  const quotes = useSelector((state) => state.orderBook.bids);
  let total = 0;
  let accumulativeTotalSize = 0;

  // 最大size排序
  const quotesList = Object.keys(quotes).sort((a, b) => quotes[b] - quotes[a]);
  quotesList.forEach((key) => {
    total += +quotes[key];
  });

  return quotesList
    .slice(0, 8) // 取最大size 8筆
    .sort((a, b) => b - a) // 價錢排序
    .map((key) => {
      accumulativeTotalSize += +quotes[key];
      return (
        <OrderBookQuote
          key={key}
          price={key}
          size={quotes[key]}
          accumulativeTotalSize={accumulativeTotalSize}
          total={total}
          isBuy
        />
      );
    });
}

function OrderBook() {
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

        <OrderBookSellSection />
        <OrderBookLastPrice />
        <OrderBookBuySection />
      </div>
    </div>
  );
}

export default OrderBook;
