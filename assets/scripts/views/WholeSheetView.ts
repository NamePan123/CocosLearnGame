import { _decorator, Button, Component, instantiate, Label, Line, Node, Prefab, resources, sp, Sprite } from 'cc';
import { CellLineView } from './CellLineView';
import { GameTime } from '../core/GameTime';
import { IGameTime } from '../core/IGameTime';
import { CellAnimationController } from './animtions/CellAnimationController';
import { SymbolDefine } from '../models/SymbolDefine';
import { GameModel } from '../models/GameModel';
import { CellData } from '../models/CellData';
import { CellView } from './CellView';
import { ReelRuleData } from '../models/ReelRuleData';
import { ReelAnimation } from './animtions/ReelAnimation';
const { ccclass, property } = _decorator;

@ccclass('WholeSheetView')
export class WholeSheetView extends Component {


    
    //@property(Label) 
    public TimeLabel:Label;


    @property(Button) 
    public StartBtn:Button; 

    @property([CellLineView]) 
    public celllines:CellLineView[] = Array<CellLineView>(5); 
   
    @property(sp.Skeleton) 
    public LineAnims:sp.Skeleton[] = Array<sp.Skeleton>(5);

      
    public reelAnims:ReelAnimation[] = Array<ReelAnimation>(5); 

    private CellAnimationPrefab:Prefab;
    //初始化UI
    public InitView(cellAnimPrefab:Prefab, model:GameModel):void
    {
        this.CellAnimationPrefab = cellAnimPrefab;
        this.BindData(model);
    }

    public SetVisible(value:boolean){
        this.node.active = value;
    }

    //绑定数据
    private BindData(model:GameModel):void{
        
        let data:CellData; 
        let view:CellView; 
                                    //5
        for(let i:number = 0; i < this.celllines.length; i++){     
            let singleLine:CellLineView = this.celllines[i];   
            let reelAnim:ReelAnimation =  singleLine.getComponent(ReelAnimation);
            let ruleData:ReelRuleData = model.GetReelRuleDataByIndex(i);
            reelAnim.Init(ruleData);
            singleLine.CreateAnim(this.CellAnimationPrefab);
            singleLine.BingDataToUI(model);
            this.reelAnims.push(reelAnim);
        }
    }

    //游戏更新
    public GameUpdate(gameTime){

        this.reelAnims.forEach(element => {
            element.GameUpdate(gameTime);
          });
    }
    
    //晃动动画
    public PlayWobbleAnim(value:boolean){

        this.celllines.forEach(element => {
            element.celllines.forEach(line => {
                line.PlayWobble(value);
            });
        });
    }

    //WIN的LINE 动画
    public PlayWinLine(name:string,index:number):void{
        this.LineAnims[index].node.active = true;
        this.LineAnims[index].setAnimation(0, name, false);
        setTimeout(() => {

            this.LineAnims.forEach(element => {
                element.node.active = false;
            });
        }, 500);
    }

    //播放掉落的动画
    public PlayDropAnim(){

        this.reelAnims.forEach(element => {
            element.StartDrop();
          });
    }

}


