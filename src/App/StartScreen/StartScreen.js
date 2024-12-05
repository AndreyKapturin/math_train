import { StartButton } from "./StartButton/StartButton.js";

export function StartScreen() {
  const element = document.createElement('section');
  element.className = 'start-screen';

  element.append(
    StartButton()
  );

  return element;
}
