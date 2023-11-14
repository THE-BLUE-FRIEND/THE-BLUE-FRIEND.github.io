class Pawn
{
    constructor(side,piece)
    {
        if(side==0)
        this.i=6;
        else
        this.i=1;
        this.j=piece;
        this.enp=false;
    }
    clone()
    {
        let p=new Pawn(0,0);
        p.i=this.i;
        p.j=this.j;
        p.enp=this.enp;
        return p;
    }
}
class Bishop
{
    constructor(side,piece)
    {
        if(side==0)
        this.i=7;
        else
        this.i=0;
        if(piece==0)
        this.j=2;
        else
        this.j=5;
    }
    clone()
    {
        let b=new Bishop(0,0);
        b.i=this.i;
        b.j=this.j;
        return b;
    }
}
class Knight
{
    constructor(side,piece)
    {
        if(side==0)
        this.i=7;
        else
        this.i=0;
        if(piece==0)
        this.j=1;
        else
        this.j=6;
    }
    clone()
    {
        let n=new Knight(0,0);
        n.i=this.i;
        n.j=this.j;
        return n;
    }
}
class Rook
{
    constructor(side,piece)
    {
        if(side==0)
        this.i=7;
        else
        this.i=0;
        if(piece==0)
        this.j=0;
        else
        this.j=7;
        this.cast=true;
    }
    clone()
    {
        let r=new Rook(0,0);
        r.i=this.i;
        r.j=this.j;
        r.cast=this.cast;
        return r;
    }
}
class Queen
{
    constructor(side)
    {
        if(side==0)
        this.i=7;
        else
        this.i=0;
        this.j=3;
    }
    clone()
    {
        let q=new Queen(0,0);
        q.i=this.i;
        q.j=this.j;
        return q;
    }
}
class King
{
    constructor(side)
    {
        if(side==0)
        this.i=7;
        else
        this.i=0;
        this.j=4;
    }
    clone()
    {
        let k=new King(0);
        k.i=this.i;
        k.j=this.j;
        return k;
    }
}
class Player
{
    constructor(side)
    {
        this.p=new Array();
        for(let piece=0;piece<8;piece++)
        this.p[piece]=new Pawn(side,piece);
        this.b=new Array();
        for(let piece=0;piece<2;piece++)
        this.b[piece]=new Bishop(side,piece);
        this.n=new Array();
        for(let piece=0;piece<2;piece++)
        this.n[piece]=new Knight(side,piece);
        this.r=new Array();
        for(let piece=0;piece<2;piece++)
        this.r[piece]=new Rook(side,piece);
        this.q=new Array();
        this.q[0]=new Queen(side);
        this.k=new King(side);
    }
    clone()
    {
        let pl=new Player(0);
        pl.p=new Array();
        for(let piece=0;piece<this.p.length;piece++)
        pl.p[piece]=this.p[piece].clone();
        pl.b=new Array();
        for(let piece=0;piece<this.b.length;piece++)
        pl.b[piece]=this.b[piece].clone();
        pl.n=new Array();
        for(let piece=0;piece<this.n.length;piece++)
        pl.n[piece]=this.n[piece].clone();
        pl.r=new Array();
        for(let piece=0;piece<this.r.length;piece++)
        pl.r[piece]=this.r[piece].clone();
        pl.q=new Array();
        for(let piece=0;piece<this.q.length;piece++)
        pl.q[piece]=this.q[piece].clone();
        pl.k=this.k.clone();
        return pl;
    }
}
class Chess
{
    constructor(ch)
    {
        this.pl=new Array();
        this.pl[0]=new Player(0);
        this.pl[1]=new Player(1);
        this.side=ch;
        this.board=new Array();
        for(let i=0;i<8;i++)
        {
            this.board[i]=new Array();
            for(let j=0;j<8;j++)
            this.board[i][j]=' ';
        }
        this.point=0;
        this.flag=0;
    }
    copyclass()
    {
        let ch=new Chess(0);
        ch.pl=new Array();
        ch.pl[0]=this.pl[0].clone();
        ch.pl[1]=this.pl[1].clone();
        ch.side=this.side;
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        ch.board[i][j]=this.board[i][j];
        ch.point=this.point;
        ch.flag=this.flag;
        return ch;
    }
    clearboard()
    {
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        this.board[i][j]=' ';
    }
    p(ch)
    {
        switch(ch)
        {
            case 0:return 'p';
            case 1:return 'b';
            case 2:return 'n';
            case 3:return 'r';
            case 4:return 'q';
            case 5:return 'k';
            default:return 'x';
        }
    }
    findpieceletter(i,j,b)
    {
        for(let piece=0;piece<10;piece++)
        if(piece<this.pl[this.side].p.length && this.pl[this.side].p[piece].i==i && this.pl[this.side].p[piece].j==j)
        return b?'p':piece;
        else if(piece<this.pl[this.side].b.length && this.pl[this.side].b[piece].i==i && this.pl[this.side].b[piece].j==j)
        return b?'b':piece;
        else if(piece<this.pl[this.side].n.length && this.pl[this.side].n[piece].i==i && this.pl[this.side].n[piece].j==j)
        return b?'n':piece;
        else if(piece<this.pl[this.side].r.length && this.pl[this.side].r[piece].i==i && this.pl[this.side].r[piece].j==j)
        return b?'r':piece;
        else if(piece<this.pl[this.side].q.length && this.pl[this.side].q[piece].i==i && this.pl[this.side].q[piece].j==j)
        return b?'q':piece;
        if(this.pl[this.side].k.i==i && this.pl[this.side].k.j==j)
        return b?'k':0;
        return 'x';
    }
    show(b)
    {
        let check=this.copyclass().checksquare(1-this.side,this.pl[this.side].k.i,this.pl[this.side].k.j,1)>=1;
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(b && this.board[i][j]=='o')
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(238,238,110)";
                else if(check && this.pl[this.side].k.i==i && this.pl[this.side].k.j==j)
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(216,96,116)";
                else
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor=null;
                if(this.checkpiece(this.side,i,j,0)!=0||this.checkpiece(1-this.side,i,j,0)!=0)
                ;
                else
                document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src="";
            }
            
        }
    }
    checkpiece(x,i,j,t)
    {
        if(t==1 && this.checkpiecepawn(x,i,j,2)!=0)
        return this.checkpiecepawn(x,i,j,1);
        else if(this.checkpiecepawn(x,i,j,t)!=0)
        return this.checkpiecepawn(x,i,j,2);
        if(t==1 && this.checkpiecebishop(x,i,j,2)!=0)
        return this.checkpiecebishop(x,i,j,1);
        else if(this.checkpiecebishop(x,i,j,t)!=0)
        return this.checkpiecebishop(x,i,j,2);
        if(t==1 && this.checkpieceknight(x,i,j,2)!=0)
        return this.checkpieceknight(x,i,j,1);
        else if(this.checkpieceknight(x,i,j,t)!=0)
        return this.checkpieceknight(x,i,j,2);
        if(t==1 && this.checkpiecerook(x,i,j,2)!=0)
        return this.checkpiecerook(x,i,j,1);
        else if(this.checkpiecerook(x,i,j,t)!=0)
        return this.checkpiecerook(x,i,j,2);
        if(t==1 && this.checkpiecequeen(x,i,j,2)!=0)
        return this.checkpiecequeen(x,i,j,1);
        else if(this.checkpiecequeen(x,i,j,t)!=0)
        return this.checkpiecequeen(x,i,j,2);
        if(t==1 && this.checkpieceking(x,i,j,2)!=0)
        return this.checkpieceking(x,i,j,1);
        else if(this.checkpieceking(x,i,j,t)!=0)
        return this.checkpieceking(x,i,j,2);
        return 0;
    }
    checkpiecepawn(x,i,j,t)
    {
        for(let piece=0;piece<this.pl[x].p.length;piece++)
        if(this.pl[x].p[piece].i==i && this.pl[x].p[piece].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Pawn Light.png":"Chess Images/Pawn Dark.png";
            else if(t==1)
            {
                this.pl[x].p.splice(piece,1);
                return 1;
            }
            return x+1;
        }
        return 0;
    }
    checkpiecebishop(x,i,j,t)
    {
        for(let piece=0;piece<this.pl[x].b.length;piece++)
        if(this.pl[x].b[piece].i==i && this.pl[x].b[piece].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Bishop Light.png":"Chess Images/Bishop Dark.png";
            else if(t==1)
            {
                this.pl[x].b.splice(piece,1);
                return 3;
            }
            return x+1;
        }
        return 0;
    }
    checkpieceknight(x,i,j,t)
    {
        for(let piece=0;piece<this.pl[x].n.length;piece++)
        if(this.pl[x].n[piece].i==i && this.pl[x].n[piece].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Knight Light.png":"Chess Images/Knight Dark.png";
            else if(t==1)
            {
                this.pl[x].n.splice(piece,1);
                return 3;
            }
            return x+1;
        }
        return 0;
    }
    checkpiecerook(x,i,j,t)
    {
        for(let piece=0;piece<this.pl[x].r.length;piece++)
        if(this.pl[x].r[piece].i==i && this.pl[x].r[piece].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Rook Light.png":"Chess Images/Rook Dark.png";
            else if(t==1)
            {
                this.pl[x].r.splice(piece,1);
                return 5;
            }
            return x+1;
        }
        return 0;
    }
    checkpiecequeen(x,i,j,t)
    {
        for(let piece=0;piece<this.pl[x].q.length;piece++)
        if(this.pl[x].q[piece].i==i && this.pl[x].q[piece].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Queen Light.png":"Chess Images/Queen Dark.png";
            else if(t==1)
            {
                this.pl[x].q.splice(piece,1);
                return 9;
            }
            return x+1;
        }
        return 0;
    }
    checkpieceking(x,i,j,t)
    {
        if(this.pl[x].k.i==i && this.pl[x].k.j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/King Light.png":"Chess Images/King Dark.png";
            else if(t==1)
            {
                this.pl[x].k.i=-100;
                this.pl[x].k.j=-90;
            }
            return x+1;
        }
        return 0;
    }
    checkmate(x)
    {
        for(let piece=0;piece<this.pl[x].p.length;piece++)
        {
            this.checkmovement(x,'p',piece);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let piece=0;piece<this.pl[x].b.length;piece++)
        {
            this.checkmovement(x,'b',piece);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let piece=0;piece<this.pl[x].n.length;piece++)
        {
            this.checkmovement(x,'n',piece);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let piece=0;piece<this.pl[x].r.length;piece++)
        {
            this.checkmovement(x,'r',piece);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let piece=0;piece<this.pl[x].q.length;piece++)
        {
            this.checkmovement(x,'q',piece);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        this.checkmovement(x,'k',0);
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(this.board[i][j]=='o')
        return false;
        return true;
    }
    checkmovement(x,ch,piece)
    {
        this.clearboard();
        switch(ch)
        {
            case 'p':if(x==0)
                this.pawnforward(x,piece);
                else if(x==1)
                this.pawnbackward(x,piece);
                this.checkallbox(x,'p',piece);
                break;
            case 'b':this.bishop(x,piece);
                this.checkallbox(x,'b',piece);
                break;
            case 'n':this.knight(x,piece);
                this.checkallbox(x,'n',piece);
                break;
            case 'r':this.rook(x,piece);
                this.checkallbox(x,'r',piece);
                break;
            case 'q':this.queen(x,piece);
                this.checkallbox(x,'q',piece);
                break;
            case 'k':this.king(x,2);
                this.checkallbox(x,'k',0);
        }
    }
    checkallbox(x,ch,piece)
    {
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(this.checkallsquare(x,i,j,ch,piece))
        this.board[i][j]=' ';
    }
    checkallsquare(x,i,j,ch,piece)
    {
        let c=this.copyclass();
        if(c.board[i][j]=='o')
        {
            switch(ch)
            {
                case 'p':c.pl[x].p[piece].i=i;
                    c.pl[x].p[piece].j=j;
                    break;
                case 'b':c.pl[x].b[piece].i=i;
                    c.pl[x].b[piece].j=j;
                    break;
                case 'n':c.pl[x].n[piece].i=i;
                    c.pl[x].n[piece].j=j;
                    break;
                case 'r':c.pl[x].r[piece].i=i;
                    c.pl[x].r[piece].j=j;
                    break;
                case 'q':c.pl[x].q[piece].i=i;
                    c.pl[x].q[piece].j=j;
                    break;
                case 'k':c.pl[x].k.i=i;
                    c.pl[x].k.j=j;
                    break;
            }
            c.checkpiece(1-x,i,j,1);
            c.clearboard();
            if(c.checksquare(1-x,c.pl[x].k.i,c.pl[x].k.j,1)>=1)
            return true;
        }
        return false;
    }
    checksquare(x,i,j,move)
    {
        if(i<0)
        return 0;
        let c=0;
        for(let piece=0;piece<10;piece++)
        {
            if(piece<this.pl[x].p.length)
            {
                if(x==0)
                this.pawnforward(x,piece);
                else
                this.pawnbackward(x,piece);
                if(this.board[i][j]=='o')
                c++;
                this.clearboard();
            }
            if(piece<this.pl[x].b.length)
            {
                this.bishop(x,piece);
                if(this.board[i][j]=='o')
                c++;
                this.clearboard();
            }
            if(piece<this.pl[x].n.length)
            {
                this.knight(x,piece);
                if(this.board[i][j]=='o')
                c++;
                this.clearboard();
            }
            if(piece<this.pl[x].r.length)
            {
                this.rook(x,piece);
                if(this.board[i][j]=='o')
                c++;
                this.clearboard();
            }
            if(piece<this.pl[x].q.length)
            {
                this.queen(x,piece);
                if(this.board[i][j]=='o')
                c++;
                this.clearboard();
            }
        }
        this.king(x,move);
        if(this.board[i][j]=='o')
        c++;
        this.clearboard();
        return c;
    }
    pawnforward(x,piece)
    {
        if(this.pl[x].p[piece].i<0)
        return;
        if(this.pl[x].p[piece].i-1>=0 && this.checkpiece(x,this.pl[x].p[piece].i-1,this.pl[x].p[piece].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[piece].i-1,this.pl[x].p[piece].j,2)==0)
        this.board[this.pl[x].p[piece].i-1][this.pl[x].p[piece].j]='o';
        if(this.pl[x].p[piece].i-2>=0 && this.pl[x].p[piece].i==6 && this.checkpiece(x,this.pl[x].p[piece].i-1,this.pl[x].p[piece].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[piece].i-1,this.pl[x].p[piece].j,2)==0 && this.checkpiece(x,this.pl[x].p[piece].i-2,this.pl[x].p[piece].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[piece].i-2,this.pl[x].p[piece].j,2)==0)
        this.board[this.pl[x].p[piece].i-2][this.pl[x].p[piece].j]='o';
        if(this.pl[x].p[piece].i-1>=0 && this.pl[x].p[piece].j-1>=0 && (this.checkpiece(1-x,this.pl[x].p[piece].i-1,this.pl[x].p[piece].j-1,2)==2-x || this.enpassant(x,this.pl[x].p[piece].i,this.pl[x].p[piece].j,false)))
        this.board[this.pl[x].p[piece].i-1][this.pl[x].p[piece].j-1]='o';
        if(this.pl[x].p[piece].i-1>=0 && this.pl[x].p[piece].j+1<8 && (this.checkpiece(1-x,this.pl[x].p[piece].i-1,this.pl[x].p[piece].j+1,2)==2-x || this.enpassant(x,this.pl[x].p[piece].i,this.pl[x].p[piece].j,false)))
        this.board[this.pl[x].p[piece].i-1][this.pl[x].p[piece].j+1]='o';
    }
    pawnbackward(x,piece)
    {
        if(this.pl[x].p[piece].i<0)
        return;
        if(this.pl[x].p[piece].i+1<8 && this.checkpiece(x,this.pl[x].p[piece].i+1,this.pl[x].p[piece].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[piece].i+1,this.pl[x].p[piece].j,2)==0)
        this.board[this.pl[x].p[piece].i+1][this.pl[x].p[piece].j]='o';
        if(this.pl[x].p[piece].i+2<8 && this.pl[x].p[piece].i==1 && this.checkpiece(x,this.pl[x].p[piece].i+1,this.pl[x].p[piece].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[piece].i+1,this.pl[x].p[piece].j,2)==0 && this.checkpiece(x,this.pl[x].p[piece].i+2,this.pl[x].p[piece].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[piece].i+2,this.pl[x].p[piece].j,2)==0)
        this.board[this.pl[x].p[piece].i+2][this.pl[x].p[piece].j]='o';
        if(this.pl[x].p[piece].i+1<8 && this.pl[x].p[piece].j-1>=0 && (this.checkpiece(1-x,this.pl[x].p[piece].i+1,this.pl[x].p[piece].j-1,2)==2-x || this.enpassant(x,this.pl[x].p[piece].i,this.pl[x].p[piece].j,false)))
        this.board[this.pl[x].p[piece].i+1][this.pl[x].p[piece].j-1]='o';
        if(this.pl[x].p[piece].i+1<8 && this.pl[x].p[piece].j+1<8 && (this.checkpiece(1-x,this.pl[x].p[piece].i+1,this.pl[x].p[piece].j+1,2)==2-x || this.enpassant(x,this.pl[x].p[piece].i,this.pl[x].p[piece].j,false)))
        this.board[this.pl[x].p[piece].i+1][this.pl[x].p[piece].j+1]='o';
    }
    enpassant(x,i,j,t)
    {
        for(let piece=0;piece<8;piece++)
        if(x==0 && piece<this.pl[1-x].p.length)
        {
            if(this.pl[1-x].p[piece].i==i+1 && this.pl[1-x].p[piece].j==j && this.pl[1-x].p[piece].enp && t)
            {
                this.pl[1-x].p.splice(piece,1);
            }
            else if(this.pl[1-x].p[piece].i==i && Math.abs(this.pl[1-x].p[piece].j-j)==1 && this.pl[1-x].p[piece].enp && !t)
            return true;
        }
        else if(x==1 && piece<this.pl[1-x].p.length)
        {
            if(this.pl[1-x].p[piece].i==i-1 && this.pl[1-x].p[piece].j==j && this.pl[1-x].p[piece].enp && t)
            {
                this.pl[1-x].p.splice(piece,1);
            }
            else if(this.pl[1-x].p[piece].i==i && Math.abs(this.pl[1-x].p[piece].j-j)==1 && this.pl[1-x].p[piece].enp && !t)
            return true;
        }
        return false;
    }
    cancelenpassent(x)
    {
        for(let piece=0;piece<this.pl[x].p.length;piece++)
        this.pl[x].p[piece].enp=false;
    }
    bishop(x,piece)
    {
        this.diagonal(x,this.pl[x].b[piece].i-1,this.pl[x].b[piece].j-1,7,1);
        this.diagonal(x,this.pl[x].b[piece].i+1,this.pl[x].b[piece].j-1,7,2);
        this.diagonal(x,this.pl[x].b[piece].i+1,this.pl[x].b[piece].j+1,7,3);
        this.diagonal(x,this.pl[x].b[piece].i-1,this.pl[x].b[piece].j+1,7,4);
    }
    knight(x,piece)
    {
        if(this.pl[x].n[piece].i-2>=0 && this.pl[x].n[piece].j-1>=0 && this.checkpiece(x,this.pl[x].n[piece].i-2,this.pl[x].n[piece].j-1,2)==0)
        this.board[this.pl[x].n[piece].i-2][this.pl[x].n[piece].j-1]='o';
        if(this.pl[x].n[piece].i-2>=0 && this.pl[x].n[piece].j+1<8 && this.checkpiece(x,this.pl[x].n[piece].i-2,this.pl[x].n[piece].j+1,2)==0)
        this.board[this.pl[x].n[piece].i-2][this.pl[x].n[piece].j+1]='o';
        if(this.pl[x].n[piece].i-1>=0 && this.pl[x].n[piece].j-2>=0 && this.checkpiece(x,this.pl[x].n[piece].i-1,this.pl[x].n[piece].j-2,2)==0)
        this.board[this.pl[x].n[piece].i-1][this.pl[x].n[piece].j-2]='o';
        if(this.pl[x].n[piece].i-1>=0 && this.pl[x].n[piece].j+2<8 && this.checkpiece(x,this.pl[x].n[piece].i-1,this.pl[x].n[piece].j+2,2)==0)
        this.board[this.pl[x].n[piece].i-1][this.pl[x].n[piece].j+2]='o';
        if(this.pl[x].n[piece].i+1<8 && this.pl[x].n[piece].j-2>=0 && this.checkpiece(x,this.pl[x].n[piece].i+1,this.pl[x].n[piece].j-2,2)==0)
        this.board[this.pl[x].n[piece].i+1][this.pl[x].n[piece].j-2]='o';
        if(this.pl[x].n[piece].i+1<8 && this.pl[x].n[piece].j+2<8 && this.checkpiece(x,this.pl[x].n[piece].i+1,this.pl[x].n[piece].j+2,2)==0)
        this.board[this.pl[x].n[piece].i+1][this.pl[x].n[piece].j+2]='o';
        if(this.pl[x].n[piece].i+2<8 && this.pl[x].n[piece].j-1>=0 && this.checkpiece(x,this.pl[x].n[piece].i+2,this.pl[x].n[piece].j-1,2)==0)
        this.board[this.pl[x].n[piece].i+2][this.pl[x].n[piece].j-1]='o';
        if(this.pl[x].n[piece].i+2<8 && this.pl[x].n[piece].j+1<8 && this.checkpiece(x,this.pl[x].n[piece].i+2,this.pl[x].n[piece].j+1,2)==0)
        this.board[this.pl[x].n[piece].i+2][this.pl[x].n[piece].j+1]='o';
    }
    rook(x,piece)
    {
        this.straight(x,this.pl[x].r[piece].i-1,this.pl[x].r[piece].j,7,1);
        this.straight(x,this.pl[x].r[piece].i,this.pl[x].r[piece].j-1,7,2);
        this.straight(x,this.pl[x].r[piece].i+1,this.pl[x].r[piece].j,7,3);
        this.straight(x,this.pl[x].r[piece].i,this.pl[x].r[piece].j+1,7,4);
    }
    queen(x,piece)
    {
        this.straight(x,this.pl[x].q[piece].i-1,this.pl[x].q[piece].j,7,1);
        this.diagonal(x,this.pl[x].q[piece].i-1,this.pl[x].q[piece].j-1,7,1);
        this.straight(x,this.pl[x].q[piece].i,this.pl[x].q[piece].j-1,7,2);
        this.diagonal(x,this.pl[x].q[piece].i+1,this.pl[x].q[piece].j-1,7,2);
        this.straight(x,this.pl[x].q[piece].i+1,this.pl[x].q[piece].j,7,3);
        this.diagonal(x,this.pl[x].q[piece].i+1,this.pl[x].q[piece].j+1,7,3);
        this.straight(x,this.pl[x].q[piece].i,this.pl[x].q[piece].j+1,7,4);
        this.diagonal(x,this.pl[x].q[piece].i-1,this.pl[x].q[piece].j+1,7,4);
    }
    king(x,move)
    {
        if(move==0)
        return;
        let c=this.copyclass();
        if(this.pl[x].r.length>0 && this.pl[x].r[0].cast && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j,move-1)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j-1,2)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j-2,2)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j-3,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j-1,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j-2,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j-3,2)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j-1,move-1)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j-2,move-1)==0)
        this.board[(1-x)*7][2]='o';
        if(this.pl[x].r.length>1 && this.pl[x].r[1].cast && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j,move-1)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j+1,2)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j+2,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j+1,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j+2,2)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j+1,move-1)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j+2,move-1)==0)
        this.board[(1-x)*7][6]='o';
        this.straight(x,this.pl[x].k.i-1,this.pl[x].k.j,1,1);
        this.diagonal(x,this.pl[x].k.i-1,this.pl[x].k.j-1,1,1);
        this.straight(x,this.pl[x].k.i,this.pl[x].k.j-1,1,2);
        this.diagonal(x,this.pl[x].k.i+1,this.pl[x].k.j-1,1,2);
        this.straight(x,this.pl[x].k.i+1,this.pl[x].k.j,1,3);
        this.diagonal(x,this.pl[x].k.i+1,this.pl[x].k.j+1,1,3);
        this.straight(x,this.pl[x].k.i,this.pl[x].k.j+1,1,4);
        this.diagonal(x,this.pl[x].k.i-1,this.pl[x].k.j+1,1,4);
    }
    diagonal(x,i,j,step,d)
    {
        if(i<0||i>7||j<0||j>7||step==0)
        return;
        if(this.checkpiece(1-x,i,j,2)==2-x)
        {
            this.board[i][j]='o';
            return;
        }
        switch(d)
        {
            case 1:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i-1,j-1,step-1,d);
                }
                return;
            case 2:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i+1,j-1,step-1,d);
                }
                return;
            case 3:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i+1,j+1,step-1,d);
                }
                return;
            case 4:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i-1,j+1,step-1,d);
                }
                return;
        }
    }
    straight(x,i,j,step,d)
    {
        if(i<0||i>7||j<0||j>7||step==0)
        return;
        if(this.checkpiece(1-x,i,j,2)==2-x)
        {
            this.board[i][j]='o';
            return;
        }
        switch(d)
        {
            case 1:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i-1,j,step-1,d);
            }
            return;
            case 2:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i,j-1,step-1,d);
            }
            return;
            case 3:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i+1,j,step-1,d);
            }
            return;
            case 4:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i,j+1,step-1,d);
            }
            return;
        }
    }
    movepiece(x,ch,piece,i,j,t,b)
    {
        if(this.flag==2)
        {
            this.point+=10;
            this.flag=0;
        }
        else if(this.flag==3)
        {
            this.point-=1;
            this.flag=0;
        }
        switch(ch)
        {
            case 'p':this.cancelenpassent(x);
                if(Math.abs(this.pl[x].p[piece].i-i)==2)
                this.pl[x].p[piece].enp=true;
                this.pl[x].p[piece].i=i;
                this.pl[x].p[piece].j=j;
                if(this.enpassant(x,i,j,true))
                ;
                if(t>0)
                {
                    this.promotion(x,piece,this.p(t));
                }
                break;
            case 'b':this.pl[x].b[piece].i=i;
                this.pl[x].b[piece].j=j;
                this.cancelenpassent(x);
                break;
            case 'n':this.pl[x].n[piece].i=i;
                this.pl[x].n[piece].j=j;
                this.cancelenpassent(x);
                break;
            case 'r':this.pl[x].r[piece].i=i;
                this.pl[x].r[piece].j=j;
                this.pl[x].r[piece].cast=false;
                this.cancelenpassent(x);
                break;
            case 'q':this.pl[x].q[piece].i=i;
                this.pl[x].q[piece].j=j;
                this.cancelenpassent(x);
                break;
            case 'k':if(this.pl[x].k.j==4 && j==2)
                {
                    this.pl[x].r[0].j=3;
                    this.pl[x].r[0].cast=false;
                    if(x==1-this.side)
                    this.point+=1;
                }
                else if(this.pl[x].k.j==4 && j==6)
                {
                    this.pl[x].r[1].j=5;
                    this.pl[x].r[1].cast=false;
                    if(x==1-this.side)
                    this.point+=1;
                }
                this.pl[x].k.i=i;
                this.pl[x].k.j=j;
                if(this.pl[x].r.length>0)
                this.pl[x].r[0].cast=false;
                if(this.pl[x].r.length>1)
                this.pl[x].r[1].cast=false;
                this.cancelenpassent(x);
        }
        if(x==this.side && this.checkpiece(1-this.side,i,j,2)==2-this.side)
        this.point-=this.checkpiece(1-this.side,i,j,1);
        else if(x==1-this.side && this.checkpiece(this.side,i,j,2)==this.side+1)
        this.point+=this.checkpiece(this.side,i,j,1);
        this.clearboard();
        if(Math.abs(this.point)!=100 && this.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j,1)>=1)
        if(x==this.side)
        {
            this.point=-1;
            this.flag=2;
        }
        else if(x==1-this.side && this.checksquare(this.side,i,j,2)==0)
        {
            this.point=1;
            this.flag=3;
        }
        if(this.checkmate(1-x))
        this.point+=x==1-this.side?100:-100;
        this.clearboard();
        return false;
    }
    promotion(x,piece,pro)
    {
        switch(pro)
        {
            case 'b':this.pl[x].b[this.pl[x].b.length]=new Bishop(x,0);
                this.pl[x].b[this.pl[x].b.length-1].i=this.pl[x].p[piece].i;
                this.pl[x].b[this.pl[x].b.length-1].j=this.pl[x].p[piece].j;
                break;
            case 'n':this.pl[x].n[this.pl[x].n.length]=new Knight(x,0);
            this.pl[x].n[this.pl[x].n.length-1].i=this.pl[x].p[piece].i;
            this.pl[x].n[this.pl[x].n.length-1].j=this.pl[x].p[piece].j;
                break;
            case 'r':this.pl[x].r[this.pl[x].r.length]=new Rook(x,0);
            this.pl[x].r[this.pl[x].r.length-1].i=this.pl[x].p[piece].i;
            this.pl[x].r[this.pl[x].r.length-1].j=this.pl[x].p[piece].j;
            this.pl[x].r[this.pl[x].r.length-1].cast=false;
                break;
            case 'q':this.pl[x].q[this.pl[x].q.length]=new Queen(x,0);
            this.pl[x].q[this.pl[x].q.length-1].i=this.pl[x].p[piece].i;
            this.pl[x].q[this.pl[x].q.length-1].j=this.pl[x].p[piece].j;
                break;
        }
        this.pl[x].p.splice(piece,1);
    }
    calculateallmove(level)
    {
        let max=new Array(),min=new Array();
        for(let ch=0;ch<6;ch++)
        {
            max[ch]=new Array();
            min[ch]=new Array();
            for(let piece=0;piece<10;piece++)
            {
                max[ch][piece]=new Array();
                min[ch][piece]=new Array();
                for(let i=0;i<8;i++)
                {
                    max[ch][piece][i]=new Array();
                    min[ch][piece][i]=new Array();
                    for(let j=0;j<8;j++)
                    {
                        max[ch][piece][i][j]=this.copyclass();
                        max[ch][piece][i][j].point=-200;
                        min[ch][piece][i][j]=this.copyclass();
                        min[ch][piece][i][j].point=-200;
                    }
                }
            }
        }
        let mch=5,mn=9,mi=7,mj=7;
        for(let ch=0;ch<6;ch++)
        for(let piece=0;piece<10;piece++)
        {
            let cm=this.copyclass();
            if((ch==0 && piece>=this.pl[1-this.side].p.length)||(ch==1 && piece>=this.pl[1-this.side].b.length)||(ch==2 && piece>=this.pl[1-this.side].n.length)||(ch==3 && piece>=this.pl[1-this.side].r.length)||(ch==4 && piece>=this.pl[1-this.side].q.length))
            continue;
            cm.checkmovement(1-this.side,this.p(ch),piece);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            {
                if(cm.board[i][j]!='o')
                continue;
                max[ch][piece][i][j]=cm.moveallpromo(1-this.side,ch,piece,i,j,level,level,false);
                min[ch][piece][i][j]=cm.moveallpromo(1-this.side,ch,piece,i,j,level,level,true);
                if(min[ch][piece][i][j].point>min[mch][mn][mi][mj].point)
                {
                    mch=ch;
                    mn=piece;
                    mi=i;
                    mj=j;
                }
            }
        }
        for(let ch=0;ch<6;ch++)
        for(let piece=0;piece<10;piece++)
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(min[ch][piece][i][j].point==min[mch][mn][mi][mj].point && max[ch][piece][i][j].point>max[mch][mn][mi][mj].point)
        {
            mch=ch;
            mn=piece;
            mi=i;
            mj=j;
        }
        let ch=0,piece=0,i=0,j=0,fl=0;
        do
        for(;;)
        {
            ch=r(0,5);
            piece=r(0,9);
            i=r(0,7);
            j=r(0,7);
            // if((ch==0 && piece>=this.pl[1-this.side].p.length)||(ch==1 && piece>=this.pl[1-this.side].b.length)||(ch==2 && piece>=this.pl[1-this.side].n.length)||(ch==3 && piece>=this.pl[1-this.side].r.length)||(ch==4 && piece>=this.pl[1-this.side].q.length))
            // continue;
            // this.checkmovement(1-this.side,this.p(ch),piece);
            // if(this.board[i][j]!='o')
            // continue;
            if(min[ch][piece][i][j].point==min[mch][mn][mi][mj].point && max[ch][piece][i][j].point==max[mch][mn][mi][mj].point)
            break;
        }
        while((ch==5?fl++:fl+3)<3);
        this.checkmovement(1-this.side,this.p(ch),piece);
        if(ch==0 && (i==0 || i==7))
        {
            let t=0;
            for(let tt=0;tt<4;tt++)
            {
                let tempmove=this.copyclass();
                tempmove.movepiece(1-this.side,'p',piece,i,j,tt+1,true);
                tempmove.moveallpromo(1-this.side,ch,piece,i,j,level-1,level-1,true);
                if(tempmove.point>=this.point)
                t=tt+1;
            }
            this.movepiece(1-this.side,'p',piece,i,j,t,true);
            document.getElementById("label").innerText=""+String.fromCharCode(j+97)+(8-i)+" = "+this.p(t).toUpperCase()+" was played";
        }
        else
        {
            this.movepiece(1-this.side,this.p(ch),piece,i,j,0,true);
            document.getElementById("label").innerText=""+(ch==0?"":this.p(ch).toUpperCase())+String.fromCharCode(j+97)+(8-i)+" was played";
        }
    }
    moveallpiece(x,i,j,move,level,b)
    {
        if(move==0)
        return this;
        let c=new Array(),mch=0,mn=0;
        for(let ch=0;ch<6;ch++)
        {
            c[ch]=new Array();
            for(let piece=0;piece<10;piece++)
            {
                c[ch][piece]=this.copyclass();
                if((ch==0 && piece>7)||(ch==4 && piece>8))
                {
                    if(!b||x==1-this.side)
                    c[ch][piece].point=-200;
                    else
                    c[ch][piece].point=200;
                    continue;
                }
                switch(ch)
                {
                    case 0:if(piece>=this.pl[x].p.length)
                        {
                            if(!b||x==1-this.side)
                            c[ch][piece].point=-200;
                            else
                            c[ch][piece].point=200;
                            continue;
                        }
                        break;
                    case 1:if(piece>=this.pl[x].b.length)
                        {
                            if(!b||x==1-this.side)
                            c[ch][piece].point=-200;
                            else
                            c[ch][piece].point=200;
                            continue;
                        }
                        break;
                    case 2:if(piece>=this.pl[x].n.length)
                        {
                            if(!b||x==1-this.side)
                            c[ch][piece].point=-200;
                            else
                            c[ch][piece].point=200;
                            continue;
                        }
                        break;
                    case 3:if(piece>=this.pl[x].r.length)
                        {
                            if(!b||x==1-this.side)
                            c[ch][piece].point=-200;
                            else
                            c[ch][piece].point=200;
                            continue;
                        }
                        break;
                    case 4:if(piece>=this.pl[x].q.length)
                        {
                            if(!b||x==1-this.side)
                            c[ch][piece].point=-200;
                            else
                            c[ch][piece].point=200;
                            continue;
                        }
                        break;
                }
                c[ch][piece].checkmovement(x,this.p(ch),piece);
                c[ch][piece]=c[ch][piece].moveallbox(x,ch,piece,move,level,b);
                if((!b||x==1-this.side) && c[ch][piece].point>c[mch][mn].point)
                {
                    mch=ch;
                    mn=piece;
                }
                else if(b && x==this.side && c[ch][piece].point<c[mch][mn].point)
                {
                    mch=ch;
                    mn=piece;
                }
            }
        }
        return c[mch][mn];
    }
    moveallbox(x,ch,piece,move,level,b)
    {
        let c=new Array(),mi=0,mj=0;
        for(let i=0;i<8;i++)
        {
            c[i]=new Array();
            for(let j=0;j<8;j++)
            {
                c[i][j]=this.copyclass();
                if(this.board[i][j]!='o')
                {
                    if(!b||x==1-this.side)
                    c[i][j].point=-200;
                    else
                    c[i][j].point=200;
                    continue;
                }
                c[i][j]=this.moveallpromo(x,ch,piece,i,j,move,level,b);
                if((!b||x==1-this.side) && c[i][j].point>c[mi][mj].point)
                {
                    mi=i;
                    mj=j;
                }
                else if(b && x==this.side && c[i][j].point<c[mi][mj].point)
                {
                    mi=i;
                    mj=j;
                }
            }
        }
        return c[mi][mj];
    }
    moveallpromo(x,ch,piece,i,j,move,level,b)
    {
        let c=new Array(),mt=0;
        for(let t=0;t<=4;t++)
        {
            c[t]=this.copyclass();
            if(t==0 && ch==0 && i==7)
            {
                if(!b||x==1-this.side)
                c[t].point=-200;
                else
                c[t].point=200;
                continue;
            }
            else if(t!=0 && (ch!=0 || i!=7))
            continue;
            c[t].movepiece(x,this.p(ch),piece,i,j,t==0?0:5-t,false);
            c[t]=c[t].moveallpiece(1-x,i,j,move-1,level,b);
            if(((!b||x==1-this.side) && c[t].point>c[mt].point) || (b && x==this.side && c[t].point<c[mt].point))
            mt=t;
        }
        return c[mt];
    }
}
function r(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function ChessMain()
{
    let ohboard=document.getElementById("board");
    ohboard.remove();
    let side=r(0,1);
    document.body.insertBefore(ohboard,document.getElementById("optiongroup"));
    let currentmove=new Chess(side),previousmove=currentmove.copyclass(),nextmove=currentmove.copyclass(),piecei=-1,piecej=-1,level=2,b=true,dopromo=false,end=false;
    for(let i=0;i<8;i++)
    document.getElementById(`number${i}`).innerText=""+side==0?(8-i):(i+1);
    for(let i=0;i<8;i++)
    document.getElementById(`letter${i}`).innerText=""+side==0?String.fromCharCode(i+97):String.fromCharCode((7-i)+97);
    if(side==1)
    {
        currentmove.calculateallmove(level);
        previousmove=currentmove.copyclass();
        nextmove=currentmove.copyclass();
    }
    document.getElementById("bishopi").src=side==0?"Chess Images/Bishop Light.png":"Chess Images/Bishop Dark.png";
    document.getElementById("knighti").src=side==0?"Chess Images/Knight Light.png":"Chess Images/Knight Dark.png";
    document.getElementById("rooki").src=side==0?"Chess Images/Rook Light.png":"Chess Images/Rook Dark.png";
    document.getElementById("queeni").src=side==0?"Chess Images/Queen Light.png":"Chess Images/Queen Dark.png";
    document.getElementById("bishop").addEventListener("click",function(event)
    {
        currentmove.movepiece(currentmove.side,'p',currentmove.findpieceletter(piecei,piecej,false),piecei,piecej,1,false);
        currentmove.calculateallmove(level);
        currentmove.show(b);
        dopromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    document.getElementById("knight").addEventListener("click",function(event)
    {
        currentmove.movepiece(currentmove.side,'p',currentmove.findpieceletter(piecei,piecej,false),piecei,piecej,2,false);
        currentmove.calculateallmove(level);
        currentmove.show(b);
        dopromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    document.getElementById("rook").addEventListener("click",function(event)
    {
        currentmove.movepiece(currentmove.side,'p',currentmove.findpieceletter(piecei,piecej,false),piecei,piecej,3,false);
        currentmove.calculateallmove(level);
        currentmove.show(b);
        dopromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    document.getElementById("queen").addEventListener("click",function(event)
    {
        currentmove.movepiece(currentmove.side,'p',currentmove.findpieceletter(piecei,piecej,false),piecei,piecej,4,false);
        currentmove.calculateallmove(level);
        currentmove.show(b);
        dopromo=false;
        document.getElementById("promo").style.visibility="hidden";
    }
    );
    currentmove.show(b);
    for(let i=0;i<8;i++)
    for(let j=0;j<8;j++)
    {
        if((i+j)%2==0)
        document.getElementById(`td${currentmove.side==0?i:7-i}${currentmove.side==0?j:7-j}`).classList.add("whitebox");
        else
        document.getElementById(`td${currentmove.side==0?i:7-i}${currentmove.side==0?j:7-j}`).classList.add("blackbox");
        document.getElementById(`td${currentmove.side==0?i:7-i}${currentmove.side==0?j:7-j}`).addEventListener("click",function(event)
        {
            if(!end && !dopromo)
            if(b && currentmove.board[i][j]=='o')
            {
                previousmove=currentmove.copyclass();
                currentmove.movepiece(currentmove.side,currentmove.findpieceletter(piecei,piecej,true),currentmove.findpieceletter(piecei,piecej,false),i,j,0,false);
                currentmove.clearboard();
                if(currentmove.findpieceletter(i,j,true)=='p' && (currentmove.pl[currentmove.side].p[currentmove.findpieceletter(i,j,false)].i==0 || currentmove.pl[currentmove.side].p[currentmove.findpieceletter(i,j,false)].i==7))
                {
                    dopromo=true;
                    document.getElementById("promo").style.visibility="visible";
                    piecei=i;
                    piecej=j;
                }
                if(currentmove.copyclass().checkmate(1-currentmove.side))
                {
                    document.getElementById("label").innerText="Good heavens! You win :D";
                    b=false;
                    end=true;
                    currentmove.show(b);
                    return;
                }
                if(!dopromo)
                currentmove.calculateallmove(level);
                nextmove=currentmove.copyclass();
                b=true;
                if(currentmove.copyclass().checkmate(currentmove.side))
                {
                    document.getElementById("label").innerText="Sorry amigo! You lose D:";
                    b=false;
                    end=true;
                }
                if(dopromo)
                b=false;
            }
            else
            {
                currentmove.checkmovement(currentmove.side,currentmove.findpieceletter(i,j,true),currentmove.findpieceletter(i,j,false));
                if(piecei==i && piecej==j)
                b=!b;
                else
                b=true;
                piecei=i;
                piecej=j;
            }
            currentmove.show(b);
        }
        );
    }
    document.getElementById("undo").addEventListener("click",function(event)
    {
        if(dopromo)
        return;
        currentmove=previousmove.copyclass();
        document.getElementById("label").innerText="Undo done";
        currentmove.clearboard();
        currentmove.show(b);
        b=false;
        end=false;
    }
    );
    document.getElementById("redo").addEventListener("click",function(event)
    {
        if(dopromo)
        return;
        currentmove=nextmove.copyclass();
        document.getElementById("label").innerText="Redo done";
        currentmove.clearboard();
        currentmove.show(b);
        b=false;
        if(currentmove.copyclass().checkmate(1-currentmove.side) || currentmove.copyclass().checkmate(1-currentmove.side))
        end=true;
    }
    );
    window.addEventListener("keyup",function(event)
    {
        if(event.code=="KeyU" && !dopromo)
        {
            currentmove=previousmove.copyclass();
            document.getElementById("label").innerText="Undo done";
            currentmove.clearboard();
            currentmove.show(b);
            b=false;
            end=false;
        }
        if(event.code=="KeyR" && !dopromo)
        {
            currentmove=nextmove.copyclass();
            document.getElementById("label").innerText="Redo done";
            currentmove.clearboard();
            currentmove.show(b);
            b=false;
            if(currentmove.copyclass().checkmate(1-currentmove.side) || currentmove.copyclass().checkmate(1-currentmove.side))
            end=true;
        }
    }
    );
}