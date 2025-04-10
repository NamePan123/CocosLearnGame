import { _decorator, Button, Component, game, instantiate, JsonAsset, Label, math, Node, Prefab, resources, Tween } from 'cc';
import { WholeSheetView } from '../views/WholeSheetView';
import { GameModel } from '../models/GameModel';
import { GameTime } from '../core/GameTime';
import { SymbolDefine } from '../models/SymbolDefine';
import { RotaryData } from '../models/protocolData/RotaryData';
import { SocketManager } from '../common/network/SocketManager';
import { PlayerModel } from '../models/PlayerModel';
import { GameMessageHandler } from '../common/network/GameMessageHandler';
import { GameLoadingView } from '../views/GameLoadingView';
import { GameResourceManager } from './GameResourceManager';
import { MainPanelView } from '../views/MainPanelView';
import { TipsManager } from './TipsManager';

const { ccclass, property } = _decorator;
//处理游戏逻辑的
@ccclass('GameController')
export class GameController extends GameTime {


    @property(Node) 
    public GameParent:Node;   

    @property(GameLoadingView) 
    public loadPanel:GameLoadingView; 

   
    private _reelView:WholeSheetView;
    private _mainPanelView:MainPanelView;
    start() {
        game.frameRate = 60;
        setTimeout(() => {
            this.loadPanel.InitShow();
            this.LoadUI();
        }, 10);
      
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }

    private onLoadCompeleteEvent(data: any) {

       this.InitGame(data);       
    }

    private LoadUI(){

        GameResourceManager.Instance.AddLoad("prefabs/CellAnimation");
        GameResourceManager.Instance.AddLoad("prefabs/CellLine");
        GameResourceManager.Instance.AddLoad("prefabs/GameModule");
        GameResourceManager.Instance.node.on(GameResourceManager.RESPIRCE_LOAD_COMPELETE, this.onLoadCompeleteEvent, this);
        GameResourceManager.Instance.StartLoad();
    }
    private InitGame(data:any)
    {   
        
        let ipaddress:string = "http://43.198.117.211:11122/Client"
        PlayerModel.Instance.InitModel();
        GameModel.Instance.InitModel(this);
        SocketManager.Instance.Connect(ipaddress);

        let mainView:Node = instantiate(data[2]);
        mainView.setParent(this.GameParent);
        mainView.setPosition(0,0);

        this._reelView = mainView.getComponent(WholeSheetView);
        this._reelView.InitView(data[0], GameModel.Instance);
        this._reelView.SetVisible(false);

        this._mainPanelView = mainView.getComponent(MainPanelView);

        this._reelView.StartBtn.node.on(Node.EventType.TOUCH_END, this.onStartBtnClick, this);    
        this.loadPanel.StartBtn.node.on(Node.EventType.TOUCH_END, this.onShowMainUIBtnClick, this);     
    }


    onStartBtnClick():void{

        GameMessageHandler.Instance.SendStartRoundToSever(false);
    }

    onShowMainUIBtnClick():void{
      
        this._reelView.SetVisible(true);
        this.loadPanel.node.active = false;
    }

    onStopClick():void{

        this.Pause();
    }

    onReplayBtnClick():void{
        this.Resume();
    }


    public StartRound():void{
        this.Reset();
        this.StartTime(0);      
        this._roundEnd = false;
    }


    private _roundEnd:boolean = false;
    private _checkAgain:boolean = false;
    public override GameUpdate(gameTime: number): void {
        
        if(this.ISRunning && this.isPaused == false){
            this._reelView.GameUpdate(gameTime);
            //等待结束 执行消除动画
            if(gameTime > GameModel.Instance.MaxReelTime && !this._roundEnd){
                
                this.Stop();

                this.ResultCheck();
            }
        } 
    }

    //private _checked:{ row: number; col: number }[];
    private ResultCheck():void{

        GameMessageHandler.Instance.SendRoundEndToSever(GameModel.Instance.RoundCount);
        //检查一下是否要消除
        let rd:msg.FruitData = GameModel.Instance.CheckDatas();
        if( rd != null){
            
            this._roundEnd = false;
            let index = 0;
            rd.prizeDetail.forEach(element => {
                this._reelView.PlayWinLine("line_" + element.hitLine, index);
            });
           
            //优先播放晃动，再播放掉落
            setTimeout(() => {
           
                this._reelView.PlayWobbleAnim(true);
                this.scheduleOnce(() => this.StartDrop(), 1);
          
            }, 800);          
        }
        else{

            this._roundEnd = true;
          
        }
    }


    //开始掉落动画，计算每一组的掉落
    private StartDrop():void{

        this._reelView.PlayWobbleAnim(false);
        this._reelView.PlayDropAnim();
        GameModel.Instance.RenderNext();
        GameModel.Instance.ResetReel();

        setTimeout(() => {
            //再次检查
            this.ResultCheck();  
        }, 1500);
    } 


    public GameInitData(){
        
        this.loadPanel.ShowStart();
        this._mainPanelView.SetMoney(GameModel.Instance.money);
        this._mainPanelView.SetBet(GameModel.Instance.betScore);
        this._mainPanelView.SetRank(GameModel.Instance.prizePerRound);

    }   

    public GameUpdateData(){

        this._mainPanelView.SetMoney(GameModel.Instance.money);
        this._mainPanelView.SetRank(GameModel.Instance.prizePerRound);
    }




}
