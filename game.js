$(function () {

    // Drawing contexts
    var srcCanvas;
    var dstCanvas;
    var srcctx;
    var dstctx;
    var newGameWidth;
    var newGameHeight;
    const dscale = 4 / 3;

    let board = [];
    let rot = 0;

    // Boards and vars
    let baseBoards = [
        [
            0, 7, 3, 0, 0, 0, 4, 1, 2,
            0, 0, 8, 1, 0, 3, 0, 9, 0,
            5, 0, 9, 0, 4, 0, 6, 0, 0,
            3, 2, 0, 0, 0, 8, 1, 0, 0,
            1, 0, 4, 7, 0, 0, 0, 0, 8,
            8, 0, 0, 0, 1, 0, 0, 7, 0,
            9, 3, 0, 4, 0, 0, 0, 2, 0,
            0, 6, 0, 0, 3, 0, 9, 0, 1,
            0, 8, 5, 9, 2, 1, 0, 0, 0,
        ],
        [
            0, 3, 0, 0, 1, 0, 0, 6, 0,
            7, 5, 0, 0, 3, 0, 0, 4, 8,
            0, 0, 6, 9, 8, 4, 3, 0, 0,
            0, 0, 3, 0, 0, 0, 8, 0, 0,
            9, 1, 2, 0, 5, 0, 6, 7, 4,
            0, 0, 4, 0, 0, 0, 5, 0, 0,
            0, 0, 1, 6, 7, 5, 2, 0, 0,
            6, 8, 0, 0, 9, 0, 0, 1, 5,
            0, 9, 0, 0, 4, 0, 0, 3, 0,
        ],
        [
            0, 0, 0, 1, 0, 5, 0, 0, 0,
            1, 4, 0, 0, 0, 0, 6, 7, 0,
            0, 8, 0, 0, 0, 2, 4, 0, 0,
            0, 6, 3, 0, 7, 0, 0, 1, 0,
            9, 0, 0, 0, 0, 0, 0, 0, 3,
            0, 1, 0, 0, 9, 0, 5, 2, 0,
            0, 0, 7, 2, 0, 0, 0, 8, 0,
            0, 2, 6, 0, 0, 0, 0, 3, 5,
            0, 0, 0, 4, 0, 9, 0, 0, 0,
        ],
        [
            4, 0, 1, 2, 9, 0, 0, 7, 5,
            2, 0, 0, 3, 0, 0, 8, 0, 0,
            0, 7, 0, 0, 8, 0, 0, 0, 6,
            0, 0, 0, 1, 0, 3, 0, 6, 2,
            1, 0, 5, 0, 0, 0, 4, 0, 3,
            7, 3, 0, 6, 0, 8, 0, 0, 0,
            6, 0, 0, 0, 2, 0, 0, 3, 0,
            0, 0, 7, 0, 0, 1, 0, 0, 4,
            8, 9, 0, 0, 6, 5, 1, 0, 7,
        ],
        [
            7, 4, 0, 0, 3, 0, 0, 1, 0,
            0, 1, 9, 0, 6, 8, 5, 0, 2,
            0, 0, 0, 0, 0, 4, 3, 0, 0,
            0, 5, 6, 3, 7, 0, 0, 0, 1,
            0, 0, 1, 8, 0, 0, 0, 9, 5,
            0, 9, 0, 0, 2, 0, 6, 0, 0,
            1, 0, 3, 4, 0, 7, 2, 0, 0,
            5, 0, 0, 2, 0, 0, 0, 0, 8,
            0, 8, 0, 0, 0, 1, 4, 7, 0,
        ],
        [
            5, 0, 0, 0, 1, 0, 0, 0, 4,
            2, 7, 4, 0, 0, 0, 6, 0, 0,
            0, 8, 0, 9, 0, 4, 0, 0, 0,
            8, 1, 0, 4, 6, 0, 3, 0, 2,
            0, 0, 2, 0, 3, 0, 1, 0, 0,
            7, 0, 6, 0, 9, 1, 0, 5, 8,
            0, 0, 0, 5, 0, 3, 0, 1, 0,
            0, 0, 5, 0, 0, 0, 9, 2, 7,
            1, 0, 0, 0, 2, 0, 0, 0, 3,
        ],
        [
            0, 0, 3, 0, 0, 0, 2, 0, 0,
            0, 6, 0, 9, 8, 0, 0, 4, 3,
            4, 9, 0, 0, 3, 1, 0, 0, 6,
            9, 0, 7, 0, 0, 0, 8, 6, 0,
            0, 4, 0, 0, 9, 8, 0, 0, 0,
            0, 0, 5, 4, 0, 7, 1, 0, 9,
            6, 0, 0, 0, 0, 3, 9, 0, 5,
            5, 0, 8, 1, 0, 0, 0, 7, 2,
            2, 0, 9, 0, 5, 6, 0, 3, 8,
        ],
    ];

    let isOrig = [];

    let locked = [];
    let error = [];
    let histo = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const safeCells = [
        10, 13, 16,
        37, 40, 43,
        64, 67, 70
    ];

    let showErrors = true;
    let setError = false;

    var gridImg;
    var numbersImg;
    var buttonImg;
    var winImg;
    var titleImg;

    var btnState = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    // 0: No highlight.
    // 1: Highlight a cell (from click).
    // 2: Highlight a button (from click).

    var highlightState = 0;

    // Highlight location. Set to -1 to not render a highlight.
    var hx = -1;
    var hy = -1;

    // Selected cell. -1 for none.
    var sx = -1;
    var sy = -1;

    // Last cell updates. Can't clear this one.
    var lastCell = 0;

    // Selected number button. -1 for none.
    var numbut = -1;

    // Fade Timer
    var alpha = 1;
    var alphacounter = 0;
    var alphamod = 1;

    var screenOffsetX = 0;
    var screenOffsetY = 0;
    let gscale = 1;

    var freshload = true;
    var youwon = false;

    var imgReady = {
        grid: false,
        numbers: false,
        buttons: false,
        youwin: false,
        title: false,
    };

    function firstInit() {
        // Set up canvaseses
        dstCanvas = document.getElementById('canvas');
        dstctx = dstCanvas.getContext('2d');
        dstctx.canvas.width = window.innerWidth;
        dstctx.canvas.height = window.innerHeight;
        dstctx.fillStyle = "black";
        dstctx.fillRect(0, 0, dstCanvas.width, dstCanvas.height);

        srcCanvas = document.createElement('canvas');
        srcCanvas.width = 800;
        srcCanvas.height = 800;
        srcctx = srcCanvas.getContext('2d');

        loadImages(); // Set source path
        resizeGame();

        setInterval(update, 40);
        drawScreen();
        checkBoard(false);

        $('#canvas').on('click', clickHandler);
        $('#canvas').on('mousemove', mouseMoveHandler);
        $(window).on('keydown', keyHandler);
        $(window).on('resize', resizeGame);

        initGame();
    }

    function initGame() {

        youwon = false;

        btnState = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        highlightState = 0;

        // Highlight location. Set to -1 to not render a highlight.
        hx = -1;
        hy = -1;
    
        // Selected cell. -1 for none.
        sx = -1;
        sy = -1;

        let b = Math.floor(Math.random() * baseBoards.length);
        for (let i = 0; i < 81; i++) {
            board[i] = baseBoards[b][i];
        }

        for (let i = 0; i < 25; i++) {
            shufflePuzzle();
        }

        // Mark originals
        for (let i = 0; i < 81; i++) {
            isOrig[i] = false;
            if (board[i] > 0) {
                isOrig[i] = true;
            }
        }

        // Init trackers
        for (let i = 0; i < 81; i++) {
            error[i] = false;
            locked[i] = false;
        }
        checkHist();
    }

    function resizeGame(e) {
        dstCanvas.width = window.innerWidth;
        dstCanvas.height = window.innerHeight;

        if (dstCanvas.width / dstCanvas.height > dscale) {
            newGameHeight = dstCanvas.height;
            newGameWidth = (newGameHeight / 3) * 4;
            gscale = newGameHeight / 600;
        } else {
            newGameWidth = dstCanvas.width;
            newGameHeight = (newGameWidth / 4) * 3;
            gscale = newGameWidth / 800;
        }

        screenOffsetX = Math.abs((dstCanvas.width - newGameWidth)) / 2;
        screenOffsetY = Math.abs((dstCanvas.height - newGameHeight)) / 2;

    }

    function keyHandler(e) {
        if (freshload) return;
        if (youwon) return;

        if (e.keyCode == 81) { // Q for debug-dump-puzzle
            console.log(board.join(''));
        }
        if (e.keyCode >= 49 && e.keyCode <= 57) { // 1-9
            if (highlightState == 1) { // Cell highlighted
                if (isOrig[(9 * sy) + sx]) {
                    return;
                }
                board[(9 * sy) + sx] = e.keyCode - 48;
                lastCell = (9 * sy) + sx;
                checkBoard(true);
            }
        }
        if (e.keyCode >= 97 && e.keyCode <= 105) { // Numpad 1-9
            if (highlightState == 1) {
                if (isOrig[(9 * sy) + sx]) {
                    return;
                }
                board[(9 * sy) + sx] = e.keyCode - 96;
                lastCell = (9 * sy) + sx;
                checkBoard(true);
            }
        }
        if (e.keyCode == 46 || e.keyCode == 8) { // Delete or backspace
            if (highlightState == 1) {
                if (isOrig[(9 * sy) + sx]) {
                    return;
                }
                board[(9 * sy) + sx] = 0;
                checkBoard(false);
            }
        }
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            if (highlightState == 1) {
                switch (e.keyCode) {
                    case 37:
                        sx += 8;
                        sx %= 9;
                        break;
                    case 38:
                        sy += 8;
                        sy %= 9;
                        break;
                    case 39:
                        sx++;
                        sx %= 9;
                        break;
                    case 40:
                        sy++;
                        sy %= 9;
                        break;
                }
                hx = 30 + (60 * sx);
                hy = 30 + (60 * sy);
            }
        }
    }

    function clickHandler(e) {
        if (freshload) {
            freshload = false;
            return;
        }
        if (youwon) {
            youwon = false;
            initGame();
            return;
        }
        let mx = (e.offsetX - screenOffsetX) / gscale;
        let my = (e.offsetY - screenOffsetY) / gscale;

        // Check for the number grid first
        if (mx < 570 && my < 570 & mx > 30 & my > 30) {
            let cellX = Math.floor((mx - 30) / 60);
            let cellY = Math.floor((my - 30) / 60);
            if (highlightState < 2) {
                if (sx == cellX && sy == cellY) { // This cell is already highlighted, turn off the highlight
                    sx = -1;
                    sy = -1;
                    hx = -1;
                    hy = -1;
                    highlightState = 0;
                } else {
                    hx = 30 + (60 * cellX);
                    hy = 30 + (60 * cellY);
                    sx = cellX;
                    sy = cellY;
                    highlightState = 1;
                    return; // Nothin' else to do here, we selected a cell
                }
            } else {
                if (isOrig[(9 * cellY) + cellX]) {
                    return;
                }
                board[(9 * cellY) + cellX] = (numbut);
                lastCell = (9 * cellY) + cellX;

                if (numbut > 0) {
                    checkBoard(true);
                }
            }
            // TODO: Put in number since a button is highlighted
        }

        // Check the number buttons next
        else if (mx > 585 && mx < 795 && my > 300 && my < 580) {
            if (((Math.floor(mx - 585) % 70) < 60) && // Gross math to check if we're actually inside a button since they are spaced
                ((Math.floor(my - 300) % 70) < 60)) {
                let btnx = Math.floor((mx - 585) / 70);
                let btny = Math.floor((my - 300) / 70);
                let whichnum = (3 * btny) + btnx;
                if (whichnum == 9 || whichnum == 11) return;
                if (whichnum == 10) {
                    whichnum = 9; // Fix the number, do delete things
                    if (highlightState != 1) { // No cell highlighted, set the "fill" state
                        hx = -1;
                        hy = -1;
                        highlightState = 2;
                        clearButtonStates(true);
                        btnState[whichnum] = 2;
                        numbut = 0;
                    } else { // Cell highlighted, fill cell
                        if (isOrig[(9 * sy) + sx]) {
                            return;
                        }
                        board[(9 * sy) + sx] = 0;
                        checkBoard(false);
                    }
                } else {
                    if (btnState[whichnum] < 3) {
                        if (highlightState != 1) { // No cell highlighted, set the "fill" state
                            hx = -1;
                            hy = -1;
                            highlightState = 2;
                            clearButtonStates(true);
                            btnState[whichnum] = 2;
                            numbut = whichnum + 1;
                        } else { // Cell highlighted, fill cell
                            if (isOrig[(9 * sy) + sx]) {
                                return;
                            }

                            board[(9 * sy) + sx] = whichnum + 1;
                            lastCell = (9 * sy) + sx;
                            checkBoard(true);
                        }
                    }
                }
            }
        } else { // Clicked outside of anything useful
            highlightState = 0;
            hx = -1;
            hy = -1;
            clearButtonStates(true);
        }
    }

    function checkBoard(remove) {
        if (checkForWin()) {
            youwon = true;
            console.log("You win!");
        }
        checkHist();
        setBoardLocks();
        if (remove) {
            removeClue();
        }
    }

    function checkHist() {
        for (let i = 0; i < 9; i++) {
            histo[i] = 0;
        }
        for (let i = 0; i < 81; i++) {
            if (error[i] == false && board[i] > 0) {
                histo[board[i] - 1]++;
            }
        }
        for (let i = 0; i < 9; i++) {
            if (histo[i] == 9) {
                btnState[i] = 3;
            }
        }
    }

    function removeClue() {
        if (!setError) {
            let start = Math.floor(Math.random() * 81);
            for (let i = 0; i < 27; i++) {
                let cell = (start + i) % 81;
                if (Math.random() < 0.5) { // Gotta protect a few arbitrarily
                    continue;
                }
                if (safeCells.includes(cell)) { // And all the centers are safe
                    continue;
                }
                if (board[cell] > 0 && !locked[cell] && cell != lastCell) {
                    if (isOrig[cell]) {
                        isOrig[cell] = false;
                    } else {
                        board[cell] = 0;
                    }
                    return;
                }
            }
        }
    }

    function mouseMoveHandler(e) {
        if (freshload) return;
        clearButtonStates(false);
        let mx = (e.offsetX - screenOffsetX) / gscale;
        let my = (e.offsetY - screenOffsetY) / gscale;
        if (mx > 585 && mx < 795 && my > 300 && my < 510) {
            if (((Math.floor(mx - 585) % 70) < 60) && // Gross math to check if we're actually inside a button since they are spaced
                ((Math.floor(my - 300) % 70) < 60)) {
                let btnx = Math.floor((mx - 585) / 70);
                let btny = Math.floor((my - 300) / 70);
                let whichnum = (3 * btny) + btnx;

                if (btnState[whichnum] < 2) {
                    btnState[whichnum] = 1;
                }
            }
        }
    }

    function clearButtonStates(force) {
        for (let i = 0; i < 10; i++) {
            if (btnState[i] == 3) {
                continue;
            }
            if (btnState[i] == 1 || force) {
                btnState[i] = 0;
            }
        }
    }

    function update(e) {
        updateAlpha();
    }

    function drawScreen() {
        // BG
        //srcctx.clearRect(0, 0, 800, 600);
        //srcctx.fillStyle = "darkgray";
        //srcctx.fillRect(0, 0, 800, 600);
        srcctx.translate(400, 300);
        srcctx.scale(1.1, 1.1);
        srcctx.rotate(rot);
        rot += 0.001;
        srcctx.globalAlpha = 0.1;
        srcctx.filter = "blur(8px) hue-rotate(30deg)";
        srcctx.drawImage(dstCanvas, screenOffsetX, screenOffsetY, newGameWidth, newGameHeight, -400, -300, 800, 600);
        srcctx.filter = "none";
        srcctx.globalAlpha = 1;
        srcctx.setTransform();
        // srcctx.scale(1/1.1, 1/1.1);
        // srcctx.rotate(-1);

        if (youwon || freshload) {
            srcctx.filter = "blur(8px)";
        }
        // Grid
        srcctx.drawImage(gridImg, 0, 0, 600, 600);

        // Locks, Numbers, Errors (in that order)
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                let cell = (9 * y) + x;
                if (board[cell] > 0) {
                    if (locked[cell]) {
                        srcctx.drawImage(numbersImg, 600, 0, 60, 60, 30 + (60 * x), 30 + (60 * y), 60, 60);
                    }
                    srcctx.drawImage(numbersImg, 60 * board[cell], isOrig[cell] ? 180 : 0, 60, 60, 30 + (60 * x), 30 + (60 * y), 60, 60);
                    if (showErrors && error[cell]) {
                        srcctx.drawImage(numbersImg, 660, 0, 60, 60, 30 + (60 * x), 30 + (60 * y), 60, 60);
                    }
                }
            }
        }

        // Buttons with histograms
        for (let num = 0; num < 10; num++) {
            let tx = 585 + ((num % 3) * 70) + (70 * (Math.floor(num / 9)));
            let ty = 300 + (Math.floor(num / 3) * 70);
            let bsrcy = 60 * btnState[num];
            let srcx = 60 + (60 * num) + (120 * (Math.floor(num / 9)));
            let hsrcx = (60 * (9 - histo[num]));
            srcctx.drawImage(buttonImg, 0, bsrcy, 60, 60, tx, ty, 60, 60);
            srcctx.drawImage(numbersImg, srcx, (60 * (Math.floor(btnState[num] / 3))), 60, 60, tx + 5, ty + 2, 50, 50);
            if (num < 9 && histo[num] < 9) {
                srcctx.drawImage(numbersImg, hsrcx, 120, 60, 60, tx, ty, 60, 60);
            }
        }

        // Highlight
        if (hx >= 0 && hy >= 0) {
            srcctx.globalAlpha = alpha;
            srcctx.drawImage(numbersImg, 0, 0, 60, 60, hx, hy, 60, 60);
            srcctx.globalAlpha = 1;
        }
        if (youwon) {
            srcctx.filter = "none";
            srcctx.drawImage(winImg, 200, 150);
        } else if (freshload) {
            srcctx.filter = "none";
            srcctx.drawImage(titleImg, 200, 150);
        }

        // numbersImg[0] = highlight
        // numbersImg[10] = lock
        // numbersImg[11] = rong

        // Scale to the big one!
        dstctx.fillStyle = "black";
        dstctx.fillRect(0, 0, dstCanvas.width, dstCanvas.height);

        dstctx.drawImage(srcCanvas, 0, 0, 800, 600, screenOffsetX, screenOffsetY, newGameWidth, newGameHeight);

        window.requestAnimationFrame(drawScreen);
    }

    function clearErrors() {
        for (let i = 0; i < 81; i++) {
            error[i] = false;
        }
    }

    function checkForWin() {
        setError = false;
        clearErrors();
        let win = true;

        // Is everything filled in? NOTE: Don't mark zeros as errors
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                let cell = (9 * y) + x;
                if (board[cell] == 0) {
                    //console.log("Empty Error: " + cell + " is empty");
                    win = false;
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
                        if (board[first] > 0 && board[second] > 0) {
                            error[first] = true;
                            error[second] = true;
                            console.log("Row Error: " + first + " matches " + second);
                            if (lastCell == first || lastCell == second) {
                                setError = true;
                            }
                        }
                        win = false;
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
                        if (board[first] > 0 && board[second] > 0) {
                            error[first] = true;
                            error[second] = true;
                            console.log("Column Error: " + first + " matches " + second);
                            if (lastCell == first || lastCell == second) {
                                setError = true;
                            }
                        }
                        win = false;
                    }
                }
            }
        }
        // Is every square unique?
        for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
                for (let ca = 0; ca < 8; ca++) {
                    for (let cb = ca + 1; cb < 9; cb++) {
                        let cax = (3 * sx) + (ca % 3);
                        let cay = (3 * sy) + (Math.floor(ca / 3));
                        let cbx = (3 * sx) + (cb % 3);
                        let cby = (3 * sy) + (Math.floor(cb / 3));
                        let first = (9 * cay) + cax;
                        let second = (9 * cby) + cbx;
                        if (board[first] == board[second]) {
                            if (board[first] > 0 && board[second] > 0) {
                                console.log(`Error: ${first} (${cax}, ${cay}) [${board[first]}] matches ${second} (${cbx}, ${cby}) [${board[second]}]`);
                                error[first] = true;
                                error[second] = true;
                                if (lastCell == first || lastCell == second) {
                                    setError = true;
                                }
                            }
                            win = false;
                        }
                    }

                }
            }
        }
        // We good!
        return win;
    }

    function setBoardLocks() {
        for (let i = 0; i < 81; i++) {
            locked[i] = false;
        }

        let shouldLock = false;
        // Check and lock rows
        for (let y = 0; y < 9; y++) {
            shouldLock = true;
            for (let x = 0; x < 9; x++) {
                if (board[(9 * y) + x] == 0) {
                    shouldLock = false;
                }
            }
            if (shouldLock) {
                for (let x = 0; x < 9; x++) {
                    locked[(9 * y) + x] = true;
                }
            }
        }

        // Check and lock columns
        for (let x = 0; x < 9; x++) {
            shouldLock = true;
            for (let y = 0; y < 9; y++) {
                if (board[(9 * y) + x] == 0) {
                    shouldLock = false;
                }
            }
            if (shouldLock) {
                for (let y = 0; y < 9; y++) {
                    locked[(9 * y) + x] = true;
                }
            }
        }

        // Check and lock squares
        // Is every square unique?
        for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
                shouldLock = true;
                for (let c = 0; c < 9; c++) {
                    let cx = (3 * sx) + (c % 3);
                    let cy = (3 * sy) + (Math.floor(c / 3));
                    let first = (9 * cy) + cx;
                    if (board[first] == 0) {
                        shouldLock = false;
                    }
                }
                if (shouldLock) {
                    for (let c = 0; c < 9; c++) {
                        let cx = (3 * sx) + (c % 3);
                        let cy = (3 * sy) + (Math.floor(c / 3));
                        let first = (9 * cy) + cx;
                        locked[first] = true;
                    }
                }
            }
        }

        // Check and lock by histogram?
        for (let i = 0; i < 9; i++) {
            if (histo[i] == 9) {
                for (let j = 0; j < 81; j++) {
                    if (board[j] == i + 1) {
                        locked[j] = true;
                    }
                }
            }
        }
    }

    function loadImages() {
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

        buttonImg = new Image(); // Create new img element
        buttonImg.addEventListener('load', function () {
            imgReady.numbers = true;
        }, false);
        buttonImg.src = 'res/buttons.png';

        winImg = new Image(); // Create new img element
        winImg.addEventListener('load', function () {
            imgReady.youwin = true;
        }, false);
        winImg.src = 'res/youwin.png';

        titleImg = new Image();
        titleImg.addEventListener('load', function () {
            imgReady.title = true;
        }, false);
        titleImg.src = 'res/title.png';
    }

    function updateAlpha() {
        alphacounter += alphamod;
        if (alphacounter > 100) {
            alphacounter = 100;
            alphamod = -1;
        } else if (alphacounter < 0) {
            alphacounter = 0;
            alphamod = 1;
        }
        alphamod *= 1.5;
        alpha = (100 - alphacounter) / 100;
    }

    function shufflePuzzle() {
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                swapCols();
                break;
            case 1:
                swapRows();
                break;
            case 2:
                swapDigits();
                break;
        }
    }

    function swapRows() {
        let yg = Math.floor(Math.random() * 3);
        let ya = Math.floor(Math.random() * 3);
        let yb = Math.floor(Math.random() * 3);
        while (yb == ya) {
            yb = Math.floor(Math.random() * 3);
        }
        ya += 3 * yg;
        yb += 3 * yg;
        for (let x = 0; x < 9; x++) {
            let first = (9 * ya) + x;
            let second = (9 * yb) + x;
            let tmp = board[first];
            board[first] = board[second];
            board[second] = tmp;
        }
    }

    function swapCols() {
        let xg = Math.floor(Math.random() * 3);
        let xa = Math.floor(Math.random() * 3);
        let xb = Math.floor(Math.random() * 3);
        while (xb == xa) {
            xb = Math.floor(Math.random() * 3);
        }
        xa += 3 * xg;
        xb += 3 * xg;
        for (let y = 0; y < 9; y++) {
            let first = (9 * y) + xa;
            let second = (9 * y) + xb;
            let tmp = board[first];
            board[first] = board[second];
            board[second] = tmp;
        }
    }

    function swapDigits() {
        let a = Math.floor(Math.random() * 8) + 1;
        let b = Math.floor(Math.random() * 8) + 1;
        while (a == b) {
            b = Math.floor(Math.random() * 8) + 1;
        }

        for (let i = 0; i < 81; i++) {
            if (board[i] == a) {
                board[i] = b;
            } else if (board[i] == b) {
                board[i] = a;
            }
        }
    }

    firstInit();
});