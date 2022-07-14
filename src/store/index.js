import { configureStore } from '@reduxjs/toolkit';
import lastPriceReducer from './lastPrice';
import orderBookReducer from './orderBook';

export default configureStore({
  reducer: {
    lastPrice: lastPriceReducer,
    orderBook: orderBookReducer
  }
});
