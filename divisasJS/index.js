const divisa = document.querySelector('.divisa')
const inputContainer = document.querySelector('.inputContainer')
const inputOne = document.getElementById('inputOne')
const resultInHTML = document.getElementById('resultInHTML')
const result = document.querySelector('.result')

divisa.addEventListener('mouseover', (e) => {
    let alturaMinima = inputOne.clientHeight
    inputContainer.style.height = `${alturaMinima}px`
    inputOne.focus()
})

divisa.addEventListener('mouseleave', (e) => {
    inputContainer.style.height = `0px`
})

let clearValue = null;


inputOne.addEventListener('input', (e) => {
    clearValue = inputOne.value.replace(/[,\.a-zA-Z]/g, '')
    calcularDato()
})


const divisaConversion = document.querySelector('.divisaConversion')
const seleccionarConversionModal = document.querySelector('.seleccionarConversionModal')

divisaConversion.addEventListener('click', () => {
    toggleModal()
})

const modal = document.querySelector('.modal')

document.addEventListener('click', (event) => {
    if (!modal.contains(event.target) && !divisaConversion.contains(event.target)) {
        disableModal()

    }
})



function toggleModal() {
    if (seleccionarConversionModal.classList.contains('hiddenModal')) {
        seleccionarConversionModal.classList.remove('hiddenModal')
        console.log(1)
    }
}
function disableModal() {
    console.log(2);
    seleccionarConversionModal.classList.add('hiddenModal')
}


const divisaCasilla = document.querySelectorAll('.divisaCasilla')
divisaCasilla.forEach(casilla => {
    casilla.addEventListener('mouseover', (event) => {

        divisaCasilla.forEach(casilla => {
            casilla.style.opacity = 0.4;
        })
        let casillaHovered = event.currentTarget;
        casillaHovered.style.opacity = 1;

    })
})

divisaCasilla.forEach(casilla => {
    casilla.addEventListener('mouseleave', () => {
        divisaCasilla.forEach(casilla => {
            casilla.style.opacity = 1;
        })
    })
})

const $conversionActual = document.getElementById('conversionActual')

let selectedExchangeRate = 0;


divisaCasilla.forEach(boton => {
    boton.addEventListener('click', (e) => {
        let botonClickeado = e.currentTarget;
        let botonClickeadoTexto = botonClickeado.querySelector('p')
        let posicionDelBoton = botonClickeadoTexto.className;
        console.log(posicionDelBoton)
        selectedExchangeRate = posicionDelBoton;
        let botonClickeadoTextoId = botonClickeadoTexto.id
        console.log(botonClickeadoTextoId)
        $conversionActual.textContent = botonClickeadoTexto.textContent;
        let banderaActual = document.getElementById('banderaActual')
        banderaActual.className = `fi fi-${botonClickeadoTextoId}`
        disableModal()
        calcularDato()

    })
})

const exchangeRates = [
    0.0018, // USD
    0.0023, // CAD
    0.031,  // MXN
    0.0015, // GBP
    0.0016, // EUR (France)
    0.0016, // EUR (Germany)
    0.0016, // EUR (Italy)
    0.0016, // EUR (Spain)
    0.0025, // AUD
    0.0091, // BRL
    0.0138,  // CNY
    0.150,  // INR
    0.25,   // JPY
    0.12    // RUB
];


function calcularDato() {
    if (clearValue > 0) {
        let f = clearValue * exchangeRates[selectedExchangeRate];
        resultInHTML.textContent = f.toFixed(2);
        result.style.opacity = 1;
    } else {
        result.style.opacity = 0;
    }
}