import { startTraining } from "../../../data.js"

export function StartButton() {
  const element = document.createElement('button');
  element.innerText = 'Начать тренировку';
  element.className = 'button start-button';
  element.addEventListener('click', startTraining, { once: true });
  return element;
}
