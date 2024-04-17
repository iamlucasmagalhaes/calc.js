const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input') //captura o meu input
const resultInput = document.getElementById('result') //resultado

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] //teclas permitidas na calculadora

input.addEventListener('keydown', function (ev){
    ev.preventDefault() //impede o comportamento padrâo

    //verifica se a tecla pressionada está dentro do meu vetor, caso esteja ela vai ser adicionada normalmente no input, se nâo ela nâo vai aparecer
    if(allowedKeys.includes(ev.key)){
        input.value += ev.key //pega o valor que está no input e acrescenta a tecla pressionada
        return
    }

    //se a tecla pressioanda for o backspace, ele vai entrar nessa condição
    if(ev.key === 'Backspace'){
        //o valor atual do meu input vai receber o mesmo valor, mas com a função slice, que vai começar no primeiro caractere representado por 0, e ir até o penúltimo que é representado por -1 
        input.value = input.value.slice(0, -1)
    }

    //verifica se a tecla apertada foi enter
    if(ev.key === 'Enter'){
        calculate()
    }
})

//seleciona todos os elementos da classe charKey, e para cada elemento vamos passar uma função, o meu forEAch vai ser executado para cada um dos botôes
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){
    //adiciona um evento de click em cada botâo da minha calculadora
    charKeyBtn.addEventListener('click', function (){
        //cria uma constante que vai receber o data-value de cada botâo clicado
        const value = charKeyBtn.dataset.value
        //acrescenta o valor ao meu input
        input.value += value
    })
})

//limpa o meu input
document.getElementById('clear').addEventListener('click', function (){
    input.value = ''
    input.focus() //foca o cursor do mouse no input
})

//atribui funcionalidade ao meu botâo com id equal, ele vai chamar a minha função calculate
document.getElementById('equal').addEventListener('click', calculate)

//vai calcular o valor que está no meu input
function calculate(){
    //vai atribuir o valor e a classe erro ao meu resultado, mas essa classe sóficara ativa caso os valores inseridos sejam inválidos
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')
    //a função eval vai recber uma string com o código JS válido e vai executar esse código
    const result = eval(input.value)
    //sobrescreve o texto anterior
    resultInput.value = result
    //remove a classe error
    resultInput.classList.remove('error')
}

//muda a cor tema da calculadora
document.getElementById('themeSwitcher').addEventListener('click', function (){
    //verifica qual o value do data-theme
    if(main.dataset.theme === 'dark'){
        //redefine as cores através do root
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--primary-color', '#26834a')
        //muda o value do data-theme
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})

//seleciona o meu botâo de copiar e adciona um evento nele
document.getElementById('copyToClipboard').addEventListener('click', function (ev){
    //recebe o alvo do meu evento, nesse caso é o botâo de copiar
    const button = ev.currentTarget
    //verifica o texto que está dentro do meu botão e compara ele coma string 'Copy' se forem igauis ele entra na condição
    if(button.innerText === 'Copy'){
        //muda o texto que está dentro do botâo de copiar
        button.innerText = 'Copied'
        //adiciona um classe ao meu botão que vai mudar a cor dele
        button.classList.add('success')
        //essa função copia o valor do resultado para o meu teclado
        navigator.clipboard.writeText(resultInput.value)
    } else { //caso o texto do botão não seja 'Copy' ele vai entrar nessa condição, que vai mudar o texto dentro do botâo e remover a classe 'success'
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})