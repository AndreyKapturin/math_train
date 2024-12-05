export function OrderPosition(orderPosition) {
  const element = document.createElement('li');
  element.innerText = `${orderPosition.title} - ${orderPosition.quantity}`
  return element;
}