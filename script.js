var a_canvas = document.getElementById("a");
var cxt = a_canvas.getContext("2d");

var playerScore = 0;
var currentWord = "Buzz Words";

// functions here

var drawHex = function() {
    var numberOfSides = 6,
        size = 100,
        Xcenter = 200,
        Ycenter = 150;
 
    cxt.beginPath();
    cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
 
    for (var i = 1; i <= numberOfSides;i += 1) {
        cxt.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
 
    cxt.strokeStyle = "#000000";
    cxt.lineWidth = 1;
    cxt.stroke();
};

var drawScore = function() {
    cxt.font = "20px Arial";
    cxt.fillText("Score: " + playerScore, 0,20);
};

var addScore = function(score) {
    cxt.font = "15px Arial";
    cxt.fillText("+" + score, 0,35);  
};

var addBonus = function(bonus) {
    cxt.font = "15px Arial";
    cxt.fillText("+" + bonus, 25,35);
};

var drawWord = function(word, x, y) {
    cxt.font = "30px Arial";
    cxt.fillText(word, x, y);
};

var render = function() {
    cxt.clearRect(0, 0, a_canvas.width, a_canvas.height);
    
    drawScore();
    drawHex();
};

var pickWord = function() {
    var wordBank = ["balloon", "gemstone", "airplane", "fungus", "butterfly", "cappuccino", "library", "magnet", "videotape", "wheelchair", "baboon", "combatant", "encounter", "industry", "contempt", "misalignment", "coordinate", "avalanche", "fledgling", "serpent", "eponymous", "meditate", "irritable", "history", "quivering"];

    var random = Math.floor(Math.random() * 25);
    return wordBank[random];
};

var takeTurn = function() {
    render();
    
    currentWord = pickWord();
    drawWord(currentWord, 160, 160);
    
    var tries = 0;
    var notCorrect = true;
    while (notCorrect) {
        var playerWord = prompt();
        if (playerWord === currentWord) {
            var value = currentWord.length;
            playerScore += value;
            addScore(value);
            confirm("Great job!");
            notCorrect = false;
        } else {
            confirm("Try again!");
            tries += 1;
        }
    }
    
    if (tries === 0) {
        playerScore += 5;
        addBonus(5);
        confirm("Perfect!");
    }
};

var mainLoop = function(numTurns) {
    for (i = 1; i < numTurns; i++) {
        takeTurn();
    }
};

// game starts here

render();
drawWord(currentWord, 130, 160);

cxt.font = "25px Arial";
cxt.fillText("Press enter to start", 100, 270);

var listener = new window.keypress.Listener();

listener.simple_combo("enter", function() {
  mainLoop(5);
  
  cxt.clearRect(0, 0, a_canvas.width, a_canvas.height);
  drawHex();
    
  currentWord = "Total score:";
  cxt.font = "30px Arial";
  cxt.fillText(currentWord, 150, 160);
  cxt.fillText(playerScore, 185, 185);
});
