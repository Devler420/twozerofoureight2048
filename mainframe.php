<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048</title>
    <link rel="stylesheet" href="style.css">
    <script language="JavaScript" type="text/javascript" src="cal.js"></script>
    <script src="jquery-3.6.0.min.js"></script>
</head>
<body onload="RandomGenBlock()">
    <div id="mainframe" onkeydown="move(e)">
        <div class="box" id="x0,0" style="top: 10px; left: 10px;"></div>
        <div class="box" id="x0,1" style="top: 10px; left: 70px;"></div>
        <div class="box" id="x0,2" style="top: 10px; left: 130px;"></div>
        <div class="box" id="x0,3" style="top: 10px; left: 190px;"></div>
        <div class="box" id="x1,0" style="top: 70px; left: 10px;"></div>
        <div class="box" id="x1,1" style="top: 70px; left: 70px;"></div>
        <div class="box" id="x1,2" style="top: 70px; left: 130px;"></div>
        <div class="box" id="x1,3" style="top: 70px; left: 190px;"></div>
        <div class="box" id="x2,0" style="top: 130px; left: 10px;"></div>
        <div class="box" id="x2,1" style="top: 130px; left: 70px;"></div>
        <div class="box" id="x2,2" style="top: 130px; left: 130px;"></div>
        <div class="box" id="x2,3" style="top: 130px; left: 190px;"></div>
        <div class="box" id="x3,0" style="top: 190px; left: 10px;"></div>
        <div class="box" id="x3,1" style="top: 190px; left: 70px;"></div>
        <div class="box" id="x3,2" style="top: 190px; left: 130px;"></div>
        <div class="box" id="x3,3" style="top: 190px; left: 190px;"></div>
    </div>
    <div>
        <button id="newgamebtn" onclick="newGame()">NEW GAME</button>
    </div>
    <div class="score-container">
        <div id="score-text">Score</div>
        <div id="score">0</div>
    </div>
</body>
<footer>
    <div>
        <p>Created by Panupong Utvichai</p>
    </div>
</footer>
</html>