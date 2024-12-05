import { Answers } from "./Answers/Answers.js";
import { ExitButton } from "./ExitButton/ExitButton.js";
import { Notifications } from "./Notifications/Notifications.js";
import { Order } from "./Order/Order.js";

export function TrainingScreen() {
  const element = document.createElement('section');
  element.className = 'training-screen';

  element.append(
    ExitButton(),
    Order(),
    Answers(),
    Notifications(),
  );

  return element;
}
