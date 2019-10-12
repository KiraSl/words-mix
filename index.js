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
  randomiseSentence();
}

var randomiseSentence = function(sentence) {
  let splitSentence = sentence.split(' ');
  return splitSentence.sort(() => Math.random() - 0.5);
};

randomiseSentence('Hello world my name is Kira');
init();

module.exports = { randomiseSentence };
