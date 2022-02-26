// Emit:
// join
// getSpoofed
// condHandle
// displayList
// mistakeCount
// sendFlagAr
// sendBlockageIndex

// Listen:
// roomData
// spoofed
// win
// displayList
// mistakeCount
// sendFlagAr
// sendBlockageIndex

// For functions using emit, can use multiple times.
// For functions that are using "on", ONLY emit once.

// Join room function
// Takes in a socket, username and password, then emits a "join" event to the server.
const joinRoom = (socket, username, room) => {
  socket.emit("join", { username, room }, (error) => {
    if (error) {
      alert(error);
      window.location.href = "/";
    }
  });
};

// Socket function to take in room data - run only once in useEffect.
// Ok I really dont know how to do this without the hook thing
const getRoomData = (socket, username, setRoomData) => {
  socket.on("roomData", ({ room, users }, callback) => {
    const playerID = users[users.findIndex((user) => user.username === username)].player;
    console.log(playerID);
    const roomPlayers = [];
    users.forEach((user) => {
      roomPlayers.push(user.username);
    });
    setRoomData({
      playerID,
      room,
      roomPlayers
    });
  });
};

// Send Blockages
const sendBlockage = (socket, combo) => {
  socket.emit("getSpoofed", { combo });
};

// Receive Blockages, use the addBlockage function
const blockageSubscriber = (socket, player, addBlockage) => {
  socket.on("spoofed", ({ spoofedWords, spoofedUser }) => {
    if (player === spoofedUser.player) {
      addBlockage(Math.max(0, spoofedWords - 3), spoofedWords);
    }
  });
};

// // Send Updated array
// const sendArray = (socket, player1Array, player2Array) => {
//   socket.emit("sendArrays", [player1Array, player2Array]);
// };

// // Receive Updated array
// const arraySubscriber = (socket, handleArray) => {
//   socket.on("sendArrays", ([player1Array, player2Array]) => {
//     handleArray(player1Array, player2Array);
//   });
// };

// Send Loss
const sendResult = (socket) => {
  socket.emit("condHandle", { loss: true });
};

// Receive Victory
const resultSubscriber = (socket, player, handleVictory) => {
  socket.on("win", ({ loser }) => {
    console.log(player, loser.player);
    if (player !== loser.player) {
      handleVictory();
    }
  });
};

// Display List: Send visible 10 arrays
// Called after a word is removed from the wordlist
const sendDisplayList = (socket, wordList) => {
  wordList = wordList.slice(0, 10);
  socket.emit("displayList", wordList);
};

// Receive Display List
const displayListSubscriber = (socket, player, handleDisplayList) => {
  socket.on("displayList", ({ wordList, user }) => {
    if (user.player === player) {
      handleDisplayList(wordList);
    }
  });
};

// Send current user's mistakes
const sendMistake = (socket, mistakeCount) => {
  socket.emit("mistakeCount", mistakeCount);
};

// Receive opponent's mistakes
const mistakeSubscriber = (socket, player, handleMistakes) => {
  socket.on("mistakeCount", ({ mistakeCount, user }) => {
    if (user.player === player) {
      handleMistakes(mistakeCount);
    }
  });
};

// Send flagArr (basically how correct the opponent's current typing word is)
// Has to be sent quite often - each character typed.
const sendFlagArr = (socket, flag, wrong) => {
  const flagArr = [0, 0, 0, 0, 0];
  if (flag < 5) for (let i = 0; i < 5; i++) {
    if (i < flag) flagArr[i] = 1;
    else if (i === flag && wrong) flagArr[i] = -1;
  }

  socket.emit("sendFlagArr", flagArr);
};

// Receive flagArr - [1, 1, -1, 0, 0] for colours
const flagArrSubscriber = (socket, player, handleFlagArr) => {
  socket.on("sendFlagArr", ({ flagArr, user }) => {
    if (user.player === player) {
      handleFlagArr(flagArr);
    }
  });
};

// Send blockage Word Indexes
const sendBlockageIndex = (socket, blockageWordIndexes) => {
  socket.emit("sendBlockageIndex", blockageWordIndexes);
};

// Receive Blockage word indexes
const blockageIndexSubscriber = (socket, player, handleBlockageWordIndexes) => {
  socket.on("sendBlockageIndex", ({ blockageWordIndexes, user }) => {
    if (user.player === player) {
      handleBlockageWordIndexes(blockageWordIndexes);
    }
  });
};

export {
  joinRoom,
  getRoomData,
  sendBlockage,
  blockageSubscriber,
  //   sendArray,
  //   arraySubscriber,
  sendResult,
  resultSubscriber,
  sendDisplayList,
  displayListSubscriber,
  sendMistake,
  mistakeSubscriber,
  sendFlagArr,
  flagArrSubscriber,
  sendBlockageIndex,
  blockageIndexSubscriber,
};
