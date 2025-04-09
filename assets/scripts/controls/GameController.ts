import { _decorator, Button, Component, game, JsonAsset, Label, math, Node, Prefab, resources, Tween } from 'cc';
import { WholeSheetView } from '../views/WholeSheetView';
import { GameModel } from '../models/GameModel';
import { GameTime } from '../core/GameTime';
import { SymbolDefine } from '../models/SymbolDefine';
import { RotaryData } from '../models/protocolData/RotaryData';
import { SocketManager } from '../common/network/SocketManager';
import { PlayerModel } from '../models/PlayerModel';

const { ccclass, property } = _decorator;
//处理游戏逻辑的
@ccclass('GameController')
export class GameController extends GameTime {

     
    @property(WholeSheetView) 
    public reelView:WholeSheetView;

    @property(Button) 
    public StartBtn:Button;

    @property(Button) 
    public StopBtn:Button;


    @property(Button) 
    public ReplayBtn:Button;

    @property(Label) 
    public timeLabel:Label;

    start() {
        game.frameRate = 120;
        setTimeout(() => {
            this.InitGame();
        }, 1000);
        
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }


    private InitGame()
    {

        let ipaddress:string = "http://43.198.117.211:11122/Client";
        SocketManager.Instance.Connect(ipaddress);
        PlayerModel.Instance.InitModel();
        resources.load("prefabs/CellAnimation", Prefab, (err, prefab) => {
            if (err) {
                console.log("err:" + err);
                return;
            }
            this.reelView.InitView(prefab, GameModel.Instance());
            this.StartBtn.node.on(Node.EventType.TOUCH_END, this.onStartBtnClick, this);
            this.StopBtn.node.on(Node.EventType.TOUCH_END, this.onStopClick, this);
            this.ReplayBtn.node.on(Node.EventType.TOUCH_END, this.onReplayBtnClick, this);
            
                resources.load("sever_datas/sever_respones1", JsonAsset, (err, jsonAsset) => {
                    if (err) {
                        console.error("加载 JSON 失败", err);
                        return;
                    }

                    let jsonData: RotaryData[] = jsonAsset.json as RotaryData[];
                    GameModel.Instance().SetData(jsonData, true);
                    console.log("加载的 JSON 数据:", jsonData);
                })

        });
    }

    private responesIndex:number = 2;
    private loadJsonData():void{
            resources.load("sever_datas/sever_respones" + this.responesIndex, JsonAsset, (err, jsonAsset) => {
                if (err) {
                    console.error("加载 JSON 失败", err);
                    return;
                }

                this.responesIndex ++;
                if( this.responesIndex >= 14){
                    this.responesIndex = 1;
                }
                this.StartBtn.node.active = false;
                // 解析 JSON 数据
                let jsonData: RotaryData[] = jsonAsset.json as RotaryData[];
                console.log("加载的 JSON 数据:", jsonData);

                GameModel.Instance().SetData(jsonData, false);
                GameModel.Instance().ResetReel();
                if(this.isFrist || this._roundEnd) {
                    //模拟服务器发送1秒时间，收到后才可以点击下次开始
                    setTimeout(() => {
                        this.Reset();
                        this.StartTime(0);
                        this.StartBtn.node.active = false;
                        this._roundEnd = false;
                        this.isFrist = false;
            
                    }, 1000);
                  
                }
                else{
                    console.log("时间还未到");
                }   


            });
        }


    private TestIndex:number = 0;
    private isFrist:boolean = true;
    onStartBtnClick(){

        this.loadJsonData();
    }

    onStopClick(){

        this.Pause();
    }

    onReplayBtnClick(){
        this.Resume();
    }

    private _roundEnd:boolean = false;
    private _checkAgain:boolean = false;
    public override GameUpdate(gameTime: number): void {
        
        this.timeLabel.string = Math.round(gameTime).toString();
        if(this.ISRunning && this.isPaused == false){
            this.reelView.GameUpdate(gameTime);
            //等待结束 执行消除动画
            if(gameTime > GameModel.Instance().MaxReelTime && !this._roundEnd){
                
                this.Stop();

                this.ResultCheck();
            }
        } 
    }

    //private _checked:{ row: number; col: number }[];
    private ResultCheck():void{

        //GameModel.Instance().CheckDatas()
        //检查一下是否要消除
        let rd:RotaryData = GameModel.Instance().CheckDatas();
        if( rd != null){
            
            this._roundEnd = false;
            let index = 0;
            rd.prizeDetail.forEach(element => {
                this.reelView.PlayWinLine("line_" + element.hitLine, index);
            });
           
            //优先播放晃动，再播放掉落
            setTimeout(() => {
           
                this.reelView.PlayWobbleAnim(true);
                this.scheduleOnce(() => this.StartDrop(), 1);
          
            }, 800);          
        }
        else{

            this._roundEnd = true;
            this.StartBtn.node.active = true;
        }
    }


    //开始掉落动画，计算每一组的掉落
    private StartDrop():void{

        this.reelView.PlayWobbleAnim(false);
        this.reelView.PlayDropAnim();
        GameModel.Instance().RenderNext();
        GameModel.Instance().ResetReel();
        //GameModel.Instance().MoveMatrix(this._checked);
        setTimeout(() => {
            //再次检查
            this.ResultCheck();  
        }, 1500);
    } 

}


