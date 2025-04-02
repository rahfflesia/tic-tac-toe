function palabraANumero(palabra) {
  const mapa = {
    uno: "1",
    dos: "2",
    tres: "3",
    cuatro: "4",
    cinco: "5",
    seis: "6",
    siete: "7",
    ocho: "8",
    nueve: "9",
  };

  palabra = palabra.toLowerCase().replace(/\./g, "");
  return mapa[palabra] || palabra;
}

function esNumeroValido(numero) {
  return /^[1-9]$/.test(numero);
}

const playButton = document.querySelector(".play");
const gameBoardContainer = document.querySelector("main");
const form = document.querySelector("form");
const username1 = document.querySelector("#username1");
const username2 = document.querySelector("#username2");
const body = document.querySelector("body");
const title = document.querySelector(".title");
const dialog = document.querySelector("dialog");
const winnerParagraph = document.querySelector(".dialog-paragraph");
const closeButton = document.querySelector(".close");
const turn = document.querySelector(".intTurn");
const n = document.querySelector(".currentTurn");

username1.value = "";
username2.value = "";

const gameBoardCells = 9;

let cells = [];
let intTurn = 1;
let restartButton;

function createPlayer(name, marker) {
  const getMarker = () => marker;

  return { name, marker, getMarker };
}

let player1;
let player2;
let currentTurn;

const gameBoard = (function () {
  const createGameBoard = () => {
    title.style.display = "block";
    turn.style.display = "block";
    n.style.display = "block";
    turn.textContent = "Turno número " + intTurn;
    const button = document.createElement("button");
    button.textContent = "Reiniciar";
    button.style.gridColumn = "1 / -1";
    button.style.padding = "10px 5px";
    button.classList.add("restart");
    gameBoardContainer.classList.add("game-board");
    for (let i = 0; i < gameBoardCells; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.display = "flex";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      cell.style.cursor = "pointer";
      gameBoardContainer.appendChild(cell);
    }
    gameBoardContainer.appendChild(button);
  };

  const checkRows = () => {
    return (
      (cells[0].textContent === cells[1].textContent &&
        cells[1].textContent === cells[2].textContent &&
        cells[0].textContent.length > 0 &&
        cells[1].textContent.length > 0 &&
        cells[2].textContent.length > 0) ||
      (cells[3].textContent === cells[4].textContent &&
        cells[4].textContent === cells[5].textContent &&
        cells[3].textContent.length > 0 &&
        cells[4].textContent.length > 0 &&
        cells[5].textContent.length > 0) ||
      (cells[6].textContent === cells[7].textContent &&
        cells[7].textContent === cells[8].textContent &&
        cells[6].textContent.length > 0 &&
        cells[7].textContent.length > 0 &&
        cells[8].textContent.length > 0)
    );
  };

  const checkColumns = () => {
    return (
      (cells[0].textContent === cells[3].textContent &&
        cells[3].textContent === cells[6].textContent &&
        cells[0].textContent.length > 0 &&
        cells[3].textContent.length > 0 &&
        cells[6].textContent.length > 0) ||
      (cells[1].textContent === cells[4].textContent &&
        cells[4].textContent === cells[7].textContent &&
        cells[1].textContent.length > 0 &&
        cells[4].textContent.length > 0 &&
        cells[7].textContent.length > 0) ||
      (cells[2].textContent === cells[5].textContent &&
        cells[5].textContent === cells[8].textContent &&
        cells[2].textContent.length > 0 &&
        cells[5].textContent.length > 0 &&
        cells[8].textContent.length > 0)
    );
  };

  const checkDiagonals = () => {
    return (
      (cells[0].textContent === cells[4].textContent &&
        cells[4].textContent === cells[8].textContent &&
        cells[0].textContent.length > 0 &&
        cells[4].textContent.length > 0 &&
        cells[8].textContent.length > 0) ||
      (cells[2].textContent === cells[4].textContent &&
        cells[4].textContent === cells[6].textContent &&
        cells[2].textContent.length > 0 &&
        cells[4].textContent.length > 0 &&
        cells[6].textContent.length > 0)
    );
  };

  const isGameBoardFull = () => {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent.length < 1) {
        return false;
      }
    }
    return true;
  };
  return {
    createGameBoard,
    checkRows,
    checkColumns,
    checkDiagonals,
    isGameBoardFull,
  };
})();

playButton.addEventListener("click", () => {
  if (username1.value.length > 0 && username2.value.length > 0) {
    player1 = createPlayer(username1.value, "X");
    player2 = createPlayer(username2.value, "O");
    currentTurn = player1;
    n.textContent = `Turno de ${currentTurn.name} (${currentTurn.marker})`;
    gameBoardContainer.removeChild(form);
    gameBoard.createGameBoard();
    cells = document.querySelectorAll(".cell");
    game.enableGameBoard();
    restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", () => {
      game.restart();
    });
  }
});

const game = (function () {
  const checkTurn = (turn) => {
    turn % 2 !== 0 ? (currentTurn = player1) : (currentTurn = player2);
  };

  const enableGameBoard = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", () => {
        if (cells[i].textContent.length < 1) {
          cells[i].textContent = currentTurn.getMarker();

          if (currentTurn === player1) {
            cells[i].style.color = "#1E90FF";
          } else {
            cells[i].style.color = "#c43333";
          }

          game.checkWin();
          game.checkTie();
          intTurn++;
          game.checkTurn(intTurn);
          n.textContent = `Turno de ${currentTurn.name} (${currentTurn.marker})`;
          turn.textContent = "Turno número " + intTurn;
        }
      });
    }
  };

  const checkWin = () => {
    if (
      gameBoard.checkRows() ||
      gameBoard.checkColumns() ||
      gameBoard.checkDiagonals()
    ) {
      game.showMessage(currentTurn.name + " ha ganado");
    }
  };

  const checkTie = () => {
    if (
      !gameBoard.checkRows() &&
      !gameBoard.checkColumns() &&
      !gameBoard.checkDiagonals() &&
      gameBoard.isGameBoardFull()
    ) {
      game.showMessage("Empate");
    }
  };

  const showMessage = (message) => {
    winnerParagraph.textContent = message;
    dialog.showModal();
  };

  const restart = () => {
    intTurn = 1;
    currentTurn = player1;
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = "";
    }
    n.textContent = "";
    n.textContent = `Turno de ${currentTurn.name} (${currentTurn.marker})`;
    turn.textContent = "Turno número " + intTurn;
  };

  return {
    checkTurn,
    enableGameBoard,
    checkWin,
    checkTie,
    showMessage,
    restart,
  };
})();

function iniciarReconocimiento(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Tu navegador no soporta SpeechRecognition");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-MX";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript =
      event.results[event.results.length - 1][0].transcript.trim();
    callback(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Error en reconocimiento de voz:", event.error);
  };

  recognition.onend = () => {
    recognition.start();
  };

  recognition.start();
}

closeButton.addEventListener("click", () => {
  dialog.close();
});

iniciarReconocimiento((transcript) => {
  let numero = palabraANumero(transcript);

  if (esNumeroValido(numero)) {
    if (cells[numero - 1].textContent.length < 1) {
      if (currentTurn === player1) {
        cells[numero - 1].style.color = "#1E90FF";
      } else {
        cells[numero - 1].style.color = "#c43333";
      }
      console.log(`Número reconocido: ${numero}`);
      cells[numero - 1].textContent = currentTurn.getMarker();
      game.checkWin();
      game.checkTie();
      intTurn++;
      game.checkTurn(intTurn);
      n.textContent = `Turno de ${currentTurn.name} (${currentTurn.marker})`;
      turn.textContent = "Turno número " + intTurn;
    }
  } else {
    console.log(`"${transcript}" no es un número válido`);
  }
});
