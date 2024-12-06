import { Answers } from "./Answers/Answers.js";
import { QuitButton } from "./QuitButton/QuitButton.js";
import { Notifications } from "./Notifications/Notifications.js";
import { Order } from "./Order/Order.js";
import { OrderHeading } from "./OrderHeading/OrderHeading.js";

export function TrainingScreen() {
  const element = document.createElement('section');
  element.className = 'training-screen';

  element.append(
    OrderHeading(),
    Order(),
    Notifications(),
    Answers(),
    QuitButton(),
  );

  return element;
}
