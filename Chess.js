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
        this.i=-1;
        this.j=-1;
        this.checker=new Array();
        this.threat=new Array();
    }
}
class Square
{
    constructor()
    {
        this.src="";
        this.piece="";
        this.side=new Array();
        this.side=-1;
        this.cast=false;
    }
    clone()
    {
        let sq=new Square();
        sq.src=this.src;
        sq.piece=this.piece;
        sq.side=this.side;
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
        this.side=side;
    }
}
class Chess
{
    constructor(size,side,level)
    {
        this.size=size;
        this.board=new Array();
        this.path=new Array();
        for(let i=0;i<4+this.size*4;i++)
        {
            this.board[i]=new Array();
            this.path[i]=new Array();
            for(let j=0;j<this.size*8;j++)
            {
                this.board[i][j]=new Square();
                this.path[i][j]=false;
            }
        }
        this.side=side;
        this.point=0;
        this.level=level;
        this.kings=new Array();
        this.kings[0]=new Array();
        this.kings[1]=new Array();
        for(let i=0;i<this.size;i++)
        {
            this.kings[0][i]=new King()
            this.kings[1][i]=new King()
        }
        this.enpPiecei=-1;
        this.enpPiecej=-1;
        this.enpFromi=-1;
        this.enpToi=-1;
        this.enpj=-1;
    }
    clone()
    {
        let ch=new Chess(this.size,0,0);
        ch.size=this.size;
        for(let i=0;i<4+this.size*4;i++)
        for(let j=0;j<this.size*8;j++)
        ch.board[i][j]=this.board[i][j].clone();
        ch.path=this.clonePath(this.path);
        ch.side=this.side;
        ch.point=this.point;
        ch.level=this.level;
        for(let i=0;i<2;i++)
        for(let j=0;j<this.size;j++)
        {
            ch.kings[i][j].i=this.kings[i][j].i;
            ch.kings[i][j].j=this.kings[i][j].j;
        }
        ch.enpPiecei=this.enpPiecei;
        ch.enpPiecej=this.enpPiecej;
        ch.enpFromi=this.enpFromi;
        ch.enpToi=this.enpToi;
        ch.enpj=this.enpj;
        return ch;
    }
    clonePath(path)
    {
        let p=new Array();
        for(let i=0;i<4+this.size*4;i++)
        {
            p[i]=new Array();
            for(let j=0;j<this.size*8;j++)
            p[i][j]=path[i][j];
        }
        return p;
    }
    setBoard()
    {
        for(let i=0;i<this.size;i++)
        {
            for(let j=0;j<8;j++)
            {
                this.setPawn(4+this.size*4-2,j+i*8,0);
                this.setPawn(1,j+i*8,1);
            }
            this.setKnight(4+this.size*4-1,1+i*8,0);
            this.setKnight(4+this.size*4-1,6+i*8,0);
            this.setKnight(0,1+i*8,1);
            this.setKnight(0,6+i*8,1);
            this.setBishop(4+this.size*4-1,2+i*8,0);
            this.setBishop(4+this.size*4-1,5+i*8,0);
            this.setBishop(0,2+i*8,1);
            this.setBishop(0,5+i*8,1);
            this.setRook(4+this.size*4-1,0+i*8,0);
            this.setRook(4+this.size*4-1,7+i*8,0);
            this.setRook(0,0+i*8,1);
            this.setRook(0,7+i*8,1);
            this.setQueen(4+this.size*4-1,3+i*8,0);
            this.setQueen(0,3+i*8,1);
            this.setKing(4+this.size*4-1,4+i*8,0);
            this.setKing(0,4+i*8,1);
            this.kings[0][i].i=4+this.size*4-1;
            this.kings[0][i].j=4+i*8;
            this.kings[1][i].i=0;
            this.kings[1][i].j=4+i*8;
        }
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
    pieceInBetween(starti,startj,endi,endj)
    {
        let iteri=endi==starti?0:endi>starti?1:-1;
        let iterj=endj==startj?0:endj>startj?1:-1;
        for(let move=1;starti+iteri*move!=endi || startj+iterj*move!=endj;move++)
        if(this.board[starti+iteri*move][startj+iterj*move].side!=-1)
        return true;
        return false;
    }
    show()
    {
        let checkPath=this.clonePath(this.path);
        this.clearPath();
        [checkPath,this.path]=[this.path,checkPath];
        for(let side=0;side<2;side++)
        for(let n=0;n<this.size;n++)
        for(let c=0;c<this.kings[side][n].checker.length;c++)
        if(!this.pieceInBetween(this.kings[side][n].i,this.kings[side][n].j,this.kings[side][n].checker[c][0],this.kings[side][n].checker[c][1]))
        {
            checkPath[this.kings[side][n].i][this.kings[side][n].j]=true;
            break;
        }

        for(let i=0;i<4+this.size*4;i++)
        for(let j=0;j<this.size*8;j++)
        {
            document.getElementById(`${this.side==0?i:4+this.size*4-1-i}img${this.side==0?j:this.size*8-1-j}`).src=this.board[i][j].src;
            if(this.path[i][j])
            document.getElementById(`${this.side==0?i:4+this.size*4-1-i}td${this.side==0?j:this.size*8-1-j}`).style.backgroundColor="rgb(238,238,110)";
            else if(checkPath[i][j])
            document.getElementById(`${this.side==0?i:4+this.size*4-1-i}td${this.side==0?j:this.size*8-1-j}`).style.backgroundColor="rgb(216,96,116)";
            else
            document.getElementById(`${this.side==0?i:4+this.size*4-1-i}td${this.side==0?j:this.size*8-1-j}`).style.backgroundColor="";
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
        for(let i=0;i<4+this.size*4;i++)
        for(let j=0;j<this.size*8;j++)
        this.path[i][j]=false;
    }
    checkmate(parity)
    {
        let check=0;
        for(let i=0;i<4+this.size*4;i++)
        for(let j=0;j<this.size*8;j++)
        if(this.board[i][j].side==parity)
        {
            this.checkMovement(i,j);
            for(let squarei=0;squarei<4+this.size*4;squarei++)
            for(let squarej=0;squarej<this.size*8;squarej++)
            if(this.path[squarei][squarej])
            {
                this.clearPath();
                return -1;
            }
        }
        else if(check==0 && this.board[i][j].side==1-parity)
        {
            this.checkMovement(i,j);
            for(let n=0;n<this.size;n++)
            if(this.path[this.kings[parity][n].i][this.kings[parity][n].j])
            {
                this.clearPath();
                check=1;
            }
            this.clearPath();
        }
        return check;
    }
    onSameLine(i1,j1,i2,j2,i3,j3)
    {
        if(!(((i1<=i2 && i2<=i3) || (i1>=i2 && i2>=i3)) && ((j1<=j2 && j2<=j3) || (j1>=j2 && j2>=j3))))
        return false;
        if((i1==i2 && i2==i3) || (j1==j2 && j2==j3))
        return true;
        if(i1-i2==j1-j2 && i2-i3==j2-j3 && i1-j1==i2-j2)
        return true;
        if(i1-i2==j2-j1 && i2-i3==j3-j2 && i1+j1==i2+j2)
        return true;
        return false;
    }
    checkMovement(i,j)
    {
        let parity=this.board[i][j].side;
        let badPiece=new Set(),inCheck=0,currentKing=-1;
        for(let n=0;n<this.size;n++)
        {
            for(let c=0;c<this.kings[parity][n].checker.length;c++)
            badPiece.add(JSON.stringify(this.kings[parity][n].checker[c]));
            if(this.kings[parity][n].checker.length>0)
            inCheck++;
            if(this.kings[parity][n].i==i && this.kings[parity][n].j==j)
            currentKing=n;
        }
        if(badPiece.size>=2 && (inCheck>=2 || (currentKing!=-1 && this.kings[parity][currentKing].checker.length==0)))
        return;

        for(let squarei=0;squarei<4+this.size*4;squarei++)
        for(let squarej=0;squarej<this.size*8;squarej++)
        if(this.board[squarei][squarej].side==1-parity)
        this.checkPath(squarei,squarej,true);
        let opponentPath=this.clonePath(this.path);
        this.clearPath();

        if(this.board[i][j].piece=="k")
        {
            if(inCheck==0 || (inCheck==1 && this.kings[parity][currentKing].checker.length!=0))
            {
                this.checkPath(i,j,false);
                for(let squarei=0;squarei<4+this.size*4;squarei++)
                for(let squarej=0;squarej<this.size*8;squarej++)
                this.path[squarei][squarej]=this.path[squarei][squarej] && !opponentPath[squarei][squarej];
                if(this.board[i][j].cast && !opponentPath[i][j])
                {
                    if(this.board[i][j-4].cast && this.board[i][j-2].side==-1 && !opponentPath[i][j-2] && this.board[i][j-1].side==-1 && !opponentPath[i][j-1])
                    this.path[i][j-2]=true;
                    if(this.board[i][j+3].cast && this.board[i][j+2].side==-1 && !opponentPath[i][j+2] && this.board[i][j+1].side==-1 && !opponentPath[i][j+1])
                    this.path[i][j+2]=true;
                }
            }
            else
            {
                badPiece=undefined;
                for(let n=0;n<this.size && badPiece==undefined;n++)
                for(let c=0;c<this.kings[parity][n].checker.length && badPiece==undefined;c++)
                badPiece=this.kings[parity][n].checker[c];
                this.path[badPiece[0]][badPiece[1]]=Math.abs(badPiece[0]-i)<=1 && Math.abs(badPiece[1]-j)<=1 && !opponentPath[badPiece[0]][badPiece[1]];
            }
            return;
        }
        if(badPiece.size>=2)
        return;

        if(badPiece.size>0)
        badPiece=JSON.parse([...badPiece][0]);
        else
        badPiece=undefined;
        this.checkPath(i,j,false);

        for(let n=0;n<this.size;n++)
        {
            for(let t=0;t<this.kings[parity][n].threat.length;t++)
            if(this.onSameLine(this.kings[parity][n].threat[t][0],this.kings[parity][n].threat[t][1],i,j,this.kings[parity][n].i,this.kings[parity][n].j))
            for(let squarei=0;squarei<4+this.size*4;squarei++)
            for(let squarej=0;squarej<this.size*8;squarej++)
            this.path[squarei][squarej]=this.path[squarei][squarej] && (this.onSameLine(this.kings[parity][n].threat[t][0],this.kings[parity][n].threat[t][1],squarei,squarej,i,j) || this.onSameLine(i,j,squarei,squarej,this.kings[parity][n].i,this.kings[parity][n].j));

            if(this.kings[parity][n].checker.length>0)
            for(let squarei=0;squarei<4+this.size*4;squarei++)
            for(let squarej=0;squarej<this.size*8;squarej++)
            this.path[squarei][squarej]=this.path[squarei][squarej] && this.onSameLine(badPiece[0],badPiece[1],squarei,squarej,this.kings[parity][n].i,this.kings[parity][n].j);
        }
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
            case "k":this.king(i,j,enemy);
        }
    }
    pawn(i,j,enemy)
    {
        let move=this.board[i][j].side==0?-1:1;
        for(let till=1;till<=this.size*2;till++)
        {
            if(!enemy && this.board[i+move*till][j].side==-1)
            this.path[i+move*till][j]=true;
            if(!((move==1 && i==1) || (move==-1 && i==4+this.size*4-2)) || this.board[i+move*till][j].side!=-1)
            break;
        }
        if(j>0 && ((move==-1 && (this.board[i+move][j-1].side==1 || enemy)) || (move==1 && (this.board[i+move][j-1].side==0 || enemy)) || (((this.enpFromi<=i+move && i+move<=this.enpToi) || (this.enpFromi>=i+move && i+move>=this.enpToi)) && this.enpj==j-1 && this.board[this.enpPiecei][this.enpPiecej].side==1-this.board[i][j].side)))
        this.path[i+move][j-1]=true;
        if(j<this.size*8-1 && ((move==-1 && (this.board[i+move][j+1].side==1 || enemy)) || (move==1 && (this.board[i+move][j+1].side==0 || enemy)) || (((this.enpFromi<=i+move && i+move<=this.enpToi) || (this.enpFromi>=i+move && i+move>=this.enpToi)) && this.enpj==j+1 && this.board[this.enpPiecei][this.enpPiecej].side==1-this.board[i][j].side)))
        this.path[i+move][j+1]=true;
    }
    knight(i,j,enemy)
    {
        this.direction(i,j,-2,-1,enemy);
        this.direction(i,j,-2,+1,enemy);
        this.direction(i,j,-1,-2,enemy);
        this.direction(i,j,-1,+2,enemy);
        this.direction(i,j,+1,-2,enemy);
        this.direction(i,j,+1,+2,enemy);
        this.direction(i,j,+2,-1,enemy);
        this.direction(i,j,+2,+1,enemy);
    }
    bishop(i,j,enemy)
    {
        this.direction(i,j,-1,-1,enemy);
        this.direction(i,j,-1,+1,enemy);
        this.direction(i,j,+1,-1,enemy);
        this.direction(i,j,+1,+1,enemy);
    }
    rook(i,j,enemy)
    {
        this.direction(i,j,-1,0,enemy);
        this.direction(i,j,0,-1,enemy);
        this.direction(i,j,0,+1,enemy);
        this.direction(i,j,+1,0,enemy);
    }
    queen(i,j,enemy)
    {
        this.direction(i,j,-1,-1,enemy);
        this.direction(i,j,-1,+1,enemy);
        this.direction(i,j,+1,-1,enemy);
        this.direction(i,j,+1,+1,enemy);
        this.direction(i,j,-1,0,enemy);
        this.direction(i,j,0,-1,enemy);
        this.direction(i,j,0,+1,enemy);
        this.direction(i,j,+1,0,enemy);
    }
    king(i,j,enemy)
    {
        this.direction(i,j,-1,-1,enemy);
        this.direction(i,j,-1,+1,enemy);
        this.direction(i,j,+1,-1,enemy);
        this.direction(i,j,+1,+1,enemy);
        this.direction(i,j,-1,0,enemy);
        this.direction(i,j,0,-1,enemy);
        this.direction(i,j,0,+1,enemy);
        this.direction(i,j,+1,0,enemy);
    }
    direction(i,j,iteri,iterj,enemy)
    {
        let parity=this.board[i][j].side;
        for(let move=1;i+iteri*move>=0 && i+iteri*move<4+this.size*4 && j+iterj*move>=0 && j+iterj*move<this.size*8;move++)
        {
            if(this.board[i+iteri*move][j+iterj*move].side!=parity || enemy)
            this.path[i+iteri*move][j+iterj*move]=true;
            if(this.board[i][j].piece=="k" || this.board[i][j].piece=="n" || (!(this.board[i+iteri*move][j+iterj*move].piece=="k" && this.board[i+iteri*move][j+iterj*move].side==1-parity && enemy) && this.board[i+iteri*move][j+iterj*move].side!=-1))
            break;
        }
    }
    movePiece(fromi,fromj,toi,toj)
    {
        this.point+=this.board[toi][toj].side==this.side?this.getPoint(this.board[toi][toj].piece):-this.getPoint(this.board[toi][toj].piece);
        this.board[toi][toj]=this.board[fromi][fromj];
        this.board[fromi][fromj]=new Square();

        if(((this.enpFromi<=toi && toi<=this.enpToi) || (this.enpFromi<=toi && toi<=this.enpToi)) && this.enpj==toj && this.board[toi][toj].piece=="p")
        this.board[this.enpPiecei][this.enpPiecej]=new Square();
        this.enpPiecei=this.enpPiecej=this.enpFromi=this.enpToi=this.enpj=-1;

        if(this.board[toi][toj].piece=="p" && Math.abs(toi-fromi)>=2)
        {
            this.enpPiecei=toi;
            this.enpPiecej=toj;
            this.enpFromi=toi>fromi?fromi+1:fromi-1;
            this.enpToi=toi>fromi?toi-1:toi+1;
            this.enpj=toj;
        }
        if(this.board[toi][toj].piece=="k")
        {
            let parity=this.board[toi][toj].side;
            for(let n=0;n<this.size;n++)
            if(this.kings[parity][n].i==fromi && this.kings[parity][n].j==fromj)
            {
                this.kings[parity][n].i=toi;
                this.kings[parity][n].j=toj;
            }
            if(Math.abs(toj-fromj)==2)
            if(toj==fromj-2)
            {
                this.board[toi][toj+1]=this.board[toi][fromj-4];
                this.board[toi][fromj-4]=new Square();
            }
            else
            {
                this.board[toi][toj-1]=this.board[toi][fromj+3];
                this.board[toi][fromj+3]=new Square();
            }
            else if(parity==1-this.side)
            this.point-=1;
        }
        this.board[toi][toj].cast=false;
        if(!(this.board[toi][toj].piece=="p" && (toi==0 || toi==4+this.size*4-1)))
        this.analyseChecks(1-this.board[toi][toj].side);
    }
    promote(i,j,to)
    {
        if(typeof to==="number")
        switch(to)
        {
            case 1:this.board[i][j].setSquare("b",this.board[i][j].side);
                break;
            case 2:this.board[i][j].setSquare("n",this.board[i][j].side);
                break;
            case 3:this.board[i][j].setSquare("r",this.board[i][j].side);
                break;
            case 4:this.board[i][j].setSquare("q",this.board[i][j].side);
        }
        else
        this.board[i][j].setSquare(to,this.board[i][j].side);
        this.point+=this.board[i][j].side==this.side?-this.getPoint(this.board[i][j].piece):this.getPoint(this.board[i][j].piece);
        this.analyseChecks(1-this.board[i][j].side);
    }
    analyseChecks(parity)
    {
        for(let n=0;n<this.size;n++)
        {
            this.kings[1-parity][n].checker=new Array();
            this.kings[1-parity][n].threat=new Array();
        }
        this.clearPath();
        for(let n=0;n<this.size;n++)
        {
            this.enemyCheck(this.kings[parity][n].i,this.kings[parity][n].j,false);
            for(let i=0;i<4+this.size*4;i++)
            for(let j=0;j<this.size*8;j++)
            if(this.path[i][j])
            {
                this.kings[parity][n].checker.push([i,j]);
                this.path[i][j]=false;
            }
            this.enemyCheck(this.kings[parity][n].i,this.kings[parity][n].j,true);
            for(let i=0;i<4+this.size*4;i++)
            for(let j=0;j<this.size*8;j++)
            if(this.path[i][j])
            {
                this.kings[parity][n].threat.push([i,j]);
                this.path[i][j]=false;
            }
        }
    }
    enemyCheck(i,j,skip)
    {
        this.enemyDirection(i,j,-1,-1,skip);
        this.enemyDirection(i,j,-1,+1,skip);
        this.enemyDirection(i,j,+1,-1,skip);
        this.enemyDirection(i,j,+1,+1,skip);
        this.enemyDirection(i,j,-1,0,skip);
        this.enemyDirection(i,j,0,-1,skip);
        this.enemyDirection(i,j,0,+1,skip);
        this.enemyDirection(i,j,+1,0,skip);
        if(skip)
        return;
        this.enemyDirection(i,j,-2,-1,false);
        this.enemyDirection(i,j,-2,+1,false);
        this.enemyDirection(i,j,-1,-2,false);
        this.enemyDirection(i,j,-1,+2,false);
        this.enemyDirection(i,j,+1,-2,false);
        this.enemyDirection(i,j,+1,+2,false);
        this.enemyDirection(i,j,+2,-1,false);
        this.enemyDirection(i,j,+2,+1,false);
    }
    enemyDirection(i,j,iteri,iterj,skip)
    {
        let parity=this.board[i][j].side;
        for(let move=1;i+iteri*move>=0 && i+iteri*move<4+this.size*4 && j+iterj*move>=0 && j+iterj*move<this.size*8;move++)
        {
            if(this.board[i+iteri*move][j+iterj*move].side==1-parity)
            if((iteri==0 || iterj==0) && (this.board[i+iteri*move][j+iterj*move].piece=="r" || this.board[i+iteri*move][j+iterj*move].piece=="q"))
            this.path[i+iteri*move][j+iterj*move]=true;
            else if((Math.abs(iteri)==2 || Math.abs(iterj)==2) && (this.board[i+iteri*move][j+iterj*move].piece=="n"))
            this.path[i+iteri*move][j+iterj*move]=true;
            else if((Math.abs(iteri)==Math.abs(iterj)) && (this.board[i+iteri*move][j+iterj*move].piece=="b" || this.board[i+iteri*move][j+iterj*move].piece=="q" || (this.board[i+iteri*move][j+iterj*move].piece=="p" && (i+iteri*move==i+(parity==0?-1:1)))))
            this.path[i+iteri*move][j+iterj*move]=true;
            if((this.board[i+iteri*move][j+iterj*move].side!=-1 && this.board[i+iteri*move][j+iterj*move].piece!="k") || Math.abs(iteri)==2 || Math.abs(iterj)==2)
            if(skip && this.board[i+iteri*move][j+iterj*move].side==parity)
            skip=false;
            else
            break;
        }
    }
    computeBest(times,computer)
    {
        if(times==0)
        return this.point;

        let pointList=new Array(),bestPoint=undefined,turn=0;
        if((this.side==0 && computer) || (this.side==1 && !computer))
        turn=1;
        else
        turn=0;
        for(let i=0;i<4+this.size*4;i++)
        for(let j=0;j<this.size*8;j++)
        if(this.board[i][j].side==turn)
        {
            this.checkMovement(i,j);
            for(let squarei=0;squarei<4+this.size*4;squarei++)
            for(let squarej=0;squarej<this.size*8;squarej++)
            if(this.path[squarei][squarej])
            for(let promo=0;promo<4;promo++)
            {
                let newMove=this.clone();
                newMove.clearPath();
                newMove.movePiece(i,j,squarei,squarej);
                if(newMove.board[squarei][squarej].piece=="p" && (squarei==0 || squarei==4+this.size*4-1))
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
        else if(computer)
        return this.point-100;
        else if(this.checkmate(this.side)==0)
        return this.point-2;
        else
        return this.point+100;

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
                document.getElementById("label").innerText=cut+String.fromCharCode(pointList[i][3]+97)+(4+this.size*4-pointList[i][2])+" = "+this.board[pointList[i][2]][pointList[i][3]].piece.toUpperCase()+" was played";
            }
            else
            document.getElementById("label").innerText=""+(this.board[pointList[i][2]][pointList[i][3]].piece=="p"?"":this.board[pointList[i][2]][pointList[i][3]].piece.toUpperCase())+cut+String.fromCharCode(pointList[i][3]+97)+(4+this.size*4-pointList[i][2])+" was played";
            return;
        }
    }
}
let size,side,currentmove,tempmove,previousmove,nextmove,clicki,clickj,askPromo,end;
function doTask()
{
    if(currentmove.checkmate(1-side)!=-1)
    {
        document.getElementById("label").innerText="Good heavens! You win :D";
        end=true;
    }
    else
    {
        currentmove.computeBest(currentmove.level,true);
        if(currentmove.checkmate(side)!=-1)
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
    document.getElementById("sidetype").remove();
    document.getElementById("optiongroup").style.visibility="visible";
    document.getElementById("optiongroup").style.display="flex";
    let table=document.createElement("table");
    table.id="board";
    document.body.insertBefore(table,document.getElementById("optiongroup"));
    table.createTBody();
    let span=""+Math.floor(69*8/(4+size*4))+"px";
    for(let i=0;i<4+size*4;i++)
    {
        let tr=document.createElement("tr");
        table.tBodies[0].appendChild(tr);
        let tdl=document.createElement("td");
        tr.appendChild(tdl);
        tdl.id=`number${i}`;
        tdl.classList.add("label");
        tdl.style.fontSize=""+(1.3-size/10)+"rem";
        tdl.style.height=span;
        tdl.style.width=span;
        tdl.innerText=""+side==0?(4+size*4-i):(i+1);
        for(let j=0;j<size*8;j++)
        {
            let td=document.createElement("td");
            tr.appendChild(td);
            td.id=`${i}td${j}`;
            td.classList.add("matrix");
            td.style.height=td.style.width=span;
            let img=document.createElement("img");
            td.appendChild(img);
            img.id=`${i}img${j}`;
            if((i+j)%2==0)
            document.getElementById(`${i}td${j}`).classList.add("whitebox");
            else
            document.getElementById(`${i}td${j}`).classList.add("blackbox");
        }
    }
    let tr=document.createElement("tr");
    table.tBodies[0].appendChild(tr);
    let tdl=document.createElement("td");
    tr.appendChild(tdl);
    tdl.style.height=tdl.style.width=span;
    for(let i=0;i<size*8;i++)
    {
        let td=document.createElement("td");
        tr.appendChild(td);
        td.id=`letter${i}`;
        td.classList.add("label");
        td.style.fontSize=""+(1.3-size/10)+"rem";
        td.style.height=td.style.width=span;
        td.innerText=""+side==0?String.fromCharCode(i+97):String.fromCharCode((size*8-1-i)+97);
    }
    document.getElementById("label").innerText="Click on the corresponding piece to move. Press U to undo and R to redo.";
    document.getElementById("optiongroup").style.visibility="visible";
    document.getElementById("bishopi").src=new Bishop().src[side];
    document.getElementById("knighti").src=new Knight().src[side];
    document.getElementById("rooki").src=new Rook().src[side];
    document.getElementById("queeni").src=new Queen().src[side];

    currentmove=new Chess(size,side,4-size);
    currentmove.setBoard();
    if(side==1)
    currentmove.computeBest(currentmove.level,true);
    currentmove.show();

    tempmove=currentmove.clone(),previousmove=undefined,nextmove=undefined,clicki=-1,clickj=-1,askPromo=false,end=false;

    for(let i=0;i<4+size*4;i++)
    for(let j=0;j<size*8;j++)
    document.getElementById(`${side==0?i:4+size*4-1-i}td${side==0?j:size*8-1-j}`).addEventListener("click",function(event)
    {
        if(!askPromo && !end)
        if(currentmove.path[i][j])
        {
            currentmove.movePiece(clicki,clickj,i,j);
            currentmove.clearPath();
            if(currentmove.board[i][j].piece=="p" && (i==0 || i==4+size*4-1))
            {
                askPromo=true;
                document.getElementById("promo").style.visibility="visible";
                document.getElementById("promo").style.display="flex";
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
            if(currentmove.board[i][j].side==side)
            currentmove.checkMovement(i,j);
            clicki=i;
            clickj=j;
        }
        currentmove.show();
    }
    );

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
    let duh=0,time;
    document.getElementById("single").addEventListener("click",function(event)
    {
        document.getElementById("label").innerText="Choose your side";
        document.getElementById("chesstype").remove();
        document.getElementById("sidetype").style.visibility="visible";
        document.getElementById("sidetype").style.display="unset";
        size=1;
        duh++;
    }
    );
    document.getElementById("double").addEventListener("click",function(event)
    {
        document.getElementById("label").innerText="Choose your side";
        document.getElementById("chesstype").remove();
        document.getElementById("sidetype").style.visibility="visible";
        document.getElementById("sidetype").style.display="unset";
        size=2;
        duh++;
    }
    );
    window.addEventListener("keydown",function(event)
    {
        if((event.code=="Enter" || event.code=="NumpadEnter") && duh==0)
        {
            document.getElementById("label").innerText="Choose your side";
            document.getElementById("chesstype").remove();
            document.getElementById("sidetype").style.visibility="visible";
            document.getElementById("sidetype").style.display="unset";
            size=3;
            duh++;
        }
    }
    );
    window.addEventListener("touchstart",function(event)
    {
        time=new Date().getTime();
    }
    );
    window.addEventListener("touchend",function(event)
    {
        if(duh==0 && new Date().getTime()-time>3000)
        {
            document.getElementById("label").innerText="Choose your side";
            document.getElementById("chesstype").remove();
            document.getElementById("sidetype").style.visibility="visible";
            document.getElementById("sidetype").style.display="unset";
            size=3;
            duh++;
        }
    }
    );
    document.getElementById("white").addEventListener("click",function(event)
    {
        side=0;
        start();
    }
    );
    document.getElementById("black").addEventListener("click",function(event)
    {
        side=1;
        start();
    }
    );
}