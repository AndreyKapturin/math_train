import { EVENTS, subscribe } from "../../../data.js";
import { OrderPosition } from "./OrderPosition/OrderPosition.js";

export function Order() {
  const element = document.createElement('ul');
  let unsubscribe = subscribe(EVENTS.QUESTION_CREATED, (payload) => {
    Order.render(element, { order: payload.currentOrder });
  });

  return element;
}

Order.render = (element, props) => {
  element.innerHTML = '';

  props.order.forEach(position => {
    element.append( OrderPosition(position) );
  });
}