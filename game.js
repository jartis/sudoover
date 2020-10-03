$(function () {

    // Drawing contexts
    var ctx = document.getElementById('canvas').getContext('2d');

    // Boards and vars
    let blankboard = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    let board = [
        0, 5, 0, 3, 0, 0, 0, 1, 4,
        0, 0, 0, 0, 0, 0, 2, 3, 5,
        2, 0, 0, 5, 0, 0, 9, 0, 6,
        1, 9, 0, 0, 5, 0, 7, 0, 3,
        0, 6, 4, 1, 0, 3, 0, 0, 0,
        7, 0, 0, 0, 0, 6, 0, 0, 0,
        5, 7, 0, 9, 0, 1, 0, 0, 8,
        4, 8, 1, 7, 3, 0, 6, 0, 9,
        0, 0, 0, 0, 8, 5, 0, 0, 7,
    ];

    let locked = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    var gridImg;
    var numbersImg;

    var imgReady = {
        grid: false,
        numbers: false,
        allready: function () {
            if (this.grid == false) return false;
            if (this.numbers == false) return false;
            return true;
        }
    };

    function initGame() {
        gridImg = new Image(); // Create new img element
        gridImg.addEventListener('load', function () {
            imgReady.grid = true;
        }, false);
        gridImg.src = 'res/gridbg.png'; // Set source path

        numbersImg = new Image(); // Create new img element
        numbersImg.addEventListener('load', function () {
            imgReady.numbers = true;
        }, false);
        numbersImg.src = 'res/numbers.png'; // Set source path

        setInterval(update, 40);
    }

    function update(e) {
        drawScreen();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function drawScreen() {
        // BG

        // Grid
        ctx.drawImage(gridImg, 0, 0, 600, 600);

        // Numbers
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                let cell = (9 * y) + x;
                if (board[cell] > 0) {
                    ctx.drawImage(numbersImg, 60 * board[cell], 0, 60, 60, 30 + (60 * x), 30 + (60 * y), 60, 60);
                }
            }
        }

        // numbersImg[0] = highlight
        // numbersImg[10] = lock
        // numbersImg[11] = rong
    }

    function checkForWin() {
        // Is everything filled in?
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                let cell = (9 * y) + x;
                if (board[cell] == 0) {
                    console.log("Empty Error: " + cell + " is empty");
                    return false;
                }
            }
        }
        // Is every row unique?
        for (let y = 0; y < 9; y++) {
            for (let xa = 0; xa < 8; xa++) {
                for (let xb = xa + 1; xb < 9; xb++) {
                    let first = (9 * y) + xa;
                    let second = (9 * y) + xb;
                    if (board[first] == board[second]) {
                        console.log("Row Error: " + first + " matches " + second);
                        return false;
                    }
                }
            }
        }
        // Is every column unique?
        for (let x = 0; x < 9; x++) {
            for (let ya = 0; ya < 8; ya++) {
                for (let yb = ya + 1; yb < 9; yb++) {
                    let first = (9 * ya) + x;
                    let second = (9 * yb) + x;
                    if (board[first] == board[second]) {
                        console.log("Column Error: " + first + " matches " + second);
                        return false;
                    }
                }
            }
        }
        // Is every square unique?
        for (let bigy = 0; bigy < 3; bigy++) {
            for (let bigx = 0; bigx < 3; bigx++) {
                for (let sa = 0; sa < 8; sa++) {
                    for (let sb = sa + 1; sb < 9; sb++) {
                        let first = (bigy * 3) + (bigx * 3) + Math.floor(sa / 3) + (sa % 3);
                        let second = (bigy * 3) + (bigx * 3) + Math.floor(sb / 3) + (sb % 3);
                        if (board[first] == board[second]) {
                            console.log("Square Error: " + first + " matches " + second);
                            return false;
                        }
                    }
                }
            }
        }
        // We good!
        return true;
    }

    function setBoardLocks() {
        // Check rows

    }

    function clearClue() {

    }

    initGame();

});