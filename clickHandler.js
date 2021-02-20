const form = document.querySelector("#generate-players");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("id", "game")

    let gameTable = document.createElement("table");
    gameTable.setAttribute("id", "board");


    gameDiv.appendChild(gameTable);

    document.body.appendChild(gameDiv);

    // const player1 = document.querySelector("#player1")
    // const player2 = document.querySelector("#player2")

    // player1.style.color  = player1.value
    // player2.style.color = player2.value;

});