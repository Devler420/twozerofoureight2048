// i = rows , j = columns
var notEmptyinnerbox = [];
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
        console.log("Array Start : "+notEmptyinnerbox);
        moveUp();
        // RandomGenBlock();
        console.log("Array End : "+notEmptyinnerbox);
    }
    else if (e.keyCode == '40') //Down
    {
        RandomGenBlock();
    }
    else if (e.keyCode == '37') //Left
    {
        RandomGenBlock();
    }
    else if (e.keyCode == '39') //Right
    {
        RandomGenBlock();
    }
}

function moveUp()
{
    if(checkMovePossibleTop() == false)
    {
        return;
    }
    var decoynotEmptyinnerbox = notEmptyinnerbox.slice();
    console.log("Array Length : "+decoynotEmptyinnerbox.length);
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        console.log(h);
        console.log(decoynotEmptyinnerbox[h]);
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var k = i;
        //if upper block is empty then k--
        while(i != 0 && notEmptyinnerbox.includes("t"+(k-1)+","+j) == false && k > 0)
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

        if(notEmptyinnerbox.includes("t"+(k-1)+","+j) && i != 0)
        {
            if(startNode.innerHTML == document.getElementById("t"+(k-1)+","+j).innerHTML)
            {
                transitionofBlock(i, j, (k-1), j);
                var resultNum = parseInt(startNode.innerHTML)+parseInt(document.getElementById("t"+(k-1)+","+j).innerHTML);
                startNode.innerHTML = resultNum;

                var ind2 = notEmptyinnerbox.indexOf('t'+(k-1)+','+j);
                document.getElementById("t"+(k-1)+","+j).remove();
                notEmptyinnerbox.splice(ind2,1);

                var ind = notEmptyinnerbox.indexOf('t'+i+','+j);
    
                startNode.setAttribute("id","t"+(k-1)+","+j);
                innerboxPos(startNode,(k-1),j);
    
                if (ind > -1)
                {
                    notEmptyinnerbox.splice(ind,1,"t"+(k-1)+","+j);
                }
            }
            else
            {
                if(i != 0 && notEmptyinnerbox.includes("t"+k+","+j) == false)
                {
                    transitionofBlock(i, j, (k), j);
                    var node = document.getElementById('t'+i+','+j);

                    var ind = notEmptyinnerbox.indexOf('t'+i+','+j);

                    node.setAttribute("id","t"+k+","+j);
                    innerboxPos(node,k,j);
                    
                    // console.log(node.getBoundingClientRect().top)
                    // transitionofBlock(i,j)
                    // transitionofBlock(i-1,j)
                    if (ind > -1)
                    {
                        notEmptyinnerbox.splice(ind,1,"t"+k+","+j);
                    }
                }
            }
            
        }
        else
        {
            if(i != 0 && notEmptyinnerbox.includes("t"+k+","+j) == false)
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

    var startblock = document.getElementById("t"+starti+","+startj);
   //var endblock = document.getElementById("t"+endi+","+endj);
    var start_rect_block = startblock.getBoundingClientRect();

    if(startblockPosTop > endblockPosTop)
    {
        id = setInterval(frame, 1);
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
        id2 = setInterval(frame2, 1);
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
        id3 = setInterval(frame3, 1);
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
        id4 = setInterval(frame4, 1);
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
        while(notEmptyinnerbox.includes("t"+(k-1)+","+j) == false && k > 0)
        {
            k--;
        }

        if (k == i && ((parseInt(document.getElementById("t"+(i-1)+","+j).innerHTML) != parseInt(startNode.innerHTML))))
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

function mergeBlock()
{
    var startBlock = document.getElementById('t1,2');
    var endblock = document.getElementById('t0,2');
    if(startBlock.innerHTML == endblock.innerHTML)
    {
        endblock.innerHTML = startblock.innerHTML + endblock.innerHTML;
    }
    else if(startBlock.innerHTML != endblock.innerHTML)
    {

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