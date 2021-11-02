import { makeListCards, putGeneralInfo } from "./constructors.js"

export function render(data, cityData) {
    putGeneralInfo(data, cityData)
    makeListCards(data, cityData)
    console.log("b");
}

export function renderError() {
    const cardsDiv = document.querySelector('#cardsDiv')
    const divError = document.createElement('div')
    divError.classList.add("divError")
    cardsDiv.appendChild(divError)
    divError.innerHTML = `
        <h1>OOOOPS!</h1>
        <h1>ALGO DEU ERRADO NA SUA BUSCA.</h1>
        <h3><span>status 500</span></h3>
        <h1>POR FAVOR, TENTE NOVAMENTE</h1>
        `
}