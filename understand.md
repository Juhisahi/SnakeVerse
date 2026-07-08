# infos
- in this <div> our high score, score, time this will come



# board
- in this <div> our board will come where the snake is actually moving



in this websit we have use `root variables` just to make our website consistent design wise in differnt platforms



--> inside the board we cannot determin how many total block will be their as it depend on the screen size
` so we are going to use javascript for this` as in html we can only create a fixed size of blocks



# tocalculate number of columns and rows in the board
to do this whatever the width of the boad will be divide it with the `boardWidth`
and as we dont want thennumber after point so for that we are going to use `Math.floor`
--> this way we will get a grid full of individual square and the number of square depend on the size of the display 

## FPS
--> to show the movement of the snake we will use the concept of `Frame Per Second` 
and for that we will show the grid 3 in 1 second and the snake moves 3 blocks in that 
as for humhan brain if we show then multiple images in a second continusly, then our brain tells us as it is animated (image is moving)
and for every frame we canculte where should our snake goo
as snake is contentlly moving in the game non-stope



--> in our grid every square has a number assigned to it:
(0, 0) | (0, 1) | (0, 2) |.....
(1, 0) | (1, 1) | (1, 2) |....
(2, 0) | (2, 1) | (2, 2) |....
....
this means we are going to create an `array` for our snake and inside that array, we will have `object` 
- so initially suppose in our array we have three objects depoting the snake, and the moment the snake consume the food its length should get extended so for that another object will be added in the array

-------
# HTML
`<div class="info">` --> these are the little screen at the top that show your high score, current score, and clock/time
`<div class="board">` --> this is the empty playground where the snake lives
`<div class="model">` --> this is the pop up window. it shows the start button at the beginning and the game over message at the end



# js
--> The code starts by grabbing all the HTML pieces (like the score and the board) and giving them nicknames (like board or scoreElement) so it can talk to them later.



`setting the rules`
- `cols and rows`: The brain looks at how big your screen is and calculates how many 50-pixel squares can fit.
- `initialDelay`: This is the speed. The lower the number, the faster the snake moves.



`for (let r = 0; r < rows; r++) { ... }`
This loop is like a robot laying floor tiles. It fills the board with invisible squares and gives each one an address (like "Row 1, Column 5").



The `createFood` function picks a random square on the board. It checks: "Is the snake already here?" If no, it drops a Red circle there.



`Moving the Snake (The Game Loop)`
- The `gameLoop` is a heartbeat. Every few milliseconds, it does this:
- Look Ahead: It calculates where the "Head" will be next based on the arrow key you pressed.
- Check for Ouchies: If the head hits a wall or its own body, it triggers endGame.
- Eat or Move:
. If it hits food: The snake grows (it keeps its tail) and your score goes up.
. If no food: The snake moves forward by adding a new head and deleting its last tail piece.



`controls` The code listens to your keyboard. It has a special rule: No U-Turns! If you are going Up, it won't let you press Down instantly, because the snake would eat its own neck.



`let speedBonus = Math.floor(score / 10) * 15;`
Every time you get 10 points, the game says "Too easy!" and makes the delay smaller, which makes the snake move faster.





When you crash, the brain stops the clock and shows the "Game Over" screen. If your score is the highest ever, it saves it to your computer’s memory (`localStorage`) so it’s still there when you refresh the page!





# The Flow Summary
`Load`: Build the grid and show the High Score.
`Click Start`: Hide the menu, start the timer, and start the gameLoop.
`The Loop`: Move head → Check collision → (Eat food? Keep tail : Remove tail) → Wait → Repeat.
`Death`: If collision is true, stop loops and show the "Restart" button.
