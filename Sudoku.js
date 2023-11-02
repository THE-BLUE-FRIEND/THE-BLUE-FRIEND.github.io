let size,boxi,boxj,option,answer,question,user,map,valid,hint,hexa;
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
function rm(min,max)
{
    return (Math.floor)(Math.random()*(max-min+1))+min;
}
function hexinput(a)
{
    if(hexa)
    if(a==48)
    return 0;
    else
    return a-64;
    if(a>=48 && a<=48+9)
    return a-48;
    if(a>=65 && a<=65+25)
    return a-65+10;
    return -1;
}
function hex(a)
{
    if(a<=9)
    return a;
    return String.fromCharCode(a+55);
}
function show(a)
{
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    {
        if(hexa)
        document.getElementById(`${i}td${j}`).innerText=(a[i][j]!=0?""+hex(a[i][j]+9):"");
        else
        document.getElementById(`${i}td${j}`).innerText=(a[i][j]!=0?""+hex(a[i][j]):"");
        if(question[i][j]==0)
        document.getElementById(`${i}td${j}`).style.color="rgb(210,0,0)";
        else
        document.getElementById(`${i}td${j}`).style.color="rgb(0,0,0)";
        if(i==boxi && j==boxj)
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(236,137,249)";
        else
        document.getElementById(`${i}td${j}`).style.backgroundColor=null;
    }
    for(let i=0;i<size*size;i++)
    {
        if(hexa)
        document.getElementById(`num${i}`).innerText=""+hex(i+10);
        else
        document.getElementById(`num${i}`).innerText=""+hex(i+1);
        document.getElementById(`num${i}`).style.color="rgb(0,0,0)";
    }
}
function clone(a)
{
    let b;
    if(a instanceof Array)
    {
        b=new Array();
        for(let i=0;i<a.length;i++)
        b[i]=clone(a[i]);
    }
    else
    b=a;
    return b;
}
function checkequalboard(a,b)
{
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    if(b[i][j]!=a[i][j])
    return false;
    return true;
}
function checkanswer(a,b)
{
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    if(b[i][j]!=0 && b[i][j]!=a[i][j])
    return false;
    return true;
}
function checkcompletemap()
{
    for(let n=0;n<size*size;n++)
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    if(map[n][i][j]==0)
    return false;
    return true;
}
function initializemap()
{
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    if(question[i][j]!=0)
    map[question[i][j]-1][i][j]=1;
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    if(question[i][j]!=0)
    updatemap(question[i][j]-1,i,j);
}
function checkvalid()
{
    let set;
    for(let i=0;i<size*size;i++)
    {
        set=array(size*size,1);
        for(let j=0;j<size*size;j++)
        if(set[answer[i][j]-1])
        return false;
        else
        set[answer[i][j]-1]=true;
    }
    for(let j=0;j<size*size;j++)
    {
        set=array(size*size,1);
        for(let i=0;i<size*size;i++)
        if(set[answer[i][j]-1])
        return false;
        else
        set[answer[i][j]-1]=true;
    }
    for(let i=0;i<size*size;i++)
    {
        set=array(size*size,1);
        for(let j=0;j<size*size;j++)
        if(set[answer[Math.floor(i/size)*size+Math.floor(j/size)][i%size*size+j%size]-1])
        return false;
        else
        set[answer[Math.floor(i/size)*size+Math.floor(j/size)][i%size*size+j%size]-1]=true;
    }
    return true;
}
function initialize()
{
    let set=array(size*size,1);
    for(let i=0;i<size*size;i++)
    set[i]=i+1;
    for(let i=0;i<size*size;i++)
    {
        let a=rm(0,size*size-1),b=rm(0,size*size-1);
        let t=set[a];
        set[a]=set[b];
        set[b]=t;
    }
    for(let i=0;i<size*size;i++)
    for(let j=0;j<size*size;j++)
    answer[i][j]=set[((Math.floor(i/size)+i%size*size+Math.floor(j/size)*size+j%size)%size+i%size*size+Math.floor(j/size)*size)%(size*size)];
    shuffle();
    let best=array(size*size,2);
    let min=size*size*size*size;
    for(let i=0;i<Math.max(1,5-size);i++)
    {
        question=clone(answer);
        let elements=makequestion();
        if(elements<min)
        {
            min=elements;
            best=clone(question);
        }
    }
    question=clone(best);
    user=clone(question);
    show(question);
}
function shuffle()
{
    for(let i=0;i<size*size*size*size;i++)
    {
        let r=rm(0,9);
        if(r==0)
        shufflerow();
        else if(r==1)
        shufflerowgroup();
        else if(r==2)
        shufflecolumn();
        else if(r==3)
        shufflecolumngroup();
        else if(r==4)
        rotate();
        else if(r==5)
        transpose();
        else if(r==6)
        mirror();
        else if(r==7)
        water();
    }
}
function shufflerow()
{
    let a=rm(0,size*size-1),b=rm(0,size*size-1);
    let last=clone(answer);
    for(let i=0;i<size*size;i++)
    {
        let t=answer[a][i];
        answer[a][i]=answer[b][i];
        answer[b][i]=t;
    }
    if(!checkvalid())
    answer=clone(last);
}
function shufflerowgroup()
{
    let a=rm(0,size-1),b=rm(0,size-1);
    for(let i=0;i<size;i++)
    for(let j=0;j<size*size;j++)
    {
        let t=answer[a*size+i][j];
        answer[a*size+i][j]=answer[b*size+i][j];
        answer[b*size+i][j]=t;
    }
}
function shufflecolumn()
{
    let a=rm(0,size*size-1),b=rm(0,size*size-1);
    let last=clone(answer);
    for(let i=0;i<size*size;i++)
    {
        let t=answer[i][a];
        answer[i][a]=answer[i][b];
        answer[i][b]=t;
    }
    if(!checkvalid())
    answer=clone(last);
}
function shufflecolumngroup()
{
    let a=rm(0,size-1),b=rm(0,size-1);
    for(let j=0;j<size;j++)
    for(let i=0;i<size*size;i++)
    {
        let t=answer[i][a*size+j];
        answer[i][a*size+j]=answer[i][b*size+j];
        answer[i][b*size+j]=t;
    }
}
function rotate()
{
    for(let i=0;i<size*size;i++)
    for(let j=i;j<size*size-i-1;j++)
    {
        let t=answer[i][j];
        answer[i][j]=answer[j][size*size-i-1];
        answer[j][size*size-i-1]=answer[size*size-i-1][size*size-j-1];
        answer[size*size-i-1][size*size-j-1]=answer[size*size-j-1][i];
        answer[size*size-j-1][i]=t;
    }
}
function transpose()
{
    for(let i=0;i<size*size;i++)
    for(let j=i;j<size*size;j++)
    {
        let t=answer[i][j];
        answer[i][j]=answer[j][i];
        answer[j][i]=t;
    }
}
function mirror()
{
    for(let i=0;i<size*size;i++)
    for(let j=0;j<Math.floor(size*size/2);j++)
    {
        let t=answer[i][j];
        answer[i][j]=answer[i][size*size-j-1];
        answer[i][size*size-j-1]=t;
    }
}
function water()
{
    for(let j=0;j<size*size;j++)
    for(let i=0;i<Math.floor(size*size/2);i++)
    {
        let t=answer[i][j];
        answer[i][j]=answer[size*size-i-1][j];
        answer[size*size-i-1][j]=t;
    }
}
function makequestion()
{
    let picked=0;
    for(let i=rm(0,size*size-1),j=rm(0,size*size-1),starti=i,startj=j;;)
    {
        if(question[i][j]==0)
        {
            j++;
            if(j==size*size)
            {
                j=0;
                i=++i%(size*size);
            }
            if(starti==i && startj==j)
            return size*size*size*size-picked;
            continue;
        }
        question[i][j]=0;
        picked++;
        map=array(size*size,3);
        initializemap();
        checksolve();
        let t=clone(question);
        if(checkcompletemap())
        {
            question=clone(t);
            i=rm(0,size*size-1);
            j=rm(0,size*size-1);
            starti=i;
            startj=j;
            continue;
        }
        else
        {
            question=clone(t);
            question[i][j]=answer[i][j];
            picked--;
            j++;
            if(j==size*size)
            {
                j=0;
                i=++i%(size*size);
            }
            if(starti==i && startj==j)
            return size*size*size*size-picked;
        }
    }
}
function checksolve()
{
    let elements=0;
    for(;;)
    {
        valid=false;
        for(let num=0;num<size*size;num++)
        {
            for(let i=0;i<size*size;i++)
            if(checkrow(num,i))
            elements++;
            for(let j=0;j<size*size;j++)
            if(checkcolumn(num,j))
            elements++;
            for(let box=0;box<size*size;box++)
            if(checkbox(num,box))
            elements++;
            for(let boxi=0;boxi<size;boxi++)
            blockboxrow(num,boxi);
            for(let boxj=0;boxj<size;boxj++)
            blockboxcolumn(num,boxj);
        }
        if(valid==false)
        return elements;
    }
}
function checkrow(num,i)
{
    let place=-1;
    for(let j=0;j<size*size;j++)
    if(map[num][i][j]==0)
    if(place!=-1)
    return false;
    else
    place=j;
    if(place==-1)
    return false;
    updatemap(num,i,place);
    return valid=true;
}
function checkcolumn(num,j)
{
    let place=-1;
    for(let i=0;i<size*size;i++)
    if(map[num][i][j]==0)
    if(place!=-1)
    return false;
    else
    place=i;
    if(place==-1)
    return false;
    updatemap(num,place,j);
    return valid=true;
}
function checkbox(num,box)
{
    let placei=-1,placej=-1;
    for(let squarei=Math.floor(box/size)*size;squarei<Math.floor(box/size)*size+size;squarei++)
    for(let squarej=box%size*size;squarej<box%size*size+size;squarej++)
    if(map[num][squarei][squarej]==0)
    if(placei!=-1)
    {
        blockrow(num,box,placei);
        blockcolumn(num,box,placej);
        return false;
    }
    else
    {
        placei=squarei;
        placej=squarej;
    }
    if(placei==-1)
    return false;
    updatemap(num,placei,placej);
    return valid=true;
}
function blockrow(num,box,foundi)
{
    for(let squarei=Math.floor(box/size)*size;squarei<Math.floor(box/size)*size+size;squarei++)
    for(let squarej=box%size*size;squarej<box%size*size+size;squarej++)
    if(map[num][squarei][squarej]==0 && foundi!=squarei)
    return;
    for(let row=0;row<size*size;row++)
    if(Math.floor(row/size)!=box%size)
    {
        if(map[num][foundi][row]==0)
        valid=true;
        map[num][foundi][row]=2;
    }
}
function blockcolumn(num,box,foundj)
{
    for(let squarei=Math.floor(box/size)*size;squarei<Math.floor(box/size)*size+size;squarei++)
    for(let squarej=box%size*size;squarej<box%size*size+size;squarej++)
    if(map[num][squarei][squarej]==0 && foundj!=squarej)
    return;
    for(let col=0;col<size*size;col++)
    if(Math.floor(col/size)!=Math.floor(box/size))
    {
        if(map[num][col][foundj]==0)
        valid=true;
        map[num][col][foundj]=2;
    }
}
function blockboxrow(num,group)
{
    let boxvalue=array(size,1),boxbit=array(size,1);
    for(let i=group*size;i<group*size+size;i++)
    for(let j=0;j<size*size;j++)
    if(map[num][i][j]==0)
    {
        boxvalue[Math.floor(j/size)]=boxvalue[Math.floor(j/size)]*2+1;
        boxbit[Math.floor(j/size)]++;
        j=Math.floor(j/size)*size+size-1;
    }
    else if(Math.floor(j/size)!=Math.floor((j+1)/size))
    boxvalue[Math.floor(j/size)]=boxvalue[Math.floor(j/size)]*2;
    for(let biti=2;biti<size;biti++)
    {
        let freq=new Map();
        for(let box=0;box<size;box++)
        if(biti==boxbit[box])
        if(!freq.has(boxvalue[box]))
        freq.set(boxvalue[box],1);
        else
        freq.set(boxvalue[box],freq.get(boxvalue[box])+1);
        for(let unique in freq)
        if(freq[unique]>=biti)
        {
            let t=unique;
            for(let i=group*size+size-1;i>=group*size;i--,t=Math.floor(t/2))
            if(t%2==1)
            for(let j=0;j<size*size;j++)
            if(boxvalue[Math.floor(j/size)]!=unique)
            {
                if(map[num][i][j]==0)
                valid=true;
                map[num][i][j]=2;
            }
        }
    }
}
function blockboxcolumn(num,group)
{
    let boxvalue=array(size,1),boxbit=array(size,1);
    for(let j=group*size;j<group*size+size;j++)
    for(let i=0;i<size*size;i++)
    if(map[num][i][j]==0)
    {
        boxvalue[Math.floor(i/size)]=boxvalue[Math.floor(i/size)]*2+1;
        boxbit[Math.floor(i/size)]++;
        i=Math.floor(i/size)*size+size-1;
    }
    else if(Math.floor(i/size)!=Math.floor((i+1)/size))
    boxvalue[Math.floor(i/size)]=boxvalue[Math.floor(i/size)]*2;
    for(let biti=2;biti<size;biti++)
    {
        let freq=new Map();
        for(let box=0;box<size;box++)
        if(biti==boxbit[box])
        if(!freq.has(boxvalue[box]))
        freq.set(boxvalue[box],1);
        else
        freq.set(boxvalue[box],freq.get(boxvalue[box])+1);
        for(let unique in freq)
        if(freq[unique]>=biti)
        {
            let t=unique;
            for(let j=group*size+size-1;j>=group*size;j--,t=Math.floor(t/2))
            if(t%2==1)
            for(let i=0;i<size*size;i++)
            if(boxvalue[Math.floor(i/size)]!=unique)
            {
                if(map[num][i][j]==0)
                valid=true;
                map[num][i][j]=2;
            }
        }
    }
}
function updatemap(num,i,j)
{
    if(map[num][i][j]!=1 && hint)
    {
        document.getElementById(`${i}td${j}`).innerText="*";
        document.getElementById("label").innerText="There's your hint";
        hint=false;
    }
    map[num][i][j]=1;
    for(let row=0;row<size*size;row++)
    if(row!=j)
    map[num][i][row]=2;
    for(let col=0;col<size*size;col++)
    if(col!=i)
    map[num][col][j]=2;
    for(let block=0;block<size*size;block++)
    if(block!=num)
    map[block][i][j]=2;
    for(let squarei=Math.floor(i/size)*size;squarei<Math.floor(i/size)*size+size;squarei++)
    for(let squarej=Math.floor(j/size)*size;squarej<Math.floor(j/size)*size+size;squarej++)
    if(squarei!=i || squarej!=j)
    map[num][squarei][squarej]=2;
}
function SudokuMain()
{
    size=document.getElementById("needsize").value;
    boxi=boxj=num=option=-1;
    hexa=false;
    let c=0;
    try
    {
        if(size=="")
        size=rm(2,5);
        else
        size=parseInt(size);
    }
    catch(e)
    {
        size=rm(2,5);
    }
    if(size<2)
    {
        document.getElementById("label").innerText="Oop! Size too smol lol. Play at 2.";
        size=2;
    }
    else if(size>5)
    {
        document.getElementById("label").innerText="Oh no! Size too big big. Play at 5.";
        size=5;
    }
    document.getElementById("label").innerText=document.getElementById("label").innerText+" Please wait while the sudoku is being created. Refresh the page if necessary.";
    document.getElementById("needsize").style.visibility="hidden";
    document.getElementById("enter").remove();

    answer=array(size*size,2);
    question=array(size*size,2);
    user=array(size*size,2);
    map=array(size*size,3);

    let table=document.createElement("table");
    table.classList.add("board");
    document.getElementById("playground").appendChild(table);
    table.createTBody();
    for(let i=0;i<size;i++)
    {
        let tr=document.createElement("tr");
        table.tBodies[0].appendChild(tr);
        for(let j=0;j<size;j++)
        {
            let td=document.createElement("td");
            td.classList.add("box");
            tr.appendChild(td);
            let minitable=document.createElement("table");
            td.appendChild(minitable);
            for(let ii=0;ii<size;ii++)
            {
                let minitr=document.createElement("tr");
                minitable.appendChild(minitr);
                for(let jj=0;jj<size;jj++)
                {
                    let minitd=document.createElement("td");
                    minitd.id=`${i*size+ii}td${j*size+jj}`;
                    minitr.appendChild(minitd);
                    minitd.classList.add("square");
                    minitd.addEventListener("click",function()
                    {
                        if(boxi==i*size+ii && boxj==j*size+jj)
                        boxi=boxj=-1;
                        else
                        {
                            boxi=i*size+ii;
                            boxj=j*size+jj;
                        }
                        show(user);
                        c=0;
                    }
                    );
                }
            }
        }
    }

    table.createTBody();
    let space=document.createElement("div");
    table.tBodies[1].appendChild(space);
    space.classList.add("space");

    table.createTBody();
    let numbers=document.createElement("table");
    table.tBodies[2].appendChild(numbers);
    for(let i=0;i<size*size;i++)
    {
        let tr=document.createElement("tr");
        numbers.appendChild(tr);
        let td=document.createElement("td");
        tr.appendChild(td);
        td.id=`num${i}`;
        td.classList.add("square");
        td.addEventListener("click",function()
        {
            if(boxi==-1)
            document.getElementById("label").innerText="No box is selected";
            else if(question[boxi][boxj]==0)
            {
                user[boxi][boxj]=i+1;
                document.getElementById("label").innerText="Number set";
                boxi=boxj=-1;
            }
            else
            document.getElementById("label").innerText="That space is occupied by default. Sorry lol";
            if(checkequalboard(answer,user))
            document.getElementById("label").innerText="Congratulations! You've completed my sudoku! Thank you for playing <3";
            show(user);
            c=0;
        }
        );
    }

    let span=60*9/(size*size);
    let group=document.getElementsByClassName("square");
    for(let i=0;i<size*size*size*size+size*size;i++)
    {
        group[i].style.height=group[i].style.width=""+Math.floor(span)+"px";
        group[i].style.fontSize=""+(Math.floor(span*3.3/5))+"px";
    }

    group=document.getElementsByClassName("option");
    for(let i=0;i<5;i++)
    group[i].style.visibility="visible";

    document.getElementById("clear").addEventListener("click",function()
    {
        if(boxi==-1)
        document.getElementById("label").innerText="No box is selected";
        else if(question[boxi][boxj]==0)
        {
            user[boxi][boxj]=0;
            document.getElementById("label").innerText="Number cleared";
        }
        else
        document.getElementById("label").innerText="That space is occupied by default. Sorry lol";
        show(user);
        c=0;
    }
    );

    document.getElementById("clearall").addEventListener("click",function()
    {
        if(confirm("Do you want to clear all placements?"))
        {
            user=clone(question);
            document.getElementById("label").innerText="All placements cleared.";
        }
        show(user);
        c=0;
    }
    );

    document.getElementById("hint").addEventListener("click",function()
    {
        show(user);
        if(checkanswer(answer,user))
        {
            let t=clone(question);
            question=clone(user);
            hint=true;
            map=array(size*size,3);
            initializemap();
            checksolve();
            question=clone(t);
        }
        else
        document.getElementById("label").innerText="You did it wrong from the start lol. Click clear all and do it again";
        c=0;
    }
    );

    document.getElementById("solution").addEventListener("click",function()
    {
        if(c<10)
        document.getElementById("label").innerText="Don't cheat lol do it yourself";
        c++;
        if(c==10)
        {
            show(answer);
            document.getElementById("label").innerText="Fine. There's your solution";
        }
    }
    );

    document.getElementById("hexa").addEventListener("click",function()
    {
        hexa=!hexa;
        show(user);
        c=0;
    }
    );

    initialize();
    document.getElementById("label").innerText="Click on a square and enter a (hexa)number through your keyboard. Enter 0 to clear that square. Hold down shift and press C to clear all your placements and H to get a hint.";

    window.addEventListener("keydown",function(event)
    {
        let s=event.code;
        if(!event.shiftKey)
        if(s.substring(0,s.length-1)=="Digit"||s.substring(0,s.length-1)=="Numpad"||s.substring(0,s.length-1)=="Key")
        {
            if(boxi==-1)
            document.getElementById("label").innerText="No box is selected";
            else if(question[boxi][boxj]==0)
            {
                if(s.charAt(s.length-1)=='0')
                {
                    user[boxi][boxj]=0;
                    document.getElementById("label").innerText="Number cleared";
                }
                else if(hexinput(s.charCodeAt(s.length-1))>0 && hexinput(s.charCodeAt(s.length-1))<=size*size)
                {
                    user[boxi][boxj]=parseInt(""+hexinput(s.charCodeAt(s.length-1)));
                    document.getElementById("label").innerText="Number set";
                }
                if(checkequalboard(answer,user))
                document.getElementById("label").innerText="Congratulations! You've completed my sudoku! Thank you for playing <3";
            }
            else
            document.getElementById("label").innerText="That space is occupied by default. Sorry lol";
        }
        if(event.shiftKey && s=="KeyH")
        {
            let t=clone(question);
            question=clone(user);
            hint=true;
            if(checkanswer(answer,question))
            {
                map=new array(size*size,3);
                initializemap();
                checksolve();
            }
            else
            document.getElementById("label").innerText="You did it wrong from the start lol. Click clear all and do it again";
            question=clone(t);
        }
        if(event.shiftKey && s=="KeyC" && confirm("Do you want to clear all placements?"))
        {
            user=clone(question);
            document.getElementById("label").innerText="All placements cleared.";
        }
        if(s=="ArrowUp" || (event.shiftKey && s=="KeyW"))
        {
            if(boxi==-1)
            {
                boxi=size*size-1;
                boxj=0;
            }
            else if(boxi>0)
            boxi--;
        }
        if(s=="ArrowLeft" || (event.shiftKey && s=="KeyA"))
        {
            if(boxi==-1)
            {
                boxi=size*size-1;
                boxj=size*size-1;
            }
            else if(boxj>0)
            boxj--;
        }
        if(s=="ArrowDown" || (event.shiftKey && s=="KeyS"))
        {
            if(boxi==-1)
            {
                boxi=0;
                boxj=size*size;
            }
            else if(boxi<size*size-1)
            boxi++;
        }
        if(s=="ArrowRight" || (event.shiftKey && s=="KeyD"))
        {
            if(boxi==-1)
            {
                boxi=0;
                boxj=0;
            }
            else if(boxj<size*size-1)
            boxj++;
        }
        show(user);
        c=0;
    }
    );
}
form.addEventListener("submit",function()
{
    SudokuMain();
}
);