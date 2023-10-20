let size,target,point,board,usymbol,csymbol,end;
function show()
{
    for(let i=0;i<size;i++)
    for(let j=0;j<size;j++)
    document.getElementById(`td${i}${j}`).innerText=""+board[i][j];
}
function r(min,max)
{
    return parseInt(Math.random()*(max-min+1))+min;
}
function generate(t,space)
{
    let make=new Array();
    if(space==0)
    {
        make.push(t);
        return make;
    }
    for(let i=t.lastIndexOf(' ')+1;i<t.length+1;i++)
    {
        let temp=t.substring(0,i)+" "+t.substring(i);
        let res=generate(temp,space-1);
        for(let j=0;j<res.length;j++)
        make.push(res[j]);
    }
    return make;
}
function checktie()
{
    for(let i=0;i<size;i++)
    for(let j=0;j<size;j++)
    if(board[i][j]==' ')
    return false;
    return true;
}
function checkwin(symbol)
{
    let checkfor="";
    for(let i=0;i<target;i++)
    checkfor+=symbol;
    for(let i=0;i<size;i++)
    {
        let check="";
        for(let j=0;j<size;j++)
        check+=board[i][j];
        if(check.indexOf(checkfor)!=-1)
        return true;
    }
    for(let j=0;j<size;j++)
    {
        let check="";
        for(let i=0;i<size;i++)
        check+=board[i][j];
        if(check.indexOf(checkfor)!=-1)
        return true;
    }
    for(let i=target-size;i<size-target+1;i++)
    {
        let check="";
        for(let j=Math.max(0,-i);j<Math.min(size,size-i);j++)
        check+=board[i+j][j];
        if(check.indexOf(checkfor)!=-1)
        return true;
    }
    for(let i=target-size;i<size-target+1;i++)
    {
        let check="";
        for(let j=Math.max(0,-i);j<Math.min(size,size-i);j++)
        check+=board[i+j][size-j-1];
        if(check.indexOf(checkfor)!=-1)
        return true;
    }
    return false;
}
function trywin()
{
    tryplace(1);
    let max=-1;
    for(let i=0;i<size;i++)
    for(let j=0;j<size;j++)
    if(board[i][j]==' ')
    max=Math.max(max,point[i][j]);
    
    let i,j;
    for(i=r(0,size-1),j=r(0,size-1);point[i][j]!=max || board[i][j]!=' ';i=r(0,size-1),j=r(0,size-1));
    board[i][j]=csymbol;
    document.getElementById(`${i}td${j}`).innerText=""+board[i][j];
}
function tryplace(space)
{
    if(space==target)
    return;
    
    let t="";
    for(let i=0;i<target-space;i++)
    t+=csymbol;
    let checkfor=generate(t,space);
    
    let tpoint=new Array();
    for(let i=0;i<size;i++)
    {
        tpoint[i]=new Array();
        for(let j=0;j<size;j++)
        tpoint[i][j]=0;
    }
    
    for(let i=0;i<size;i++)
    {
        let check="";
        for(let j=0;j<size;j++)
        check+=board[i][j];
        for(let j=0;j<checkfor.length;j++)
        if(check.indexOf(checkfor[j])!=-1)
        for(let k=0;k<checkfor[j].length;k++)
        if(checkfor[j].charAt(k)==' ')
        tpoint[i][check.indexOf(checkfor[j])+k]=1/(Math.pow(2,space*2-2));
    }
    
    for(let j=0;j<size;j++)
    {
        let check="";
        for(let i=0;i<size;i++)
        check+=board[i][j];
        for(let i=0;i<checkfor.length;i++)
        if(check.indexOf(checkfor[i])!=-1)
        for(let k=0;k<checkfor[i].length;k++)
        if(checkfor[i].charAt(k)==' ')
        tpoint[check.indexOf(checkfor[i])+k][j]=1/(Math.pow(2,space*2-2));
    }
    
    for(let i=target-size;i<size-target+1;i++)
    {
        let check="";
        for(let j=Math.max(0,-i);j<Math.min(size,size-i);j++)
        check+=board[i+j][j];
        for(let j=0;j<checkfor.length;j++)
        if(check.indexOf(checkfor[j])!=-1)
        for(let k=0;k<checkfor[j].length;k++)
        if(checkfor[j].charAt(k)==' ')
        tpoint[i+Math.max(0,-i)+check.indexOf(checkfor[j])+k][Math.max(0,-i)+check.indexOf(checkfor[j])+k]=1/(Math.pow(2,space*2-2));
    }
    
    for(let i=target-size;i<size-target+1;i++)
    {
        let check="";
        for(let j=Math.max(0,-i);j<Math.min(size,size-i);j++)
        check+=board[i+j][size-j-1];
        for(let j=0;j<checkfor.length;j++)
        if(check.indexOf(checkfor[j])!=-1)
        for(let k=0;k<checkfor[j].length;k++)
        if(checkfor[j].charAt(k)==' ')
        tpoint[i+Math.max(0,-i)+check.indexOf(checkfor[j])+k][size-(Math.max(0,-i)+check.indexOf(checkfor[j])+k)-1]=1/(Math.pow(2,space*2-2));
    }
    
    for(let i=0;i<size;i++)
    for(let j=0;j<size;j++)
    point[i][j]+=tpoint[i][j];
    
    tryblock(space);
}
function tryblock(space)
{
    let t="";
    for(let i=0;i<target-space;i++)
    t+=usymbol;
    let checkfor=generate(t,space);
    
    let tpoint=new Array();
    for(let i=0;i<size;i++)
    {
        tpoint[i]=new Array();
        for(let j=0;j<size;j++)
        tpoint[i][j]=0;
    }
    
    for(let i=0;i<size;i++)
    {
        let check="";
        for(let j=0;j<size;j++)
        check+=board[i][j];
        for(let j=0;j<checkfor.length;j++)
        if(check.indexOf(checkfor[j])!=-1)
        for(let k=0;k<checkfor[j].length;k++)
        if(checkfor[j].charAt(k)==' ')
        if(space==2 && ((k!=0 && checkfor[j].charAt(k-1)==usymbol) || (k!=checkfor[j].length-1 && checkfor[j].charAt(k+1)==usymbol)))
        tpoint[i][check.indexOf(checkfor[j])+k]=1/(Math.pow(2,space*2-2));
        else
        tpoint[i][check.indexOf(checkfor[j])+k]=1/(Math.pow(2,space*2-1));
    }
    
    for(let j=0;j<size;j++)
    {
        let check="";
        for(let i=0;i<size;i++)
        check+=board[i][j];
        for(let i=0;i<checkfor.length;i++)
        if(check.indexOf(checkfor[i])!=-1)
        for(let k=0;k<checkfor[i].length;k++)
        if(checkfor[i].charAt(k)==' ')
        if(space==2 && ((k!=0 && checkfor[j].charAt(k-1)==usymbol) || (k!=checkfor[j].length-1 && checkfor[j].charAt(k+1)==usymbol)))
        tpoint[check.indexOf(checkfor[i])+k][j]=1/(Math.pow(2,space*2-2));
        else
        tpoint[check.indexOf(checkfor[i])+k][j]=1/(Math.pow(2,space*2-1));
    }
    
    for(let i=target-size;i<size-target+1;i++)
    {
        let check="";
        for(let j=Math.max(0,-i);j<Math.min(size,size-i);j++)
        check+=board[i+j][j];
        for(let j=0;j<checkfor.length;j++)
        if(check.indexOf(checkfor[j])!=-1)
        for(let k=0;k<checkfor[j].length;k++)
        if(checkfor[j].charAt(k)==' ')
        if(space==2 && ((k!=0 && checkfor[j].charAt(k-1)==usymbol) || (k!=checkfor[j].length-1 && checkfor[j].charAt(k+1)==usymbol)))
        tpoint[i+Math.max(0,-i)+check.indexOf(checkfor[j])+k][Math.max(0,-i)+check.indexOf(checkfor[j])+k]=1/(Math.pow(2,space*2-2));
        else
        tpoint[i+Math.max(0,-i)+check.indexOf(checkfor[j])+k][Math.max(0,-i)+check.indexOf(checkfor[j])+k]=1/(Math.pow(2,space*2-1));
    }
    
    for(let i=target-size;i<size-target+1;i++)
    {
        let check="";
        for(let j=Math.max(0,-i);j<Math.min(size,size-i);j++)
        check+=board[i+j][size-j-1];
        for(let j=0;j<checkfor.length;j++)
        if(check.indexOf(checkfor[j])!=-1)
        for(let k=0;k<checkfor[j].length;k++)
        if(checkfor[j].charAt(k)==' ')
        if(space==2 && ((k!=0 && checkfor[j].charAt(k-1)==usymbol) || (k!=checkfor[j].length-1 && checkfor[j].charAt(k+1)==usymbol)))
        tpoint[i+Math.max(0,-i)+check.indexOf(checkfor[j])+k][size-(Math.max(0,-i)+check.indexOf(checkfor[j])+k)-1]=1/(Math.pow(2,space*2-2));
        else
        tpoint[i+Math.max(0,-i)+check.indexOf(checkfor[j])+k][size-(Math.max(0,-i)+check.indexOf(checkfor[j])+k)-1]=1/(Math.pow(2,space*2-1));
    }
    
    for(let i=0;i<size;i++)
    for(let j=0;j<size;j++)
    point[i][j]+=tpoint[i][j];
    
    tryplace(space+1);
}
function TictactoeMain()
{
    size=r(3,9);
    target=size-parseInt((size+1)/2)+2;
    document.getElementById("label").innerText="Size is "+size+". You need to place "+target+" times in a row to win";
    end=false;

    board=new Array();
    point=new Array();
    for(let i=0;i<size;i++)
    {
        board[i]=new Array();
        point[i]=new Array();
        for(let j=0;j<size;j++)
        {
            board[i][j]=' ';
            point[i][j]=0;
        }
    }

    let table=document.createElement("table");
    document.getElementById("playground").appendChild(table);
    for(let i=0;i<size;i++)
    {
        let tr=document.createElement("tr");
        table.appendChild(tr);
        for(let j=0;j<size;j++)
        {
            let td=document.createElement("td");
            td.id=`${i}td${j}`;
            tr.appendChild(td);
            td.innerText=board[i][j];
            td.classList.add("square");
            td.addEventListener("click",function()
            {
                if(!end)
                {
                    if(board[i][j]!=' ')
                    document.getElementById("label").innerText="That space is already occupied. Choose another one";
                    else
                    {
                        board[i][j]=usymbol;
                        td.innerText=""+board[i][j];
                        if(checkwin(usymbol))
                        {
                            document.getElementById("label").innerText="Wow you won. That was fantastic! Reload the page to play again!";
                            document.getElementById("reload").style.visibility="visible";
                            end=true;
                            return;
                        }
                        else if(checktie())
                        {
                            document.getElementById("label").innerText="It was a tie. Reload the page to play again!";
                            document.getElementById("reload").style.visibility="visible";
                            end=true;
                            return;
                        }
                        for(let ii=0;ii<size;ii++)
                        for(let jj=0;jj<size;jj++)
                        point[ii][jj]=0;
                        trywin();
                        if(checkwin(csymbol))
                        {
                            document.getElementById("label").innerText="Sorry you lose :/  Reload the page to play again!";
                            document.getElementById("reload").style.visibility="visible";
                            end=true;
                            return;
                        }
                        else if(checktie())
                        {
                            document.getElementById("label").innerText="It was a tie. Reload the page to play again!";
                            document.getElementById("reload").style.visibility="visible";
                            end=true;
                            return;
                        }
                    }
                }
            }
            );
        }
    }

    let t=r(0,1);
    if(t==1)
    {
        usymbol='x';
        csymbol='o';
    }
    else
    {
        usymbol='o';
        csymbol='x';
        trywin();
    }
}