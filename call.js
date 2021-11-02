import { formatUrl, sanitizerInput, removeCity } from "./utils.js"
import { render, renderError } from "./render.js"

export async function getData(url) {
    let resp = await fetch(url)
    let data = await resp.json()
    return data
}

export async function callApi(inputValue) {
    const cityData = sanitizerInput(inputValue)
    const url = formatUrl(cityData) 
    if (cityData) {
        // console.log(cityData);
        try {
            const data = await getData(url)
            // console.log(data);
            render(data, cityData)
        } catch (error) {
            removeCity()
            // erro na resposta da API
            renderError()
        }
    } else {
        removeCity()
        // erro já tratado no frontend
        renderError()
    }
}