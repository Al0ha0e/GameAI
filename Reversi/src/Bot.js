class bot
{
    constructor(difficulty="naive",gamebase)// naive normal hard
    {
        this.gameBase = gamebase;
        this.difficulty = difficulty;
        this.normalMaxDeep = 5;
        this.evaluateTable = [
            [90,-60,10,10,10,10,-60,90],
            [-60,-80,5,5,5,5,-80,-60],
            [10,5,1,1,1,1,5,10],
            [10,5,1,1,1,1,5,10],
            [10,5,1,1,1,1,5,10],
            [10,5,1,1,1,1,5,10],
            [-60,-80,5,5,5,5,-80,-60],
            [90,-60,10,10,10,10,-60,90]
        ];
    }
    botMove()
    {
        this.botChangeState("ToBot");
        this.botTurn();
    }
    botChangeState(dir)
    {
        this.gameBase.currentColor ^= 1;
        if(dir=="ToBot"){this.gameBase.state="BotTurn";}
        else{this.gameBase.state="HumanTurn";}
        if(this.gameBase.digitalBoard.canNotSet(this.gameBase.currentColor))
        {
            let clr = (this.gameBase.currentColor==1) ? "黑子" : "白子";
            if(this.gameBase.state=="BotTurn")
            {
                alert("Bot当前"+clr+"不可下，轮到玩家");
                this.botChangeState("ToHuman");
            }
            else
            {
                alert("玩家当前"+clr+"不可下，轮到Bot");
                this.botMove();
            }
        }
    }
    botTurn()//AI Calculate for its turn
    {
        if(this.gameBase.state=="BotTurn")
        {
            if(this.difficulty=="naive"){this.naiveStrategy();}
            else if(this.difficulty=="normal"){this.normalStrategy();}
            else{this.hardStrategy();}
            this.gameBase.renderState();
            if(gbInstance.isEndUp()){gbInstance.endUp();}
            else{this.botChangeState("ToHuman");}
        }
    }
    naiveStrategy()
    {
        let setres = 0;
        let setchoice;
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(this.gameBase.digitalBoard.canSet(i,j,this.gameBase.currentColor))
                {
                    let res = this.gameBase.digitalBoard.testSet(i,j,this.gameBase.currentColor)
                    if(res>setres)
                    {
                        setres = res;
                        setchoice = {x: i,y: j};
                    }
                }
            }
        }
        this.gameBase.digitalBoard.set(setchoice.x,setchoice.y,this.gameBase.currentColor);
    }
    normalStrategy()
    {
        let evaluateFunction = (currentBoard,currentColor)=>{
            let ret = 0;
            for(let i=0;i<8;i++)
            {
                for(let j=0;j<8;j++)
                {
                    if(currentBoard[i][j]==currentColor){ret += this.evaluateTable[i][j];}
                    else if(currentBoard[i][j]==(currentColor^1)){ret -= this.evaluateTable[i][j];}
                } 
            }
            return ret;
        };
        let l = -100000000;
        let maxres = -100000000;
        let x,y;
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(this.gameBase.digitalBoard.canSet(i,j,this.gameBase.currentColor))
                {
                    let ano = new board(this.gameBase.digitalBoard);
                    ano.set(i,j,this.currentColor);
                    let res = this.Search(ano,this.gameBase.currentColor^1,2,7,evaluateFunction,l,100000000);
                    if(res>maxres)
                    {
                        maxres = res;
                        x = i; y = j;
                    }
                    l = Math.max(l,res);
                }
            }
        }
        this.gameBase.digitalBoard.set(x,y,this.gameBase.currentColor);
    }
    hardStrategy()
    {

    }
    Search(currentBoard,currentColor,deep,maxdeep,evaluateFunction,l,r)
    {
        //console.log(deep+" "+l+" "+r);
        let maxres; 
        if(currentBoard.canNotSet(currentColor))
        {
            maxres = evaluateFunction(currentBoard.digitalBoard,currentColor);
            return (deep%2==1) ? -maxres : maxres;
        }
        if(deep==maxdeep)
        {
            maxres = evaluateFunction(currentBoard.digitalBoard,currentColor);
            for(let i=0;i<8;++i)
            {
                for(let j=0;j<8;++j)
                {
                    if(currentBoard.canSet(i,j,currentColor))
                    {
                        let ano = new board(currentBoard);
                        ano.set(i,j,currentColor);
                        maxres = Math.max(evaluateFunction(ano.digitalBoard,currentColor),maxres);
                    }
                }
            }
            return (deep%2==1) ? -maxres : maxres;
        }
        maxres = -100000000;
        for(let i=0;i<8;++i)
        {
            for(let j=0;j<8;++j)
            {
                if(currentBoard.canSet(i,j,currentColor))
                {
                    let ano = new board(currentBoard);
                    ano.set(i,j,currentColor);
                    let res = this.Search(ano,currentColor^1,deep+1,maxdeep,evaluateFunction,l,r);
                    maxres = Math.max(maxres,res);
                    if((deep%2)==1){l = Math.max(l,res);}
                    else{r = Math.min(r,-res);}
                    if(r<l) return -maxres;
                }
            }
        }
        return -maxres;
    }
}