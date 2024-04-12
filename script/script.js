
const gridSize = 5;
let playerScore = 0;
let playerX = 2;
let playerY = 2;
let catX = Math.floor(Math.random() * gridSize);
let catY = Math.floor(Math.random() * gridSize);
let zombieX = Math.floor(Math.random() * gridSize);
let zombieY = Math.floor(Math.random() * gridSize);

const locationImages = [
  { path: 'images/mountain1.jpg', description: 'This path leads to the top of the mountain..' },
  { path: 'images/mountain2.jpg', description: 'You hear the river flowing and it makes you calm' },
  { path: 'images/mountain3.jpg', description: 'The top of the mountain glows like a volcano' },
  { path: 'images/mountain4.jpg', description: 'You can see snowy mountains in the distant' },
  { path: 'images/mountain5.jpg', description: 'All you can see is snowy mountains everywhere' },
  { path: 'images/house1.jpg', description: 'You found a spooky cabin out in the middle of nowhere' },
  { path: 'images/house2.jpg', description: 'A perfect place to sit down and just enjoy the moment' },
  { path: 'images/house3.jpg', description: 'You found a cabin by the lake..' },
  { path: 'images/house4.jpg', description: 'A house in the middle of nowhere..' },
  { path: 'images/house5.jpg', description: 'Look! a hot air balloon, maybe the cat is hiding there?' },
  { path: 'images/road1.jpg', description: 'I wonder who lives over there..' },
  { path: 'images/road2.jpg', description: 'You are walking into the woods..' },
  { path: 'images/road3.jpg', description: 'Maybe the cat went this way..' },
  { path: 'images/road4.jpg', description: 'Watch your step, this road might be slippery' },
  { path: 'images/road5.jpg', description: 'The road just got way more slippery, watch your steps!' },
  { path: 'images/forest1.jpg', description: 'A calm walk in the woods boosts your energy' },
  { path: 'images/forest2.jpg', description: 'A walk in the woods sounds like a good idea' },
  { path: 'images/forest3.jpg', description: "Let's hope there are no zombies in the woods" },
  { path: 'images/forest4.jpg', description: 'What is train railway doing here..?' },
  { path: 'images/forest5.jpg', description: 'Looks like this place is taken straight out of a fairytale' },
  { path: 'images/water1.jpg', description: 'Maybe you should go for a swim?' },
  { path: 'images/water2.jpg', description: 'Watch out for the currents, let us hope that the cat did not drown' },
  { path: 'images/water3.jpg', description: 'Looks like this place is taken straight out of a fairytale' },
  { path: 'images/water4.jpg', description: "It's always so calm down by the lake" },
  { path: 'images/water5.jpg', description: 'I dont think this place is real, must be a dream' },

];

const gameContainer = document.getElementById('game-container');
const locationImageElement = document.querySelector('.location');
const descriptionElement = document.querySelector('.description');

renderGame();

function renderGame() {
  const locationIndex = playerY * gridSize + playerX;
  locationImageElement.src = locationImages[locationIndex].path;
  descriptionElement.textContent = locationImages[locationIndex].description;

  gameContainer.innerHTML = '';

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.dataset.x = x;
      cell.dataset.y = y;
      if (x === playerX && y === playerY) {
        cell.innerHTML = `<img src="/images/sunglassemoji.webp" class="emoji" alt="Player">`;
      }
      else if (x === catX && y === catY) {
        cell.innerHTML = `<img src="/images/catemoji.webp" class="emoji" alt="Cat">`;
      }
       else if (x === zombieX && y === zombieY) {
         cell.innerHTML = `<img src="/images/zombie2.png" class="emoji" alt="Zombie">`;
       }
      else {
        cell.textContent = '';
      }
      gameContainer.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
    playerX = newX;
    playerY = newY;

    const existingGif = document.querySelector('.overlay-gif');
    if (existingGif) {
      existingGif.remove();
    }

    if (Math.random() < 0.5) {
      moveZombie();
    }
  }
  renderGame();
  checkCollision();
}
function moveZombie() {
  const dx = playerX - zombieX;
  const dy = playerY - zombieY;

  if (Math.abs(dx) > Math.abs(dy)) {
    zombieX += (dx > 0) ? 1 : -1;
  } else {
    zombieY += (dy > 0) ? 1 : -1;
  }
}
function checkCollision() {


  if (playerX === catX && playerY === catY) {

    const gif = document.createElement('img');
    gif.src = 'images/cat.gif';
    gif.classList.add('overlay-gif');
    document.querySelector('.container').appendChild(gif);
    playerScore++;

    const scoreElement = document.getElementById('playerScore');
    scoreElement.textContent = `Rescued cats: ${playerScore}`;

    catX = Math.floor(Math.random() * gridSize);
    catY = Math.floor(Math.random() * gridSize);

    descriptionElement.textContent = 'You found the cat!';


  } else if (playerX === zombieX && playerY === zombieY) {

    const playerCaughtGif = document.createElement('img');
    playerCaughtGif.src = 'images/zombie3.gif';
    playerCaughtGif.classList.add('overlay-gif');
    document.querySelector('.container').appendChild(playerCaughtGif);

    const zombieCaughtGif = document.createElement('img');
    zombieCaughtGif.src = 'images/zombieattack.gif';
    zombieCaughtGif.classList.add('overlay-gif2');
    document.querySelector('.container').appendChild(zombieCaughtGif);

    document.querySelector('.controls').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('play-again-button');
    playAgainButton.addEventListener('click', () => {
      location.reload();
    });

    const jokeContainer = document.getElementById("joke");
    jokeContainer.innerHTML = '';


    GenerateRandomJoke().then(jokeText => {
      const jokeElement = document.createElement("div");
      jokeElement.innerHTML = 'Too bad, but here is a Chuck Norris joke for you:<br><br>' + jokeText;
      jokeContainer.classList.add('joke-container');
      jokeContainer.appendChild(jokeElement);


      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
      buttonContainer.appendChild(playAgainButton);
      jokeContainer.appendChild(buttonContainer);
    });

    const currentScore = playerScore;
    playerScore = 0;

    descriptionElement.innerHTML = 'The zombie caught you!<br>Total cats found before the zombie got you: ' + currentScore;

    const scoreElement = document.getElementById('playerScore');
    scoreElement.textContent = `Rescued cats: ${currentScore}`;

  } else {
    const locationIndex = playerY * gridSize + playerX;
    descriptionElement.textContent = locationImages[locationIndex].description;
    renderGame();
  }
}

function GenerateRandomJoke() {
  const url = "https://api.chucknorris.io/jokes/random/";

  return fetch(url)
    .then(response => response.json())
    .then(data => data.value)
    .catch(error => {
      console.error('Error fetching joke:', error);
      return "No joke available";
    });
}
document.getElementById('north').addEventListener('click', () => movePlayer(0, -1));
document.getElementById('south').addEventListener('click', () => movePlayer(0, 1));
document.getElementById('west').addEventListener('click', () => movePlayer(-1, 0));
document.getElementById('east').addEventListener('click', () => movePlayer(1, 0));


document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const playAgainButton = document.querySelector('.play-again-button');
    playAgainButton.click();
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      movePlayer(0, -1);
      break;
    case 'ArrowDown':
      movePlayer(0, 1);
      break;
    case 'ArrowLeft':
      movePlayer(-1, 0);
      break;
    case 'ArrowRight':
      movePlayer(1, 0);
      break;
  }
});