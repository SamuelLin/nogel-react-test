import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  symbol: '',
  side: '',
  size: 0,
  price: 0,
  tradedId: '',
  timestamp: ''
};

export const lastPriceSlice = createSlice({
  name: 'lastPrice',
  initialState: { ...defaultState },
  reducers: {
    updateLastPrice: (state, action) => {
      const { symbol, side, size, price, tradedId, timestamp } = action.payload;
      state.symbol = symbol;
      state.side = side;
      state.size = size;
      state.price = price;
      state.tradedId = tradedId;
      state.timestamp = timestamp;
    },
    resetLastPrice: (state) => {
      state = { ...defaultState };
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateLastPrice, resetLastPrice } = lastPriceSlice.actions;

export default lastPriceSlice.reducer;
