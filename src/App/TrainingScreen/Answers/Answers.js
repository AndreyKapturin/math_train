import { EVENTS, subscribe } from "../../../data.js";
import { AnswerOption } from "./AnswerOption/AnswerOption.js";

export function Answers() {
  const element = document.createElement('ul');
  element.className = 'answers-list';

  let unsubscribe = subscribe(EVENTS.QUESTION_CREATED, (payload) => {
    Answers.render(element, payload);
  });

  return element;
}

Answers.render = (element, props = {}) => {
  element.innerHTML = '';
  props.answerOptions.forEach(answer => {
    element.append( AnswerOption(answer) );
  });
}