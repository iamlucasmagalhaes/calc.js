const input = document.getElementById('input') //captura o input da calculadora

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] //teclas permitidas na calculadora

input.addEventListener('keydown', function (ev){
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
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){ //o valor passado por parâmetro se refere as minhas teclas
    //adiciona um evento de click em cada botâo da minha calculadora
    charKeyBtn.addEventListener('click', function (){
        //cria uma constante que vai receber o data-value de cada botâo clicado
        const value = charKeyBtn.dataset.value
         //acrescenta o valor ao meu input
        input.value += value
    })
})