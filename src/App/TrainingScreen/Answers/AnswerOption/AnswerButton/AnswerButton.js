import { setAnswer } from "../../../../../data.js";

export function AnswerButton(answer) {
  const element = document.createElement('button');
  element.className = 'button answer-button';
  element.innerText = answer;
  element.addEventListener('click', () => setAnswer(answer), { once: true });
  return element;
}