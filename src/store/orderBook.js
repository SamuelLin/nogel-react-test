import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  asks: {},
  bids: {},
  bestAsk: '', // 最小sell price
  bestBid: '', // 最大buy price
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
          state.bestAsk = asks[asks.length - 1][0];
          state.bestBid = bids[0][0];
        } else {
          asks.forEach(([price, size]) => {
            if (size === '0') {
              delete state.asks[price];
              if (price === state.bestAsk) state.bestAsk = '';
            } else {
              state.asks[price] = size;
              if (price < state.bestAsk) state.bestAsk = price;
            }
          });

          if (state.bestAsk === '') {
            const stateAsks = Object.keys(state.asks).sort((a, b) => a - b);
            state.bestAsk = stateAsks[0];
          }

          bids.forEach(([price, size]) => {
            if (size === '0') {
              delete state.bids[price];
              if (price === state.bestBid) state.bestBid = '';
            } else {
              state.bids[price] = size;
              if (price > state.bestBid) state.bestBid = price;
            }
          });

          if (state.bestBid === '') {
            const stateBids = Object.keys(state.bids).sort((a, b) => b - a);
            state.bestBid = stateBids[0];
          }

          if (state.bestBid >= state.bestAsk) {
            console.log(`best bid(${state.bestBid}) >= best ask(${state.bestAsk})`);
            state.error = true;
          }
        }
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateOrderBook } = orderBookSlice.actions;

export default orderBookSlice.reducer;
