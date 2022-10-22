let a,r=0,c=0,maxd=0,t=false,showexit=false,exitr=-1,exitc=-1;
function rm(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}
function clear()
{
    for(let i=1;i<a.length-1;i++)
    for(let j=1;j<a[i].length-1;j++)
    a[i][j]=' ';
}
function setMaze()
{
    for(let i=0;i<a.length;i++)
    for(let j=0;j<a[0].length;j++)
    if(i==r && j==c)
    {
        if(a[i][j]=='¤' && showexit)
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(238,238,110)";
        else
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(251,198,255)";
        document.getElementById(`${i}td${j}`).innerText=String.fromCharCode(9675);
    }
    else if(a[i][j]=='¤' && showexit)
    {
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(238,238,110)";
        document.getElementById(`${i}td${j}`).innerText="•";
    }
    else if(a[i][j]=='•'||a[i][j]=='¤')
    {
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(251,198,255)";
        document.getElementById(`${i}td${j}`).innerText="•";
    }
    else
    {
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(0,0,0)";
    }
}
function makeBoundary()
{
    for(let i=0;i<a.length;i++)
    for(let j=0;j<a[i].length;j++)
    if(i==0||j==0||i==a.length-1||j==a[i].length-1)
    a[i][j]=String.fromCharCode(9632);
}
function makePath()
{
    for(let i=0;i<1;i++)
    {
        clear();
        makeBoundary();
        r=rm(0,a.length-1);
        c=rm(0,a[0].length-1);
        a[r][c]='H';
        if(r==0 && c!=0 && c!=a[0].length-1)
        a[++r][c]='•';
        else if(r==a.length-1 && c!=0 && c!=a[0].length-1)
        a[--r][c]='•';
        else if(c==0 && r!=0 && r!=a.length-1)
        a[r][++c]='•';
        else if(c==a[0].length-1 && r!=0 && r!=a.length-1)
        a[r][--c]='•';
        else
        i--;
    }
    for(;checkmap();)
    {
        t=false;
        if(a[r][c]=='•')
        {
            for(;!t;)
            direction(rm(0,3),false);
            r=rm(1,a.length-2);
            c=rm(1,a[r].length-2);
        }
        else
        c++;
        if(c==a[r].length-1)
        {
            c=1;
            r=++r%(a.length-1);
        }
        if(r==0)
        r++;
    }
}
function direction(d,b)
{
    switch(d)
    {
        case 0:if( (a[r][c-1]==' ' && checkDirection(r,c-1,'•')==1) || (a[r][c-1]==String.fromCharCode(9632) && b) )
        {
            t=false;
            c--;
            a[r][c]='•';
            break;
        }
        case 1:if( (a[r-1][c]==' ' && checkDirection(r-1,c,'•')==1) || (a[r-1][c]==String.fromCharCode(9632) && b) )
        {
            t=false;
            r--;
            a[r][c]='•';
            break;
        }
        case 2:if( (a[r][c+1]==' ' && checkDirection(r,c+1,'•')==1) || (a[r][c+1]==String.fromCharCode(9632) && b) )
        {
            t=false;
            c++;
            a[r][c]='•';
            break;
        }
        case 3:if( (a[r+1][c]==' ' && checkDirection(r+1,c,'•')==1) || (a[r+1][c]==String.fromCharCode(9632) && b) )
        {
            t=false;
            r++;
            a[r][c]='•';
            break;
        }
        default:if(t)
        return;
        else
        {
            t=true;
            direction(0,b);
        }
    }
}
function checkmap()
{
    for(let i=0;i<a.length;i++)
    for(let j=0;j<a[i].length;j++)
    if(a[i][j]==' ' && checkDirection(i,j,'•')==1)
    return true;
    return false;
}
function checkDirection(i,j,ch)
{
    try
    {
        let c=0;
        if(a[i][j-1]==ch)
        c++;
        if(a[i-1][j]==ch)
        c++;
        if(a[i][j+1]==ch)
        c++;
        if(a[i+1][j]==ch)
        c++;
        return c;
    }
    catch(e)
    {
        return 1;
    }
}
function makeExit()
{
    for(let i=0;i<a.length;i++)
    for(let j=0;j<a[0].length;j++)
    if(a[i][j]=='H')
    {
        r=i;
        c=j;
    }
    if(c==a[0].length-1)
    checkDistance(r,c-1,1,2);
    else if(r==a.length-1)
    checkDistance(r-1,c,1,3);
    else if(c==0)
    checkDistance(r,c+1,1,0);
    else if(r==0)
    checkDistance(r+1,c,1,1);
    if(c==1)
    a[r][c-1]='•';
    else if(r==1)
    a[r-1][c]='•';
    else if(c==a[0].length-2)
    a[r][c+1]='•';
    else if(r==a.length-2)
    a[r+1][c]='•';
}
function checkDistance(row,col,d,dir)
{
    if( d>maxd && (row==1||row==a.length-2||col==1||col==a[0].length-2) )
    {
        maxd=d;
        r=row;
        c=col;
    }
    if(a[row][col-1]=='•' && dir!=0)
    checkDistance(row,col-1,d+1,2);
    if(a[row-1][col]=='•' && dir!=1)
    checkDistance(row-1,col,d+1,3);
    if(a[row][col+1]=='•' && dir!=2)
    checkDistance(row,col+1,d+1,0);
    if(a[row+1][col]=='•' && dir!=3)
    checkDistance(row+1,col,d+1,1);
}
function makeWalls()
{
    for(let i=0;i<a.length;i++)
    for(let j=0;j<a[i].length;j++)
    if(a[i][j]==' ')
    a[i][j]=String.fromCharCode(9632);
}
function showExit(p1,p2)
{
    a[p1][p2]='¤';
    if(p2==a[0].length-1)
    searchExit(p1,p2-1,2);
    else if(p1==a.length-1)
    searchExit(p1-1,p2,3);
    else if(p2==0)
    searchExit(p1,p2+1,0);
    else if(p1==0)
    searchExit(p1+1,p2,1);
}
function searchExit(i,j,dir)
{
    if((i==0||i==a.length-1||j==0||j==a[0].length-1) && a[i][j]=='•')
    {
        a[i][j]='¤';
        return true;
    }
    if(a[i][j]==String.fromCharCode(9632))
    return false;
    if(dir==0)
    if(searchExit(i-1,j,3)||searchExit(i,j+1,0)||searchExit(i+1,j,1))
    {
        a[i][j]='¤';
        return true;
    }
    if(dir==1)
    if(searchExit(i,j-1,2)||searchExit(i,j+1,0)||searchExit(i+1,j,1))
    {
        a[i][j]='¤';
        return true;
    }
    if(dir==2)
    if(searchExit(i,j-1,2)||searchExit(i-1,j,3)||searchExit(i+1,j,1))
    {
        a[i][j]='¤';
        return true;
    }
    if(dir==3)
    if(searchExit(i,j-1,2)||searchExit(i-1,j,3)||searchExit(i,j+1,0))
    {
        a[i][j]='¤';
        return true;
    }
    return false;
}
function MazeMain()
{
    let play=false;
    window.addEventListener("keydown",function(event)
    {
        if(!play && (event.code=="Enter" ||event.code=="NumpadEnter"))
        {
            play=true;
            let h=document.getElementById("needsize").value;
            document.getElementById("needsize").style.display="none";
            try
            {
                if(h=="")
                h=rm(8,42);
                else
                h=parseInt(h);
            }
            catch(e)
            {
                h=rm(8,42);
            }
            if(h<8)
            h=8;
            else if(h>56)
            h=56;
            document.getElementById("label").innerText="Press W,A,S,D or arrow keys or 8,4,2,6 to move.";
            a=new Array();
            let table=document.createElement("table");
            document.getElementById("playground").appendChild(table);
            for(let i=0;i<h;i++)
            {
                let tr=document.createElement("tr");
                table.appendChild(tr);
                a[i]=new Array();
                for(let j=0;j<h*3;j++)
                {
                    let td=document.createElement("td");
                    td.id=`${i}td${j}`;
                    tr.appendChild(td);
                    a[i][j]=' ';
                }
            }
            makePath();
            makeExit();
            makeWalls();
            for(let i=0;i<a.length;i++)
            for(let j=0;j<a[0].length;j++)
            if(a[i][j]=='H')
            {
                a[i][j]='•';
                r=i;
                c=j;
                exitr=r;
                exitc=c;
            }
            showExit(r,c);
            setMaze();
        }
        if(play)
        if(event.code=="ArrowUp"||event.code=="KeyW"||event.code=="Numpad8")
        {
            if(r==0)
            document.getElementById("label").innerText="You can't go back coward";
            else if(a[r-1][c]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Up";
                r--;
            }
        }
        else if(event.code=="ArrowLeft"||event.code=="KeyA"||event.code=="Numpad4")
        {
            if(c==0)
            document.getElementById("label").innerText="You can't go back coward";
            else if(a[r][c-1]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Left";
                c--;
            }
        }
        else if(event.code=="ArrowDown"||event.code=="KeyS"||event.code=="Numpad2")
        {
            if(r==a.length-1)
            document.getElementById("label").innerText="You can't go back coward";
            else if(a[r+1][c]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Down";
                r++;
            }
        }
        else if(event.code=="ArrowRight"||event.code=="KeyD"||event.code=="Numpad6")
        {
            if(c==a[0].length-1)
            document.getElementById("label").innerText="You can't go back coward";
            else if(a[r][c+1]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Down";
                c++;
            }
        }
        else if(event.code=="KeyG")
        showexit=!showexit;
        if( play && (r==0||c==0||r==a.length-1||c==a[r].length-1) && (r!=exitr||c!=exitc) )
        document.getElementById("label").innerText="Congratulations! You've finally reached the end!";
        if(play)
        setMaze();
    }
    );
}