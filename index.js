function init() {
  const container = document.createElement('div');
  container.classList.add('container-main-page');
  const text = document.createElement('p');
  text.innerText =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
    'Omnis quia iusto cum adipisci repudiandae quo beatae neque. ' +
    'Quia quis aut aliquid saepe non dolorum deleniti sequi ipsum ex culpa.Accusamus?';
  const button = document.createElement('button');
  button.classList.add('button');
  button.innerText = 'Start Game';
  button.addEventListener('click', startGame);
  container.appendChild(text);
  container.appendChild(button);
  document.querySelector('.container').appendChild(container);
}

function startGame() {
  const movieObject = quotes[getRandomInt(quotes.length)];
  const wordsArray = randomiseSentence(movieObject.quote);
  document.querySelector('.container').innerHTML = '';

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');

  const gameArea = document.createElement('div');
  gameArea.classList.add('game-area');

  const dropArea = document.createElement('div');
  dropArea.classList.add('drop-area');

  const wordsWrapper = document.createElement('div');
  wordsWrapper.classList.add('words-wrapper');

  const wordsList = document.createElement('ul');
  wordsList.classList.add('words-list');

  wordsArray.forEach((word, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('word');
    listItem.id = `word-${index}`;
    listItem.innerText = word;
    listItem.setAttribute('draggable', true);
    listItem.addEventListener('dragstart', dragStart);

    const wordDrop = document.createElement('div');
    wordDrop.classList.add('word-drop');
    wordDrop.setAttribute('data-drop-position', index);
    wordDrop.addEventListener('dragenter', e => e.target.classList.add('drag-over'));
    wordDrop.addEventListener('dragleave', e => e.target.classList.remove('drag-over'));
    wordDrop.addEventListener('dragover', e => e.preventDefault());
    wordDrop.addEventListener('drop', event => dropWord(event, movieObject));
    dropArea.appendChild(wordDrop);
    wordsList.appendChild(listItem);
  });

  wordsWrapper.appendChild(wordsList);
  gameArea.appendChild(dropArea);
  gameContainer.appendChild(gameArea);
  gameContainer.appendChild(wordsWrapper);
  document.querySelector('.container').appendChild(gameContainer);
}

const randomiseSentence = function(sentence) {
  const splitSentence = sentence.split(' ');
  return splitSentence.sort(() => Math.random() - 0.5);
};

function dropWord(event, movieObject) {
  const [draggedWord, draggedID] = event.dataTransfer.getData('text/plain').split('|');
  const dropPosition = event.target.getAttribute('data-drop-position');
  const originalPositions = [];
  const dropBox = event.target;
  movieObject.quote.split(' ').forEach(function(word, index) {
    if (word === draggedWord) {
      originalPositions.push(index);
    }
  });
  if (originalPositions.includes(parseInt(dropPosition, 10))) {
    document.getElementById(draggedID).remove();
    dropBox.innerText = draggedWord;
    dropBox.classList.add('correct-position');
  } else {
    dropBox.classList.add('wrong-position');
    dropBox.innerText = 'wrong!';

    setTimeout(() => {
      dropBox.classList.remove('wrong-position');
      dropBox.innerText = '';
    }, 500);
  }
  event.target.classList.remove('drag-over');
  if (!document.querySelector('.words-list').hasChildNodes()) {
    document.querySelector('.words-wrapper').remove();
    document.querySelector('.game-area').style.width = '100vw';
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');

    const filmTitle = document.createElement('h3');
    filmTitle.innerText = 'Film Title';

    const film = document.createElement('p');
    film.innerText = movieObject.filmTitle;

    const yearTitle = document.createElement('h3');
    yearTitle.innerText = 'Year';

    const year = document.createElement('p');
    year.innerText = movieObject.year;

    const restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play Again';
    restartBtn.classList.add('button');
    restartBtn.addEventListener('click', function() {
      modalOverlay.remove();
      startGame();
    });

    modalWrapper.appendChild(filmTitle);
    modalWrapper.appendChild(film);
    modalWrapper.appendChild(yearTitle);
    modalWrapper.appendChild(year);

    if (movieObject.funFact) {
      const funFactTitle = document.createElement('h3');
      funFactTitle.innerText = 'Fun Fact';

      const funFact = document.createElement('p');
      funFact.innerText = movieObject.funFact;

      modalWrapper.appendChild(funFactTitle);
      modalWrapper.appendChild(funFact);
    }

    modalWrapper.appendChild(restartBtn);
    modalOverlay.appendChild(modalWrapper);
    document.querySelector('body').appendChild(modalOverlay);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function dragStart(event) {
  event.dataTransfer.setData('text/plain', `${event.target.innerText}|${event.target.id}`);
}
init();
