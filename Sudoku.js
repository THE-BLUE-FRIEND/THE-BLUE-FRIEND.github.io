let a=new array(9,2),b=new array(9,2),map=new array(9,3),c=new array(9,2),t=false,hint=false,squarei=-1,squarej=-1;
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
function r()
{
    return Math.floor(Math.random()*10)%9;
}
function copyboard(a)
{
    let b=new array(9,2);
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    b[i][j]=a[i][j];
    return b;
}
function checkequalboard(a,b)
{
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    if(b[i][j]!=a[i][j])
    return false;
    return true;
}
function checkanswer(a,b)
{
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    if(b[i][j]!=0 && b[i][j]!=a[i][j])
    return false;
    return true;
}
function elements(a)
{
    let c=0;
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    if(a[i][j]!=0)
    c++;
    return c;
}
function display(a,row,column)
{
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    {
        if(i==row && j==column)
        document.getElementById(`${i}${j}`).innerText="*";
        else if(a[i][j]==0)
        document.getElementById(`${i}${j}`).innerText="";
        else
        document.getElementById(`${i}${j}`).innerText=""+a[i][j];
        if(b[i][j]==0)
        document.getElementById(`${i}${j}`).style.color="rgb(210,0,0)";
        else
        document.getElementById(`${i}${j}`).style.color="rgb(0,0,0)";
        if(i==squarei && j==squarej)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(168, 202, 247)";
        else
        document.getElementById(`${i}${j}`).style.backgroundColor="rgba(233, 233, 233, 0.6)";
    }
}
function initialise()
{
    for(let i=0;i<9;i++)
    if(initialisebox(i))
    {
        a=new array(9,2);
        i=-1;
    }
    let min=new array(9,2),k=0;
    do
    {
        b=new array(9,2);
        map=new array(9,3);
        makequestion();
        if(elements(b)<elements(min))
        min=copyboard(b);
        k++;
    }
    while(elements(b)>27);
    c=copyboard(b);
}
function initialisebox(n)
{
    for(let i=Math.floor(n/3)*3;i<Math.floor(n/3)*3+3;i++)
    for(let j=n%3*3;j<n%3*3+3;j++)
    {
        let r=this.r()+1;
        if(checkplacement(i,j,r))
        a[i][j]=r;
        else if(checkempty(i,j))
        return true;
        else
        j--;
    }
    return false;
}
function checkempty(i,j)
{
    for(let k=1;k<=9;k++)
    if(checkplacement(i,j,k))
    return false;
    return true;
}
function checkplacement(i,j,r)
{
    for(let k=0;k<9;k++)
    if(a[i][k]==r)
    return false;
    for(let k=0;k<9;k++)
    if(a[k][j]==r)
    return false;
    for(let k=Math.floor(i/3)*3;k<Math.floor(i/3)*3+3;k++)
    for(let l=Math.floor(j/3)*3;l<Math.floor(j/3)*3+3;l++)
    if(a[k][l]==r)
    return false;
    return true;
}
function makequestion()
{
    for(let i=r(),j=r();;i=r(),j=r())
    {
        b[i][j]=a[i][j];
        if(checksolvable())
        break;
    }
}
function checksolvable()
{
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    if(b[i][j]!=0)
    map[b[i][j]-1][i][j]=1;
    newmap();
    for(;;t=false)
    {
        for(let k=0;k<9;k++)
        {
            for(let n=0;n<9;n++)
            {
                newboxmap(k,n);
                newmergemap(k,n);
                newcancelledmap(k,n);
            }
            for(let i=0;i<9;i++)
            newrowmap(k,i);
            for(let j=0;j<9;j++)
            newcolumnmap(k,j);
        }
        if(checkcompleteboard())
        return true;
        if(t==false)
        return false;
    }
}
function newboxmap(k,n)
{
    let c=0,p1=0,p2=0;
    for(let i=Math.floor(n/3)*3;i<Math.floor(n/3)*3+3;i++)
    for(let j=n%3*3;j<n%3*3+3;j++)
    if(map[k][i][j]==1)
    c+=2;
    else if(map[k][i][j]==0)
    {
        c++;
        p1=i;
        p2=j;
    }
    if(c==1)
    {
        map[k][p1][p2]=1;
        newmap();
        if(hint)
        {
            display(b,p1,p2);
            hint=false;
        }
    }
}
function newmergemap(k,n)
{
    let s="";
    let c=0;
    for(let i=Math.floor(n/3)*3;i<Math.floor(n/3)*3+3;i++)
    for(let j=n%3*3;j<n%3*3+3;j++)
    {
        s+=map[k][i][j];
        if(map[k][i][j]==0)
        c++;            
    }
    if(c>3)
    return;
    for(let i=0;i<s.length;i+=3)
    if( s.substring(i,i+3)=="000" || (c==2 && s.substring(i,i+3).indexOf('0')!=s.substring(i,i+3).lastIndexOf('0')) )
    for(let j=0;;j++)
    {
        if(j==n%3*3)
        j+=3;
        if(j==9)
        break;
        if(map[k][Math.floor(n/3)*3+Math.floor(i/3)][j]==0)
        t=true;
        map[k][Math.floor(n/3)*3+Math.floor(i/3)][j]=2;
    }
    for(let j=0;j<3;j++)
    if( (""+s.charAt(j)+s.charAt(j+3)+s.charAt(j+6))=="000" || (c==2 && (""+s.charAt(j)+s.charAt(j+3)+s.charAt(j+6)).indexOf('0')!=(""+s.charAt(j)+s.charAt(j+3)+s.charAt(j+6)).lastIndexOf('0')) )
    for(let i=0;;i++)
    {
        if(i==Math.floor(n/3)*3)
        i+=3;
        if(i==9)
        break;
        if(map[k][i][n%3*3+j]==0)
        t=true;
        map[k][i][n%3*3+j]=2;
    }
}
function newcancelledmap(k,n)
{
    let s=new Array();
    let cancel=6;
    for(let i=0;i<3;i++)
    s[i]=boxrowcheck(k,n,i);
    if(!s[0] && s[1] && s[3])
    cancel=0;
    else if(s[0] && !s[1] && s[3])
    cancel=1;
    else if(s[0] && s[1] && !s[3])
    cancel=2;
    s[cancel]=!s[cancel];
    if(cancel!=6)
    for(let i=n+1;i<Math.floor(n/3)*3+3;i++)
    {
        for(let j=0;j<3;j++)
        s[j+3]=boxrowcheck(k,i,j);
        s[3+cancel]=!s[3+cancel];
        for(let j=0;j<6 && s[j];j++)
        if(j==5)
        for(let m=Math.floor(n/3)*3;m<Math.floor(n/3)*3+3;m++)
        for(let l=0;l<9;l++)
        if(Math.floor(l/3)!=n%3 && Math.floor(l/3)!=i%3 && m!=Math.floor(n/3)*3+cancel && map[k][m][l]==0)
        {
            t=true;
            map[k][m][l]=2;
        }
    }
    cancel=6;
    for(let i=0;i<3;i++)
    s[i]=boxcolumncheck(k,n,i);
    if(!s[0] && s[1] && s[3])
    cancel=0;
    else if(s[0] && !s[1] && s[3])
    cancel=1;
    else if(s[0] && s[1] && !s[3])
    cancel=2;
    s[cancel]=!s[cancel];
    if(cancel!=6)
    for(let i=n+3;i<n%3+7;i+=3)
    {
        for(let j=0;j<3;j++)
        s[j+3]=boxcolumncheck(k,i,j);
        s[3+cancel]=!s[3+cancel];
        for(let j=0;j<6 && s[j];j++)
        if(j==5)
        for(let m=n%3*3;m<n%3*3+3;m++)
        for(let l=0;l<9;l++)
        if(Math.floor(l/3)!=Math.floor(n/3) && Math.floor(l/3)!=Math.floor(i/3) && m!=n%3*3+cancel && map[k][l][m]==0)
        {
            t=true;
            map[k][l][m]=2;
        }
    }
}
function boxrowcheck(k,n,r)
{
    for(let j=n%3*3;j<n%3*3+3;j++)
    if(map[k][Math.floor(n/3)*3+r][j]==0)
    return true;
    return false;
}
function boxcolumncheck(k,n,c)
{
    for(let i=Math.floor(n/3)*3;i<Math.floor(n/3)*3+3;i++)
    if(map[k][i][n%3*3+c]==0)
    return true;
    return false;
}
function newrowmap(k,i)
{
    let c=0,p=0;
    for(let j=0;j<9;j++)
    if(map[k][i][j]==1)
    c+=2;
    else if(map[k][i][j]==0)
    {
        c++;
        p=j;
    }
    if(c==1)
    {
        map[k][i][p]=1;
        newmap();
        if(hint)
        {
            display(b,i,p);
            hint=false;
        }
    }
}
function newcolumnmap(k,j)
{
    let c=0,p=0;
    for(let i=0;i<9;i++)
    if(map[k][i][j]==1)
    c+=2;
    else if(map[k][i][j]==0)
    {
        c++;
        p=i;
    }
    if(c==1)
    {
        map[k][p][j]=1;
        newmap();
        if(hint)
        {
            display(b,p,j);
            hint=false;
        }
    }
}
function newmap()
{
    t=true;
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    for(let k=0;k<9;k++)
    if(map[k][i][j]==1)
    {
        for(let l=0;l<9;l++)
        if(l!=j)
        map[k][i][l]=2;
        for(let l=0;l<9;l++)
        if(l!=i)
        map[k][l][j]=2;
        for(let l=Math.floor(i/3)*3;l<Math.floor(i/3)*3+3;l++)
        for(let m=Math.floor(j/3)*3;m<Math.floor(j/3)*3+3;m++)
        if(l!=i || m!=j)
        map[k][l][m]=2;
        for(let k1=0;k1<9;k1++)
        if(k1!=k)
        map[k1][i][j]=2;
    }
}
function checkcompleteboard()
{
    for(let k=0;k<9;k++)
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    if(map[k][i][j]==0)
    return false;
    return true;
}
function SudokuMain()
{
    initialise();
    document.getElementById("label").innerText="Click on a square and enter a number through your keyboard. Enter 0 to clear that square. Press C to clear all your placements. Press H to get a hint.";
    display(b,-1,-1);
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    document.getElementById(`${i}${j}`).addEventListener("click",function(event)
    {
        if(squarei==i && squarej==j)
        {
            squarei=-1;
            squarej=-1;
        }
        else
        {
            squarei=i;
            squarej=j;
        }
        display(c,-1,-1);
    }
    );
    window.addEventListener("keydown",function(event)
    {
        let s=event.code;
        if(s.substring(0,s.length-1)=="Digit"||s.substring(0,s.length-1)=="Numpad")
        {
            if(squarei!=-1 && squarej!=-1 && b[squarei][squarej]!=0)
            document.getElementById("label").innerText="That space is occupied by default. Please choose another one";
            else
            {
                c[squarei][squarej]=parseInt(""+s.charAt(s.length-1));
                if(s.charAt(s.length-1)=='0')
                document.getElementById("label").innerText="Number cleared";
                else
                document.getElementById("label").innerText="Number set";
                if(checkequalboard(a,c))
                document.getElementById("label").innerText="Congratulations! You've completed my sudoku!";
            }
            display(c,-1,-1);
        }
        if(s=="KeyH")
        {
            let cb=copyboard(b);
            b=copyboard(c);
            hint=true;
            map=new array(9,3);
            if(checkanswer(a,b) && checksolvable())
            ;
            else
            {
                document.getElementById("label").innerText="You did it wrong from the start lol. Enter 'C' and do it again.";
                b=copyboard(cb);
                display(c,-1,-1);
            }
            b=copyboard(cb);
        }
        if(s=="KeyC" && confirm("Do you want to clear all placements?"))
        {
            c=copyboard(b);
            document.getElementById("label").innerText="All placements cleared.";
            display(c,-1,-1);
        }
        if(s=="ArrowUp"||s=="KeyW")
        {
            if(squarei>0)
            squarei--;
            display(c,-1,-1);
        }
        if(s=="ArrowLeft"||s=="KeyA")
        {
            if(squarej>0)
            squarej--;
            display(c,-1,-1);
        }
        if(s=="ArrowDown"||s=="KeyS")
        {
            if(squarei<8)
            squarei++;
            display(c,-1,-1);
        }
        if(s=="ArrowRight"||s=="KeyD")
        {
            if(squarej<8)
            squarej++;
            display(c,-1,-1);
        }
    }
    );
}