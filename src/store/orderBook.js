import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  bids: {},
  asks: {},
  seqNum: '',
  prevSeqNum: '',
  timestamp: '',
  error: false
};

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: { ...defaultState },
  reducers: {
    updateOrderBook: (state, action) => {
      const { data, isSnapshot } = action.payload;
      const { bids, asks, seqNum, prevSeqNum, timestamp } = data;

      if (!isSnapshot && state.seqNum !== prevSeqNum) {
        state.error = true;
      } else {
        state.error = false;
        state.seqNum = seqNum;
        state.prevSeqNum = prevSeqNum;
        state.timestamp = timestamp;

        if (isSnapshot) {
          const asksObj = asks.reduce((acc, b) => {
            acc[b[0]] = b[1];
            return acc;
          }, {});

          const bidsObj = bids.reduce((acc, b) => {
            acc[b[0]] = b[1];
            return acc;
          }, {});

          state.asks = asksObj;
          state.bids = bidsObj;
        } else {
          asks.forEach(([price, size]) => {
            if (size === '0') {
              delete state.asks[price];
            } else {
              state.asks[price] = size;
            }
          });

          bids.forEach(([price, size]) => {
            if (size === '0') {
              delete state.bids[price];
            } else {
              state.bids[price] = size;
            }
          });
        }
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateOrderBook } = orderBookSlice.actions;

export default orderBookSlice.reducer;
