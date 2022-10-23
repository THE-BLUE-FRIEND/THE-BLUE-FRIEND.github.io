let a=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],b=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],win=2048,flag=0,choice=false,fl=false,lose=false;
window.addEventListener("keyup",function(event)
{
    fl=true;
    let c=b;
    if(event.code=="ArrowUp"||event.code=="KeyW"||event.code=="Numpad8")
    {
        up();
        if(c!=b)
        document.getElementById("label").innerText="Moved up";
    }
    else if(event.code=="ArrowLeft"||event.code=="KeyA"||event.code=="Numpad4")
    {
        left();
        if(c!=b)
        document.getElementById("label").innerText="Moved left";
    }
    else if(event.code=="ArrowDown"||event.code=="KeyS"||event.code=="Numpad2")
    {
        down();
        if(c!=b)
        document.getElementById("label").innerText="Moved down";
    }
    else if(event.code=="ArrowRight"||event.code=="KeyD"||event.code=="Numpad6")
    {
        right();
        if(c!=b)
        document.getElementById("label").innerText="Moved right";
    }
    if(event.code=="KeyU")
    if(a==b)
    document.getElementById("label").innerText="No more undo available";
    else
    {
        document.getElementById("label").innerText="Undo done";
        if(flag==1)
        win/=2;
        a=b;
        choice=false;
    }
    if(c!=b && !fl)
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
    else if(checklose() && c!=b)
    {
        document.getElementById("label").innerText="Sorry, game is over. You can undo though";
        choice=true;
    }
}
);
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
function generate()
{
    let i=0,j=0;
    do
    {
        i=r(0,3);
        j=r(0,3);
    }
    while(a[i][j]!=0);
    if(r(0,4)==4)
    a[i][j]=4;
    else
    a[i][j]=2;
}
function display()
{
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++)
    {
        if(a[i][j]==0)
        document.getElementById(`${i}${j}`).innerText=``;
        else
        document.getElementById(`${i}${j}`).innerText=`${a[i][j]}`;
        if(a[i][j]==2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,204,0.6)";
        else if(a[i][j]==4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,153,0.6)";
        else if(a[i][j]==8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,102,0.6)";
        else if(a[i][j]==16)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,255,51,0.6)";
        else if(a[i][j]==32)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,230,0,0.6)";
        else if(a[i][j]==64)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,205,0,0.6)";
        else if(a[i][j]==128)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,162,0,0.6)";
        else if(a[i][j]==256)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,128,0,0.6)";
        else if(a[i][j]==512)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,94,0,0.6)";
        else if(a[i][j]==1024)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,77,0,0.6)";
        else if(a[i][j]==2048)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(255,43,0,0.6)";
        else if(a[i][j]==4096)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(204,0,0,0.6)";
        else if(a[i][j]==8192)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(153,0,0,0.6)";
        else if(a[i][j]==8192*2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(135,0,0,0.6)";
        else if(a[i][j]==8192*4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(120,0,0,0.6)";
        else if(a[i][j]==8192*8)
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
    if(a[i][j]==0)
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
    if(a[i][j]%win==0 && a[i][j]!=0)
    return true;
    return false;
}
function up()
{
    for(let j=0;j<4;j++)
    {
        for(let i=0;i<3;i++)
        for(let k=i+1;k<4;k++)
        if(a[i][j]==0 && a[k][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i--][j]=a[k][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]==a[k][j] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]!=0 && a[k][j]!=0)
        break;
    }
}
function left()
{
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<3;j++)
        for(let k=j+1;k<4;k++)
        if(a[i][j]==0 && a[i][k]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j--]=a[i][k];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]==a[i][k] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]!=0 && a[i][k]!=0)
        break;
    }
}
function down()
{
    for(let j=0;j<4;j++)
    {
        for(let i=3;i>0;i--)
        for(let k=i-1;k>=0;k--)
        if(a[i][j]==0 && a[k][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i++][j]=a[k][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]==a[k][j] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]!=0 && a[k][j]!=0)
        break;
    }
}
function right()
{
    for(let i=0;i<4;i++)
    {
        for(let j=3;j>0;j--)
        for(let k=j-1;k>=0;k--)
        if(a[i][j]==0 && a[i][k]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j++]=a[i][k];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]==a[i][k] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]!=0 && a[i][k]!=0)
        break;
    }
}
function undo()
{
    if(fl)
    b=copyboard(a);
    fl=false;
}
/*function lol()
{
    let c=2;
    for(let i=0;i<4;i++)
    for(let j=0;j<4;j++,c*=2)
    a[i][j]=c;
}*/
function My2048Main()
{
    generate();
    generate();
    //lol();
    b=a;
    display();
}