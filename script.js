const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const listaBotoes = document.querySelectorAll('.app__card-button')

focoBt.addEventListener('click', () => {
    tempoDecoridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecoridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecoridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})



function alterarContexto(contexto){
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    listaBotoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML =  `Que tal dar uma respirada?, <br> 
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;    
    }
}