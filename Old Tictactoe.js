let a,usymbol,csymbol,turn,end=false;
function show()
{
    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
    document.getElementById(`td${i}${j}`).innerText=""+a[i][j];
}
function checkfullboard()
{
    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
    if(a[i][j]==' ')
    return false;
    return true;
}
function checkwin()
{
    let s="";
    for(let i=0;i<3;i++,checkwintrue(s))
    s=""+a[i][0]+a[i][1]+a[i][2];
    for(let i=0;i<3;i++,checkwintrue(s))
    s=""+a[0][i]+a[1][i]+a[2][i];
    s=""+a[0][0]+a[1][1]+a[2][2];
    checkwintrue(s);
    s=""+a[0][2]+a[1][1]+a[2][0];
    checkwintrue(s);
}
function checkwintrue(s)
{
    if(s==""+usymbol+usymbol+usymbol)
    {
        document.getElementById("label").innerText="Wow you won. That was fantastic! Reload the page to play again!";
        end=true;
    }
    else if(s==""+csymbol+csymbol+csymbol)
    {
        document.getElementById("label").innerText="Sorry you lose :/  Reload the page to play again!";
        end=true;
    }
}
function checktie()
{
    let fl=1;
    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
    if(a[i][j]==' ')
    fl=0;
    if(fl==1)
    document.getElementById("label").innerText="It was a tie. Reload the page to play again!";
}
function emptyboard()
{
    let c=0;
    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
    if(a[i][j]==' ')
    c++;
    return c==9;
}
function trywin()
{
    let s="";
    for(let i=0;i<3;i++)
    {
        s=""+a[i][0]+a[i][1]+a[i][2];
        if(s==""+csymbol+csymbol+" "||s==""+csymbol+" "+csymbol||s==" "+csymbol+csymbol)
        {
            a[i][s.indexOf(' ')]=csymbol;
            return;
        }
    }
    for(let i=0;i<3;i++)
    {
        s=""+a[0][i]+a[1][i]+a[2][i];
        if(s==""+csymbol+csymbol+" "||s==""+csymbol+" "+csymbol||s==" "+csymbol+csymbol)
        {
            a[s.indexOf(' ')][i]=csymbol;
            return;
        }
    }
    s=""+a[0][0]+a[1][1]+a[2][2];
    if(s==""+csymbol+csymbol+" "||s==""+csymbol+" "+csymbol||s==" "+csymbol+csymbol)
    {
        a[s.indexOf(' ')][s.indexOf(' ')]=csymbol;
        return;
    }
    s=""+a[0][2]+a[1][1]+a[2][0];
    if(s==""+csymbol+csymbol+" "||s==""+csymbol+" "+csymbol||s==" "+csymbol+csymbol)
    {
        a[s.indexOf(' ')][2-s.indexOf(' ')]=csymbol;
        return;
    }
    tryblock();
}
function tryblock()
{
    let s="";
    for(let i=0;i<3;i++)
    {
        s=""+a[i][0]+a[i][1]+a[i][2];
        if(s==""+usymbol+usymbol+" "||s==""+usymbol+" "+usymbol||s==" "+usymbol+usymbol)
        {
            a[i][s.indexOf(' ')]=csymbol;
            return;
        }
    }
    for(let i=0;i<3;i++)
    {
        s=""+a[0][i]+a[1][i]+a[2][i];
        if(s==""+usymbol+usymbol+" "||s==""+usymbol+" "+usymbol||s==" "+usymbol+usymbol)
        {
            a[s.indexOf(' ')][i]=csymbol;
            return;
        }
    }
    s=""+a[0][0]+a[1][1]+a[2][2];
    if(s==""+usymbol+usymbol+" "||s==""+usymbol+" "+usymbol||s==" "+usymbol+usymbol)
    {
        a[s.indexOf(' ')][s.indexOf(' ')]=csymbol;
        return;
    }
    s=""+a[0][2]+a[1][1]+a[2][0];
    if(s==""+usymbol+usymbol+" "||s==""+usymbol+" "+usymbol||s==" "+usymbol+usymbol)
    {
        a[s.indexOf(' ')][2-s.indexOf(' ')]=csymbol;
        return;
    }
    tryplace();
}
function tryplace()
{
    let s="";
    for(let i=0;i<3;i++)
    {
        s=""+a[i][0]+a[i][1]+a[i][2];
        if(s==""+csymbol+"  "||s==" "+csymbol+" "||s=="  "+csymbol)
        {
            if(r()%2==0)
            a[i][s.indexOf(' ')]=csymbol;
            else
            a[i][s.lastIndexOf(' ')]=csymbol;
            return;
        }
    }
    for(let i=0;i<3;i++)
    {
        s=""+a[0][i]+a[1][i]+a[2][i];
        if(s==""+csymbol+"  "||s==" "+csymbol+" "||s=="  "+csymbol)
        {
            if(r()%2==0)
            a[s.indexOf(' ')][i]=csymbol;
            else
            a[s.lastIndexOf(' ')][i]=csymbol;
            return;
        }
    }
    s=""+a[0][0]+a[1][1]+a[2][2];
    if(s==""+csymbol+"  "||s==" "+csymbol+" "||s=="  "+csymbol)
    {
        if(r()%2==0)
        a[s.indexOf(' ')][s.indexOf(' ')]=csymbol;
        else
        a[s.lastIndexOf(' ')][s.lastIndexOf(' ')]=csymbol;
        return;
    }
    s=""+a[0][2]+a[1][1]+a[2][0];
    if(s==""+csymbol+"  "||s==" "+csymbol+" "||s=="  "+csymbol)
    {
        if(r()%2==0)
        a[s.indexOf(' ')][2-s.indexOf(' ')]=csymbol;
        else
        a[s.lastIndexOf(' ')][2-s.lastIndexOf(' ')]=csymbol;
        return;
    }
    tryrandom();
}
function tryrandom()
{
    let rm;
    for(rm=r();a[2-Math.floor((rm-1)/3)][(rm-1)%3]!=' ';rm=r());
    a[2-Math.floor((rm-1)/3)][(rm-1)%3]=csymbol;
}
function r()
{
    let rm=Math.floor(Math.random()*10);
    if(rm!=0)
    return rm;
    else
    return r();
}
function TictactoeMain()
{
    a=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    if(r()%2==0)
    {
        csymbol='o';
        usymbol='x';
    }
    else
    {
        csymbol='x';
        usymbol='o';
        trywin();
        show();
    }
    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
    document.getElementById(`td${i}${j}`).addEventListener("click",function()
    {
        if(!end)
        {
            if(a[i][j]!=' ')
            document.getElementById("label").innerText="That space is already occupied. Choose another one.";
            else
            a[i][j]=usymbol;
            show();
            checkwin();
            if(!end)
            checktie();
            if(!end && !checkfullboard())
            trywin();
            show();
            checkwin();
            if(!end)
            checktie();
        }
    }
    );
}