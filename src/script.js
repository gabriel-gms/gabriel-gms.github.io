//////////////////////// Referências DOM /////////////////////////////////
const define = document.querySelector('#define')
const descobrir = document.querySelector('#descobrir')
const btnDefine = document.querySelector('#btnDefine')
const btnDescobrir = document.querySelector('#btnDescobrir')
const btnRevelar = document.querySelector('#btnRevelar')
const btnRecomecar = document.querySelector('#btnRecomecar')
const imgForca = document.querySelector('#imgForca img')
const jaEscolhidas = document.querySelector('#jaEscolhidas')

//////////////////////// Principais variáveis do jogo /////////////////////////////////
let palavraCerta
let incognita = []
let contError = 0
const imgs = ['src/img/forca.png', 'src/img/forca1.png', 'src/img/forca2.png', 'src/img/forca3.png', 'src/img/forca4.png',
            'src/img/forca5.png', 'src/img/forca6.png']
let chutes = []

//////////////////////// Eventos de clique /////////////////////////////////
btnDefine.addEventListener('click', ()=>{
    if(define.value !== ''){
        switch (incognita.length){
            case 0:
                displayUnderline()
                break
            default:
                defaultValues()
                displayUnderline()
                break
        }
    }
    else {
        alert('é necessário inserir uma palavra')
    }
})

btnDescobrir.addEventListener('click', ()=>{
    let repetido = false
    if(descobrir.value !== ''){
        for(let i = 0; i<chutes.length; i++){
            if(chutes[i] === descobrir.value){
                repetido = true
            }
        }
        console.log(repetido);

        if(repetido === false){

            chutes.push(descobrir.value.toLowerCase())
            jaEscolhidas.innerHTML = `${chutes.join(' ')}`
            console.log(chutes);
            
    
            palavraCerta.forEach((v,i,a)=>{
                if(v === descobrir.value.toLowerCase()){
                    incognita[i] = descobrir.value.toLowerCase()
                    document.querySelector('#underline').innerHTML = incognita.join(' ')
                }
            })
        }
        
        if(!palavraCerta.includes(descobrir.value.toLowerCase())){
            error()
        }

        if(!incognita.includes('_')){
            document.querySelector('footer').innerHTML = 'VOCÊ GANHOU, PARABÉNS, VAMOS JOGAR NOVAMENTE!!!!'
        }

    }
    if(repetido === true) {
        alert('Já escolhida')
    }
    if(descobrir.value === ''){
        alert ('voce precisar digitar uma letra para adivinhar')
    }
    descobrir.value = ''
})

btnRevelar.addEventListener('click', ()=>{
    palavraCerta.forEach((v,i)=>{
        incognita[i] = v
        document.querySelector('#underline').innerHTML = incognita.join(' ')
    })
})

btnRecomecar.addEventListener('click', ()=>{
    defaultValues()
})

////////////////////////// Funções para reutilizar no algoritmo //////////////////////////////////
function displayUnderline () {
    palavraCerta = define.value
    palavraCerta = palavraCerta.toLowerCase().split('')
    document.querySelector('#definirPalavra').style.display = 'none'
    define.value = ''
    document.querySelector('#adivinharPalavra').style.display = 'block'
                
    palavraCerta.forEach((v)=>{
        incognita.push(v = '_')   
    })
        
    document.querySelector('#underline').innerHTML = incognita.join(' ')
}

function error(){
    contError ++
    imgForca.setAttribute('src', `${imgs[contError]}`)
        switch (contError){
            case 6:
                document.querySelector('footer').innerHTML = 'VOCÊ PERDEU, RECOMECE'
                break
        }
}

function defaultValues (){
    incognita = []
    chutes = ''
    jaEscolhidas.innerHTML = 'Já escolhidas:'
    document.querySelector('footer').innerHTML = ''
    contError = 0
    imgForca.setAttribute('src', `${imgs[0]}`)
    document.querySelector('#definirPalavra').style.display = 'block'
    document.querySelector('#adivinharPalavra').style.display = 'none'
}