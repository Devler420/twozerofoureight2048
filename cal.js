// i = rows , j = columns
var notEmptyinnerbox = [];
var score = 0;
document.onkeydown = move;

function RandomGenBlock()
{
    var mainNode = document.getElementById('mainframe');
    var i,j,num;
    i = Math.round(Math.random()*3);
    j = Math.round(Math.random()*3);
    num = 2;
    if (notEmptyinnerbox.includes("t"+i+","+j) == false)
    {
        var node = document.createElement("div");
        node.className = "innerbox";
        node.setAttribute("id","t"+i+","+j);
        node.innerHTML = num;
        innerboxPos(node,i,j);
        notEmptyinnerbox.push("t"+i+","+j);
        mainNode.appendChild(node);
        generateBlockAnimation(i,j);
        // console.log("i : "+i+"////j : "+j);
    }
    else
    {
        RandomGenBlock();
    }
    // console.log(notEmptyinnerbox);
}
function move(e)
{
    e = e || window.event;
    if (e.keyCode == '38') //Up
    {
        // console.log("Array Start : "+notEmptyinnerbox);
        moveUp();
        checkEndGame();
        // console.log("Array End : "+notEmptyinnerbox);
    }
    else if (e.keyCode == '40') //Down
    {
        moveDown();
        checkEndGame();
    }
    else if (e.keyCode == '37') //Left
    {
        moveLeft();
        checkEndGame();
    }
    else if (e.keyCode == '39') //Right
    {
        moveRight();
        checkEndGame();
    }
}

function moveUp()
{
    if(checkMovePossibleTop() == false)
    {
        return false;
    }
    var decoynotEmptyinnerbox = notEmptyinnerbox.slice();
    decoynotEmptyinnerbox.sort();
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        // console.log(h);
        // console.log(decoynotEmptyinnerbox[h]);
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var k = i;
        //if upper block is empty then k--
        // console.log("NotEmpty Arr = "+notEmptyinnerbox.includes("t"+(k-1)+","+j))
        while(i != 0 && notEmptyinnerbox.includes("t"+(parseInt(k)-1)+","+j) == false && k > 0)
        {
            k--;
        }
        // console.log(k);
        
        var startNode = document.getElementById('t'+i+','+j);
        var endNode = document.getElementById("t"+k+","+j);
        // console.log("Start Node = "+startNode)
        // console.log("End Node = "+endNode)
        
        if(i == 0)
        {
            continue;
        }

        if(notEmptyinnerbox.includes("t"+(parseInt(k)-1)+","+j))
        {
            if(startNode.innerHTML == document.getElementById("t"+(parseInt(k)-1)+","+j).innerHTML)
            {
                transitionofBlock(i, j, (parseInt(k)-1), j);
                var resultNum = parseInt(startNode.innerHTML)+parseInt(document.getElementById("t"+(parseInt(k)-1)+","+j).innerHTML);
                startNode.innerHTML = resultNum;

                var ind2 = notEmptyinnerbox.indexOf('t'+(parseInt(k)-1)+','+j);
                document.getElementById("t"+(parseInt(k)-1)+","+j).remove();
                notEmptyinnerbox.splice(ind2,1);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);
    
                startNode.setAttribute("id","t"+(parseInt(k)-1)+","+j);
                innerboxPos(startNode,(parseInt(k)-1),j);
    
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+(parseInt(k)-1)+","+j);
                }
                score += resultNum;
                $(document).ready(function() {
                    $("#score").html(score);
                });
                mergeBlockAnimation((parseInt(k)-1),j);
            }
            else
            {
                if(notEmptyinnerbox.includes("t"+k+","+j) == false)
                {
                    transitionofBlock(i, j, (k), j);
                    var node = document.getElementById('t'+i+','+j);

                    var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                    node.setAttribute("id","t"+k+","+j);
                    innerboxPos(node,k,j);

                    if (ind > -1)
                    {
                        notEmptyinnerbox.splice(ind,1,"t"+k+","+j);
                    }
                }
            }
            
        }
        else
        {
            if(notEmptyinnerbox.includes("t"+k+","+j) == false)
            {
                transitionofBlock(i, j, (k), j);
                var node = document.getElementById('t'+i+','+j);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                node.setAttribute("id","t"+k+","+j);
                innerboxPos(node,k,j);
                
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+k+","+j);
                }
            }
        }
    }
    RandomGenBlock();
}

function moveDown()
{
    if(checkMovePossibleDown() == false)
    {
        return false;
    }
    var decoynotEmptyinnerbox = notEmptyinnerbox.slice();
    //Sort
    decoynotEmptyinnerbox.sort(function compare(a, b) {
        var a1 = a.substring(1,2);
        var a2 = a.substring(3,4);
        var b1 = b.substring(1,2);
        var b2 = b.substring(3,4);
        if (a1 > b1) {
          return -1;
        }
        if (a1 < b1) {
          return 1;
        }
        return 0;
      });
    // console.log("Array Length : "+decoynotEmptyinnerbox.length);
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var k = i;
        //if lower block is empty then k++
        while(i != 3 && (notEmptyinnerbox.includes("t"+(parseInt(k)+1)+","+j) == false) && k >= 0 && k < 3)
        {
            k++;
        }

        var startNode = document.getElementById('t'+i+','+j);
        
        if(i == 3)
        {
            continue;
        }

        if(notEmptyinnerbox.includes("t"+(parseInt(k)+1)+","+j))
        {
            if(startNode.innerHTML == document.getElementById("t"+(parseInt(k)+1)+","+j).innerHTML)
            {
                // console.log(".innerHTML of endblock = "+document.getElementById("t"+(k+1)+","+j).innerHTML);
                transitionofBlock(i, j, (parseInt(k)+1), j);
                var resultNum = parseInt(startNode.innerHTML)+parseInt(document.getElementById("t"+(parseInt(k)+1)+","+j).innerHTML);
                startNode.innerHTML = resultNum;

                var ind2 = notEmptyinnerbox.indexOf('t'+(parseInt(k)+1)+','+j);
                document.getElementById("t"+(parseInt(k)+1)+","+j).remove();
                notEmptyinnerbox.splice(ind2,1);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);
    
                startNode.setAttribute("id","t"+(parseInt(k)+1)+","+j);
                innerboxPos(startNode,(parseInt(k)+1),j);
    
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+(parseInt(k)+1)+","+j);
                }
                score += resultNum;
                $(document).ready(function() {
                    $("#score").html(score);
                });
                mergeBlockAnimation((parseInt(k)+1),j);
            }
            else
            {
                if(notEmptyinnerbox.includes("t"+k+","+j) == false)
                {
                    transitionofBlock(i, j, (k), j);
                    var node = document.getElementById('t'+i+','+j);

                    var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                    node.setAttribute("id","t"+k+","+j);
                    innerboxPos(node,k,j);
                    
                    if (ind > -1)
                    {
                        notEmptyinnerbox.splice(ind,1,"t"+k+","+j);
                    }
                }
            }
            
        }
        else
        {
            if(notEmptyinnerbox.includes("t"+k+","+j) == false)
            {
                transitionofBlock(i, j, (k), j);
                var node = document.getElementById('t'+i+','+j);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                node.setAttribute("id","t"+k+","+j);
                innerboxPos(node,k,j);
                
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+k+","+j);
                }
            }
        }
    }
    RandomGenBlock();
}

function moveLeft()
{
    if(checkMovePossibleLeft() == false)
    {
        return false;
    }
    var decoynotEmptyinnerbox = notEmptyinnerbox.slice();
    //Sort
    decoynotEmptyinnerbox.sort(function compare(a, b) {
            var a1 = a.substring(1,2);
            var a2 = a.substring(3,4);
            var b1 = b.substring(1,2);
            var b2 = b.substring(3,4);
            if (a2 < b2) {
              return -1;
            }
            if (a2 > b2) {
              return 1;
            }
            return 0;
          });
    // console.log("Array Length : "+decoynotEmptyinnerbox.length);
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var k = j;
        //if left block is empty then k--
        while(j != 0 && (notEmptyinnerbox.includes("t"+i+","+(parseInt(k)-1)) == false) && k > 0 )
        {
            k--;
        }

        var startNode = document.getElementById('t'+i+','+j);
        
        if(j == 0)
        {
            continue;
        }

        if(notEmptyinnerbox.includes("t"+i+","+(parseInt(k)-1)))
        {
            if(startNode.innerHTML == document.getElementById("t"+i+","+(parseInt(k)-1)).innerHTML)
            {
                // console.log(".innerHTML of endblock = "+document.getElementById("t"+(k+1)+","+j).innerHTML);
                transitionofBlock(i, j, i, (parseInt(k)-1));
                var resultNum = parseInt(startNode.innerHTML)+parseInt(document.getElementById("t"+i+","+(parseInt(k)-1)).innerHTML);
                startNode.innerHTML = resultNum;

                var ind2 = notEmptyinnerbox.indexOf('t'+i+','+(parseInt(k)-1));
                document.getElementById("t"+i+","+(parseInt(k)-1)).remove();
                notEmptyinnerbox.splice(ind2,1);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);
    
                startNode.setAttribute("id","t"+i+","+(parseInt(k)-1));
                innerboxPos(startNode,i,(parseInt(k)-1));
    
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+i+","+(parseInt(k)-1));
                }
                score += resultNum;
                $(document).ready(function() {
                    $("#score").html(score);
                });
                mergeBlockAnimation(i,(parseInt(k)-1));
            }
            else
            {
                if(notEmptyinnerbox.includes("t"+i+","+k) == false)
                {
                    transitionofBlock(i, j, i, (k));
                    var node = document.getElementById('t'+i+','+j);

                    var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                    node.setAttribute("id","t"+i+","+k);
                    innerboxPos(node,i,k);
                    
                    if (ind > -1)
                    {
                        notEmptyinnerbox.splice(ind,1,"t"+i+","+k);
                    }
                }
            }
            
        }
        else
        {
            if(notEmptyinnerbox.includes("t"+i+","+k) == false)
            {
                transitionofBlock(i, j, i, (k));
                var node = document.getElementById('t'+i+','+j);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                node.setAttribute("id","t"+i+","+k);
                innerboxPos(node,i,k);
                
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+i+","+k);
                }
            }
        }
    }
    RandomGenBlock();
}

function moveRight()
{
    if(checkMovePossibleRight() == false)
    {
        return false;
    }
    var decoynotEmptyinnerbox = notEmptyinnerbox.slice();
    //Sort
    decoynotEmptyinnerbox.sort(function compare(a, b) {
        var a1 = a.substring(1,2);
        var a2 = a.substring(3,4);
        var b1 = b.substring(1,2);
        var b2 = b.substring(3,4);
        if (a2 > b2) {
            return -1;
        }
        if (a2 < b2) {
            return 1;
        }
        return 0;
        });
    // console.log("Array Length : "+decoynotEmptyinnerbox.length);
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var k = j;
        //if left block is empty then k--
        while(j != 3 && (notEmptyinnerbox.includes("t"+i+","+(parseInt(k)+1)) == false) && k >= 0 && k < 3)
        {
            k++;
        }

        var startNode = document.getElementById('t'+i+','+j);
        
        if(j == 3)
        {
            continue;
        }

        if(notEmptyinnerbox.includes("t"+i+","+(parseInt(k)+1)))
        {
            if(startNode.innerHTML == document.getElementById("t"+i+","+(parseInt(k)+1)).innerHTML)
            {
                // console.log(".innerHTML of endblock = "+document.getElementById("t"+(k+1)+","+j).innerHTML);
                transitionofBlock(i, j, i, (parseInt(k)+1));
                var resultNum = parseInt(startNode.innerHTML)+parseInt(document.getElementById("t"+i+","+(parseInt(k)+1)).innerHTML);
                startNode.innerHTML = resultNum;

                var ind2 = notEmptyinnerbox.indexOf('t'+i+','+(parseInt(k)+1));
                document.getElementById("t"+i+","+(parseInt(k)+1)).remove();
                notEmptyinnerbox.splice(ind2,1);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);
    
                startNode.setAttribute("id","t"+i+","+(parseInt(k)+1));
                innerboxPos(startNode,i,(parseInt(k)+1));
    
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+i+","+(parseInt(k)+1));
                }
                score += resultNum;
                $(document).ready(function() {
                    $("#score").html(score);
                });
                mergeBlockAnimation(i,(parseInt(k)+1));
            }
            else
            {
                if(notEmptyinnerbox.includes("t"+i+","+k) == false)
                {
                    transitionofBlock(i, j, i, (k));
                    var node = document.getElementById('t'+i+','+j);

                    var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                    node.setAttribute("id","t"+i+","+k);
                    innerboxPos(node,i,k);
                    
                    if (ind > -1)
                    {
                        notEmptyinnerbox.splice(ind,1,"t"+i+","+k);
                    }
                }
            }
            
        }
        else
        {
            if(notEmptyinnerbox.includes("t"+i+","+k) == false)
            {
                transitionofBlock(i, j, i, (k));
                var node = document.getElementById('t'+i+','+j);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                node.setAttribute("id","t"+i+","+k);
                innerboxPos(node,i,k);
                
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+i+","+k);
                }
            }
        }
    }
    RandomGenBlock();
}

function transitionofBlock(starti, startj, endi, endj)
{
    var startblock1 = getTransitionPos(starti,startj);
    var endblock1 = getTransitionPos(endi,endj)
    var startblockPosTop = startblock1[0];
    var startblockPosLeft = startblock1[1];
    var endblockPosTop = endblock1[0];
    var endblockPosLeft = endblock1[1];

    var id = null;
    var id2 = null;
    var id3 = null;
    var id4 = null;
    var time = 3;

    var startblock = document.getElementById("t"+starti+","+startj);

    if(startblockPosTop > endblockPosTop)
    {
        id = setInterval(frame, time);
        function frame() 
        {
            if (startblockPosTop == endblockPosTop) 
            {
                clearInterval(id);
            } 
            else 
            {
                startblockPosTop = startblockPosTop - 5;
                startblock.style.top = startblockPosTop +"px";
            }
        }
    }
    if(startblockPosTop < endblockPosTop)
    {
        id2 = setInterval(frame2, time);
        function frame2() 
        {
            if (startblockPosTop == endblockPosTop) 
            {
                clearInterval(id2);
            } 
            else 
            {
                startblockPosTop = startblockPosTop + 5;
                startblock.style.top = startblockPosTop +"px";
            }
        }
    }
    if(startblockPosLeft > endblockPosLeft)
    {
        id3 = setInterval(frame3, time);
        function frame3() 
        {
            if (startblockPosLeft == endblockPosLeft)
            {
                clearInterval(id3);
            }
            else
            {
                startblockPosLeft = startblockPosLeft - 5;
                startblock.style.left = startblockPosLeft +"px";
            }
        }
    }
    if(startblockPosLeft < endblockPosLeft)
    {
        id4 = setInterval(frame4, time);
        function frame4() 
        {
            if (startblockPosLeft == endblockPosLeft)
            {
                clearInterval(id4);
            }
            else
            {
                startblockPosLeft = startblockPosLeft + 5;
                startblock.style.left = startblockPosLeft +"px";
            }
        }
    }
}

function mergeBlockAnimation(endi,endj)
{
    var endblock = getTransitionPos(endi,endj);
    var endblockTop = endblock[0];
    var endblockLeft = endblock[1];
    var endwidth = 50;
    var endheight = 50;

    var startBlock = document.getElementById("t"+endi+","+endj);
    startBlock.style.left = (endblockLeft-15) + 'px'; //-15
    startBlock.style.top = (endblockTop-15) + 'px'; //-15
    // startBlock.style.width = 80 + 'px'; //+30
    // startBlock.style.height = 80 + 'px'; //+30

    var id = null;
    id = setInterval(frame, 40);
        function frame() 
        {
            if (endwidth == 80) 
            {
                startBlock.style.top = endblock[0] +'px';
                startBlock.style.left = endblock[1] +'px';
                startBlock.style.width = 50 + 'px';
                startBlock.style.height = 50 + 'px';
                clearInterval(id);
            } 
            else
            {
                endblockTop = endblockTop - 3;
                endblockLeft = endblockLeft - 3;
                endwidth = endwidth + 5;
                endheight = endwidth + 5;
                startBlock.style.top = endblockTop + "px";
                startBlock.style.left = endblockLeft + "px";
                startBlock.style.width = endwidth +"px";
                startBlock.style.height = endheight +"px";
            }
        }
}

function generateBlockAnimation(endi,endj)
{
    var endblock = getTransitionPos(endi,endj);
    var endblockTop = endblock[0]+20;
    var endblockLeft = endblock[1]+20;
    var endwidth = 10;
    var endheight = 10;

    var startBlock = document.getElementById("t"+endi+","+endj);
    startBlock.style.left = (endblockLeft) + 'px'; //+20
    startBlock.style.top = (endblockTop) + 'px'; //+20
    startBlock.style.width = 10 + 'px'; //-40
    startBlock.style.height = 10 + 'px'; //-40

    var id = null;
    id = setInterval(frame, 15);
        function frame() 
        {
            if (endwidth == 50) 
            {
                clearInterval(id);
            } 
            else
            {
                endblockTop = endblockTop - 1;
                endblockLeft = endblockLeft - 1;
                endwidth = endwidth + 2;
                endheight = endwidth + 2;
                startBlock.style.top = endblockTop + "px";
                startBlock.style.left = endblockLeft + "px";
                startBlock.style.width = endwidth +"px";
                startBlock.style.height = endheight +"px";
            }
        }
}

function checkMovePossibleTop()
{
    var countUnmovableBlock = 0;
    for (var h = 0 ; h < notEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = notEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var startNode = document.getElementById('t'+i+','+j);
        if (i == 0)
        {
            countUnmovableBlock++;
            continue;
        }

        var k = i;
        //if upper block is empty then k--
        while(notEmptyinnerbox.includes("t"+(parseInt(k)-1)+","+j) == false && k > 0)
        {
            k--;
        }

        if (k == i && ((parseInt(document.getElementById("t"+(parseInt(i)-1)+","+j).innerHTML) != parseInt(startNode.innerHTML))))
        {
            countUnmovableBlock++;
            continue;
        }
    }
    if (countUnmovableBlock == notEmptyinnerbox.length)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function checkMovePossibleDown()
{
    var countUnmovableBlock = 0;
    for (var h = 0 ; h < notEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = notEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var startNode = document.getElementById('t'+i+','+j);
        if (i == 3)
        {
            countUnmovableBlock++;
            continue;
        }

        var k = i;
        //if upper block is empty then k--
        while(notEmptyinnerbox.includes("t"+(parseInt(k)+1)+","+j) == false && k >= 0 && k < 3)
        {
            k++;
        }

        if (k == i && ((parseInt(document.getElementById("t"+(parseInt(i)+1)+","+j).innerHTML) != parseInt(startNode.innerHTML))))
        {
            countUnmovableBlock++;
            continue;
        }
    }
    if (countUnmovableBlock == notEmptyinnerbox.length)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function checkMovePossibleLeft()
{
    var countUnmovableBlock = 0;
    for (var h = 0 ; h < notEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = notEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var startNode = document.getElementById('t'+i+','+j);
        if (j == 0)
        {
            countUnmovableBlock++;
            continue;
        }

        var k = j;
        //if left block is empty then k--
        while(notEmptyinnerbox.includes("t"+i+","+(parseInt(k)-1)) == false && k > 0)
        {
            k--;
        }

        if (k == j && ((parseInt(document.getElementById("t"+i+","+(parseInt(j)-1)).innerHTML) != parseInt(startNode.innerHTML))))
        {
            countUnmovableBlock++;
            continue;
        }
    }
    if (countUnmovableBlock == notEmptyinnerbox.length)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function checkMovePossibleRight()
{
    var countUnmovableBlock = 0;
    for (var h = 0 ; h < notEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = notEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var startNode = document.getElementById('t'+i+','+j);
        if (j == 3)
        {
            countUnmovableBlock++;
            continue;
        }

        var k = j;
        //if left block is empty then k--
        while(notEmptyinnerbox.includes("t"+i+","+(parseInt(k)+1)) == false && k >= 0 && k < 3)
        {
            k++;
        }

        if (k == j && ((parseInt(document.getElementById("t"+i+","+(parseInt(j)+1)).innerHTML) != parseInt(startNode.innerHTML))))
        {
            countUnmovableBlock++;
            continue;
        }
    }
    if (countUnmovableBlock == notEmptyinnerbox.length)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function innerboxPos(xnode ,i,j)
{
    if (i == 0 && j == 0)
    {
        xnode.style.top = "10px";
        xnode.style.left = "10px";
    }
    else if (i == 0 && j == 1)
    {
        xnode.style.top = "10px";
        xnode.style.left = "70px";
    }
    else if (i == 0 && j == 2)
    {
        xnode.style.top = "10px";
        xnode.style.left = "130px";
    }
    else if (i == 0 && j == 3)
    {
        xnode.style.top = "10px";
        xnode.style.left = "190px";
    }
    else if (i == 1 && j == 0)
    {
        xnode.style.top = "70px";
        xnode.style.left = "10px";
    }
    else if (i == 1 && j == 1)
    {
        xnode.style.top = "70px";
        xnode.style.left = "70px";
    }
    else if (i == 1 && j == 2)
    {
        xnode.style.top = "70px";
        xnode.style.left = "130px";
    }
    else if (i == 1 && j == 3)
    {
        xnode.style.top = "70px";
        xnode.style.left = "190px";
    }
    else if (i == 2 && j == 0)
    {
        xnode.style.top = "130px";
        xnode.style.left = "10px";
    }
    else if (i == 2 && j == 1)
    {
        xnode.style.top = "130px";
        xnode.style.left = "70px";
    }
    else if (i == 2 && j == 2)
    {
        xnode.style.top = "130px";
        xnode.style.left = "130px";
    }
    else if (i == 2 && j == 3)
    {
        xnode.style.top = "130px";
        xnode.style.left = "190px";
    }
    else if (i == 3 && j == 0)
    {
        xnode.style.top = "190px";
        xnode.style.left = "10px";
    }
    else if (i == 3 && j == 1)
    {
        xnode.style.top = "190px";
        xnode.style.left = "70px";
    }
    else if (i == 3 && j == 2)
    {
        xnode.style.top = "190px";
        xnode.style.left = "130px";
    }
    else if (i == 3 && j == 3)
    {
        xnode.style.top = "190px";
        xnode.style.left = "190px";
    }
}

function getTransitionPos(i,j)
{
    // return Array(top,left)
    if (i == 0 && j == 0)
    {
        return Array(10,10);
    }
    else if (i == 0 && j == 1)
    {
        return Array(10,70);
    }
    else if (i == 0 && j == 2)
    {
        return Array(10,130);
    }
    else if (i == 0 && j == 3)
    {
        return Array(10,190);
    }
    else if (i == 1 && j == 0)
    {
        return Array(70,10);
    }
    else if (i == 1 && j == 1)
    {
        return Array(70,70);
    }
    else if (i == 1 && j == 2)
    {
        return Array(70,130);
    }
    else if (i == 1 && j == 3)
    {
        return Array(70,190);
    }
    else if (i == 2 && j == 0)
    {
        return Array(130,10);
    }
    else if (i == 2 && j == 1)
    {
        return Array(130,70);
    }
    else if (i == 2 && j == 2)
    {
        return Array(130,130);
    }
    else if (i == 2 && j == 3)
    {
        return Array(130,190);
    }
    else if (i == 3 && j == 0)
    {
        return Array(190,10);
    }
    else if (i == 3 && j == 1)
    {
        return Array(190,70);
    }
    else if (i == 3 && j == 2)
    {
        return Array(190,130);
    }
    else if (i == 3 && j == 3)
    {
        return Array(190,190);
    }
}

function checkEndGame()
{
    if (notEmptyinnerbox.length == 16)
    {
        if (checkMovePossibleTop() == false && checkMovePossibleDown() == false && checkMovePossibleLeft() == false && checkMovePossibleRight() == false)
        {
            alert("END GAME");
        }
    }
}

function newGame()
{
    var decoynotEmptyinnerbox = notEmptyinnerbox.slice();
    
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var startNode = document.getElementById('t'+i+','+j);
        startNode.remove();
    }
    notEmptyinnerbox = [];
    decoynotEmptyinnerbox = [];
    score = 0;
    $(document).ready(function() {
        $("#score").html(score);
    });
    RandomGenBlock();
}