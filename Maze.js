let matrix,row,col,maxdistance,showexit,exitrow,exitcol,pathleft,hmmm;
function rm(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}
function array(n,d)
{
    let a;
    if(d!=0)
    {
        a=new Array();
        for(let i=0;i<n;i++)
        a[i]=array(n,d-1);
    }
    else
    a=0;
    return a;
}
function clear()
{
    for(let i=1;i<matrix.length-1;i++)
    for(let j=1;j<matrix[i].length-1;j++)
    matrix[i][j]=' ';
}
function setMaze()
{
    for(let i=0;i<matrix.length;i++)
    for(let j=0;j<matrix[0].length;j++)
    if(i==row && j==col)
    {
        if(matrix[i][j]=='¤' && showexit)
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(238,238,110)";
        else
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(251,198,255)";
        document.getElementById(`${i}td${j}`).innerText=String.fromCharCode(9675);
    }
    else if(matrix[i][j]=='¤' && showexit)
    {
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(238,238,110)";
        document.getElementById(`${i}td${j}`).innerText="•";
    }
    else if(matrix[i][j]=='•'||matrix[i][j]=='¤')
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
    for(let i=0;i<matrix.length;i++)
    matrix[i][0]=matrix[i][matrix[0].length-1]=String.fromCharCode(9632);
    for(let j=0;j<matrix[0].length;j++)
    matrix[0][j]=matrix[matrix.length-1][j]=String.fromCharCode(9632);
}
function makePath()
{
    makeBoundary();
    row=rm(1,matrix.length-2);
    col=rm(1,matrix[0].length-2);
    matrix[row][col]='•';
    pathleft.push(row*matrix[0].length+col);
    while(pathleft.length>0)
    {
        let choose=rm(0,pathleft.length-1);
        row=Math.floor(pathleft[choose]/matrix[0].length);
        col=pathleft[choose]%matrix[0].length;
        for(let pathover=false;!pathover;)
        pathover=direction(rm(0,3));
    }
    direction(rm(0,3));
}
function direction(dir)
{
    switch(dir)
    {
        case 0:if(matrix[row][col-1]==' ' && checkDirection(row,col-1,'•')==1)
        {
            col--;
            matrix[row][col]='•';
            pathleft.push(row*matrix[0].length+col);
            return false;
        }
        case 1:if(matrix[row-1][col]==' ' && checkDirection(row-1,col,'•')==1)
        {
            row--;
            matrix[row][col]='•';
            pathleft.push(row*matrix[0].length+col);
            return false;
        }
        case 2:if(matrix[row][col+1]==' ' && checkDirection(row,col+1,'•')==1)
        {
            col++;
            matrix[row][col]='•';
            pathleft.push(row*matrix[0].length+col);
            return false;
        }
        case 3:if(matrix[row+1][col]==' ' && checkDirection(row+1,col,'•')==1)
        {
            row++;
            matrix[row][col]='•';
            pathleft.push(row*matrix[0].length+col);
            return false;
        }
    }
    if(dir!=0)
    return direction(0);
    pathleft.splice(pathleft.indexOf(row*matrix[0].length+col),1);
    return true;
}
function checkDirection(i,j,ch)
{
    try
    {
        let c=0;
        if(matrix[i][j-1]==ch)
        c++;
        if(matrix[i-1][j]==ch)
        c++;
        if(matrix[i][j+1]==ch)
        c++;
        if(matrix[i+1][j]==ch)
        c++;
        return c;
    }
    catch(e)
    {
        return -1;
    }
}
function setExit(i,j)
{
    if(j==1)
    matrix[i][col=j-1]='•';
    else if(i==1)
    matrix[row=i-1][j]='•';
    else if(j==matrix[0].length-2)
    matrix[i][col=j+1]='•';
    else if(row==matrix.length-2)
    matrix[row=i+1][j]='•';
}
function makeExit()
{
    row=1;
    col=1;
    while(matrix[row][col]!='•')
    row++;
    let distance=checkDistance(row,col,-1);
    if(distance[0]+1>maxdistance[0])
    {
        maxdistance[0]=distance[0]+1;
        maxdistance[1]=distance[1];
        maxdistance[2]=distance[2];
        maxdistance[3]=row;
        maxdistance[4]=col;
    }

    row=maxdistance[1];
    col=maxdistance[2];
    setExit(row,col);
    row=maxdistance[3];
    col=maxdistance[4];
    setExit(row,col);
    setMaze();
}
function checkDistance(row,col,dir)
{
    if(matrix[row][col]!='•')
    return [-1,-1,-1];

    let distance=array(4,1);
    for(let i=0;i<4;i++)
    distance[i]=[-1,-1,-1];
    if(matrix[row][col-1]=='•' && dir!=0)
    distance[0]=checkDistance(row,col-1,2);
    if(matrix[row-1][col]=='•' && dir!=1)
    distance[1]=checkDistance(row-1,col,3);
    if(matrix[row][col+1]=='•' && dir!=2)
    distance[2]=checkDistance(row,col+1,0);
    if(matrix[row+1][col]=='•' && dir!=3)
    distance[3]=checkDistance(row+1,col,1);

    for(let i=0;i<4-1;i++)
    for(let j=i+1;j<4;j++)
    if(distance[i][0]+distance[j][0]+1>maxdistance[0])
    {
        maxdistance[0]=distance[i][0]+distance[j][0]+1;
        maxdistance[1]=distance[i][1];
        maxdistance[2]=distance[i][2];
        maxdistance[3]=distance[j][1];
        maxdistance[4]=distance[j][2];
    }

    for(let i=1;i<4;i++)
    if(distance[i][0]>distance[0][0])
    for(let j=0;j<3;j++)
    distance[0][j]=distance[i][j];
    distance[0][0]+=1;

    if(distance[0][0]==0)
    {
        distance[0][1]=row;
        distance[0][2]=col;
    }

    if(distance[0][1]!=1 && distance[0][1]!=matrix.length-2 && distance[0][2]!=1 && distance[0][2]!=matrix[0].length-2)
    distance[0]=[-1,-1,-1];

    return distance[0];
}
function makeWalls()
{
    for(let i=0;i<matrix.length;i++)
    for(let j=0;j<matrix[i].length;j++)
    if(matrix[i][j]==' ')
    matrix[i][j]=String.fromCharCode(9632);
}
function showExit(i,j)
{
    matrix[i][j]='¤';
    if(j==matrix[0].length-1)
    searchExit(i,j-1,2);
    else if(i==matrix.length-1)
    searchExit(i-1,j,3);
    else if(j==0)
    searchExit(i,j+1,0);
    else if(i==0)
    searchExit(i+1,j,1);
}
function searchExit(i,j,dir)
{
    if((i==0||i==matrix.length-1||j==0||j==matrix[0].length-1) && matrix[i][j]=='•')
    {
        matrix[i][j]='¤';
        exitrow=i;
        exitcol=j;
        return true;
    }
    if(matrix[i][j]==String.fromCharCode(9632))
    return false;
    if(dir==0)
    if(searchExit(i-1,j,3)||searchExit(i,j+1,0)||searchExit(i+1,j,1))
    {
        matrix[i][j]='¤';
        return true;
    }
    if(dir==1)
    if(searchExit(i,j-1,2)||searchExit(i,j+1,0)||searchExit(i+1,j,1))
    {
        matrix[i][j]='¤';
        return true;
    }
    if(dir==2)
    if(searchExit(i,j-1,2)||searchExit(i-1,j,3)||searchExit(i+1,j,1))
    {
        matrix[i][j]='¤';
        return true;
    }
    if(dir==3)
    if(searchExit(i,j-1,2)||searchExit(i-1,j,3)||searchExit(i,j+1,0))
    {
        matrix[i][j]='¤';
        return true;
    }
    return false;
}
function MazeMain()
{
    row=0;
    col=0;
    maxdistance=[-1,-1,-1,-1,-1];
    showexit=false;
    exitrow=-1;
    exitcol=-1;
    pathleft=new Array();
    hmmm="";
    let h=document.getElementById("needsize").value;
    document.getElementById("needsize").style.visibility="hidden";
    group=document.getElementsByClassName("option");
    for(let i=0;i<4;i++)
    group[i].style.visibility="visible";
    document.getElementById("enter").remove();
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
    else if(h>133)
    h=133;
    document.getElementById("label").innerText="Press W,A,S,D or arrow keys or 8,4,2,6 to move. Drag the buttons to your convenience. Zoom out the page to get a clear view";
    matrix=new Array();
    let table=document.createElement("table");
    document.getElementById("playground").appendChild(table);
    for(let i=0;i<h;i++)
    {
        let tr=document.createElement("tr");
        table.appendChild(tr);
        matrix[i]=new Array();
        for(let j=0;j<h*3;j++)
        {
            let td=document.createElement("td");
            td.id=`${i}td${j}`;
            tr.appendChild(td);
            matrix[i][j]=' ';
        }
    }
    makePath();
    makeExit();
    makeWalls();
    showExit(row,col);

    let userx=0,usery=0,startx=0,starty=0;
    document.getElementById("buttons").addEventListener("mousedown",function(event)
    {
        startx=event.clientX;
        starty=event.clientY;
        document.onmousemove=drag;
        document.onmouseup=stopDrag;
    }
    );
    function drag(event)
    {
        userx=startx-event.clientX;
        usery=starty-event.clientY;
        startx=event.clientX;
        starty=event.clientY;
        document.getElementById("buttons").style.top=Math.min(window.innerHeight-75,Math.max(25,document.getElementById("buttons").offsetTop-usery))+"px";
        document.getElementById("buttons").style.left=Math.min(window.innerWidth-135,Math.max(135,document.getElementById("buttons").offsetLeft-userx))+"px";
    }
    function stopDrag()
    {
        document.onmousemove=null;
    }

    document.getElementById("buttons").addEventListener("touchmove",function(event)
    {
        event.preventDefault();
        document.getElementById("buttons").style.position="absolute";
        document.getElementById("buttons").style.top=Math.min(document.documentElement.scrollWidth-135,Math.max(135,event.targetTouches[0].pageY))+"px";
        document.getElementById("buttons").style.left=Math.min(document.documentElement.scrollWidth-75,Math.max(25,event.targetTouches[0].pageX))+"px";
    }
    );

    document.getElementById("up").addEventListener("click",function()
    {
        if(row==0)
        document.getElementById("label").innerText="You can't go back coward";
        else if(matrix[row-1][col]==String.fromCharCode(9632))
        document.getElementById("label").innerText="You can't go that side. There's a wall";
        else
        {
            document.getElementById("label").innerText="Up";
            row--;
        }
        hmmm+="U";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        if((row==0||col==0||row==matrix.length-1||col==matrix[row].length-1) && row==exitrow && col==exitcol)
        {
            document.getElementById("label").innerText="Congratulations! You've finally reached the end!";
            showexit=true;
        }
        setMaze();
    }
    );

    document.getElementById("left").addEventListener("click",function()
    {
        if(col==0)
        document.getElementById("label").innerText="You can't go back coward";
        else if(matrix[row][col-1]==String.fromCharCode(9632))
        document.getElementById("label").innerText="You can't go that side. There's a wall";
        else
        {
            document.getElementById("label").innerText="Left";
            col--;
        }
        hmmm+="L";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        if((row==0||col==0||row==matrix.length-1||col==matrix[row].length-1) && row==exitrow && col==exitcol)
        {
            document.getElementById("label").innerText="Congratulations! You've finally reached the end!";
            showexit=true;
        }
        setMaze();
    }
    );

    document.getElementById("down").addEventListener("click",function()
    {
        if(row==matrix.length-1)
        document.getElementById("label").innerText="You can't go back coward";
        else if(matrix[row+1][col]==String.fromCharCode(9632))
        document.getElementById("label").innerText="You can't go that side. There's a wall";
        else
        {
            document.getElementById("label").innerText="Down";
            row++;
        }
        hmmm+="D";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        if((row==0||col==0||row==matrix.length-1||col==matrix[row].length-1) && row==exitrow && col==exitcol)
        {
            document.getElementById("label").innerText="Congratulations! You've finally reached the end!";
            showexit=true;
        }
        setMaze();
    }
    );

    document.getElementById("right").addEventListener("click",function()
    {
        if(col==matrix[0].length-1)
        document.getElementById("label").innerText="You can't go back coward";
        else if(matrix[row][col+1]==String.fromCharCode(9632))
        document.getElementById("label").innerText="You can't go that side. There's a wall";
        else
        {
            document.getElementById("label").innerText="Down";
            col++;
        }
        hmmm+="R";
        hmmm=hmmm.substring(Math.max(0,hmmm.length-8));
        if(hmmm=="LUDRLUDR")
        showexit=!showexit;
        if((row==0||col==0||row==matrix.length-1||col==matrix[row].length-1) && row==exitrow && col==exitcol)
        {
            document.getElementById("label").innerText="Congratulations! You've finally reached the end!";
            showexit=true;
        }
        setMaze();
    }
    );

    window.addEventListener("keydown",function(event)
    {
        if(event.code=="ArrowUp"||event.code=="KeyW"||event.code=="Numpad8")
        {
            if(row==0)
            document.getElementById("label").innerText="You can't go back coward";
            else if(matrix[row-1][col]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Up";
                row--;
            }
        }
        else if(event.code=="ArrowLeft"||event.code=="KeyA"||event.code=="Numpad4")
        {
            if(col==0)
            document.getElementById("label").innerText="You can't go back coward";
            else if(matrix[row][col-1]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Left";
                col--;
            }
        }
        else if(event.code=="ArrowDown"||event.code=="KeyS"||event.code=="Numpad2")
        {
            if(row==matrix.length-1)
            document.getElementById("label").innerText="You can't go back coward";
            else if(matrix[row+1][col]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Down";
                row++;
            }
        }
        else if(event.code=="ArrowRight"||event.code=="KeyD"||event.code=="Numpad6")
        {
            if(col==matrix[0].length-1)
            document.getElementById("label").innerText="You can't go back coward";
            else if(matrix[row][col+1]==String.fromCharCode(9632))
            document.getElementById("label").innerText="You can't go that side. There's a wall";
            else
            {
                document.getElementById("label").innerText="Down";
                col++;
            }
        }
        else if(event.code=="KeyG")
        showexit=!showexit;
        if(event.code!="KeyG" && (row==0||col==0||row==matrix.length-1||col==matrix[row].length-1) && row==exitrow && col==exitcol)
        {
            document.getElementById("label").innerText="Congratulations! You've finally reached the end!";
            showexit=true;
        }
        setMaze();
    }
    );
}
form.addEventListener("submit",function()
{
    MazeMain();
}
);