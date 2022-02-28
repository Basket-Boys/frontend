# Word-tris

Try our game [here!](https://word-tris.netlify.app)

Our backend: https://github.com/Basket-Boys/backend

Youtube demo: https://www.youtube.com/watch?v=URQHyfBUpwg

![gameplay](https://user-images.githubusercontent.com/35862661/155864075-f71d8869-c295-4d1a-af7e-5ca5253c76e6.gif)

## Team Basket Boys

|Name         |
|:-----------:|
|Junius Pun   |
|Koh Ming En  |
|Ng Ho Chi    |

## What our project does

|                                                    Tetris99                                                     |         Our game          |
| :-------------------------------------------------------------------------------------------------------------: | :-----------------------: |
| ![image](https://user-images.githubusercontent.com/35862661/155842769-98ef575a-1e76-40aa-a075-ac611ebddafd.png) | ![image](https://user-images.githubusercontent.com/35862661/155863750-a84a6314-bff3-4dc5-a9a1-8d4eae9b6b8e.png) |


An intense 1 vs 1 typing game that draws inspiration from Typeracer and Tetris. Send "garbage" to the other person by typing perfectly in quick succession - and clear your garbage by making "combos".

## Rules of the game

Your goal is to eliminate your opponent - either by attrition or by sending them enough garbage to prevent them from clearing their lines.

Idling comes with a cost as well so you can't win by just not typing at all.

## Tech stack used

### Front End

- React (create-react-app)

### Back End

- Express to host a simple http server.

### Others

We used Socket.io to handle web sockets, which allowed us to manage real-time communication between our front-end and our back-end.

## Resources used

To get our words, we used [this](https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt) wordlist from Stanford.

## Some challenges we faced

- Getting Web sockets to work properly
- Having to jump a lot between the React front-end and the Express back-end
- Having to convert an entire component to a class-based one to fix a problem

## What we're proud of
- First time using Web Sockets to build a working project
- 0 external modules for UI!
- Organised and neat code


