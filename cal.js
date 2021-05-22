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
        console.log("i : "+i+"////j : "+j);
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
        RandomGenBlock();
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
    var decoynotEmptyinnerbox = notEmptyinnerbox;
    for (var h = 0 ; h < decoynotEmptyinnerbox.length ; h++)
    {
        console.log(decoynotEmptyinnerbox[h]);
        var i,j;
        var splitResult = decoynotEmptyinnerbox[h].split(",");
        i = splitResult[0].replace( /^\D+/g, '');
        j = splitResult[1];

        var k = i;
        while(i != 0 && notEmptyinnerbox.includes("t"+(k-1)+","+j) == false && k > 0)
        {
            k--;
        }
        // console.log(k);
        
        var startNode = document.getElementById('t'+i+','+j);
        var endNode = document.getElementById("t"+k+","+j);
        if(notEmptyinnerbox.includes("t"+(k-1)+","+j) && i != 0)
        {
            if(startNode.innerHTML == document.getElementById("t"+(k-1)+","+j).innerHTML)
            {
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
    // console.log(notEmptyinnerbox)
}

// function transitionofBlock(xi, xj)
// {
//     var block = document.getElementById("t"+xi+","+xj);
//     var rect_block = block.getBoundingClientRect();
//     console.log(rect_block.top,rect_block.left);
// }

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