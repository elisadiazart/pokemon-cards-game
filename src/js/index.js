// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
import { sayHello } from './demo.js';

const cards = document.querySelectorAll('.card')

sayHello();

const starGame = allCards => {
    allCards.forEach(card => card.classList.add('card--show'))
}

const starGameSecondPhase = allCards => {
    allCards.forEach(card => card.classList.remove('card--show'))
}

const timeoutStarGame = setTimeout(() => {
    starGame(cards)
    clearTimeout(timeout)
}, 100)

const timeoutSecond = setTimeout(() => {
    starGameSecondPhase(cards)
    clearTimeout(timeout)
}, 3000)