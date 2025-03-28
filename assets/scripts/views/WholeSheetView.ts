import { _decorator, Button, Component, instantiate, Label, Node, Prefab, resources, Sprite } from 'cc';
import { CellLineView } from './CellLineView';
import { GameTime } from '../core/GameTime';
import { IGameTime } from '../core/IGameTime';
import { CellAnimationController } from './animtions/CellAnimationController';
import { SymbolDefine } from '../models/SymbolDefine';
import { GameModel } from '../models/GameModel';
import { CellData } from '../models/CellData';
import { CellView } from './CellView';
import { ReelRuleData } from '../models/ReelRuleData';
const { ccclass, property } = _decorator;

@ccclass('WholeSheetView')
export class WholeSheetView extends Component {

   
    @property(Label) 
    public TimeLabel:Label;

    @property([CellLineView]) 
    public  celllines:CellLineView[] = Array<CellLineView>(5); 
    
    private CellAnimationPrefab:Prefab;
    //初始化UI
    public InitView(cellAnimPrefab:Prefab, model:GameModel):void
    {
        this.CellAnimationPrefab = cellAnimPrefab;
        this.BindData(model);
    }

    //绑定数据
    private BindData(model:GameModel):void{
        
        let data:CellData; 
        let view:CellView; 
                                    //5
        for(let i:number = 0; i < this.celllines.length; i++){

            let singleLine:CellLineView = this.celllines[i];     
            let ruleData:ReelRuleData = model.GetReelRuleDataByIndex(i);
            singleLine.ReelAnim.Init(ruleData);
                                    //4
            for(let j:number = 0; j < singleLine.Length; j++){

                view = singleLine.GetCellViewByIndex(j);
                data = model.GetCellDataByIndex(j, i);
                view.data = data;
                view.SetAnimPrefab(this.CellAnimationPrefab);
            }        
        }
    }

    //游戏更新
    public GameUpdate(gameTime){

        this.celllines.forEach(element => {
            element.UpdateView(gameTime);
        });
    }


}


