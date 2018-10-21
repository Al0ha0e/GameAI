class bot
{
    constructor(difficulty="naive",gamebase)// naive normal hard
    {
        this.gameBase = gamebase;
        this.difficulty = difficulty;
        this.normalMaxDeep = 5;
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
        
    }
    hardStrategy()
    {

    }
    Search(presentBoard,presentColor,deep,maxdeep,evaluateFunction,l,r)
    {
        let maxres = evaluateFunction(presentBoard.digitalBoard);
        if(presentBoard.canNotSet(presentColor)){ return (deep%2==1) ? -maxres : maxres;}
        if(deep==maxdeep)
        {
            for(let i=0;i<8;++i)
            {
                for(let j=0;j<8;++j)
                {
                    if(presentBoard.canSet(i,j,presentColor))
                    {
                        let ano = new board(presentBoard);
                        ano.set(i,j,currentColor);
                        maxres = Math.max(evaluateFunction(ano.digitalBoard),maxres);
                    }
                }
            }
            return (deep%2==1) ? -maxres : maxres;
        }
        
    }
}