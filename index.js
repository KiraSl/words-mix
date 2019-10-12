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
  let words = randomiseSentence('Hello world my name is Kira');
  document.querySelector('.container').innerHTML = '';

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');

  const gameArea = document.createElement('div');
  gameArea.classList.add('game-area');

  const wordsWrapper = document.createElement('div');
  wordsWrapper.classList.add('words-wrapper');

  const wordsList = document.createElement('ul');
  wordsList.classList.add('words-list');
  wordsWrapper.appendChild(wordsList);

  words.forEach(function(word) {
    const listItem = document.createElement('li');
    listItem.classList.add('word');
    listItem.innerText = word;
    listItem.setAttribute('draggable', true);
    wordsList.appendChild(listItem);
  });

  gameContainer.appendChild(gameArea);
  gameContainer.appendChild(wordsWrapper);
  document.querySelector('.container').appendChild(gameContainer);
}

var randomiseSentence = function(sentence) {
  let splitSentence = sentence.split(' ');
  return splitSentence.sort(() => Math.random() - 0.5);
};

init();

module.exports = { randomiseSentence };
