import { quitTraining } from "../../../data.js";

export function QuitButton() {
  const element = document.createElement('button');
  element.className = 'button quit-button'
  element.innerText = 'Выход';
  element.addEventListener('click', quitTraining, { once: true });
  return element;
}