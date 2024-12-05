import { StartScreen } from "./StartScreen/StartScreen.js";
import { EVENTS, getStatus, STATUSES, subscribe } from "../data.js";
import { TrainingScreen } from "./TrainingScreen/TrainingScreen.js";

export function App() {
  const element = document.createElement('div');
  element.className = 'app';

  subscribe(EVENTS.STATUS_CHANGED, (payload) => {
    App.render(element, { appStatus: payload.status });
  })

  const appStatus = getStatus();
  App.render(element, { appStatus })
  return element;
}

App.render = (element, props = {}) => {
  element.innerHTML = '';

  switch (props.appStatus) {
    case STATUSES.IDLE:
      element.append(
        StartScreen()
      );
      break;

    case STATUSES.IN_PROCESS:
      element.append(
        TrainingScreen(),
      );
      break;

    default:
      element.append('Неизвестный статус')
      break;
  }
}