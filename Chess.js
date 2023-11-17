class Pawn
{
    constructor()
    {
        this.src=new Array();
        this.src[0]="Chess Images/Pawn Light.png";
        this.src[1]="Chess Images/Pawn Dark.png";
    }
}
class Knight
{
    constructor()
    {
        this.src=new Array();
        this.src[0]="Chess Images/Knight Light.png";
        this.src[1]="Chess Images/Knight Dark.png";
    }
}
class Bishop
{
    constructor()
    {
        this.src=new Array();
        this.src[0]="Chess Images/Bishop Light.png";
        this.src[1]="Chess Images/Bishop Dark.png";
    }
}
class Rook
{
    constructor()
    {
        this.src=new Array();
        this.src[0]="Chess Images/Rook Light.png";
        this.src[1]="Chess Images/Rook Dark.png";
    }
}
class Queen
{
    constructor()
    {
        this.src=new Array();
        this.src[0]="Chess Images/Queen Light.png";
        this.src[1]="Chess Images/Queen Dark.png";
    }
}
class King
{
    constructor()
    {
        this.src=new Array();
        this.src[0]="Chess Images/King Light.png";
        this.src[1]="Chess Images/King Dark.png";
    }
}
class Square
{
    constructor()
    {
        this.src="";
        this.piece="";
        this.side=new Array();
        this.side[0]=false;
        this.side[1]=false;
        this.cast=false;
    }
    clone()
    {
        let sq=new Square();
        sq.src=this.src;
        sq.piece=this.piece;
        sq.side[0]=this.side[0];
        sq.side[1]=this.side[1];
        sq.cast=this.cast;
        return sq;
    }
    setSquare(piece,side)
    {
        this.piece=piece;
        switch(piece)
        {
            case "p":this.src=new Pawn().src[side];
                break;
            case "n":this.src=new Knight().src[side];
                break;
            case "b":this.src=new Bishop().src[side];
                break;
            case "r":this.src=new Rook().src[side];
                this.cast=true;
                break;
            case "q":this.src=new Queen().src[side];
                break;
            case "k":this.src=new King().src[side];
                this.cast=true;
                break;
            default:this.src="";
        }
        this.side[0]=side==0?true:false;
        this.side[1]=side==1?true:false;
    }
}
class Chess
{
    constructor(side,level)
    {
        this.board=new Array();
        this.path=new Array();
        for(let i=0;i<8;i++)
        {
            this.board[i]=new Array();
            this.path[i]=new Array();
            for(let j=0;j<8;j++)
            {
                this.board[i][j]=new Square();
                this.path[i][j]=false;
            }
        }
        this.side=side;
        this.point=0;
        this.level=level;
        this.kingi=new Array();
        this.kingj=new Array();
        this.kingi[0]=-1;
        this.kingj[0]=-1;
        this.kingi[1]=-1;
        this.kingj[1]=-1;
        this.enpi=-1;
        this.enpj=-1;
    }
    clone()
    {
        let ch=new Chess(0,0);
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        ch.board[i][j]=this.board[i][j].clone();
        ch.path=this.clonePath(this.path);
        ch.side=this.side;
        ch.point=this.point;
        ch.level=this.level;
        ch.kingi[0]=this.kingi[0];
        ch.kingj[0]=this.kingj[0];
        ch.kingi[1]=this.kingi[1];
        ch.kingj[1]=this.kingj[1];
        ch.enpi=this.enpi;
        ch.enpj=this.enpj;
        return ch;
    }
    clonePath(path)
    {
        let p=new Array();
        for(let i=0;i<8;i++)
        {
            p[i]=new Array();
            for(let j=0;j<8;j++)
            p[i][j]=path[i][j];
        }
        return p;
    }
    setBoard()
    {
        for(let j=0;j<8;j++)
        {
            this.setPawn(6,j,0);
            this.setPawn(1,j,1);
        }
        this.setKnight(7,1,0);
        this.setKnight(7,6,0);
        this.setKnight(0,1,1);
        this.setKnight(0,6,1);
        this.setBishop(7,2,0);
        this.setBishop(7,5,0);
        this.setBishop(0,2,1);
        this.setBishop(0,5,1);
        this.setRook(7,0,0);
        this.setRook(7,7,0);
        this.setRook(0,0,1);
        this.setRook(0,7,1);
        this.setQueen(7,3,0);
        this.setQueen(0,3,1);
        this.setKing(7,4,0);
        this.setKing(0,4,1);
        this.kingi[0]=7;
        this.kingi[1]=0;
        this.kingj[0]=this.kingj[1]=4;
    }
    setPawn(i,j,side)
    {
        this.board[i][j].setSquare("p",side);
    }
    setKnight(i,j,side)
    {
        this.board[i][j].setSquare("n",side);
    }
    setBishop(i,j,side)
    {
        this.board[i][j].setSquare("b",side);
    }
    setRook(i,j,side)
    {
        this.board[i][j].setSquare("r",side);
    }
    setQueen(i,j,side)
    {
        this.board[i][j].setSquare("q",side);
    }
    setKing(i,j,side)
    {
        this.board[i][j].setSquare("k",side);
    }
    show()
    {
        let tempPath=this.clonePath(this.path);
        let check=-1;
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        this.checkPath(i,j,false);
        if(this.path[this.kingi[0]][this.kingj[0]])
        check=0;
        else if(this.path[this.kingi[1]][this.kingj[1]])
        check=1;
        this.path=this.clonePath(tempPath);

        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        {
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=this.board[i][j].src;
            if(this.path[i][j])
            document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(238,238,110)";
            else if((check==0 && i==this.kingi[0] && j==this.kingj[0]) || (check==1 && i==this.kingi[1] && j==this.kingj[1]))
            document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(216,96,116)";
            else
            document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="";
        }
    }
    r(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    getPoint(piece)
    {
        switch(piece)
        {
            case "p":return 1;
            case "n":
            case "b":return 3;
            case "r":return 5;
            case "q":return 9;
            case "k":return 100;
            default:return 0;
        }
    }
    clearPath()
    {
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        this.path[i][j]=false;
    }
    onSameLine(i1,j1,i2,j2,i3,j3)
    {
        if((i1==i2 && i2==i3) || (j1==j2 && j2==j3))
        return true;
        if(i1-i2==j1-j2 && i2-i3==j2-j3 && i1-j1==i2-j2)
        return true;
        if(i1-i2==j2-j1 && i2-i3==j3-j2 && i1+j1==i2+j2)
        return true;
        return false;
    }
    pieceInBetween(starti,startj,endi,endj)
    {
        let m=(starti-endi)/(startj-endj),c=starti-m*startj;
        for(let place=1;!(starti+(endi==starti?0:endi>starti?1:-1)*place==endi && startj+(endj==startj?0:endj>startj?1:-1)*place==endj);place++)
        if(this.board[starti+(endi==starti?0:endi>starti?1:-1)*place][startj+(endj==startj?0:endj>startj?1:-1)*place].piece!="")
        return true;
        return false;
    }
    checkmate(parity)
    {
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(this.board[i][j].side[parity])
        {
            this.checkMovement(i,j);
            for(let squarei=0;squarei<8;squarei++)
            for(let squarej=0;squarej<8;squarej++)
            if(this.path[squarei][squarej])
            {
                this.clearPath();
                return false;
            }
            this.clearPath();
        }
        return true;
    }
    checkMovement(i,j)
    {
        let parity=this.board[i][j].side[0]?0:1,check=0;
        for(let squarei=0;squarei<8;squarei++)
        for(let squarej=0;squarej<8;squarej++)
        if(this.board[squarei][squarej].side[1-parity])
        {
            this.checkPath(squarei,squarej,true);
            if(this.path[this.kingi[parity]][this.kingj[parity]])
            check++;
            this.path[this.kingi[parity]][this.kingj[parity]]=false;
        }
        if(check>0)
        this.path[this.kingi[parity]][this.kingj[parity]]=true;

        let opponentPath=this.clonePath(this.path);
        this.clearPath();
        if(this.board[i][j].piece=="k")
        {
            this.king(i,j,false,opponentPath[i][j]);
            for(let squarei=0;squarei<8;squarei++)
            for(let squarej=0;squarej<8;squarej++)
            this.path[squarei][squarej]=this.path[squarei][squarej] && !opponentPath[squarei][squarej] && (Math.abs(squarej-j)>1?!opponentPath[squarei][(squarej+j)/2]:true);
            return;
        }

        if(check>1)
        return;

        this.checkPath(i,j,false);
        let selfPath=this.clonePath(this.path);
        for(let squarei=0;squarei<8;squarei++)
        for(let squarej=0;squarej<8;squarej++)
        if(this.board[squarei][squarej].side[1-parity])
        {
            this.clearPath();
            this.checkPath(squarei,squarej,false);
            if((this.path[this.kingi[parity]][this.kingj[parity]]) || (this.path[i][j] && this.board[squarei][squarej].piece!="k" && this.board[squarei][squarej].piece!="p" && this.onSameLine(i,j,squarei,squarej,this.kingi[parity],this.kingj[parity]) && !this.pieceInBetween(i,j,this.kingi[parity],this.kingj[parity]) && !this.pieceInBetween(i,j,squarei,squarej)))
            {
                for(let toi=0;toi<8;toi++)
                for(let toj=0;toj<8;toj++)
                this.path[toi][toj]=selfPath[toi][toj] && ((toi==squarei && toj==squarej) || (this.path[toi][toj] && this.onSameLine(toi,toj,squarei,squarej,this.kingi[parity],this.kingj[parity]) && ((this.kingi[parity]<=toi && toi<=squarei) || (this.kingi[parity]>=toi && toi>=squarei)) && ((this.kingj[parity]<=toj && toj<=squarej) || (this.kingj[parity]>=toj && toj>=squarej))));
                return;
            }
        }
        this.path=this.clonePath(selfPath);
    }
    checkPath(i,j,enemy)
    {
        switch(this.board[i][j].piece)
        {
            case "p":this.pawn(i,j,enemy);
                break;
            case "n":this.knight(i,j,enemy);
                break;
            case "b":this.bishop(i,j,enemy);
                break;
            case "r":this.rook(i,j,enemy);
                break;
            case "q":this.queen(i,j,enemy);
                break;
            case "k":this.king(i,j,enemy,false);
        }
    }
    pawn(i,j,enemy)
    {
        let move=this.board[i][j].side[0]?-1:1;
        if(!enemy && this.board[i+move][j].side[0]==this.board[i+move][j].side[1])
        this.path[i+move][j]=true;
        if(((move==1 && i==1) || (move==-1 && i==6)) && !enemy && this.board[i+move][j].side[0]==this.board[i+move][j].side[1] && this.board[i+move*2][j].side[0]==this.board[i+move*2][j].side[1])
        this.path[i+move*2][j]=true;
        if(j>0 && ((move==-1 && (this.board[i+move][j-1].side[1] || enemy)) || (move==1 && (this.board[i+move][j-1].side[0] || enemy)) || (this.enpi==i+move && this.enpj==j-1 && this.board[this.enpi-move][this.enpj].side[move==-1?1:0])))
        this.path[i+move][j-1]=true;
        if(j<7 && ((move==-1 && (this.board[i+move][j+1].side[1] || enemy)) || (move==1 && (this.board[i+move][j+1].side[0] || enemy)) || (this.enpi==i+move && this.enpj==j+1 && this.board[this.enpi-move][this.enpj].side[move==-1?1:0])))
        this.path[i+move][j+1]=true;
    }
    knight(i,j,enemy)
    {
        this.direction(i,j,-2,-1,true,enemy);
        this.direction(i,j,-2,+1,true,enemy);
        this.direction(i,j,-1,-2,true,enemy);
        this.direction(i,j,-1,+2,true,enemy);
        this.direction(i,j,+1,-2,true,enemy);
        this.direction(i,j,+1,+2,true,enemy);
        this.direction(i,j,+2,-1,true,enemy);
        this.direction(i,j,+2,+1,true,enemy);
    }
    bishop(i,j,enemy)
    {
        this.direction(i,j,-1,-1,false,enemy);
        this.direction(i,j,-1,+1,false,enemy);
        this.direction(i,j,+1,-1,false,enemy);
        this.direction(i,j,+1,+1,false,enemy);
    }
    rook(i,j,enemy)
    {
        this.direction(i,j,-1,0,false,enemy);
        this.direction(i,j,0,-1,false,enemy);
        this.direction(i,j,0,+1,false,enemy);
        this.direction(i,j,+1,0,false,enemy);
    }
    queen(i,j,enemy)
    {
        this.direction(i,j,-1,-1,false,enemy);
        this.direction(i,j,-1,+1,false,enemy);
        this.direction(i,j,+1,-1,false,enemy);
        this.direction(i,j,+1,+1,false,enemy);
        this.direction(i,j,-1,0,false,enemy);
        this.direction(i,j,0,-1,false,enemy);
        this.direction(i,j,0,+1,false,enemy);
        this.direction(i,j,+1,0,false,enemy);
    }
    king(i,j,enemy,check)
    {
        this.direction(i,j,-1,-1,true,enemy);
        this.direction(i,j,-1,+1,true,enemy);
        this.direction(i,j,+1,-1,true,enemy);
        this.direction(i,j,+1,+1,true,enemy);
        this.direction(i,j,-1,0,true,enemy);
        this.direction(i,j,0,-1,true,enemy);
        this.direction(i,j,0,+1,true,enemy);
        this.direction(i,j,+1,0,true,enemy);
        if(check)
        return;
        let parity=this.board[i][j].side[0]?0:1;
        if(this.board[i][j].cast)
        {
            if(this.board[i][0].cast && this.board[i][1].side[parity]==false && this.board[i][2].side[parity]==false && this.board[i][3].side[parity]==false)
            this.path[i][j-2]=true;
            if(this.board[i][7].cast && this.board[i][6].side[parity]==false && this.board[i][5].side[parity]==false)
            this.path[i][j+2]=true;
        }
    }
    direction(i,j,iteri,iterj,once,enemy)
    {
        let parity=this.board[i][j].side[0]?0:1;
        for(let move=1;i+iteri*move>=0 && i+iteri*move<8 && j+iterj*move>=0 && j+iterj*move<8;move++)
        {
            if(!this.board[i+iteri*move][j+iterj*move].side[parity] || enemy)
            this.path[i+iteri*move][j+iterj*move]=true;
            if(!(this.board[i+iteri*move][j+iterj*move].piece=="k" && this.board[i+iteri*move][j+iterj*move].side[1-parity]) && (this.board[i+iteri*move][j+iterj*move].side[parity]!=this.board[i+iteri*move][j+iterj*move].side[1-parity] || once))
            break;
        }
    }
    movePiece(fromi,fromj,toi,toj)
    {
        this.point+=(this.board[toi][toj].side[0] && this.side==0) || (this.board[toi][toj].side[1] && this.side==1)?this.getPoint(this.board[toi][toj].piece):-this.getPoint(this.board[toi][toj].piece);
        this.board[toi][toj]=this.board[fromi][fromj].clone();
        this.board[fromi][fromj]=new Square();
        if(this.enpi==toi && this.enpj==toj && this.board[toi][toj].piece=="p")
        this.board[fromi][toj]=new Square();
        this.enpi=this.enpj=-1;
        if(this.board[toi][toj].piece=="p")
        if(Math.abs(toi-fromi)==2)
        {
            this.enpi=(toi+fromi)/2;
            this.enpj=toj;
        }
        if(this.board[toi][toj].piece=="k")
        {
            let parity=this.board[toi][toj].side[0]?0:1;
            this.kingi[parity]=toi;
            this.kingj[parity]=toj;
            if(Math.abs(toj-fromj)==2)
            if(toj==2)
            {
                this.board[toi][toj+1]=this.board[toi][0].clone();
                this.board[toi][0]=new Square();
            }
            else
            {
                this.board[toi][toj-1]=this.board[toi][7].clone();
                this.board[toi][7]=new Square();
            }
            else if(parity==1-this.side)
            this.point-=1;
        }
        this.board[toi][toj].cast=false;
    }
    promote(i,j,to)
    {
        if(typeof to==="number")
        switch(to)
        {
            case 1:this.board[i][j].setSquare("b",this.board[i][j].side[0]?0:1);
                break;
            case 2:this.board[i][j].setSquare("n",this.board[i][j].side[0]?0:1);
                break;
            case 3:this.board[i][j].setSquare("r",this.board[i][j].side[0]?0:1);
                break;
            case 4:this.board[i][j].setSquare("q",this.board[i][j].side[0]?0:1);
        }
        else
        this.board[i][j].setSquare(to,this.board[i][j].side[0]?0:1);
        this.point+=(this.board[i][j].side[0] && this.side==0) || (this.board[i][j].side[1] && this.side==1)?-this.getPoint(this.board[i][j].piece):this.getPoint(this.board[i][j].piece);
    }
    computeBest(times,computer)
    {
        if(times==0)
        return this.point;

        let pointList=new Array(),bestPoint=undefined,whiteTurn=false,blackTurn=false;
        if((this.side==0 && computer) || (this.side==1 && !computer))
        blackTurn=true;
        else
        whiteTurn=true;
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if((this.board[i][j].side[0] && whiteTurn) || (this.board[i][j].side[1] && blackTurn))
        {
            this.checkMovement(i,j);
            for(let squarei=0;squarei<8;squarei++)
            for(let squarej=0;squarej<8;squarej++)
            if(this.path[squarei][squarej])
            for(let promo=0;promo<4;promo++)
            {
                let newMove=this.clone();
                newMove.clearPath();
                newMove.movePiece(i,j,squarei,squarej);
                if(newMove.board[squarei][squarej].piece=="p" && (squarei==0 || squarei==7))
                {
                    newMove.promote(squarei,squarej,promo+1);
                    let newPoint=newMove.computeBest(times-1,!computer);
                    if(bestPoint==undefined || (computer && newPoint>bestPoint) || (!computer && newPoint<bestPoint))
                    bestPoint=newPoint;
                    pointList.push([i,j,squarei,squarej,promo+1,newPoint]);
                }
                else
                {
                    let newPoint=newMove.computeBest(times-1,!computer);
                    if(bestPoint==undefined || (computer && newPoint>bestPoint) || (!computer && newPoint<bestPoint))
                    bestPoint=newPoint;
                    pointList.push([i,j,squarei,squarej,0,newPoint]);
                    break;
                }
            }
            this.clearPath();
        }
        if(bestPoint==undefined)
        if(times==this.level)
        return;
        else
        return computer?this.point-100:this.point+100;

        if(times!=this.level)
        return bestPoint;

        for(let i=this.r(0,pointList.length-1);;i=(i+1)%pointList.length)
        if(pointList[i][5]==bestPoint)
        {
            let cut="";
            if(this.board[pointList[i][2]][pointList[i][3]].piece!="")
            cut="x";
            this.movePiece(pointList[i][0],pointList[i][1],pointList[i][2],pointList[i][3]);
            if(pointList[i][4]>0)
            {
                this.promote(pointList[i][2],pointList[i][3],pointList[i][4]);
                document.getElementById("label").innerText=cut+String.fromCharCode(pointList[i][3]+97)+(8-pointList[i][2])+" = "+this.board[pointList[i][2]][pointList[i][3]].piece.toUpperCase()+" was played";
            }
            else
            document.getElementById("label").innerText=""+(this.board[pointList[i][2]][pointList[i][3]].piece=="p"?"":this.board[pointList[i][2]][pointList[i][3]].piece.toUpperCase())+cut+String.fromCharCode(pointList[i][3]+97)+(8-pointList[i][2])+" was played";
            return;
        }
    }
}
let side,currentmove,tempmove,previousmove,nextmove,clicki,clickj,askPromo,end;
function doTask()
{
    if(currentmove.checkmate(1-side))
    {
        document.getElementById("label").innerText="Good heavens! You win :D";
        end=true;
    }
    else
    {
        currentmove.computeBest(currentmove.level,true);
        if(currentmove.checkmate(side))
        {
            document.getElementById("label").innerText="Sorry amigo! You lose D:";
            end=true;
        }
    }
    currentmove.show();
    previousmove=tempmove.clone();
    tempmove=currentmove.clone();
    nextmove=undefined;
    clicki=clickj=-1;
}
function start()
{
    document.getElementById("label").innerText="Click on the corresponding piece to move. Press U to undo and R to redo.";
    document.getElementById("optiongroup").style.visibility="visible";
    for(let i=0;i<8;i++)
    document.getElementById(`number${i}`).innerText=""+side==0?(8-i):(i+1);
    for(let i=0;i<8;i++)
    document.getElementById(`letter${i}`).innerText=""+side==0?String.fromCharCode(i+97):String.fromCharCode((7-i)+97);
    document.getElementById("bishopi").src=new Bishop().src[side];
    document.getElementById("knighti").src=new Knight().src[side];
    document.getElementById("rooki").src=new Rook().src[side];
    document.getElementById("queeni").src=new Queen().src[side];

    currentmove=new Chess(side,3);
    currentmove.setBoard();
    if(side==1)
    currentmove.computeBest(currentmove.level,true);
    currentmove.show();

    tempmove=currentmove.clone(),previousmove=undefined,nextmove=undefined,clicki=-1,clickj=-1,askPromo=false,end=false;

    document.getElementById("bishop").addEventListener("click",function(event)
    {
        currentmove.promote(clicki,clickj,"b");
        doTask();
        askPromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    document.getElementById("knight").addEventListener("click",function(event)
    {
        currentmove.promote(clicki,clickj,"n");
        doTask();
        askPromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    document.getElementById("rook").addEventListener("click",function(event)
    {
        currentmove.promote(clicki,clickj,"r");
        doTask();
        askPromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    document.getElementById("queen").addEventListener("click",function(event)
    {
        currentmove.promote(clicki,clickj,"q");
        doTask();
        askPromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    for(let i=0;i<8;i++)
    for(let j=0;j<8;j++)
    {
        if((i+j)%2==0)
        document.getElementById(`td${i}${j}`).classList.add("whitebox");
        else
        document.getElementById(`td${i}${j}`).classList.add("blackbox");
        document.getElementById(`td${side==0?i:7-i}${side==0?j:7-j}`).addEventListener("click",function(event)
        {
            if(!askPromo && !end)
            if(currentmove.path[i][j])
            {
                currentmove.movePiece(clicki,clickj,i,j);
                currentmove.clearPath();
                if(currentmove.board[i][j].piece=="p" && (i==0 || i==7))
                {
                    askPromo=true;
                    document.getElementById("promo").style.visibility="visible";
                    clicki=i;
                    clickj=j;
                }
                else
                doTask();
            }
            else if(clicki==i && clickj==j)
            {
                currentmove.clearPath();
                clicki=clickj=-1;
            }
            else
            {
                currentmove.clearPath();
                if(currentmove.board[i][j].side[side])
                currentmove.checkMovement(i,j);
                clicki=i;
                clickj=j;
            }
            currentmove.show();
        }
        );
    }
    document.getElementById("undo").addEventListener("click",function(event)
    {
        if(askPromo)
        return;
        if(previousmove==undefined)
        {
            document.getElementById("label").innerText="No more undo available";
            return;
        }
        document.getElementById("label").innerText="Undo";
        currentmove.clearPath();
        nextmove=currentmove.clone();
        currentmove=previousmove.clone();
        tempmove=previousmove.clone();
        previousmove=undefined;
        currentmove.show();
        clicki=clickj=-1;
        end=false;
    }
    );
    document.getElementById("redo").addEventListener("click",function(event)
    {
        if(askPromo)
        return;
        if(nextmove==undefined || askPromo)
        {
            document.getElementById("label").innerText="No more redo available";
            return;
        }
        document.getElementById("label").innerText="Redo";
        currentmove.clearPath();
        previousmove=currentmove.clone();
        currentmove=nextmove.clone();
        tempmove=nextmove.clone();
        nextmove=undefined;
        currentmove.show();
        clicki=clickj=-1;
    }
    );
    window.addEventListener("keyup",function(event)
    {
        if(askPromo)
        return;
        if(event.code=="KeyU")
        {
            if(previousmove==undefined)
            {
                document.getElementById("label").innerText="No more undo available";
                return;
            }
            document.getElementById("label").innerText="Undo";
            currentmove.clearPath();
            nextmove=currentmove.clone();
            currentmove=previousmove.clone();
            tempmove=previousmove.clone();
            previousmove=undefined;
            currentmove.show();
            clicki=clickj=-1;
            end=false;
        }
        if(event.code=="KeyR")
        {
            if(nextmove==undefined)
            {
                document.getElementById("label").innerText="No more redo available";
                return;
            }
            document.getElementById("label").innerText="Redo";
            currentmove.clearPath();
            previousmove=currentmove.clone();
            currentmove=nextmove.clone();
            tempmove=nextmove.clone();
            nextmove=undefined;
            currentmove.show();
            clicki=clickj=-1;
        }
    }
    );
}
function ChessMain()
{
    let board=document.getElementById("board");
    let options=document.getElementById("optiongroup");
    let promos=document.getElementById("promo");
    board.remove();
    options.remove();
    promos.remove();
    document.getElementById("white").addEventListener("click",function(event)
    {
        document.getElementById("done").remove();
        document.body.appendChild(board);
        document.body.appendChild(options);
        document.body.appendChild(promos);
        side=0;
        start();
    }
    );
    document.getElementById("black").addEventListener("click",function(event)
    {
        document.getElementById("done").remove();
        document.body.appendChild(board);
        document.body.appendChild(options);
        document.body.appendChild(promos);
        side=1;
        start();
    }
    );
}