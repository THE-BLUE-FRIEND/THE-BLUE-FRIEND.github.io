class Pawn
{
    constructor(s,ch,n)
    {
        if(s==0)
        this.i=6;
        else
        this.i=1;
        this.j=n;
        this.enp=false;
        this.side=ch;
        this.pro='p';
    }
}
class Bishop
{
    constructor(s,ch,n)
    {
        if(s==0 && n<2)
        this.i=7;
        else if(n<2)
        this.i=0;
        else
        this.i=-100;
        if(n==0)
        this.j=2;
        else if(n==1)
        this.j=5;
        else
        this.j=-90;
        this.side=ch;
    }
}
class Knight
{
    constructor(s,ch,n)
    {
        if(s==0 && n<2)
        this.i=7;
        else if(n<2)
        this.i=0;
        else
        this.i=-100;
        if(n==0)
        this.j=1;
        else if(n==1)
        this.j=6;
        else
        this.j=-90;
        this.side=ch;
    }
}
class Rook
{
    constructor(s,ch,n)
    {
        if(s==0 && n<2)
        this.i=7;
        else if(n<2)
        this.i=0;
        else
        this.i=-100;
        if(n==0)
        this.j=0;
        else if(n==1)
        this.j=7;
        else
        this.j=-90;
        this.side=ch;
        this.cast=true;
    }
}
class Queen
{
    constructor(s,ch,n)
    {
        if(s==0 && n==0)
        this.i=7;
        else if(n==0)
        this.i=0;
        else
        this.i=-100;
        if(n==0)
        this.j=3;
        else
        this.j=-90;
        this.side=ch;
    }
}
class King
{
    constructor(s,ch)
    {
        if(s==0)
        this.i=7;
        else
        this.i=0;
        this.j=4;
        this.cast=true;
        this.side=ch;
    }
}
class Player
{
    constructor(s,ch)
    {
        this.p=new Array();
        for(let n=0;n<8;n++)
        this.p[n]=new Pawn(s,ch,n);
        this.b=new Array();
        for(let n=0;n<10;n++)
        this.b[n]=new Bishop(s,ch,n);
        this.N=new Array();
        for(let n=0;n<10;n++)
        this.N[n]=new Knight(s,ch,n);
        this.r=new Array();
        for(let n=0;n<10;n++)
        this.r[n]=new Rook(s,ch,n);
        this.q=new Array();
        for(let n=0;n<9;n++)
        this.q[n]=new Queen(s,ch,n);
        this.k=new King(s,ch);
    }
}
class Chess
{
    constructor(ch)
    {
        this.pl=new Array();
        this.pl[0]=new Player(0,'W');
        this.pl[1]=new Player(1,'B');
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
        for(let k=0;k<10;k++)
        if(k<8 && this.pl[this.side].p[k].i==i && this.pl[this.side].p[k].j==j)
        return b?'p':k;
        else if(this.pl[this.side].b[k].i==i && this.pl[this.side].b[k].j==j)
        return b?'b':k;
        else if(this.pl[this.side].N[k].i==i && this.pl[this.side].N[k].j==j)
        return b?'n':k;
        else if(this.pl[this.side].r[k].i==i && this.pl[this.side].r[k].j==j)
        return b?'r':k;
        else if(k<9 && this.pl[this.side].q[k].i==i && this.pl[this.side].q[k].j==j)
        return b?'q':k;
        if(this.pl[this.side].k.i==i && this.pl[this.side].k.j==j)
        return b?'k':0;
        return 'x';
    }
    show(b)
    {
        let check=this.copyclass(false).checksquare(1-this.side,this.pl[this.side].k.i,this.pl[this.side].k.j,1)>=1;
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(b && this.board[i][j]=='o')
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(238,238,110)";
                else if(check && this.pl[this.side].k.i==i && this.pl[this.side].k.j==j)
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(216,96,116)";
                else if((i+j)%2==0)
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(255,255,255)";
                else
                document.getElementById(`td${this.side==0?i:7-i}${this.side==0?j:7-j}`).style.backgroundColor="rgb(90,90,90)";
                if(this.checkpiece(this.side,i,j,0)!=0||this.checkpiece(1-this.side,i,j,0)!=0)
                ;
                else
                document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src="";
            }
            
        }
    }
    copyclass()
    {
        let ch=new Chess(this.side);
        for(let n=0;n<8;n++)
        {
            ch.pl[this.side].p[n].i=this.pl[this.side].p[n].i;
            ch.pl[this.side].p[n].j=this.pl[this.side].p[n].j;
            ch.pl[this.side].p[n].enp=this.pl[this.side].p[n].enp;
            ch.pl[this.side].p[n].side=this.pl[this.side].p[n].side;
            ch.pl[1-this.side].p[n].i=this.pl[1-this.side].p[n].i;
            ch.pl[1-this.side].p[n].j=this.pl[1-this.side].p[n].j;
            ch.pl[1-this.side].p[n].enp=this.pl[1-this.side].p[n].enp;
            ch.pl[1-this.side].p[n].side=this.pl[1-this.side].p[n].side;
        }
        for(let n=0;n<10;n++)
        {
            ch.pl[this.side].b[n].i=this.pl[this.side].b[n].i;
            ch.pl[this.side].b[n].j=this.pl[this.side].b[n].j;
            ch.pl[this.side].b[n].side=this.pl[this.side].b[n].side;
            ch.pl[1-this.side].b[n].i=this.pl[1-this.side].b[n].i;
            ch.pl[1-this.side].b[n].j=this.pl[1-this.side].b[n].j;
            ch.pl[1-this.side].b[n].side=this.pl[1-this.side].b[n].side;
        }
        for(let n=0;n<10;n++)
        {
            ch.pl[this.side].N[n].i=this.pl[this.side].N[n].i;
            ch.pl[this.side].N[n].j=this.pl[this.side].N[n].j;
            ch.pl[this.side].N[n].side=this.pl[this.side].N[n].side;
            ch.pl[1-this.side].N[n].i=this.pl[1-this.side].N[n].i;
            ch.pl[1-this.side].N[n].j=this.pl[1-this.side].N[n].j;
            ch.pl[1-this.side].N[n].side=this.pl[1-this.side].N[n].side;
        }
        for(let n=0;n<10;n++)
        {
            ch.pl[this.side].r[n].i=this.pl[this.side].r[n].i;
            ch.pl[this.side].r[n].j=this.pl[this.side].r[n].j;
            ch.pl[this.side].r[n].cast=this.pl[this.side].r[n].cast;
            ch.pl[this.side].r[n].side=this.pl[this.side].r[n].side;
            ch.pl[1-this.side].r[n].i=this.pl[1-this.side].r[n].i;
            ch.pl[1-this.side].r[n].j=this.pl[1-this.side].r[n].j;
            ch.pl[1-this.side].r[n].cast=this.pl[1-this.side].r[n].cast;
            ch.pl[1-this.side].r[n].cast=this.pl[1-this.side].r[n].cast;
        }
        for(let n=0;n<9;n++)
        {
            ch.pl[this.side].q[n].i=this.pl[this.side].q[n].i;
            ch.pl[this.side].q[n].j=this.pl[this.side].q[n].j;
            ch.pl[this.side].q[n].side=this.pl[this.side].q[n].side;
            ch.pl[1-this.side].q[n].i=this.pl[1-this.side].q[n].i;
            ch.pl[1-this.side].q[n].j=this.pl[1-this.side].q[n].j;
            ch.pl[1-this.side].q[n].side=this.pl[1-this.side].q[n].side;
        }
        ch.pl[this.side].k.i=this.pl[this.side].k.i;
        ch.pl[this.side].k.j=this.pl[this.side].k.j;
        ch.pl[this.side].k.side=this.pl[this.side].k.side;
        ch.pl[this.side].k.cast=this.pl[this.side].k.cast;
        ch.pl[1-this.side].k.i=this.pl[1-this.side].k.i;
        ch.pl[1-this.side].k.j=this.pl[1-this.side].k.j;
        ch.pl[1-this.side].k.side=this.pl[1-this.side].k.side;
        ch.pl[1-this.side].k.cast=this.pl[1-this.side].k.cast;
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(this.board[i][j]=='o')
        ch.board[i][j]='o';
        ch.side=this.side;
        ch.point=this.point;
        ch.flag=this.flag;
        return ch;
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
        for(let n=0;n<8;n++)
        if(this.pl[x].p[n].i==i && this.pl[x].p[n].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Chess_plt60.png":"Chess Images/Chess_pdt60.png";
            else if(t==1)
            {
                this.pl[x].p[n].i=-100;
                this.pl[x].p[n].j=-90;
                return 1;
            }
            return x+1;
        }
        return 0;
    }
    checkpiecebishop(x,i,j,t)
    {
        for(let n=0;n<10;n++)
        if(this.pl[x].b[n].i==i && this.pl[x].b[n].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Chess_blt60.png":"Chess Images/Chess_bdt60.png";
            else if(t==1)
            {
                this.pl[x].b[n].i=-100;
                this.pl[x].b[n].j=-90;
                return 3;
            }
            return x+1;
        }
        return 0;
    }
    checkpieceknight(x,i,j,t)
    {
        for(let n=0;n<10;n++)
        if(this.pl[x].N[n].i==i && this.pl[x].N[n].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Chess_nlt60.png":"Chess Images/Chess_ndt60.png";
            else if(t==1)
            {
                this.pl[x].N[n].i=-100;
                this.pl[x].N[n].j=-90;
                return 3;
            }
            return x+1;
        }
        return 0;
    }
    checkpiecerook(x,i,j,t)
    {
        for(let n=0;n<10;n++)
        if(this.pl[x].r[n].i==i && this.pl[x].r[n].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Chess_rlt60.png":"Chess Images/Chess_rdt60.png";
            else if(t==1)
            {
                this.pl[x].r[n].i=-100;
                this.pl[x].r[n].j=-90;
                this.pl[x].r[n].cast=false;
                return 5;
            }
            return x+1;
        }
        return 0;
    }
    checkpiecequeen(x,i,j,t)
    {
        for(let n=0;n<9;n++)
        if(this.pl[x].q[n].i==i && this.pl[x].q[n].j==j)
        {
            if(t==0)
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Chess_qlt60.png":"Chess Images/Chess_qdt60.png";
            else if(t==1)
            {
                this.pl[x].q[n].i=-100;
                this.pl[x].q[n].j=-90;
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
            document.getElementById(`img${this.side==0?i:7-i}${this.side==0?j:7-j}`).src=x==0?"Chess Images/Chess_klt60.png":"Chess Images/Chess_kdt60.png";
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
        for(let n=0;n<8;n++)
        {
            this.checkmovement(x,'p',n);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let n=0;n<10;n++)
        {
            this.checkmovement(x,'b',n);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let n=0;n<10;n++)
        {
            this.checkmovement(x,'n',n);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let n=0;n<10;n++)
        {
            this.checkmovement(x,'r',n);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            if(this.board[i][j]=='o')
            return false;
        }
        for(let n=0;n<9;n++)
        {
            this.checkmovement(x,'q',n);
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
    checkmovement(x,ch,n)
    {
        this.clearboard();
        switch(ch)
        {
            case 'p':if(this.pl[x].p[n].pro!='p')
                this.checkmovement(x,this.pl[x].p[n].pro,this.pl[x].p[n].pro=='q'?n+1:n+2);
                else if(x==0)
                this.pawnforward(x,n);
                else if(x==1)
                this.pawnbackward(x,n);
                this.checkallbox(x,'p',n);
                break;
            case 'b':this.bishop(x,n);
                this.checkallbox(x,'b',n);
                break;
            case 'n':this.knight(x,n);
                this.checkallbox(x,'n',n);
                break;
            case 'r':this.rook(x,n);
                this.checkallbox(x,'r',n);
                break;
            case 'q':this.queen(x,n);
                this.checkallbox(x,'q',n);
                break;
            case 'k':this.king(x,2);
                this.checkallbox(x,'k',0);
        }
    }
    checkallbox(x,ch,n)
    {
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(this.checkallsquare(x,i,j,ch,n))
        this.board[i][j]=' ';
    }
    checkallsquare(x,i,j,ch,n)
    {
        let c=this.copyclass();
        if(c.board[i][j]=='o')
        {
            switch(ch)
            {
                case 'p':c.pl[x].p[n].i=i;
                    c.pl[x].p[n].j=j;
                    break;
                case 'b':c.pl[x].b[n].i=i;
                    c.pl[x].b[n].j=j;
                    break;
                case 'n':c.pl[x].N[n].i=i;
                    c.pl[x].N[n].j=j;
                    break;
                case 'r':c.pl[x].r[n].i=i;
                    c.pl[x].r[n].j=j;
                    break;
                case 'q':c.pl[x].q[n].i=i;
                    c.pl[x].q[n].j=j;
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
        for(let n=0;n<10;n++)
        {
            if(n<8)
            {
                if(x==0)
                this.pawnforward(x,n);
                else
                this.pawnbackward(x,n);
                if(this.board[i][j]=='o')
                c++;
                this.clearboard();
            }
            this.bishop(x,n);
            if(this.board[i][j]=='o')
            c++;
            this.clearboard();
            this.knight(x,n);
            if(this.board[i][j]=='o')
            c++;
            this.clearboard();
            this.rook(x,n);
            if(this.board[i][j]=='o')
            c++;
            this.clearboard();
            if(n<9)
            {
                this.queen(x,n);
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
    pawnforward(x,n)
    {
        if(this.pl[x].p[n].i<0)
        return;
        if(this.pl[x].p[n].i-1>=0 && this.checkpiece(x,this.pl[x].p[n].i-1,this.pl[x].p[n].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[n].i-1,this.pl[x].p[n].j,2)==0)
        this.board[this.pl[x].p[n].i-1][this.pl[x].p[n].j]='o';
        if(this.pl[x].p[n].i-2>=0 && this.pl[x].p[n].i==6 && this.checkpiece(x,this.pl[x].p[n].i-1,this.pl[x].p[n].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[n].i-1,this.pl[x].p[n].j,2)==0 && this.checkpiece(x,this.pl[x].p[n].i-2,this.pl[x].p[n].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[n].i-2,this.pl[x].p[n].j,2)==0)
        this.board[this.pl[x].p[n].i-2][this.pl[x].p[n].j]='o';
        if(this.pl[x].p[n].i-1>=0 && this.pl[x].p[n].j-1>=0 && (this.checkpiece(1-x,this.pl[x].p[n].i-1,this.pl[x].p[n].j-1,2)==2-x || this.enpassant(x,this.pl[x].p[n].i,this.pl[x].p[n].j,false)))
        this.board[this.pl[x].p[n].i-1][this.pl[x].p[n].j-1]='o';
        if(this.pl[x].p[n].i-1>=0 && this.pl[x].p[n].j+1<8 && (this.checkpiece(1-x,this.pl[x].p[n].i-1,this.pl[x].p[n].j+1,2)==2-x || this.enpassant(x,this.pl[x].p[n].i,this.pl[x].p[n].j,false)))
        this.board[this.pl[x].p[n].i-1][this.pl[x].p[n].j+1]='o';
    }
    pawnbackward(x,n)
    {
        if(this.pl[x].p[n].i<0)
        return;
        if(this.pl[x].p[n].i+1<8 && this.checkpiece(x,this.pl[x].p[n].i+1,this.pl[x].p[n].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[n].i+1,this.pl[x].p[n].j,2)==0)
        this.board[this.pl[x].p[n].i+1][this.pl[x].p[n].j]='o';
        if(this.pl[x].p[n].i+2<8 && this.pl[x].p[n].i==1 && this.checkpiece(x,this.pl[x].p[n].i+1,this.pl[x].p[n].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[n].i+1,this.pl[x].p[n].j,2)==0 && this.checkpiece(x,this.pl[x].p[n].i+2,this.pl[x].p[n].j,2)==0 && this.checkpiece(1-x,this.pl[x].p[n].i+2,this.pl[x].p[n].j,2)==0)
        this.board[this.pl[x].p[n].i+2][this.pl[x].p[n].j]='o';
        if(this.pl[x].p[n].i+1<8 && this.pl[x].p[n].j-1>=0 && (this.checkpiece(1-x,this.pl[x].p[n].i+1,this.pl[x].p[n].j-1,2)==2-x || this.enpassant(x,this.pl[x].p[n].i,this.pl[x].p[n].j,false)))
        this.board[this.pl[x].p[n].i+1][this.pl[x].p[n].j-1]='o';
        if(this.pl[x].p[n].i+1<8 && this.pl[x].p[n].j+1<8 && (this.checkpiece(1-x,this.pl[x].p[n].i+1,this.pl[x].p[n].j+1,2)==2-x || this.enpassant(x,this.pl[x].p[n].i,this.pl[x].p[n].j,false)))
        this.board[this.pl[x].p[n].i+1][this.pl[x].p[n].j+1]='o';
    }
    enpassant(x,i,j,t)
    {
        for(let n=0;n<8;n++)
        if(x==0)
        {
            if(this.pl[1-x].p[n].i==i+1 && this.pl[1-x].p[n].j==j && this.pl[1-x].p[n].enp && t)
            {
                this.pl[1-x].p[n].i=-100;
                this.pl[1-x].p[n].j=-90;
            }
            else if(this.pl[1-x].p[n].i==i && Math.abs(this.pl[1-x].p[n].j-j)==1 && this.pl[1-x].p[n].enp && !t)
            return true;
        }
        else if(x==1)
        {
            if(this.pl[0].p[n].i==i-1 && this.pl[0].p[n].j==j && this.pl[0].p[n].enp && t)
            {
                this.pl[0].p[n].i=-100;
                this.pl[0].p[n].j=-90;
            }
            else if(this.pl[0].p[n].i==i && Math.abs(this.pl[0].p[n].j-j)==1 && this.pl[0].p[n].enp && !t)
            return true;
        }
        return false;
    }
    cancelenpassent(x)
    {
        for(let n=0;n<8;n++)
        this.pl[x].p[n].enp=false;
    }
    bishop(x,n)
    {
        if(this.pl[x].b[n].i<0)
        return;
        this.diagonal(x,this.pl[x].b[n].i-1,this.pl[x].b[n].j-1,7,1);
        this.diagonal(x,this.pl[x].b[n].i+1,this.pl[x].b[n].j-1,7,2);
        this.diagonal(x,this.pl[x].b[n].i+1,this.pl[x].b[n].j+1,7,3);
        this.diagonal(x,this.pl[x].b[n].i-1,this.pl[x].b[n].j+1,7,4);
    }
    knight(x,n)
    {
        if(this.pl[x].N[n].i<0)
        return;
        if(this.pl[x].N[n].i-2>=0 && this.pl[x].N[n].j-1>=0 && this.checkpiece(x,this.pl[x].N[n].i-2,this.pl[x].N[n].j-1,2)==0)
        this.board[this.pl[x].N[n].i-2][this.pl[x].N[n].j-1]='o';
        if(this.pl[x].N[n].i-2>=0 && this.pl[x].N[n].j+1<8 && this.checkpiece(x,this.pl[x].N[n].i-2,this.pl[x].N[n].j+1,2)==0)
        this.board[this.pl[x].N[n].i-2][this.pl[x].N[n].j+1]='o';
        if(this.pl[x].N[n].i-1>=0 && this.pl[x].N[n].j-2>=0 && this.checkpiece(x,this.pl[x].N[n].i-1,this.pl[x].N[n].j-2,2)==0)
        this.board[this.pl[x].N[n].i-1][this.pl[x].N[n].j-2]='o';
        if(this.pl[x].N[n].i-1>=0 && this.pl[x].N[n].j+2<8 && this.checkpiece(x,this.pl[x].N[n].i-1,this.pl[x].N[n].j+2,2)==0)
        this.board[this.pl[x].N[n].i-1][this.pl[x].N[n].j+2]='o';
        if(this.pl[x].N[n].i+1<8 && this.pl[x].N[n].j-2>=0 && this.checkpiece(x,this.pl[x].N[n].i+1,this.pl[x].N[n].j-2,2)==0)
        this.board[this.pl[x].N[n].i+1][this.pl[x].N[n].j-2]='o';
        if(this.pl[x].N[n].i+1<8 && this.pl[x].N[n].j+2<8 && this.checkpiece(x,this.pl[x].N[n].i+1,this.pl[x].N[n].j+2,2)==0)
        this.board[this.pl[x].N[n].i+1][this.pl[x].N[n].j+2]='o';
        if(this.pl[x].N[n].i+2<8 && this.pl[x].N[n].j-1>=0 && this.checkpiece(x,this.pl[x].N[n].i+2,this.pl[x].N[n].j-1,2)==0)
        this.board[this.pl[x].N[n].i+2][this.pl[x].N[n].j-1]='o';
        if(this.pl[x].N[n].i+2<8 && this.pl[x].N[n].j+1<8 && this.checkpiece(x,this.pl[x].N[n].i+2,this.pl[x].N[n].j+1,2)==0)
        this.board[this.pl[x].N[n].i+2][this.pl[x].N[n].j+1]='o';
    }
    rook(x,n)
    {
        if(this.pl[x].r[n].i<0)
        return;
        this.straight(x,this.pl[x].r[n].i-1,this.pl[x].r[n].j,7,1);
        this.straight(x,this.pl[x].r[n].i,this.pl[x].r[n].j-1,7,2);
        this.straight(x,this.pl[x].r[n].i+1,this.pl[x].r[n].j,7,3);
        this.straight(x,this.pl[x].r[n].i,this.pl[x].r[n].j+1,7,4);
    }
    queen(x,n)
    {
        if(this.pl[x].q[n].i<0)
        return;
        this.straight(x,this.pl[x].q[n].i-1,this.pl[x].q[n].j,7,1);
        this.diagonal(x,this.pl[x].q[n].i-1,this.pl[x].q[n].j-1,7,1);
        this.straight(x,this.pl[x].q[n].i,this.pl[x].q[n].j-1,7,2);
        this.diagonal(x,this.pl[x].q[n].i+1,this.pl[x].q[n].j-1,7,2);
        this.straight(x,this.pl[x].q[n].i+1,this.pl[x].q[n].j,7,3);
        this.diagonal(x,this.pl[x].q[n].i+1,this.pl[x].q[n].j+1,7,3);
        this.straight(x,this.pl[x].q[n].i,this.pl[x].q[n].j+1,7,4);
        this.diagonal(x,this.pl[x].q[n].i-1,this.pl[x].q[n].j+1,7,4);
    }
    king(x,move)
    {
        if(move==0)
        return;
        let c=this.copyclass();
        if(this.pl[x].k.cast && this.pl[x].r[0].cast && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j,move-1)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j-1,2)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j-2,2)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j-3,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j-1,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j-2,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j-3,2)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j-1,move-1)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j-2,move-1)==0)
        this.board[(1-x)*7][2]='o';
        if(this.pl[x].k.cast && this.pl[x].r[1].cast && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j,move-1)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j+1,2)==0 && this.checkpiece(x,this.pl[x].k.i,this.pl[x].k.j+2,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j+1,2)==0 && this.checkpiece(1-x,this.pl[x].k.i,this.pl[x].k.j+2,2)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j+1,move-1)==0 && c.checksquare(1-x,this.pl[x].k.i,this.pl[x].k.j+2,move-1)==0)
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
    diagonal(x,i,j,n,d)
    {
        if(i<0||i>7||j<0||j>7||n==0)
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
                    this.diagonal(x,i-1,j-1,n-1,d);
                }
                return;
            case 2:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i+1,j-1,n-1,d);
                }
                return;
            case 3:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i+1,j+1,n-1,d);
                }
                return;
            case 4:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
                {
                    this.board[i][j]='o';
                    this.diagonal(x,i-1,j+1,n-1,d);
                }
                return;
        }
    }
    straight(x,i,j,n,d)
    {
        if(i<0||i>7||j<0||j>7||n==0)
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
                this.straight(x,i-1,j,n-1,d);
            }
            return;
            case 2:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i,j-1,n-1,d);
            }
            return;
            case 3:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i+1,j,n-1,d);
            }
            return;
            case 4:if(this.checkpiece(this.side,i,j,2)==0 && this.checkpiece(1-this.side,i,j,2)==0)
            {
                this.board[i][j]='o';
                this.straight(x,i,j+1,n-1,d);
            }
            return;
        }
    }
    movepiece(x,ch,n,i,j,t,b)
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
                if(Math.abs(this.pl[x].p[n].i-i)==2)
                this.pl[x].p[n].enp=true;
                this.pl[x].p[n].i=i;
                this.pl[x].p[n].j=j;
                if(this.enpassant(x,i,j,true))
                ;
                if(t>0)
                {
                    this.pl[x].p[n].pro=this.p(t);
                    this.promotion(x,n);
                }
                break;
            case 'b':this.pl[x].b[n].i=i;
                this.pl[x].b[n].j=j;
                this.cancelenpassent(x);
                break;
            case 'n':this.pl[x].N[n].i=i;
                this.pl[x].N[n].j=j;
                this.cancelenpassent(x);
                break;
            case 'r':this.pl[x].r[n].i=i;
                this.pl[x].r[n].j=j;
                this.pl[x].r[n].cast=false;
                this.cancelenpassent(x);
                break;
            case 'q':this.pl[x].q[n].i=i;
                this.pl[x].q[n].j=j;
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
                this.pl[x].k.cast=false;
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
    promotion(x,n)
    {
        switch(this.pl[x].p[n].pro)
        {
            case 'b':this.pl[x].b[n+2].i=this.pl[x].p[n].i;
                this.pl[x].b[n+2].j=this.pl[x].p[n].j;
                break;
            case 'n':this.pl[x].N[n+2].i=this.pl[x].p[n].i;
                this.pl[x].N[n+2].j=this.pl[x].p[n].j;
                break;
            case 'r':this.pl[x].r[n+2].i=this.pl[x].p[n].i;
                this.pl[x].r[n+2].j=this.pl[x].p[n].j;
                break;
            case 'q':this.pl[x].q[n+1].i=this.pl[x].p[n].i;
                this.pl[x].q[n+1].j=this.pl[x].p[n].j;
                break;
        }
        this.pl[x].p[n].i=-100;
        this.pl[x].p[n].j=-90;
    }
    calculateallmove(level)
    {
        let max=new Array(),min=new Array();
        for(let ch=0;ch<6;ch++)
        {
            max[ch]=new Array();
            min[ch]=new Array();
            for(let n=0;n<10;n++)
            {
                max[ch][n]=new Array();
                min[ch][n]=new Array();
                for(let i=0;i<8;i++)
                {
                    max[ch][n][i]=new Array();
                    min[ch][n][i]=new Array();
                    for(let j=0;j<8;j++)
                    {
                        max[ch][n][i][j]=this.copyclass();
                        max[ch][n][i][j].point=-200;
                        min[ch][n][i][j]=this.copyclass();
                        min[ch][n][i][j].point=-200;
                    }
                }
            }
        }
        let mch=5,mn=9,mi=7,mj=7;
        for(let ch=0;ch<6;ch++)
        for(let n=0;n<10;n++)
        {
            let cm=this.copyclass();
            if((ch==0 && n>7)||(ch==4 && n>8))
            continue;
            cm.checkmovement(1-this.side,this.p(ch),n);
            for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
            {
                if(cm.board[i][j]!='o')
                continue;
                max[ch][n][i][j]=cm.moveallpromo(1-this.side,ch,n,i,j,level,level,false);
                min[ch][n][i][j]=cm.moveallpromo(1-this.side,ch,n,i,j,level,level,true);
                if(min[ch][n][i][j].point>min[mch][mn][mi][mj].point)
                {
                    mch=ch;
                    mn=n;
                    mi=i;
                    mj=j;
                }
            }
        }
        for(let ch=0;ch<6;ch++)
        for(let n=0;n<10;n++)
        for(let i=0;i<8;i++)
        for(let j=0;j<8;j++)
        if(min[ch][n][i][j].point==min[mch][mn][mi][mj].point && max[ch][n][i][j].point>max[mch][mn][mi][mj].point)
        {
            mch=ch;
            mn=n;
            mi=i;
            mj=j;
        }
        let ch=0,n=0,i=0,j=0,fl=0;
        do
        for(;;)
        {
            ch=r(0,5);
            n=r(0,9);
            i=r(0,7);
            j=r(0,7);
            if((ch==0 && n>7)||(ch==4 && n>8))
            continue;
            this.checkmovement(1-this.side,this.p(ch),n);
            if(this.board[i][j]!='o')
            continue;
            if(min[ch][n][i][j].point==min[mch][mn][mi][mj].point && max[ch][n][i][j].point==max[mch][mn][mi][mj].point)
            break;
        }
        while((ch==5?fl++:fl+3)<3);
        this.checkmovement(1-this.side,this.p(ch),n);
        if(ch==0 && i==7)
        {
            let t=0;
            for(let tt=0;tt<4;tt++)
            {
                let tempmove=this.copyclass();
                tempmove.movepiece(1-this.side,'p',n,i,j,tt+1,true);
                tempmove.moveallpromo(1-this.side,ch,n,i,j,level-1,level-1,true);
                if(tempmove.point>=this.point)
                t=tt+1;
            }
            this.movepiece(1-this.side,'p',n,i,j,t,true);
            document.getElementById("label").innerText=""+String.fromCharCode(j+97)+(8-i)+" = "+Character.toUpperCase(p(t))+" was played";
        }
        else
        {
            this.movepiece(1-this.side,this.p(ch),n,i,j,0,true);
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
            for(let n=0;n<10;n++)
            {
                c[ch][n]=this.copyclass();
                if((ch==0 && n>7)||(ch==4 && n>8))
                {
                    if(!b||x==1-this.side)
                    c[ch][n].point=-200;
                    else
                    c[ch][n].point=200;
                    continue;
                }
                switch(ch)
                {
                    case 0:if(this.pl[x].p[n].i<0)
                        {
                            if(!b||x==1-this.side)
                            c[ch][n].point=-200;
                            else
                            c[ch][n].point=200;
                            continue;
                        }
                        break;
                    case 1:if(this.pl[x].b[n].i<0)
                        {
                            if(!b||x==1-this.side)
                            c[ch][n].point=-200;
                            else
                            c[ch][n].point=200;
                            continue;
                        }
                        break;
                    case 2:if(this.pl[x].N[n].i<0)
                        {
                            if(!b||x==1-this.side)
                            c[ch][n].point=-200;
                            else
                            c[ch][n].point=200;
                            continue;
                        }
                        break;
                    case 3:if(this.pl[x].r[n].i<0)
                        {
                            if(!b||x==1-this.side)
                            c[ch][n].point=-200;
                            else
                            c[ch][n].point=200;
                            continue;
                        }
                        break;
                    case 4:if(this.pl[x].q[n].i<0)
                        {
                            if(!b||x==1-this.side)
                            c[ch][n].point=-200;
                            else
                            c[ch][n].point=200;
                            continue;
                        }
                        break;
                }
                c[ch][n].checkmovement(x,this.p(ch),n);
                c[ch][n]=c[ch][n].moveallbox(x,ch,n,move,level,b);
                if((!b||x==1-this.side) && c[ch][n].point>c[mch][mn].point)
                {
                    mch=ch;
                    mn=n;
                }
                else if(b && x==this.side && c[ch][n].point<c[mch][mn].point)
                {
                    mch=ch;
                    mn=n;
                }
            }
        }
        return c[mch][mn];
    }
    moveallbox(x,ch,n,move,level,b)
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
                c[i][j]=this.moveallpromo(x,ch,n,i,j,move,level,b);
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
    moveallpromo(x,ch,n,i,j,move,level,b)
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
            c[t].movepiece(x,this.p(ch),n,i,j,t==0?0:5-t,false);
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
    let side=r(0,1),currentmove=new Chess(side),previousmove=currentmove.copyclass(),nextmove=currentmove.copyclass(),piecei=-1,piecej=-1,level=2,b=true;
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
    currentmove.show(b);
    for(let i=0;i<8;i++)
    for(let j=0;j<8;j++)
    document.getElementById(`td${currentmove.side==0?i:7-i}${currentmove.side==0?j:7-j}`).addEventListener("click",function(event)
    {
        if(currentmove.board[i][j]=='o')
        {
            previousmove=currentmove.copyclass();
            currentmove.movepiece(currentmove.side,currentmove.findpieceletter(piecei,piecej,true),currentmove.findpieceletter(piecei,piecej,false),i,j,0,false);
            currentmove.clearboard();
            if(currentmove.findpieceletter(i,j,false)<8 && (currentmove.pl[currentmove.side].p[currentmove.findpieceletter(i,j,false)].i==0 || currentmove.pl[currentmove.side].p[currentmove.findpieceletter(i,j,false)].i==7))
            {
                currentmove.pl[currentmove.side].p[currentmove.findpieceletter(piecei,piecej,false)].pro=currentmove.p(3+1);
                currentmove.promotion(currentmove.side,currentmove.findpieceletter(piecei,piecej,false));
            }
            if(currentmove.copyclass().checkmate(1-currentmove.side))
            {
                document.getElementById("label").innerText="Good heavens! You win :D";
                b=false;
                return;
            }
            currentmove.calculateallmove(level);
            nextmove=currentmove.copyclass();
            if(currentmove.copyclass().checkmate(currentmove.side))
            document.getElementById("label").innerText="Sorry amigo! You lose D:";
            b=true;
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
    window.addEventListener("keyup",function(event)
    {
        if(event.code=="KeyU")
        {
            currentmove=previousmove.copyclass();
            document.getElementById("label").innerText="Undo done";
            currentmove.clearboard();
            currentmove.show(b);
        }
        if(event.code=="KeyR")
        {
            currentmove=nextmove.copyclass();
            document.getElementById("label").innerText="Redo done";
            currentmove.clearboard();
            currentmove.show(b);
        }
    }
    );
}