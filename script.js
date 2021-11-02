import { callApi } from "./call.js"


const locationInput = document.querySelector('#locationInput')
locationInput.addEventListener('blur', () => {
    callApi(locationInput.value)
    locationInput.value = ''
})

