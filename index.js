document.addEventListener('DOMContentLoaded', () => {
   const squares= document.querySelectorAll('.grid div')
   const scoreDisplay = document.querySelector('span')
   const  startBtn = document.querySelector('.start')


   const width = 10
   let currentIndex = 0 //first div in our grid
   let appleIndex = 0 //fist div in our grid

   let currentSnake = [2,1,0]  // the div in our grid being 2 (head) 0 for the tail, 1 is the body

   let direction = 1;
   let score = 0
   let speed = 0.9
   let intervalTime = 0
   let interval = 0

// start, restart the game
function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple');

    clearInterval(interval)
    score = 0

    //random apple
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0

    currentSnake.forEach(index => squares[index].classList.add('snake')) 
        interval = setInterval(moveOutComes, intervalTime)
        
    };

//})


function moveOutComes(){
        //function that deals with all the ove comes of the snake


        //deals with snake hitting borders and snake hitting self

        if(

            (currentSnake[0] + width >= (width * width) && direction === width) || // if the snake hits bottom
            (currentSnake[0] % width === width - 1  && direction === 1) || //snake hits right wall
            (currentSnake[0] % width === 0  && direction === -1)  ||//snake hits left wall
            (currentSnake[0] - width < 0  && direction === -width) ||  //hits top
            squares[currentSnake[0] + direction].classList.contains('snake')  // snake goes into itself
        )
            {

                return clearInterval(interval)  // this will clear interval in any above happens
            }


            const tail =currentSnake.pop() // removes the last ite of the array
            squares[tail].classList.remove('snake'); // removes class of snake from the tail
            currentSnake.unshift(currentSnake[0]+ direction) // gives direction to the head

            //deals with snake getting the apple

            if(squares[currentSnake[0]].classList.contains('apple')) {
                squares[currentSnake[0]].classList.remove('apple');
                squares[tail].classList.add('snake')
                currentSnake.push(tail)
                //randomApple();
                score++;
                scoreDisplay.textContent = score;
                clearInterval(interval);
                intervalTime = intervalTime * speed
                
               
                interval =  setInterval(moveOutComes, intervalTime)

            }

            squares[currentSnake[0]].classList.add('snake');





         

}




   //assign function to key codes

   function control(e) {
       squares[currentIndex].classList.remove('snake');  // we are removing the class name of snakes

        if (e.keyCode === 39) {
            direction = 1 // if we press the right arrow, the snake will go right
        }else if (e.keyCode === 38 ){
            direction = -width  // if we press up arrow, the snake will go back one up of the row
        }else if (e.keyCode === 37 ){
            direction -1 // if we press left,the snake will go left one div
        }else if (e.keyCode === 40 ){
            direction = +width // if we press dowwn , the snake head will instantly appear in the div 10 divs from where you are now
        
        }
   }


   document.addEventListener('keyup', control)

   startBtn.addEventListener('click', startGame)
   

})