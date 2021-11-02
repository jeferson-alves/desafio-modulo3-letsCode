import { amenitiesDict } from "./dicts.js"
import { maskPrice, removeCity } from "./utils.js"

export function makeCitiesInput(cityData) {
    const searchs = document.querySelector('#searchs')
    searchs.innerHTML = ''

    const divElements3 = document.createElement('ul')
    divElements3.innerHTML = ''
    divElements3.classList.add("citySelected")
    searchs.appendChild(divElements3)

    const cityNameElement3 = document.createElement('li')
    cityNameElement3.innerText = `${cityData.cityRender} - ${cityData.state.toUpperCase()}`
    divElements3.appendChild(cityNameElement3)

    const btnClose = document.createElement('div')
    btnClose.innerText ='X'
    divElements3.appendChild(btnClose)
    btnClose.addEventListener('click', () => removeCity())
}

export function makeDivCity(cityData) {
    const divCity = document.querySelector('#divCity')
    divCity.innerHTML = ''
    const divElements = document.createElement('div')
    divElements.classList.add("cityElement")
    divCity.appendChild(divElements)

    const cityNameElement = document.createElement('p')
    cityNameElement.innerText = `${cityData.cityRender} - ${cityData.state.toUpperCase()}`
    divElements.appendChild(cityNameElement)

    const closeCityElement = document.createElement('div')
    closeCityElement.classList.add("cityElementClose")
    closeCityElement.innerText = 'x'
    divElements.appendChild(closeCityElement)
    closeCityElement.addEventListener('click', () => removeCity())
}

export function makeListCards(data, cityData) {
    const result = data.search.result.listings
    const cardsDiv = document.querySelector('#cardsDiv')
    cardsDiv.innerHTML = ''

    result.forEach(element => makeCard(element, cityData))
}

export function makeCard(item, cityData) {
    const cardsDiv = document.querySelector('#cardsDiv')
    
    const card = document.createElement('div')
    card.classList.add("card")
    cardsDiv.appendChild(card)

    const imgDiv = document.createElement('div')
    imgDiv.classList.add("imgDiv")
    card.appendChild(imgDiv)

    const imgCard = document.createElement('img')
    imgCard.classList.add("imgCard")
    imgCard.src = item.medias[0].url
    imgDiv.appendChild(imgCard)

    const divCardRight = document.createElement('div')
    divCardRight.classList.add("divCardRight")
    card.appendChild(divCardRight)

    const infoCardDiv = document.createElement('div')
    infoCardDiv.classList.add("infoCardDiv")
    divCardRight.appendChild(infoCardDiv)

    const address = document.createElement('p')
    address.classList.add("address")
    infoCardDiv.appendChild(address)
    address.innerText = `${item.link.data.street}, ${item.link.data.streetNumber} - ${item.link.data.neighborhood},  ${item.link.data.city} - ${cityData.state.toUpperCase()}`

    const name = document.createElement('p')
    name.classList.add("name")
    infoCardDiv.appendChild(name)
    name.innerText = `${item.link.name}`

    const detailsUl = document.createElement('ul')
    detailsUl.classList.add("detailsUl")
    infoCardDiv.appendChild(detailsUl)

    makeDetails(item, detailsUl)

    const amenitiesUl = document.createElement('ul')
    amenitiesUl.classList.add("amenitiesUl")
    infoCardDiv.appendChild(amenitiesUl)

    const amenities = item.listing.amenities
    amenities.forEach(element => makeAmenityItem(element, amenitiesUl))

    const priceDiv = document.createElement('div')
    priceDiv.classList.add("priceDiv")
    divCardRight.appendChild(priceDiv)
    makePriceItems(item, priceDiv)
}

export function makeAmenityItem(amenity, parent) {
    const amenityItem = document.createElement('li')
    amenityItem.classList.add("amenityItem")
    parent.appendChild(amenityItem)
    amenityItem.innerText = amenitiesDict[amenity] ? amenitiesDict[amenity] : amenity
}

export function makeDatailItem(detailValue, detailValueDesc, parent) {
    const detailItem = document.createElement('li')
    detailItem.classList.add("detailItem")
    parent.appendChild(detailItem)
    
    const value = document.createElement('span')
    detailItem.appendChild(value)
    if (!detailValue) {
        detailDesc.innerText = '-- '
    }
    value.innerText = `${detailValue} `

    const detailDesc = document.createElement('span')
    detailItem.appendChild(detailDesc)
    if (detailValue > 1 && detailValueDesc != `m\u{00B2}`) {
        detailDesc.innerText = `${detailValueDesc}s`
    } else {
        detailDesc.innerText = detailValueDesc
    }
    
}


export function makeDetails(item, parent) {
    makeDatailItem(item.listing.usableAreas, `m\u{00B2}`, parent)
    makeDatailItem(item.listing.bedrooms, 'Quarto', parent)
    makeDatailItem(item.listing.bathrooms, 'Banheiro', parent)
    makeDatailItem(item.listing.parkingSpaces, 'Vaga', parent)
}

export function makePriceItems(item, parent) {
    const price = document.createElement('p')
    price.classList.add("priceItem")
    parent.appendChild(price)
    price.innerText = `R$ ${maskPrice(item.listing.pricingInfos[0].price)}`

    if (item.listing.pricingInfos[0].monthlyCondoFee) {
        const condoFee = document.createElement('p')
        condoFee.classList.add("condoFee")
        parent.appendChild(condoFee)
        condoFee.innerText = `Condomínio: `
        const condoFeeValue = document.createElement('span')
        condoFee.appendChild(condoFeeValue)
        condoFeeValue.innerText = `R$ ${maskPrice(item.listing.pricingInfos[0].monthlyCondoFee)}`
    }
}

export function putGeneralInfo(data, cityData) {
    const generalInfoDiv = document.querySelector("#generalInfoDiv")
    generalInfoDiv.innerHTML = ''

    if (!data) {
        return undefined
    }

    const result = data.search.result.listings
    const numberItems = document.createElement('h1')
    numberItems.innerText = result.length
    generalInfoDiv.appendChild(numberItems)

    const phraseGeneral = document.createElement('h1')
    if (result.length === 1) {
        phraseGeneral.innerHTML = `imóvel a venda em ${cityData.cityRender}`

    } else {
        phraseGeneral.innerHTML = `imóveis à venda em ${cityData.cityRender}`
    }
    generalInfoDiv.appendChild(phraseGeneral)
    makeDivCity(cityData)
    makeCitiesInput(cityData)
}