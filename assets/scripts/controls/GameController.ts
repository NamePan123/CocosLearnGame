import { _decorator, Button, Component, game, Node, Prefab, resources } from 'cc';
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
            GameModel.Instance().SetData(TestData.Round1);
        });
    }




    onStartBtnClick(){

        this.StartTime(0);
    }


    public override GameUpdate(gameTime: number): void {
        
        if(this.ISRunning){
            this.reelView.GameUpdate(gameTime);
        }
    }

}


