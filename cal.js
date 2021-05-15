
var notEmptyinnerbox = [];
// document.onkeydown = move(e);
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
    }
    else
    {
        RandomGenBlock();
    }
    console.log(notEmptyinnerbox)
}
function move(e)
{
    e = e || window.event;
    if (e.keyCode == '38') //Up
    {
        RandomGenBlock();
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