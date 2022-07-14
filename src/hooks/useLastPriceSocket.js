import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLastPrice } from '../store/lastPrice';

const LAST_PRICE_URL = 'wss://ws.btse.com/ws/futures';

function useLastParice() {
  const dispatch = useDispatch();
  const socket = useRef(null);
  const [readyState, setReadyState] = useState(0);

  useEffect(() => {
    () => socket?.current.close();
  }, []);

  useEffect(() => {
    if (readyState === 0) {
      initWebsocket();
    }

    if (readyState === 1) {
      socket.current.send(
        JSON.stringify({
          op: 'subscribe',
          args: ['tradeHistoryApi:BTCPFC']
        })
      );
    }
  }, [readyState]);

  const initWebsocket = () => {
    const ws = new WebSocket(LAST_PRICE_URL);

    ws.onopen = (event) => {
      setReadyState(event.target.readyState);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.topic === 'tradeHistoryApi') {
        dispatch(updateLastPrice({ ...message.data[0] }));
      }
    };

    ws.onclose = () => reconnect();

    ws.onerror = () => reconnect();

    socket.current = ws;
  };

  const reconnect = () => {
    console.log('websocket last price reconnect...');

    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }

    setReadyState(0);
  };
}

export default useLastParice;
