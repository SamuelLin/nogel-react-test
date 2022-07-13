import { useEffect } from 'react';

import OrderBook from './OrderBook';
import useLastParice from './hooks/useLastPrice';

function App() {
  useLastParice();

  return (
    <div>
      <OrderBook />
    </div>
  );
}

export default App;
