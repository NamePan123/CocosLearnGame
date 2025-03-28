import { _decorator, Button, Component, instantiate, Label, Node, Prefab, resources, Sprite } from 'cc';
import { CellLineView } from './CellLineView';
import { GameTime } from '../core/GameTime';
import { IGameTime } from '../core/IGameTime';
import { CellAnimationController } from './animtions/CellAnimationController';
import { SymbolDefine } from '../models/SymbolDefine';
import { GameModel } from '../models/GameModel';
import { CellData } from '../models/CellData';
import { CellView } from './CellView';
const { ccclass, property } = _decorator;

@ccclass('WholeSheetView')
export class WholeSheetView extends GameTime {

   
    @property(Label) 
    public TimeLabel:Label;

    @property([CellLineView]) 
    public  celllines:CellLineView[] = Array<CellLineView>(5); 
    
    private CellAnimationPrefab:Prefab;
   
    private testPrefab:CellAnimationController;
    start() 
    {
        super.start();
    }


    
    public InitView(cellAnimPrefab:Prefab, model:GameModel):void
    {
        this.CellAnimationPrefab = cellAnimPrefab;
        this.BindData(model);
        //测试
        //let newNode = instantiate( this.CellAnimationPrefab);
        //newNode.parent = this.node;
        //newNode.setPosition(0,0);
        //this.testPrefab = newNode.getComponent(CellAnimationController);
    }

    //绑定数据
    private BindData(model:GameModel):void{
                                    //5
        for(let i:number = 0; i < this.celllines.length; i++){

            let singleLine:CellLineView = this.celllines[i];     
            let data:CellData; 
            let view:CellView;    
                                    //4
            for(let j:number = 0; j < singleLine.Length; j++){

                view = singleLine.GetCellViewByIndex(j);
                data = model.GetCellDataByIndex(j, i);
                view.data = data;
                view.SetAnimPrefab(this.CellAnimationPrefab);

            }        
        }
    }


    update(deltaTime: number) {
        super.update(deltaTime);
    }

    onLoad() {
        
    }
    
    // StartBtn 的点击事件处理函数
    onStartBtnClick(){
        //this.StartTime(0);
        //this.testPrefab.InitView(SymbolDefine.Number_2, this.buildNode);
        //GameModel.Instance().GetCellDataByIndex(3,4).SetIcon(SymbolDefine.Number_2);

    }
    

    public override GameUpdate(gameTime: number): void {
        this.TimeLabel.string = this.CurrentTime().toString();
        if(this.ISRunning){
            this.ReelMove();
        }
    }


    private ReelMove():void{


    }



}


