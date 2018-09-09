var numberOfSquares;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var difficultyButtons = document.querySelectorAll(".difficulty");

init();

function init() {
	numberOfSquares = 6;
	difficultyButtons[1].classList.add("selected");
	resetGame();

	//Set up difficulty buttons
	for (var i = 0; i < difficultyButtons.length; i++) {
		difficultyButtons[i].addEventListener("click", function(){
			if (!this.classList.contains("selected")) {
				for (var j = 0; j < difficultyButtons.length; j++) {
					difficultyButtons[j].classList.remove("selected");
				}
				this.classList.add("selected");	
				switch(this.textContent){
					case "Easy":
						numberOfSquares = 3;
						break;
					case "Medium":
						numberOfSquares = 6;
						break;
					case "Hard":
						numberOfSquares = 9;
						break;
				}
				resetGame();
			}
		})
	}

	// Set up reset button
	resetButton.addEventListener("click", resetGame)

	// Set up squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (clickedColor == pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again!";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}

}


function resetGame() {
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}


function changeColors(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
	return rgb;
}



