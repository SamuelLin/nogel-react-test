import OrderBook from './OrderBook';
import useLastPriceSocket from './hooks/useLastPriceSocket';
import useOrderBookSocket from './hooks/useOrderBookSocket';

function App() {
  useLastPriceSocket();
  useOrderBookSocket();

  return (
    <div>
      <OrderBook />
    </div>
  );
}

export default App;
