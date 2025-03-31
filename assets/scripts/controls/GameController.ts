import { _decorator, Button, Component, game, Label, math, Node, Prefab, resources, Tween } from 'cc';
import { WholeSheetView } from '../views/WholeSheetView';
import { GameModel } from '../models/GameModel';
import { TestData } from './TestData';
import { GameTime } from '../core/GameTime';
import { SymbolDefine } from '../models/SymbolDefine';

const { ccclass, property } = _decorator;

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
        this.InitGame();
        
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }


    private InitGame()
    {
        resources.load("prefabs/CellAnimation", Prefab, (err, prefab) => {
            if (err) {
                console.log("err:" + err);
                return;
            }
            this.reelView.InitView(prefab, GameModel.Instance());
            this.StartBtn.node.on(Node.EventType.TOUCH_END, this.onStartBtnClick, this);
            this.StopBtn.node.on(Node.EventType.TOUCH_END, this.onStopClick, this);
            this.ReplayBtn.node.on(Node.EventType.TOUCH_END, this.onReplayBtnClick, this);
            GameModel.Instance().SetData(TestData.Round1);
            this.TestIndex ++;
        });
    }


    private TestIndex:number = 0;
    private isFrist:boolean = true;
    onStartBtnClick(){

        
        if(!this.ISRunning || this.isFrist) {
            //模拟服务器发送2秒时间，收到后才可以点击下次开始
            this.InitTestData();
            this.isFrist = false;
          
        }
        else{
            console.log("时间还未到");
        }   
    }


    private InitTestData(){

        if(this.TestIndex == 0){
            GameModel.Instance().SetData(TestData.Round1, false);
        }
        if(this.TestIndex == 1){
            GameModel.Instance().SetData(TestData.Round2, false);
        }
        if(this.TestIndex == 2){
            GameModel.Instance().SetData(TestData.Round3, false);
        }
        if(this.TestIndex == 3){
            GameModel.Instance().SetData(TestData.Round4, false);
        }
        if(this.TestIndex == 4){
            GameModel.Instance().SetData(TestData.Round5, false);
        }
        if(this.TestIndex == 5){
            GameModel.Instance().SetData(TestData.Round6, false);
        }
       
        GameModel.Instance().ResetReel();
        this.Reset();
        this.StartTime(0);


        this.TestIndex ++;
        if( this.TestIndex == 5){
            this.TestIndex = 0;
        }
        this._roundEnd = false;
    }


    onStopClick(){

        this.Pause();
    }

    onReplayBtnClick(){

        this.Resume();
    }

    private _roundEnd:boolean = false;
    public override GameUpdate(gameTime: number): void {
        
        this.timeLabel.string = Math.round(gameTime).toString();
        if(this.ISRunning && this.isPaused == false){
            this.reelView.GameUpdate(gameTime);
            //等待结束 执行消除动画
            if(gameTime > GameModel.Instance().MaxReelTime && !this._roundEnd){
                
                this.Stop();
                //检查一下是否要消除
                if(GameModel.Instance().CheckDatas()){
                    this.reelView.PlayWinLine(SymbolDefine.Line_2);
                    setTimeout(() => {
                        this.reelView.PlayWobbleAnim(true);
                        this.scheduleOnce(() => this.StartDrop(), 1);

                }, 800);
                   
                }
                
                this._roundEnd = true;
            }
        } 
    }

    //开始掉落动画，计算每一组的掉落
    private StartDrop():void{
        this.reelView.PlayWobbleAnim(false);
        this.reelView.PlayDropAnim();
        setTimeout(() => {
            GameModel.Instance().ResetReel();
            this._roundEnd = false;

    }, 2);
    } 

}


