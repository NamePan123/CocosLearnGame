import { _decorator, CCInteger, Component, Node, Prefab, UITransform } from 'cc';
import { CellView } from './CellView';
import { SymbolDefine } from '../models/SymbolDefine';
import { GameModel } from '../models/GameModel';
import { CellData } from '../models/CellData';
const { ccclass, property } = _decorator;

@ccclass('CellLineView')
export class CellLineView extends Component {

     @property(CCInteger) 
    public LineIndex:number = 0;

    public get Length():number
    {
        return this.celllines.length;
    }

    @property([CellView]) 
    public celllines:CellView[] = Array<CellView>();   
    start() {

    }

    update(deltaTime: number) {
        
    }

    public GetCellViewByIndex(index:number):CellView{
        return this.celllines[index];
    }
    

    public Move(speed:number):void {
        this.celllines.forEach(element => {
            element.Move(speed);
        });
    }

    public IsEnd():boolean {

        this.celllines.forEach(element => {
            if(!element.IsEnd){
                return false;
            }
        });
        return true;
    }

    public MoveFixed(speed:number):void {
        this.celllines.forEach(element => {
            element.MoveFixed(speed);
        });
    }

    //好，准备开始移动了
    public ReadyToMove():void {
        this.celllines.forEach(element => {
            element.StartMove();
            element.ToBlur(true);
        });
    }
     //停止移动
    public EndMove():void {
        this.celllines.forEach(element => {
            element.ToBlur(false);
        });
    }

    //移动到顶部
    public MoveToTop(index:number){

        let cell:CellView = this.celllines[index];
        let maxy:number = -1000;
        this.celllines.forEach(element => {
            if(element != cell){
                if(element.node.position.y > maxy){
                    maxy = element.node.position.y;
                }       
            }
        });
        //这样写可能会存在一定的误差，因为具体高度是大概的测量
        let height = 146;//cell.node.getComponent(UITransform).height / 2;图片高度因为透明区域不符合高度规则
        cell.node.setPosition(0, maxy + height);
        cell.icon.node.active = true;
    }

    //排序，如果元素之间位置有变化，从新排序
    public ReSort(){
        this.celllines.sort((a, b) => b.node.position.y - a.node.position.y);
    }

    //绑定UI和数据之间的联系
    public BingDataToUI(model:GameModel):void{
        this.ReSort();
        for(let i:number = 0; i < this.Length; i++){
            let view:CellView = this.GetCellViewByIndex(i);
            let data:CellData = model.GetCellDataByIndex(i, this.LineIndex);
            view.SetData(data, i); 
            view.icon.node.active = true;
        }       
    }

    //设置动画 就是WIN奖励和默认的动画
    public CreateAnim(anim:Prefab):void{

        this.celllines.forEach(view => {
            view.SetAnimPrefab(anim);    
        });
    }

}


