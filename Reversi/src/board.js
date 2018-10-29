class board
{
    constructor(anotherBoard)
    {
        this.digitalBoard = new Array();
        if(anotherBoard!=undefined)//ues another board to initialize this one
        {
            for(let i=0;i<8;i++)
            {
                this.digitalBoard[i] = new Array();
                for(let j=0;j<8;j++) this.digitalBoard[i][j] = anotherBoard.digitalBoard[i][j];
            }
        }
        else{this.refresh();}
    }
    refresh()
    {
        for(let i = 0;i<8;i++)
        {
            this.digitalBoard[i] = new Array();
            for(let j = 0;j<8;j++) {this.digitalBoard[i][j] = -1;}
        }
        this.digitalBoard[3][3] = this.digitalBoard[4][4] = 1;
        this.digitalBoard[3][4] = this.digitalBoard[4][3] = 0;
    }
    stableTest(color)
    {
        let ret = 0;
        if(this.digitalBoard[0][0]==color) ret++;
        if(this.digitalBoard[0][7]==color) ret++;
        if(this.digitalBoard[7][0]==color) ret++;
        if(this.digitalBoard[7][7]==color) ret++;
        let i,j,k;
        for(i=0;i<8;i++)
        {
            for(j=0;j<8;j++)
            {
                if((i==0&&j==0)||(i==0&&j==7)||(i==7&&j==0)||(i==7&&j==7)) continue;
                let flag = true;
                if((j<7&&this.digitalBoard[i][j+1]==color^1)||j==7)//left
                {for(k=1;j-k>=0;k++) {if(this.digitalBoard[i][j-k]==-1){flag = false;break;}}}
                if(flag&&((j>0&&this.digitalBoard[i][j-1]==color^1)||j==0))//right
                {for(k=1;j+k<8;k++) {if(this.digitalBoard[i][j+k]==-1){flag = false;break;}}}
                if(flag&&((i<7&&this.digitalBoard[i+1][j]==color^1)||i==7))//up
                {for(k=1;i-k>=0;k++) {if(this.digitalBoard[i-k][j]==-1){flag = false;break;}}}
                if(flag&&((i>0&&this.digitalBoard[i-1][j]==color^1)||i==0))//down
                {for(k=1;i+k<8;k++) {if(this.digitalBoard[i+k][j]==-1){flag = false;break;}}}
                if(flag&&(i-1)>=0&&(j-1)>=0&&this.digitalBoard[i-1][j-1]==color^1)//rd
                {for(k=1;i+k<8&&j+k<8;k++){if(this.digitalBoard[i+k][j+k]==-1){flag=false;break;}}}
                if(flag&&i+1<8&&j+1<8&&this.digitalBoard[i+1][j+1]==color^1)//lu
                {for(k=1;i-k>=0&&j-k>=0;k++){if(this.digitalBoard[i-k][j-k]==-1){flag=false;break;}}}
                if(flag&&i-1>=0&&j+1<8&&this.digitalBoard[i-1][j+1]==color^1)//ld
                {for(k=1;i+k<8&&j-k>=0;k++){if(this.digitalBoard[i+k][j-k]==-1){flag=false;break;}}}
                if(flag&&i+1<8&&j-1>=0&&this.digitalBoard[i+1][j-1]==color^1)//ru
                {for(k=1;i-k>=0&&j+k<8;k++){if(this.digitalBoard[i-k][j+k]==-1){flag=false;break;}}}
                if(flag) ret++;
            }
        }
        return ret;
    }
    canSet(xpos,ypos,color)
    {
        if(this.digitalBoard[xpos][ypos]!=-1) return false;
        let flag1;
        if(xpos>1)//check left
        {
            if(this.digitalBoard[xpos-1][ypos]==(color^1))
            {
                flag1 = false;
                for(let i=xpos-2;(i>=0);--i)
                {
                    if(this.digitalBoard[i][ypos]==-1) {break;}
                    if(this.digitalBoard[i][ypos]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if(ypos>1)//check up
        {
            if(this.digitalBoard[xpos][ypos-1]==(color^1))
            {
                flag1 = false;
                for(let i=ypos-2;(i>=0);--i)
                {
                    if(this.digitalBoard[xpos][i]==-1) {break;}
                    if(this.digitalBoard[xpos][i]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if(xpos<6)//check right
        {
            if(this.digitalBoard[xpos+1][ypos]==(color^1))
            {
                flag1 = false;
                for(let i=xpos+2;(i<8);++i)
                {
                    if(this.digitalBoard[i][ypos]==-1) {break;}
                    if(this.digitalBoard[i][ypos]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if(ypos<6)//check down
        {
            if(this.digitalBoard[xpos][ypos+1]==(color^1))
            {
                flag1 = false;
                for(let i=ypos+2;(i<8);++i)
                {
                    if(this.digitalBoard[xpos][i]==-1) {break;}
                    if(this.digitalBoard[xpos][i]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if((xpos>1)&&(ypos>1))//check leftup
        {
            if(this.digitalBoard[xpos-1][ypos-1]==(color^1))
            {
                flag1 = false;
                for(let i=2;(xpos-i>=0)&&(ypos-i>=0);++i)
                {
                    if(this.digitalBoard[xpos-i][ypos-i]==-1) {break;}
                    if(this.digitalBoard[xpos-i][ypos-i]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if((xpos<6)&&(ypos<6))//check rightdown
        {
            if(this.digitalBoard[xpos+1][ypos+1]==(color^1))
            {
                flag1 = false;
                for(let i=2;(xpos+i<8)&&(ypos+i<8);++i)
                {
                    if(this.digitalBoard[xpos+i][ypos+i]==-1) {break;}
                    if(this.digitalBoard[xpos+i][ypos+i]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if((xpos>1)&&(ypos<6))//check leftdown
        {
            if(this.digitalBoard[xpos-1][ypos+1]==(color^1))
            {
                flag1 = false;
                for(let i=2;(xpos-i>=0)&&(ypos+i<8);++i)
                {
                    if(this.digitalBoard[xpos-i][ypos+i]==-1) {break;}
                    if(this.digitalBoard[xpos-i][ypos+i]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        if((xpos<6)&&(ypos>1))//check rightup
        {
            if(this.digitalBoard[xpos+1][ypos-1]==(color^1))
            {
                flag1 = false;
                for(let i=2;(xpos+i<8)&&(ypos-i>=0);++i)
                {
                    if(this.digitalBoard[xpos+i][ypos-i]==-1) {break;}
                    if(this.digitalBoard[xpos+i][ypos-i]==color){flag1 = true;break;}
                }
                if(flag1) return true;
            }
        }
        return false;
    }
    testSet(xpos,ypos,color)
    {
        let ret = 1;
        if(xpos>1)//check left
        {
            if(this.digitalBoard[xpos-1][ypos]==(color^1))
            {
                for(let i=xpos-2;(i>=0);--i)
                {
                    if(this.digitalBoard[i][ypos]==-1) {break;}
                    if(this.digitalBoard[i][ypos]==color)
                    {
                        ret += xpos - 1 - i;
                        break;
                    }
                }
            }
        }
        if(ypos>1)//check up
        {
            if(this.digitalBoard[xpos][ypos-1]==(color^1))
            {
                for(let i=ypos-2;(i>=0);--i)
                {
                    if(this.digitalBoard[xpos][i]==-1) {break;}
                    if(this.digitalBoard[xpos][i]==color)
                    {
                        ret += ypos - 1 - i;
                        break;
                    }
                }
            }
        }
        if(xpos<6)//check right
        {
            if(this.digitalBoard[xpos+1][ypos]==(color^1))
            {
                for(let i=xpos+2;(i<8);++i)
                {
                    if(this.digitalBoard[i][ypos]==-1) {break;}
                    if(this.digitalBoard[i][ypos]==color)
                    {
                        ret += i - 1 - xpos;
                        break;
                    }
                }
            }
        }
        if(ypos<6)//check down
        {
            if(this.digitalBoard[xpos][ypos+1]==(color^1))
            {
                for(let i=ypos+2;(i<8);++i)
                {
                    if(this.digitalBoard[xpos][i]==-1) {break;}
                    if(this.digitalBoard[xpos][i]==color)
                    {
                        ret += i - 1 - ypos;
                        break;
                    }
                }
            }
        }
        if((xpos>1)&&(ypos>1))//check leftup
        {
            if(this.digitalBoard[xpos-1][ypos-1]==(color^1))
            {
                for(let i=2;(xpos-i>=0)&&(ypos-i>=0);++i)
                {
                    if(this.digitalBoard[xpos-i][ypos-i]==-1) {break;}
                    if(this.digitalBoard[xpos-i][ypos-i]==color)
                    {
                        ret += i - 1;
                        break;
                    }
                }
            }
        }
        if((xpos<6)&&(ypos<6))//check rightdown
        {
            if(this.digitalBoard[xpos+1][ypos+1]==(color^1))
            {
                for(let i=2;(xpos+i<8)&&(ypos+i<8);++i)
                {
                    if(this.digitalBoard[xpos+i][ypos+i]==-1) {break;}
                    if(this.digitalBoard[xpos+i][ypos+i]==color)
                    {
                        ret += i - 1;
                        break;
                    }
                }
            }
        }
        if((xpos>1)&&(ypos<6))//check leftdown
        {
            if(this.digitalBoard[xpos-1][ypos+1]==(color^1))
            {
                for(let i=2;(xpos-i>=0)&&(ypos+i<8);++i)
                {
                    if(this.digitalBoard[xpos-i][ypos+i]==-1) {break;}
                    if(this.digitalBoard[xpos-i][ypos+i]==color)
                    {
                        ret += i - 1;
                        break;
                    }
                }
            }
        }
        if((xpos<6)&&(ypos>1))//check rightup
        {
            if(this.digitalBoard[xpos+1][ypos-1]==(color^1))
            {
                for(let i=2;(xpos+i<8)&&(ypos-i>=0);++i)
                {
                    if(this.digitalBoard[xpos+i][ypos-i]==-1) {break;}
                    if(this.digitalBoard[xpos+i][ypos-i]==color)
                    {
                        ret += i - 1;
                        break;
                    }
                }
            }
        }
        return ret;
    }
    canNotSet(color)
    {
        let flag = true;
        for(let i=0;(i<8)&&flag;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(this.canSet(i,j,color))
                {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    }
    set(xpos,ypos,color)
    {
        this.digitalBoard[xpos][ypos] = color;
        if(xpos>1)//check left
        {
            if(this.digitalBoard[xpos-1][ypos]==(color^1))
            {
                for(let i=xpos-2;(i>=0);--i)
                {
                    if(this.digitalBoard[i][ypos]==-1) {break;}
                    if(this.digitalBoard[i][ypos]==color)
                    {
                        for(let j = xpos-1;j>i;--j) {this.digitalBoard[j][ypos]=color;}
                        break;
                    }
                }
            }
        }
        if(ypos>1)//check up
        {
            if(this.digitalBoard[xpos][ypos-1]==(color^1))
            {
                for(let i=ypos-2;(i>=0);--i)
                {
                    if(this.digitalBoard[xpos][i]==-1) {break;}
                    if(this.digitalBoard[xpos][i]==color)
                    {
                        for(let j = ypos-1;j>i;--j) {this.digitalBoard[xpos][j]=color;}
                        break;
                    }
                }
            }
        }
        if(xpos<6)//check right
        {
            if(this.digitalBoard[xpos+1][ypos]==(color^1))
            {
                for(let i=xpos+2;(i<8);++i)
                {
                    if(this.digitalBoard[i][ypos]==-1) {break;}
                    if(this.digitalBoard[i][ypos]==color)
                    {
                        for(let j = xpos+1;j<i;++j) {this.digitalBoard[j][ypos]=color;}
                        break;
                    }
                }
            }
        }
        if(ypos<6)//check down
        {
            if(this.digitalBoard[xpos][ypos+1]==(color^1))
            {
                for(let i=ypos+2;(i<8);++i)
                {
                    if(this.digitalBoard[xpos][i]==-1) {break;}
                    if(this.digitalBoard[xpos][i]==color)
                    {
                        for(let j = ypos+1;j<i;++j) {this.digitalBoard[xpos][j]=color;}
                        break;
                    }
                }
            }
        }
        if((xpos>1)&&(ypos>1))//check leftup
        {
            if(this.digitalBoard[xpos-1][ypos-1]==(color^1))
            {
                for(let i=2;(xpos-i>=0)&&(ypos-i>=0);++i)
                {
                    if(this.digitalBoard[xpos-i][ypos-i]==-1) {break;}
                    if(this.digitalBoard[xpos-i][ypos-i]==color)
                    {
                        for(let j=1;j<i;++j) {this.digitalBoard[xpos-j][ypos-j]=color;}
                        break;
                    }
                }
            }
        }
        if((xpos<6)&&(ypos<6))//check rightdown
        {
            if(this.digitalBoard[xpos+1][ypos+1]==(color^1))
            {
                for(let i=2;(xpos+i<8)&&(ypos+i<8);++i)
                {
                    if(this.digitalBoard[xpos+i][ypos+i]==-1) {break;}
                    if(this.digitalBoard[xpos+i][ypos+i]==color)
                    {
                        for(let j=1;j<i;++j) {this.digitalBoard[xpos+j][ypos+j]=color;}
                        break;
                    }
                }
            }
        }
        if((xpos>1)&&(ypos<6))//check leftdown
        {
            if(this.digitalBoard[xpos-1][ypos+1]==(color^1))
            {
                for(let i=2;(xpos-i>=0)&&(ypos+i<8);++i)
                {
                    if(this.digitalBoard[xpos-i][ypos+i]==-1) {break;}
                    if(this.digitalBoard[xpos-i][ypos+i]==color)
                    {
                        for(let j=1;j<i;++j) {this.digitalBoard[xpos-j][ypos+j]=color;}
                        break;
                    }
                }
            }
        }
        if((xpos<6)&&(ypos>1))//check rightup
        {
            if(this.digitalBoard[xpos+1][ypos-1]==(color^1))
            {
                for(let i=2;(xpos+i<8)&&(ypos-i>=0);++i)
                {
                    if(this.digitalBoard[xpos+i][ypos-i]==-1) {break;}
                    if(this.digitalBoard[xpos+i][ypos-i]==color)
                    {
                        for(let j=1;j<i;++j) {this.digitalBoard[xpos+j][ypos-j]=color;}
                        break;
                    }
                }
            }
        }
    }
}