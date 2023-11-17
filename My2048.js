let current=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],previous=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],next=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],currentcheck,win=2048,flag=0,choice=false,fl=false,lose=false;
function r(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function copyboard(a)
{
    let b=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    b[i][j]=current[i][j];
    return b;
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
    if(r(0,4)==4)
    current[i][j]=4;
    else
    current[i][j]=2;
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
        if(current[i][j]==2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,204,0.6)";
        else if(current[i][j]==4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,153,0.6)";
        else if(current[i][j]==8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,102,0.6)";
        else if(current[i][j]==16)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,51,0.6)";
        else if(current[i][j]==32)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,230,0,0.6)";
        else if(current[i][j]==64)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,205,0,0.6)";
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
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(204,0,0,0.6)";
        else if(current[i][j]==8192)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(153,0,0,0.6)";
        else if(current[i][j]==8192*2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(135,0,0,0.6)";
        else if(current[i][j]==8192*4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(120,0,0,0.6)";
        else if(current[i][j]==8192*8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(105,0,0,0.6)";
        else
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,255,0.6)";
    }
    console.log("00");
}
function checklose()
{
    lose=true;
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    if(current[i][j]==0)
    lose=false;
    if(lose==false)
    return lose;
    up();
    if(lose==false)
    return lose;
    left();
    if(lose==false)
    return lose;
    down();
    if(lose==false)
    return lose;
    right();
    return lose;
}
function checkwin()
{
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    if(current[i][j]%win==0 && current[i][j]!=0)
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
            {
                lose=false;
                return;
            }
            undo();
            current[i--][j]=current[k][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]==current[k][j] && current[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            current[i][j]+=current[i][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]!=0 && current[k][j]!=0)
        break;
    }
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
            {
                lose=false;
                return;
            }
            undo();
            current[i][j--]=current[i][k];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]==current[i][k] && current[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            current[i][j]+=current[i][j];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]!=0 && current[i][k]!=0)
        break;
    }
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
            {
                lose=false;
                return;
            }
            undo();
            current[i++][j]=current[k][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]==current[k][j] && current[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            current[i][j]+=current[i][j];
            current[k][j]=0;
            break;
        }
        else if(current[i][j]!=0 && current[k][j]!=0)
        break;
    }
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
            {
                lose=false;
                return;
            }
            undo();
            current[i][j++]=current[i][k];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]==current[i][k] && current[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            current[i][j]+=current[i][j];
            current[i][k]=0;
            break;
        }
        else if(current[i][j]!=0 && current[i][k]!=0)
        break;
    }
}
function undo()
{
    if(fl)
    previous=copyboard(current);
    fl=false;
}
/*function lol()
{
    let c=2;
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++,c*=2)
    current[i][j]=c;
}*/
function operation()
{
    if(currentcheck!=previous && !fl)
    generate();
    display();
    flag=0;
    if(checkwin() && win==Math.pow(2,16) && flag==0)
    document.getElementById("label").innerText="Congratulations for fully completing the game! "+win+" is the last tile you can reach in this game. Hope you had great enjoyment while playing my game :D";
    else if(checkwin() && flag==0)
    {
        document.getElementById("label").innerText="Congratulations for reaching tile "+win+"! You can continue playing to reach even higher tiles. "+(win*2)+" anyone?";
        win+=win;
        flag=1;
    }
    else if(checklose() && currentcheck!=previous)
    {
        document.getElementById("label").innerText="Sorry, game is over. You can undo though";
        choice=true;
    }
}
function My2048Main()
{
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

    document.getElementById("up").addEventListener("click",function(event)
    {
        fl=true;
        currentcheck=previous;
        up();
        if(currentcheck!=previous)
        document.getElementById("label").innerText="Moved up";
        operation();
    }
    );

    document.getElementById("left").addEventListener("click",function(event)
    {
        fl=true;
        currentcheck=previous;
        left();
        if(currentcheck!=previous)
        document.getElementById("label").innerText="Moved left";
        operation();
    }
    );

    document.getElementById("down").addEventListener("click",function(event)
    {
        fl=true;
        currentcheck=previous;
        down();
        if(currentcheck!=previous)
        document.getElementById("label").innerText="Moved down";
        operation();
    }
    );

    document.getElementById("right").addEventListener("click",function(event)
    {
        fl=true;
        currentcheck=previous;
        right();
        if(currentcheck!=previous)
        document.getElementById("label").innerText="Moved right";
        operation();
    }
    );

    document.getElementById("undo").addEventListener("click",function(event)
    {
        fl=true;
        currentcheck=previous;
        if(current==previous)
        document.getElementById("label").innerText="No more undo available";
        else
        {
            document.getElementById("label").innerText="Undo done";
            if(flag==1)
            win/=2;
            next=current;
            current=previous;
            choice=false;
        }
        operation();
    }
    );

    document.getElementById("redo").addEventListener("click",function(event)
    {
        fl=true;
        currentcheck=previous;
        if(current==next)
        document.getElementById("label").innerText="No more redo available";
        else
        {
            document.getElementById("label").innerText="Redo done";
            current=next;
            choice=true;
        }
        operation();
    }
    );

    window.addEventListener("keyup",function(event)
    {
        fl=true;
        currentcheck=previous;
        if(event.code=="ArrowUp"||event.code=="KeyW"||event.code=="Numpad8")
        {
            up();
            if(currentcheck!=previous)
            document.getElementById("label").innerText="Moved up";
        }
        else if(event.code=="ArrowLeft"||event.code=="KeyA"||event.code=="Numpad4")
        {
            left();
            if(currentcheck!=previous)
            document.getElementById("label").innerText="Moved left";
        }
        else if(event.code=="ArrowDown"||event.code=="KeyS"||event.code=="Numpad2")
        {
            down();
            if(currentcheck!=previous)
            document.getElementById("label").innerText="Moved down";
        }
        else if(event.code=="ArrowRight"||event.code=="KeyD"||event.code=="Numpad6")
        {
            right();
            if(currentcheck!=previous)
            document.getElementById("label").innerText="Moved right";
        }
        if(event.code=="KeyU")
        if(current==previous)
        document.getElementById("label").innerText="No more undo available";
        else
        {
            document.getElementById("label").innerText="Undo done";
            if(flag==1)
            win/=2;
            next=current;
            current=previous;
            choice=false;
        }
        if(event.code=="KeyR")
        if(current==next)
        document.getElementById("label").innerText="No more redo available";
        else
        {
            document.getElementById("label").innerText="Redo done";
            current=next;
            choice=true;
        }
        operation();
    }
    );

    generate();
    generate();
    //lol();
    previous=current;
    display();
}