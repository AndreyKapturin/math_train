import { EVENTS, subscribe } from "../../../data.js";

export function Notifications() {
  const element = document.createElement('article');

  subscribe(EVENTS.ANSWER_CHECKED, (payload) => {
    Notifications.render(element, 
      { message: payload.isCorrectAnswer ? 'Верно' : 'Неверно' }
    );
  })

  subscribe(EVENTS.QUESTION_CREATED, () => {
    Notifications.render(element, 
      { message: 'Выберите вариант ответа:'}
    );
  })

  return element;
}

Notifications.render = (element, props = {}) => {
  element.innerHTML = '';
  element.innerText = props.message;
}