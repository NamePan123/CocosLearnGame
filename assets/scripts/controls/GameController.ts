import { _decorator, Button, Component, game, Label, math, Node, Prefab, resources } from 'cc';
import { WholeSheetView } from '../views/WholeSheetView';
import { GameModel } from '../models/GameModel';
import { TestData } from './TestData';
import { GameTime } from '../core/GameTime';

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
        });
    }




    onStartBtnClick(){

        this.InitTestData();
      
    }


    private InitTestData(){

        GameModel.Instance().SetData(TestData.Round1);
        GameModel.Instance().ResetReel();
        this.Reset();
        this.StartTime(0);
    }


    onStopClick(){

        this.Pause();
    }

    onReplayBtnClick(){

        this.Resume();
    }


    public override GameUpdate(gameTime: number): void {
        
        this.timeLabel.string = Math.round(gameTime).toString();
        if(this.ISRunning && this.isPaused == false){
            this.reelView.GameUpdate(gameTime);
        }
    }

}


