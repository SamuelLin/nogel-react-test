import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderBook } from '../store/orderBook';

const ORDER_BOOK_URL = 'wss://ws.btse.com/ws/oss/futures';

function useOrderBookSocket() {
  const dispatch = useDispatch();
  const isSeqNumNotMatch = useSelector((state) => state.orderBook.error);
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
      subscribe();
    }
  }, [readyState]);

  useEffect(() => {
    if (isSeqNumNotMatch) {
      unSubscribe();
    }
  }, [isSeqNumNotMatch]);

  const initWebsocket = () => {
    const ws = new WebSocket(ORDER_BOOK_URL);

    ws.onopen = (event) => {
      setReadyState(event.target.readyState);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.topic === 'update:BTCPFC') {
        dispatch(
          updateOrderBook({ data: message.data, isSnapshot: message.data.type === 'snapshot' })
        );
      }

      // 重新訂閱
      if (message.event === 'unsubscribe') {
        console.log('socket unsubscribe');
        subscribe();
      }
    };

    ws.onclose = () => reconnect();

    ws.onerror = () => reconnect();

    socket.current = ws;
  };

  const reconnect = () => {
    console.log('websocket order book reconnect...');

    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }

    setReadyState(0);
  };

  const subscribe = () => {
    console.log('scoket subscribe');
    socket.current.send(
      JSON.stringify({
        op: 'subscribe',
        args: ['update:BTCPFC']
      })
    );
  };

  const unSubscribe = () => {
    socket.current.send(
      JSON.stringify({
        op: 'unsubscribe',
        args: ['update:BTCPFC']
      })
    );
  };
}

export default useOrderBookSocket;
