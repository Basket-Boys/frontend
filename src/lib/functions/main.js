import { testWords } from "./fill";

const MAX_ERRORS = 5;
const MISTAKE_FORGIVENESS = 5;
const MAX_NUM_CHARS = 5;
const DELAY = 1;
const PUNISH_ME_DADDY = 10; // IN SECONDS

//returns an array [0, 1, 2, ..., n]
const range = (n) => {
  return Array.from(Array(n).keys());
}

// THIS IS AN INTERNAL FUNCTION, NOT FOR EXPORTING (unless need?)
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Get wordlist - get a list of words, return two shuffled wordlists.

const getWordList = () => {
  return shuffle(testWords);
};


//delay a function
const delayFn = (fn, delay) => {
  setTimeout(() => fn(), delay * 1000);
}

// Idle Punisher - returns the setInterval.
// Remember to call clearInterval() on the returned interval afterwards.
// Not sure if this function works.
const getIdlePunisher = (
  getComboCount,
  setComboCount,
  getMistakeCount,
  setMistakeCount,
  onLoss
) => {
  // Creates a setInterval that adds 1 to mistakeMeter every X seconds.
  const punisher = setInterval(() => {
    const gameLost = onFinishWord(getComboCount(), setComboCount, getMistakeCount(), setMistakeCount, false);
    if (gameLost) onLoss();
  }, PUNISH_ME_DADDY * 1000);
  return punisher;
};

// Combo List Handling + checking whether the player has lost.
const onFinishWord = (
  comboCount,
  setComboCount,
  mistakeCount,
  setMistakeCount,
  wordCorrect
) => {
  // If word is correct, add to combolist. Additionally, if a mistake is made, mistakeCount will increase by 1.
  // If mistakeCount reaches MAX_ERRORS, return TRUE
  // Otherwise, manageCombo will always return FALSE.
  // Resets combo if word is wrong.
  if (wordCorrect) {
    setComboCount(comboCount + 1);
    if (comboCount % MISTAKE_FORGIVENESS === 0 && comboCount !== 0) {
      setMistakeCount(Math.max(mistakeCount - 1, 0));
    }
  } else {
    setComboCount(0);
    setMistakeCount(mistakeCount + 1);
    if (mistakeCount + 1 === MAX_ERRORS) return true;
  }
  return false;
};

// Shift-Down, used when word is correct or wrong.
const shiftDown = (wordList, setWordList) => {
  // Removes first word from wordlist, then sets the wordlist
  // eslint-disable-next-line no-unused-vars
  const [word, ...remaining] = wordList;
  const newPosition = Math.random() * 25 + 75; // ASSUMING 100 WORDS, PUT AT LAST 25 POSITIONS
  remaining.splice(newPosition, 0, word);
  setWordList(remaining);
};

// Blocks some random characters out of the next few words
const setBlockage = (numChars, numWords) => {
  // For numWords words,
  // Generates a randomly sorted list of numbers (0-4), and selects the first numChars elements.
  // So basically, if numChars is 2 and numWords is 3, a 3x2 array will be returned.
  const arrList = [];
  for (let i = 0; i < numWords; i++) {
    const innerArr = Array(MAX_NUM_CHARS)
      .fill()
      .map((a, i) => (a = i))
      .sort(() => Math.random() - 0.5);
    arrList.push(innerArr.splice(0, numChars));
  }
  return arrList;
};

export { range, delayFn, getWordList, onFinishWord, shiftDown, setBlockage, getIdlePunisher };

// TEST GWL
// console.log(getWordList());

// TEST IDLE
// idlePunisher(1, (e) => console.log(e));

// TEST ONFINISH
// onFinishWord(
//   1,
//   (e) => console.log(`COMBO: ${e}`),
//   1,
//   (e) => console.log(`WRONG: ${e}`),
//   false
// );

// TEST SHIFT
// let [x, y] = getWordList();
// [x, y] = [x.slice(0, 100), y.slice(0, 100)];
// const setWordList = (c) => {
//   x = c;
// };
// console.log(x);
// shiftDown(x, setWordList);
// console.log(x);

// TEST SETBLOCKAGE
//const x = setBlockage(3, 5);
//console.log(x);
