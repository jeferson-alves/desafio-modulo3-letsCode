export function formatUrl(cityData) {
    const url = `https://private-9e061d-piweb.apiary-mock.com/venda?state=${cityData.state}&city=${cityData.city}`
    // const url = 'https://private-9e061d-piweb.apiary-mock.com/venda?state=rj&city=rio'
    return url
}

export function sanitizerInput(inputValue) {
    inputValue = inputValue.toLowerCase()
    inputValue = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const cities = {
        saoPaulo: {
            state: "sp",
            city: "sao-paulo",
            cityRender: "São Paulo"
        },
        rioDeJaneiro: {
            state: "rj",
            city: "rio-de-janeiro",
            cityRender: "Rio de Janeiro"
        }
    }
    if (inputValue === "sp" || inputValue === "sao paulo") {
        return cities.saoPaulo
    }
    if (inputValue === "rj" || inputValue === "rio de janeiro" || inputValue === "rio") {
        return cities.rioDeJaneiro
    }
    return ''
}

export function maskPrice(value) {
    return new Intl.NumberFormat(['ban', 'id']).format(value)
}

export function removeCity() {
    const cardsDiv = document.querySelector('#cardsDiv')
    cardsDiv.innerHTML = ''
    const generalInfoDiv = document.querySelector("#generalInfoDiv")
    generalInfoDiv.innerHTML = ''
    const cardsDiv2 = document.querySelector('#divCity')
    cardsDiv2.innerHTML = ''
    const searchs2 = document.querySelector('#searchs')
    searchs2.innerHTML = ''
    const locationInput2 = document.querySelector('#locationInput')
    locationInput2.value = ''
}