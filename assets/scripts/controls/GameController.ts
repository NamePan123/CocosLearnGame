import { _decorator, Component, game, Node, Prefab, resources } from 'cc';
import { WholeSheetView } from '../views/WholeSheetView';
import { GameModel } from '../models/GameModel';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

     
    @property(WholeSheetView) 
    public reelView:WholeSheetView;

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
        });
    }
}


