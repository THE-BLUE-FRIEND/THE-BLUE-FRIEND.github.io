let value,current,previous,next,currentcheck,win,lose,hmmm;
function r(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function copyboard(a)
{
    let b=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    b[i][j]=a[i][j];
    return b;
}
function checkequalboard(a,b)
{
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    if(b[i][j]!=a[i][j])
    return false;
    return true;
}
function display()
{
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    {
        if(current[i][j]==0)
        document.getElementById(`${i}${j}`).innerText=``;
        else
        document.getElementById(`${i}${j}`).innerText=`${current[i][j]}`;
        if(current[i][j]==1)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,204,0.6)";
        else if(current[i][j]==2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,153,0.6)";
        else if(current[i][j]==4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,102,0.6)";
        else if(current[i][j]==8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,51,0.6)";
        else if(current[i][j]==16)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,238,15,0.6)";
        else if(current[i][j]==32)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,215,0,0.6)";
        else if(current[i][j]==64)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,196,0,0.6)";
        else if(current[i][j]==128)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,162,0,0.6)";
        else if(current[i][j]==256)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,128,0,0.6)";
        else if(current[i][j]==512)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,94,0,0.6)";
        else if(current[i][j]==1024)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,77,0,0.6)";
        else if(current[i][j]==2048)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,43,0,0.6)";
        else if(current[i][j]==4096)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(204,38,0,0.6)";
        else if(current[i][j]==8192)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(153,26,0,0.6)";
        else if(current[i][j]==8192*2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(90,24,0,0.6)";
        else if(current[i][j]==8192*4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(45,20,0,0.6)";
        else if(current[i][j]==8192*8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(0,16,0,0.6)";
        // else if(current[i][j]==8192*16)
        // document.getElementById(`${i}${j}`).style.backgroundColor="rgba(0,0,0,0.6)";
        else
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,255,0.6)";
    }
}
function generate()
{
    let i=0,j=0;
    do
    {
        i=r(0,3);
        j=r(0,3);
    }
    while(current[i][j]!=0);
    if(r(0,4)==value*2)
    current[i][j]=value*2;
    else
    current[i][j]=value;
}
function highest()
{
    let value=0;
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    value=Math.max(value,current[i][j]);
    return value;
}
function checklose()
{
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    if(current[i][j]==0)
    return false;
    lose=true;
    return up() && left() && down() && right();
}
function checkwin()
{
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    if(current[i][j]==win)
    return true;
    return false;
}
function up()
{
    for(let j=0;j<4;j++)
    {
        for(let i=0;i<3;i++)
        for(let k=i+1;k<4;k++)
        if(current[i][j]==0 && current[k][j]!=0)
        {
            if(lose)
            return false;
            current[i--][j]=current[k][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]==current[k][j] && current[i][j]!=0)
        {
            if(lose)
            return false;
            current[i][j]+=current[i][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]!=0 && current[k][j]!=0)
        break;
    }
    if(!lose)
    change();
    return true;
}
function left()
{
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<3;j++)
        for(let k=j+1;k<4;k++)
        if(current[i][j]==0 && current[i][k]!=0)
        {
            if(lose)
            return false;
            current[i][j--]=current[i][k];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]==current[i][k] && current[i][j]!=0)
        {
            if(lose)
            return false;
            current[i][j]+=current[i][j];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]!=0 && current[i][k]!=0)
        break;
    }
    if(!lose)
    change();
    return true;
}
function down()
{
    for(let j=0;j<4;j++)
    {
        for(let i=3;i>0;i--)
        for(let k=i-1;k>=0;k--)
        if(current[i][j]==0 && current[k][j]!=0)
        {
            if(lose)
            return false;
            current[i++][j]=current[k][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]==current[k][j] && current[i][j]!=0)
        {
            if(lose)
            return false;
            current[i][j]+=current[i][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]!=0 && current[k][j]!=0)
        break;
    }
    if(!lose)
    change();
    return true;
}
function right()
{
    for(let i=0;i<4;i++)
    {
        for(let j=3;j>0;j--)
        for(let k=j-1;k>=0;k--)
        if(current[i][j]==0 && current[i][k]!=0)
        {
            if(lose)
            return false;
            current[i][j++]=current[i][k];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]==current[i][k] && current[i][j]!=0)
        {
            if(lose)
            return false;
            current[i][j]+=current[i][j];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]!=0 && current[i][k]!=0)
        break;
    }
    if(!lose)
    change();
    return true;
}
function change()
{
    if(checkequalboard(currentcheck,current)==false)
    {
        previous=copyboard(currentcheck);
        generate();
    }
    next=copyboard(current);
}
function lol()
{
    let c=1;
    for(let i=0;i<4;i++)
    if(i%2==0)
    for(let j=0;j<4;j++,c*=2)
    current[i][j]=Math.max(2,c);
    else
    for(let j=3;j>=0;j--,c*=2)
    current[i][j]=c;
}
function operation()
{
    if(hmmm=="LLUUDDRR")
    lol();
    display();
    if(checkwin() && win==Math.pow(2,16))
    document.getElementById("label").innerText="Congratulations for fully completing the game! "+win+" is the last tile you can reach here. Hope you had great enjoyment while playing my game :D";
    else if(checkwin())
    {
        document.getElementById("label").innerText="Congratulations for reaching tile "+win+"! You can continue playing to reach even higher tiles. "+(win*2)+" anyone?";
        win<<=1;
    }
    else if(checklose())
    document.getElementById("label").innerText="Sorry, game is over. You can undo though";
    lose=false;
}
function start()
{
    document.getElementById("leveltype").remove();
    document.getElementById("showlater").style.visibility="visible";
    document.getElementById("showlater").style.display="block";

    let table=document.createElement("table");
    document.getElementById("playground").appendChild(table);
    table.classList.add("board");

    table.createTBody();
    let leftu=document.createElement("div");
    table.tBodies[0].appendChild(leftu);
    let leftarrow=document.createElement("button");
    leftu.appendChild(leftarrow);
    leftarrow.classList.add("move");
    leftarrow.id="left";
    leftarrow.innerText="➜";

    table.createTBody();
    let space1=document.createElement("div");
    table.tBodies[1].appendChild(space1);
    space1.classList.add("space");

    table.createTBody();

    for(let i=0;i<4;i++)
    {
        let tr=document.createElement("tr");
        table.tBodies[2].appendChild(tr);
        for(let j=0;j<4;j++)
        {
            let td=document.createElement("td");
            td.classList.add("matrix");
            tr.appendChild(td);
            td.id=`${i}${j}`;
        }
    }

    table.createTBody();
    let space2=document.createElement("div");
    table.tBodies[3].appendChild(space2);
    space2.classList.add("space");

    table.createTBody();
    let rightu=document.createElement("div");
    table.tBodies[4].appendChild(rightu);
    let rightarrow=document.createElement("button");
    rightu.appendChild(rightarrow);
    rightarrow.classList.add("move");
    rightarrow.id="right";
    rightarrow.innerText="➜";

    current=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    win=2048;
    lose=false;
    hmmm="";

    generate();
    generate();
    previous=copyboard(current);
    next=copyboard(current);
    display();

    document.getElementById("up").addEventListener("click",function(event)
    {
        currentcheck=copyboard(current);
        up();
        if(checkequalboard(currentcheck,current)==false)
        document.getElementById("label").innerText="Moved up";
        hmmm+="U";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        operation();
    }
    );

    document.getElementById("left").addEventListener("click",function(event)
    {
        currentcheck=copyboard(current);
        left();
        if(checkequalboard(currentcheck,current)==false)
        document.getElementById("label").innerText="Moved left";
        hmmm+="L";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        operation();
    }
    );

    document.getElementById("down").addEventListener("click",function(event)
    {
        currentcheck=copyboard(current);
        down();
        if(checkequalboard(currentcheck,current)==false)
        document.getElementById("label").innerText="Moved down";
        hmmm+="D";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        operation();
    }
    );

    document.getElementById("right").addEventListener("click",function(event)
    {
        currentcheck=copyboard(current);
        right();
        if(checkequalboard(currentcheck,current)==false)
        document.getElementById("label").innerText="Moved right";
        hmmm+="R";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        operation();
    }
    );

    document.getElementById("undo").addEventListener("click",function(event)
    {
        if(checkequalboard(current,previous))
        document.getElementById("label").innerText="No more undo available";
        else
        {
            currentcheck=copyboard(previous);
            document.getElementById("label").innerText="Undo done";
            current=copyboard(previous);
            win=Math.max(2048,highest()*2);
        }
        operation();
    }
    );

    document.getElementById("redo").addEventListener("click",function(event)
    {
        if(checkequalboard(current,next))
        document.getElementById("label").innerText="No more redo available";
        else
        {
            currentcheck=copyboard(next);
            document.getElementById("label").innerText="Redo done";
            current=copyboard(next);
            win=Math.max(2048,highest()*2);
        }
        operation();
    }
    );

    window.addEventListener("keyup",function(event)
    {
        currentcheck=copyboard(current);
        if(event.code=="ArrowUp"||event.code=="KeyW"||event.code=="Numpad8")
        {
            up();
            if(checkequalboard(currentcheck,current)==false)
            document.getElementById("label").innerText="Moved up";
            hmmm+="U";
            hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        }
        else if(event.code=="ArrowLeft"||event.code=="KeyA"||event.code=="Numpad4")
        {
            left();
            if(checkequalboard(currentcheck,current)==false)
            document.getElementById("label").innerText="Moved left";
            hmmm+="L";
            hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        }
        else if(event.code=="ArrowDown"||event.code=="KeyS"||event.code=="Numpad2")
        {
            down();
            if(checkequalboard(currentcheck,current)==false)
            document.getElementById("label").innerText="Moved down";
            hmmm+="D";
            hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        }
        else if(event.code=="ArrowRight"||event.code=="KeyD"||event.code=="Numpad6")
        {
            right();
            if(checkequalboard(currentcheck,current)==false)
            document.getElementById("label").innerText="Moved right";
            hmmm+="R";
            hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        }
        else if(event.code=="KeyU")
        if(checkequalboard(current,previous))
        document.getElementById("label").innerText="No more undo available";
        else
        {
            currentcheck=copyboard(previous);
            document.getElementById("label").innerText="Undo done";
            current=copyboard(previous);
            win=Math.max(2048,highest()*2);
        }
        else if(event.code=="KeyR")
        if(checkequalboard(current,next))
        document.getElementById("label").innerText="No more redo available";
        else
        {
            currentcheck=copyboard(next);
            document.getElementById("label").innerText="Redo done";
            current=copyboard(next);
            win=Math.max(2048,highest()*2);
        }
        operation();
    }
    );
}
function My2048Main()
{
    document.getElementById("two").addEventListener("click",function(event)
    {
        value=2;
        start();
    }
    );
    document.getElementById("one").addEventListener("click",function(event)
    {
        value=1;
        start();
    }
    );
}