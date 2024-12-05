import { quitTraining } from "../../../data.js";

export function ExitButton() {
  const element = document.createElement('button');
  element.innerText = 'Выход';
  element.addEventListener('click', quitTraining, { once: true });
  return element;
}