import { numberWithCommas } from '../utils';
import { ReactComponent as Arrow } from '../assets/IconArrowDown.svg';

function OrderBookLastPrice() {
  return (
    <div className="last-price up">
      {numberWithCommas(21657.5)}
      <Arrow className="last-price__icon" width="15" height="15" />
    </div>
  );
}

export default OrderBookLastPrice;
