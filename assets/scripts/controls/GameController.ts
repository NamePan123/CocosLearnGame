import { _decorator, Button, Component, game, Node, Prefab, resources } from 'cc';
import { WholeSheetView } from '../views/WholeSheetView';
import { GameModel } from '../models/GameModel';
import { TestData } from './TestData';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

     
    @property(WholeSheetView) 
    public reelView:WholeSheetView;

    @property(Button) 
    public StartBtn:Button;

    start() {
        game.frameRate = 120;
        this.InitGame();
        
    }

    update(deltaTime: number) {
        
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

            GameModel.Instance().SetData(TestData.Round4);
           

        });
    }


    onStartBtnClick(){



        //this.StartTime(0);
        //this.testPrefab.InitView(SymbolDefine.Number_2, this.buildNode);
        //GameModel.Instance().GetCellDataByIndex(3,4).SetIcon(SymbolDefine.Number_2);
    }
}


