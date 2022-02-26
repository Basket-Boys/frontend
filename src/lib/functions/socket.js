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
    const playerID =
      users[users.findIndex((user) => user.username === username)].player;
    const roomPlayers = [];
    users.forEach((user) => {
      roomPlayers.push(user.username);
    });
    setRoomData({
      playerID,
      room,
      roomPlayers,
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
    if (player === spoofedUser) {
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

// Send Victory
const sendResult = (socket) => {
  socket.emit("condHandle", { loss: true });
};

// Receive Victory
const resultSubscriber = (socket, player, handleLoss) => {
  socket.on("win", ({ loser }) => {
    if (player === loser) {
      handleLoss(loser);
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
    if (user === player) {
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
    if (user === player) {
      handleMistakes(mistakeCount);
    }
  });
};

// Send flagAr (basically how correct the opponent's current typing word is)
// Has to be sent quite often - each character typed.
const sendFlagAr = (socket, flag, wrong) => {
  const flagAr = [];
  for (let i = 0; i < 5; i++) {
    if (i < flag) {
      flagAr.push(1);
    } else if (i === flag && wrong) {
      flagAr.push(-1);
    } else if (i >= flag) {
      flagAr.push(0);
    }
  }
  socket.emit("sendFlagAr", flagAr);
};

// Receive flagAr - [1, 1, -1, 0, 0] for colours
const flagArSubscriber = (socket, player, handleFlagAr) => {
  socket.on("sendFlagAr", ({ flagAr, user }) => {
    if (user === player) {
      handleFlagAr(flagAr);
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
    if (user === player) {
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
  sendFlagAr,
  flagArSubscriber,
  sendBlockageIndex,
  blockageIndexSubscriber,
};
