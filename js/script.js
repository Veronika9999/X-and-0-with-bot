let cellAll = document.querySelectorAll('.cell'); //все ячейки
let board = document.querySelector('.board'); // игровое поле
let span = document.querySelector("span"); // чей ход
let moveNumber = 0; // кол-во ходов
let winner = false; //есть или нет победитель 
let botMove = true; //походил бот или нет
let combinations = [ //все комбнации побед
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
span.innerHTML = 'X'; // первый ходит Х
board.onclick = function (e) { // принажатии на игр.поле запуск. функция
    if (winner == false && botMove == true) { // если нет победителя и бот походил
        let cell = e.target; // переменная в которой ячейка на кот. мы нажали
        if (cell.innerHTML == '') { //если ячейка пустая
            cell.innerHTML = 'X'; // впмсываем Х
            moveNumber++; // увеличиваем номер хода
            span.innerHTML = '0';// ход переходит к 0
            checkWinner();// запуск функции проверки победителя
            botMove = false; // бот не ходил
            setTimeout(() => {
                if (winner == false) { // если победителя нет
                    while (botMove == false) { //повторять до тех пор пока бот не походит
                        let cellNumberBot = Math.floor(Math.random() * (8 - 0 + 1) + 0);// создаём переменную в которую попадает число от 0 до 8
                        if (cellAll[cellNumberBot].innerHTML == '') {// если ячейка которую выбрал бот пустая
                            cellAll[cellNumberBot].innerHTML = '0';// то в неё вписывается 0
                            moveNumber++;// ход увелич. на 1
                            botMove = true; // бот походил 
                            span.innerHTML = 'X'; // ставим Х
                            checkWinner(); // проверка на победителя
                        }
                    }
                }
            }, 1500);
        } else { // если ячейка занята
            cell.classList.add('red');//занятой ячейки добавляем класс ред
            setTimeout(() => {
                cell.classList.remove('red');// через пол сек забираем этот класс
            }, 500);
        }
    }
}
function checkWinner() { // функция проверки победителя
    for (let i = 0; i < 8; i++) { // цикл повторять 8 раз
        let [a, b, c] = combinations[i]; // переменная в которую попадает отдельная комбинация по порядку
        if (cellAll[a].innerHTML != '' && cellAll[a].innerHTML == cellAll[b].innerHTML && cellAll[a].innerHTML == cellAll[c].innerHTML) { // если первая из комбинации ячека не пустая, то мы сравниваем её со второй и третьей ячейками из комбинации
            winner = true; // победитель найден 
            setTimeout(() => { // задержка  в пол сек
                alert('Победил ' + cellAll[a].innerHTML); // табличка с победителем
                reset();//запуск функции обнуление 
                return; // остановка цикла 
            }, 500);
        }
    }
    if(moveNumber == 9 && winner == false){ // если все ячейки занята, а победитель не найден
        setTimeout(() => {
            alert('Ничья');
            reset(); //запуск функции обнуление
        }, 500);
    }
}
function reset(){ // функция обнуление
    winner = false; // победителя нет
    botMove = true;//бот походил
    moveNumber = 0; // обнуляем ходы
    span.innerHTML = 'X';// ходит Х
    for(let cellNumber = 0; cellNumber < 9; cellNumber++){ // цикл очистки ячеек
        cellAll[cellNumber].innerHTML = '';
    }
}