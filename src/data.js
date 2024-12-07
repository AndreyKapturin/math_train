const _settings = {
  goodsCountRange: {
    min: 1,
    max: 3,
  },
  orderPositionsCountRange: {
    min: 1,
    max: 3,
  },
  debounceBetweenQuestionsInMilliseconds: 1000,
}

export const STATUSES = {
  IDLE: 'IDLE',
  IN_PROCESS: 'IN_PROCESS',
}

export const EVENTS = {
  QUESTION_CREATED: 'QUESTION_CREATED',
  STATUS_CHANGED: 'STATUS_CHANGED',
  ANSWER_CHECKED: 'ANSWER_CHECKED',
}

const _state = {
  status: STATUSES.IDLE,
  currentOrder: null,
  answerOptions: null,
  correctAnswer: null,
}

const observers = {};

export function subscribe(eventName, subscriberCallback) {
  if (observers[eventName]) {
    observers[eventName].push(subscriberCallback)
  } else {
    observers[eventName] = [subscriberCallback];
  }

  return () => {
    observers[eventName] = observers[eventName].filter(cb => cb !== subscriberCallback);
  }
}

function _notify(eventName, payload = {}) {
  const eventCallbacks = observers[eventName];

  if (!eventCallbacks) {
    console.warn('Нет подписчиков')
    return;
  }

  eventCallbacks.forEach(cb => cb(payload));
}

export function getStatus() {
  return _state.status;
}

export function getCurrentOrder() {
  return _state.currentOrder;
}

export function getAnswerOptions() {
  return _state.answerOptions;
}

function _getCorrectAnswer() {
  return _state.correctAnswer;
}

function _getGoodsCountRange() {
  return _settings.goodsCountRange;
}

function _getOrderPositionsCountRange() {
  return _settings.orderPositionsCountRange;
}

const _goods = [
  {
    title: 'Dallas',
    price: 200,
  },
  {
    title: 'Mifare',
    price: 400,
  },
  {
    title: 'Ultralight',
    price: 500,
  },
  {
    title: 'Английский простой',
    price: 150,
  },
  {
    title: 'Английский двусторонний',
    price: 200,
  },
  {
    title: 'Финский',
    price: 200,
  },
  {
    title: 'Аблой',
    price: 200,
  },
  {
    title: 'Вертикал',
    price: 350,
  },
  {
    title: 'Гаражный',
    price: 450,
  },
  {
    title: 'Автомобильный металлический',
    price: 350,
  },
  {
    title: 'Автомобильный пластиковый',
    price: 500,
  },
  {
    title: 'Автомобильный с логотипом',
    price: 650,
  },
  {
    title: 'Автомобильный вертикальный',
    price: 1000,
  },
  {
    title: 'Кольцо большое',
    price: 50,
  },
  {
    title: 'Бирка',
    price: 50,
  },
  {
    title: 'Кольцо маленькое',
    price: 20,
  },
]

function _getGoods() {
  return _goods;
}

function _createOrder() {
  const goodsCountRange = _getGoodsCountRange();
  const { min, max } = _getOrderPositionsCountRange();
  const orderPositionsCount = _getRandomIntegerFromRange(min, max);

  const order = [];

  for (let i = 0; i < orderPositionsCount; i++) {
    let flag = true;
    let randomGoods = null;
    
    while (flag) {
      randomGoods = _getRandomGoods();

      if (!_orderHasGoods(order, randomGoods)) {
        flag = false
      }
    }

    randomGoods.quantity = _getRandomIntegerFromRange(goodsCountRange.min, goodsCountRange.max);
    order.push(randomGoods);
  }
  return order;
}

function _orderHasGoods(order, goods) {
  return Boolean(order.find(g => g.title === goods.title))
}

function _getRandomGoods() {
  const goods = _getGoods();
  const goodsRandomIndex = _getRandomIntegerFromRange(0, goods.length - 1);
  return goods[goodsRandomIndex];
}

function _getRandomIntegerFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _createQuestion() {
  _state.currentOrder = _createOrder();
  _state.answerOptions = _createAnswerOptions(_state.currentOrder);
  _notify(EVENTS.QUESTION_CREATED, {
    currentOrder: _state.currentOrder,
    answerOptions: _state.answerOptions,
  });
}

function _nextQuestion() {
  setTimeout(() => {
    _createQuestion();
  }, _settings.debounceBetweenQuestionsInMilliseconds);
}

export function setAnswer(userAnswer) {
  const isCorrectAnswer = _checkAnswer(userAnswer);
  _notify(EVENTS.ANSWER_CHECKED, { isCorrectAnswer });
  _nextQuestion();
}

function _checkAnswer(userAnswer) {
  const correctAnswer = _getCorrectAnswer();
  return userAnswer === correctAnswer;
}

function _createAnswerOptions(order) {
  const answerOptions = [];
  const correctAnswer = order.reduce((s, g) => s + g.price * g.quantity, 0);
  _state.correctAnswer = correctAnswer;

  for (let i = 0; i < 3; i++) {
    let defacedAnswer = null;
    let flag = true;

    while(flag) {
      defacedAnswer = _getDefacedAnswer(correctAnswer);
      flag = _checkInvalidDefacedAnswer(answerOptions, defacedAnswer);
    }

    answerOptions.push( defacedAnswer );
  }

  function _checkInvalidDefacedAnswer(answerOptions, defacedAnswer) {
    const hasBeenAdded = answerOptions.includes(defacedAnswer);
    const isOutOfRange = defacedAnswer <= 0;
    return hasBeenAdded || isOutOfRange;
  }

  const randomIndex = _getRandomIntegerFromRange(0, answerOptions.length - 1);
  answerOptions[randomIndex] = correctAnswer;

  return answerOptions;
}

function _getDefacedAnswer(correctAnswer) {
  const admixture = [20, 50, 100, 150, 200][_getRandomIntegerFromRange(0, 4)];
  return Math.random() > 0.5 ? correctAnswer - admixture : correctAnswer + admixture;
}

export function startTraining() {
  _state.status = STATUSES.IN_PROCESS;
  _notify(EVENTS.STATUS_CHANGED, {
    status: _state.status,
  });
  _createQuestion();
}

export function quitTraining() {
  _state.status = STATUSES.IDLE;
  _notify(EVENTS.STATUS_CHANGED, {
    status: _state.status,
  });
} 