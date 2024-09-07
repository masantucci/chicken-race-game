document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let canvW = 400;
    canvas.width = 400;

    //BOTÃO PARA INICIAR CORRIDA
    const start = document.getElementById('btn');

    //TAG PARA PARA TEXTOS IMPORTANTES
    const showSomething = document.getElementById('showSomething');

    //ARRAY COM URL DAS IMAGENS
    let imgObj = [
        'image/chicken-by-masantucci.png',
        'image/blue-chicken-by-masantucci.png',
        'image/yellow-chicken-by-masantucci.png',
        'image/pink-chicken-by-masantucci.png',
        'image/green-chicken-by-masantucci.png'
    ];

    //criando um objeto para a imagem
    var objImg = [];

    //ARRAY PARA ARMAZENAR AS IMAGENS APÓS ONLOAD
    let image = [];

    let imgObjRote = [
        'image/start.png'
    ];

    //criando um objeto para a imagem
    var objImgRote = [];

    let imageRote = [];

    //POSIÇÃO Y DE CADA OBJETO
    let posY = [
        10,
        30,
        50,
        70,
        90
    ];

    //POSIÇÃO X DE CADA OBJETO
    let posX = [
        10,
        10,
        10,
        10,
        10
    ];

    //AUXILIAR DE POSIÇÃO
    let posXGo = 0;

    //evita o mal carregamento dos objetos, por exemplo, ao atualizar a página, pode carregar apenas 1 objeto
    let cont = 0;

    //ARMAZENA O OBJETO GANHADOR DA CORRIDA
    let check = 0;

    //VELOCIDADE DE EXECUÇÃO DA CORRIDA
    //Intervalo de execução da corrida
    let startInterval;

    //CONTAGEM REGRESSIVA
    //Contagem Regressiva para começar
    let regCount = 5;

    //intervalo para contagem regressiva
    let regTime;

    let winner = [
        'Galinha Comum',
        'Galinha Azul',
        'Galinha Amarela',
        'Galinha Rosa',
        'Galinha Verde'
    ];

    let showTxt = [
        'Preparado?',
        'Ganhador: '
    ];

    let reset = 0;

    alterData(showTxt[0]);

    objImgRote.push(new Image()); //adicionando instancia do objeto no array
    objImgRote[0].src = imgObjRote[0]; //colocando o endereço da imagem (acrescentando uma característica no objeto)*/
    imageRote[0] = objImgRote;

    //cria um objeto para cada imagem
    for (let i = 0; i < imgObj.length; i++) {
        objImg.push(new Image()); //adicionando instancia do objeto no array
        objImg[i].src = imgObj[i]; //colocando o endereço da imagem (acrescentando uma característica no objeto)

        objImgRote[0].onload = function () {
            drawRote();
        }

        objImg[i].onload = function () {
            image[i] = objImg;
            cont++;

            if (cont == imgObj.length) {
                draw(); //desenha no canvas
            }
        }
    }

    //DESENHANDO A ROTA
    function drawRote() {
        for (let h = 0; h < imgObj.length; h++) {
            ctx.drawImage(imageRote[0][0], 5, posY[h], 32, 32); //START
            ctx.drawImage(imageRote[0][0], canvW - 40, posY[h], 32, 32); //END
        }
    }

    //DESENHA AS IMAGENS DOS ANIMAIS
    function draw() {
        for (let x = 0; x < imgObj.length; x++) {
            if (posX[x] > canvW - 70) { //LINHA DE CHEGADA
                clearInterval(startInterval); //PAUSA O INTEVALO/CORRIDA
                alterData(showTxt[1] + winner[x]); //ALTERA O TEXTO MOSTRADO
                display(1); //MOSTRA O BOTÃO
                alterBtn(1);
            }

            //DESENHA IMAGEM NO CANVAS
            if (reset == 0)
                ctx.drawImage(image[x][x], posX[x] += posXGo, posY[x], 32, 32);
            else
                ctx.drawImage(image[x][x], 10, posY[x], 32, 32);

            if (cont == 0)
                randomNumber();
        }
    }

    //POSIÇÕES ALEATÓRIAS
    function randomNumber() {
        posXGo = parseInt(Math.random() * (10 - 5) + 5);
    }

    //COMEÇA A CORRIDA
    function run() {
        cont = 0; //SERVE PARA LIBERAR O RANDOMNUMBER()
        startInterval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); //Apaga todo o canvas para evitar que as imagens se sobreponham
            drawRote();
            draw(); //Chama a funação para desenhar as imagens
        }, 80);
    }

    //MOSTRA TEXTOS IMPORTANTES PARA O JOGADOR
    function alterData(n) {
        showSomething.textContent = n;
    }

    //TIRA O BOTÃO
    function display(m) {
        if (m == 0) {
            start.style.display = 'none';
        }
        else {
            start.style.display = 'block';
        }
    }

    //ALTERA O TEXTO DO BOTÃO
    function alterBtn(u) {
        if (u == 0) {
            start.textContent = 'Começar!';
        }
        else {
            start.textContent = 'Recomeçar';
        }
    }

    //RESETA TODOS OS DADOS PARA RECOMEÇAR O JOGO
    function resetAll() {
        posXGo = 0;
        check = 0;
        regCount = 5;
        posX = [
            10,
            10,
            10,
            10,
            10
        ];
        alterBtn(0); //ALTERA O TEXTO DO BOTÃO
        alterData(showTxt[0]);
    }

    //CONTAGEM REGRESSIVA PARA COMEÇAR A CORRIDA
    function countdown() {
        display(0);
        regTime = setInterval(() => {
            alterData(regCount); //ALTERA O TEMPO MOSTRADO
            if (regCount < 1) {
                clearInterval(regTime); //CANCELA O INTERVALO
                run();
            }
            regCount--;
        }, 1000);
    }

    //Só funciona essa função quando o evento clique é disparado pelo botão
    start.addEventListener('click', function () {
        reset = 0;
        if (start.textContent == 'Começar!') {
            countdown(); //CONTAGEM REGRESSIVA PARA COMEÇAR A CORRIDA
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height); //Apaga todo o canvas para evitar que as imagens se sobreponham
            resetAll(); //RESETA TODOS OS DADOS PARA RECOMEÇAR O JOGO
            reset = 1;
            drawRote();
            draw();
        }
    });
});