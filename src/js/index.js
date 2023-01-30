// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
import { sayHello } from './demo.js';

const gameBoard = document.getElementById('game-board');
let firstCard;
let secondCard;

sayHello();

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const numbersArray = [];

const createCard = cardNumber => {
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.dataset.number = cardNumber;
  const cardFront = document.createElement('div');
  cardFront.classList.add('card__front');
  const cardImage = document.createElement('img');
  cardImage.src = `../assets/images/${cardNumber}.png`;
  cardFront.append(cardImage);
  const cardBack = document.createElement('div');
  cardBack.classList.add('card__back');
  newCard.append(cardFront, cardBack);
  gameBoard.append(newCard);
};

const createArray = () => {
  //EXPANDIR EL ARRAY DOS VECES PARA CREAR UN NUEVO ARRAY CON LOS NUMEROS REPETIDOS//
  if (numbersArray.length === 9 + 1) return [...numbersArray, ...numbersArray];
  const newNumber = generateRandomNumber(1, 150);
  if (!numbersArray.includes(newNumber)) {
    numbersArray.push(newNumber);
  }
  return createArray();
};

const shuffle = array => {
  const newArray = [...array];
  for (let i = newArray.length - 1, r; i; i--) {
    r = Math.floor(Math.random() * i);
    [newArray[i], newArray[r]] = [newArray[r], newArray[i]];
  }
  return newArray;
};

const allNumbers = createArray();
//DESORDENAR EL ARRAY REPETIDO//
const allNumbersShuffle = shuffle(allNumbers);

console.log(allNumbers);
console.log(allNumbersShuffle);

//RECORRES EL ARRAY PARA QUE CADA NUMERO SEA UNA CARTA, SE PASA EL DATO DEL NUMERO DEL ARRAY PARA HACER LA CARTA//
allNumbersShuffle.forEach(card => createCard(card));

const cards = document.querySelectorAll('.card');

const starGameFirstPhase = allCards => {
  allCards.forEach(card => card.classList.add('card--show'));
};

const starGameSecondPhase = allCards => {
  allCards.forEach(card => card.classList.remove('card--show'));
};

const timeoutStarGame = setTimeout(() => {
  starGameFirstPhase(cards);
  clearTimeout(timeoutStarGame);
}, 100);

const timeoutSecond = setTimeout(() => {
  starGameSecondPhase(cards);
  clearTimeout(timeoutSecond);
}, 2500);

const showCards = e => {
  if (!firstCard) {
    firstCard = e.target.parentElement;
    firstCard.classList.add('card--show');
  } else if (!secondCard) {
    secondCard = e.target.parentElement;
    secondCard.classList.add('card--show');
    secondCard.addEventListener('transitionend', () => checkCards(), {
      once: true
    });
  }
};

const checkCards = () => {
  if (firstCard && secondCard) {
    if (firstCard.dataset.number !== secondCard.dataset.number) {
      secondCard.classList.remove('card--show');
      firstCard.classList.remove('card--show');
    }
    firstCard = '';
    secondCard = '';
  }
};

gameBoard.addEventListener('click', e => {
  console.log(e.target)
  if(e.target.classList.contains('cards-board')) return
  showCards(e);
});
