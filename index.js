const readline = require('readline')// импортируем readline

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var matrix = [
    ' ',' ',' ',
    ' ',' ',' ',
    ' ',' ',' ',
]//матрица поля

const winnerCombinate = [[1, 5, 9], [3, 5, 7], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9]] // Комбінації для переваги

var won = undefined
var xMoves = []
var oMoves = []

// функця ходу бота
function botMove(player){

    // отримуємо рандомне число місця для ходу
    let answer = Math.floor(Math.random()*10)

    if (matrix[answer-1] == ' '){ // Якщо поле не зайнято
        
        matrix[answer-1] = player 
        if (player == 'o'){
            // console.log(answer)
            oMoves.push(parseInt(answer)) //записуємо ход до списку ходів
            winCheck(oMoves, 'o')    
        } else if (player == 'x'){
            // console.log(answer)
            xMoves.push(parseInt(answer)) //записуємо ход до списку ходів
            winCheck(xMoves, 'x')
        }
        if (won == undefined){
            putToMatrix('x',true)
        }
        
    } else {
        botMove('o')
    }

    
}

function gameWithBot(){ // Гра з ботом
    const whoFirst = Math.floor(Math.random())//рандомне значення 1 або 0
    switch(whoFirst){
        case 0:
            console.log('Хрестики перші')
            matrix = [
                ' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' ',
            ]
            putToMatrix('x',true)
            break
        case 1:
            console.log('Нолики перші')
            matrix = [
                ' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' ',
            ]
            botMove('o')
            break
    }
}

function winCheck(list, player){
    for (winComb of winnerCombinate){ //перебираємо виграшні комбінації з їх списку
        let check = 0
        let checkNichya = 8
        
        // console.log(list, winComb)
        for(x of winComb){ //перебираємо числа з вийграшної комбінації

            if (list.includes(x)){ //якщо у списку ходів є 1 з вийграшних чисел
                
                if (check < 2){ //якщо балів перемоги недостатньо
                    
                    check += 1 //додаємо бал перемоги
                    // console.log(check)
                } else { // якщо балів перемоги достатньо
                    console.log(`╔═══╦═══╦═══╗\n║ ${matrix[0]} ║ ${matrix[1]} ║ ${matrix[2]} ║\n╠═══╬═══╬═══╣\n║ ${matrix[3]} ║ ${matrix[4]} ║ ${matrix[5]} ║\n╠═══╬═══╬═══╣\n║ ${matrix[6]} ║ ${matrix[7]} ║ ${matrix[8]} ║\n╚═══╩═══╩═══╝`)
                    console.log(`win -> ${player}`)
                    matrix = [
                        ' ',' ',' ',
                        ' ',' ',' ',
                        ' ',' ',' ',
                    ]
                    
                    xMoves = []
                    oMoves = []
                    won = player
                    
                    gameMode()
                    // онуляємо усе та даємо вибір спсобу гри
                }
            }
        }
        for (uselessThing of matrix){
            if (matrix.includes(' ') == false && won == undefined){
                if (checkNichya > 0){ //якщо використано не всі бали нічії 
                    checkNichya -= 1 //використовуємо бал нічії
                } else { //якщо використано усі бали нічії 
                    console.log(`╔═══╦═══╦═══╗\n║ ${matrix[0]} ║ ${matrix[1]} ║ ${matrix[2]} ║\n╠═══╬═══╬═══╣\n║ ${matrix[3]} ║ ${matrix[4]} ║ ${matrix[5]} ║\n╠═══╬═══╬═══╣\n║ ${matrix[6]} ║ ${matrix[7]} ║ ${matrix[8]} ║\n╚═══╩═══╩═══╝`)
                    console.log('Нічия:')
                    matrix = [
                        ' ',' ',' ',
                        ' ',' ',' ',
                        ' ',' ',' ',
                    ]
                    
                
                    xMoves = []
                    oMoves = []

                    
                    gameMode()
                    // онуляємо усе та даємо вибір спсобу гри
                }
    
            }
        }
    }
}

function putToMatrix(player,botMode){ // функція ходу
        rl.question(`Зараз йдуть ${player}\n╔═══╦═══╦═══╗\n║ ${matrix[0]} ║ ${matrix[1]} ║ ${matrix[2]} ║\n╠═══╬═══╬═══╣\n║ ${matrix[3]} ║ ${matrix[4]} ║ ${matrix[5]} ║\n╠═══╬═══╬═══╣\n║ ${matrix[6]} ║ ${matrix[7]} ║ ${matrix[8]} ║\n╚═══╩═══╩═══╝\n Уведіть номер ячейки: `,(answer)=>{
            if (matrix[answer-1] == ' '){ // Якщо поле не зайнятий
                matrix[answer-1] = player //ставимо знак на поле
                if (player == 'o'){ //якщо походив о
                    oMoves.push(parseInt(answer))
                    winCheck(oMoves, 'o') //перевіряємо виграш

                    if (botMode == undefined){ //якщо мы граэмо не з ботом
                        if (player == 'o'){
                            putToMatrix('x') // визиваємо хід супротивника за х
                        } else if (player == 'x'){
                            putToMatrix('o') // визиваємо хід супротивника за о
                        }
                    } else if (botMode == true) {  //якщо мы граэмо з ботом
                        botMove('x') //ходимо за бота х
                    }
                        
                } else if (player == 'x'){ //якщо походив х
                    
                    xMoves.push(parseInt(answer))
                    winCheck(xMoves, 'x') //перевіряємо виграш
                    if (botMode == undefined){ //якщо мы граэмо не з ботом
                        if (player == 'o'){
                            putToMatrix('x') // визиваємо хід супротивника за х
                        } else if (player == 'x'){
                            putToMatrix('o') // визиваємо хід супротивника за о
                        }
                    } else if (botMode == true) { //якщо мы граэмо з ботом
                        botMove('o') //ходимо за бота о
                    }
                }
            } else { //якщо поле зайняте
                console.log('Ви не можете вставити в зайнятому полі або ви написали інше число')
                if (botMode == undefined){ //перевірка на бота, усе як зверху
 
                    if (player == 'o'){
                        putToMatrix('x')
                    } else if (player == 'x'){
                        putToMatrix('o')
                    }
                } else if (botMode == true) {
                    putToMatrix('x',true)
                }
                

            }


        })


}

function gameWithPlayer(){ // фунція гри з гравцем
    const whoFirst = Math.floor(Math.random())//рандомне значення 1 або 0

    switch(whoFirst){
        case 0:
            console.log('Хрестики перші')
            matrix = [
                ' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' ',
            ]
            putToMatrix('x') // ходимо за х
            break
        case 1:
            console.log('Нолики перші')
            matrix = [
                ' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' ',
            ]
            putToMatrix('o') //ходимо за о
            break
    }
}
    
function gameMode(){
    console.log('1 - з ботом \n2 - з гравцями')
    rl.question('>>>',(answer)=>{
        
        if (answer == '1'){
            won = undefined
            gameWithBot()
        } else if (answer == '2'){
            won = undefined
            gameWithPlayer()
        } else {
            console.log("Обирайте правильно!-_- Бо в мене є ваша адреса та я приїду за вами в ночі, а далі вам кращє не зна5ти...:3")
            gameMode()
        }

       })
}

gameMode()