const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const listaBotoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('./sons/luna-rise-part-one.mp3')
const startPauseTemporizadorBt = document.querySelector('#start-pause')
const iniciarouPausarBt = document.querySelector('#start-pause span')
const iniciarouPausarBtImagem = document.querySelector('#start-pause img')

const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const audioTempoPausado = new Audio('./sons/pause.mp3')
const audioTempoPlay = new Audio('./sons/play.wav')

let tempoDecoridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

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
    mostrarTempo()
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

const contagemRegressiva = () => {
    if(tempoDecoridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecoridoEmSegundos -= 1
    mostrarTempo()
    // console.log('Temporizador: ' + tempoDecoridoEmSegundos)
}

startPauseTemporizadorBt.addEventListener('click', iniciarOuPausarTemporizador)

function iniciarOuPausarTemporizador() {
    if(intervaloId){
        audioTempoPausado.play()
        zerar()
        return
    }
    audioTempoPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarouPausarBt.textContent = "Pausar"
    iniciarouPausarBtImagem.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarouPausarBt.textContent = "Começar"
    iniciarouPausarBtImagem.setAttribute('src', './imagens/play_arrow.png')

    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecoridoEmSegundos * 1000)
    const tempoFormatato = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}) 
    tempoNaTela.innerHTML = `${tempoFormatato}`
}

mostrarTempo()