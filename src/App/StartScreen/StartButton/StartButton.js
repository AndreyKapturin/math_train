import { startTraining } from "../../../data.js"

export function StartButton() {
  const element = document.createElement('button');
  element.innerText = 'Начать тренировку';
  element.addEventListener('click', startTraining, { once: true });
  return element;
}
