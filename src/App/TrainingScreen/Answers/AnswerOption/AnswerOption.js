import { AnswerButton } from "./AnswerButton/AnswerButton.js";

export function AnswerOption(answer) {
  const element = document.createElement('li');
  
  element.append(
    AnswerButton(answer),
  );

  return element;
}