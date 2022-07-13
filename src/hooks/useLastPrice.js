import { useEffect } from 'react';

const LAST_PRICE_URL = 'wss://ws.btse.com/ws/futures';

function useLastParice() {
  useEffect(() => {
    initWebsocket();
  }, []);

  const initWebsocket = () => {
    const ws = new WebSocket(LAST_PRICE_URL);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: ['tradeHistoryApi:BTCPFC']
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
  };
}

export default useLastParice;
