class gameBase
{
    /*
    state;
    UseBot;
    maxThinkingTime;
    currentColor;//1 Black 0 White
    digitalBoard;
    ctx;
    imgBlack;
    imgWhite;
    */
    constructor()
    {
        this.digitalBoard = new board();
        this.ctx = {};
        this.imgBoard = {};
        this.imgBlack = {};
        this.imgWhite = {};
        this.onLoad();
    }
    onLoad()
    {
        this.ctx = document.getElementById("Board").getContext("2d");
        this.imgBoard = new Image();
        this.imgBoard.src = "img/Board.png";
        this.imgBlack = new Image();
        this.imgBlack.src = "img/black.png";
        this.imgWhite = new Image();
        this.imgWhite.onload = this.initGame.bind(this);
        this.imgWhite.src = "img/white.png";
    }
    initGame(sta="HumanTurn",usb=false,mtt=3600)
    {
        this.state = sta;
        this.UseBot = usb;
        this.maxThinkingTime = mtt;
        this.currentColor = 1;
        this.ctx.clearRect(0,0,640,640);
        this.ctx.drawImage(this.imgBoard,0,0);
        this.digitalBoard.refresh()
        this.renderState();
        if(this.UseBot)
        {
            let alt = "人机模式 ";
            if(sta=="HumanTurn"){alt+="人类先手"}
            else{alt+="电脑先手";}
            alert(alt);
        }
        else{alert("人对人模式");}
    }
    
    changeState()
    {
        this.currentColor ^= 1;
        if(this.digitalBoard.canNotSet(this.currentColor))
        {
            let clr = (this.currentColor==1) ? "黑子" : "白子";
            alert("当前"+clr+"不可下");
            this.changeState();
        }
    }
    renderState()
    {
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(this.digitalBoard.digitalBoard[i][j]==0){this.ctx.drawImage(this.imgWhite,i*80,j*80)}//white
                else if(this.digitalBoard.digitalBoard[i][j]==1){this.ctx.drawImage(this.imgBlack,i*80,j*80)}//black
            }
        }
    }
    isEndUp()// Check if the game comes to an end
    {
        if(this.digitalBoard.canNotSet(0)&&this.digitalBoard.canNotSet(1)) return true;
        return false;
    }
    endUp()
    {
        this.state = "EndUp";
        let bcnt=0;
        let wcnt=0;
        for(let i=0;i<8;++i)
        {
            for(let j=0;j<8;j++)
            {
                if(this.digitalBoard.digitalBoard[i][j]==0){++wcnt;}
                else if(this.digitalBoard.digitalBoard[i][j]==1){++bcnt;}
            }
        }
        let result;
        if(bcnt==wcnt) {result = " 平局！";}
        else if(bcnt<wcnt){result = " 白棋胜利！";}
        else{result = " 黑棋胜利！";}
        alert("黑: "+bcnt+" 白："+wcnt+result);
    }
/*    function showPos(event) {
    var e = event || window.event;
    e.clientX/80+","+e.clientY/80;
}*/
}