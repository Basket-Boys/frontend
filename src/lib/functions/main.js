const fs = require("fs");

const MAX_ERRORS = 5;
const MISTAKE_FORGIVENESS = 5;
const MAX_NUM_CHARS = 5;
const PUNISH_ME_DADDY = 10; // IN SECONDS

// THIS IS AN INTERNAL FUNCTION, NOT FOR EXPORTING (unless need?)
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex != 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Get wordlist - get a list of words, return two shuffled wordlists.
const getWordList = () => {
  // SOURCE https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt
  const wordList1 = fs.readFileSync("flw.txt", "utf8");
  const wordList2 = fs.readFileSync("flw.txt", "utf8");
  const lines1 = wordList1
    .split(/\n/)
    .map((x) => x.toLowerCase())
    .sort()
    .filter((x) => x);
  const lines2 = wordList2
    .split(/\n/)
    .map((x) => x.toLowerCase())
    .sort()
    .filter((x) => x);
  shuffle(lines1);
  shuffle(lines2);
  return [lines1, lines2];
};

// Idle Punisher - returns the setInterval.
// Remember to call clearInterval() on the returned interval afterwards.
// Not sure if this function works.
const idlePunisher = (mistakeMeter, setMistakeMeter) => {
  // Creates a setInterval that adds 1 to mistakeMeter every X seconds.
  const punisher = setInterval(() => {
    setMistakeMeter(mistakeMeter + 1);
  }, PUNISH_ME_DADDY * 1000);
  return punisher;
};

// Combo List Handling + checking whether the player has lost.
const onFinishWord = (
  comboCount,
  setComboCount,
  mistakeMeter,
  setMistakeMeter,
  wordCorrect
) => {
  // If word is correct, add to combolist. Additionally, if a mistake is made, mistakeMeter will increase by 1.
  // If mistakeMeter reaches MAX_ERRORS, return TRUE
  // Otherwise, manageCombo will always return FALSE.
  // Resets combo if word is wrong.
  if (wordCorrect) {
    setComboCount(comboCount + 1);
    if (comboCount % MISTAKE_FORGIVENESS === 0 && comboCount !== 0) {
      setMistakeMeter(Math.min(mistakeMeter - 1, 0));
    }
  } else {
    setComboCount(0);
    if (mistakeMeter + 1 === MAX_ERRORS) return true;
    setMistakeMeter(mistakeMeter + 1);
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

// export { getWordList, onFinishWord, shiftDown, setBlockage, idlePunisher };

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
// x = setBlockage(3, 5);
// console.log(x);
