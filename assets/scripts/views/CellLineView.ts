import { _decorator, Component, Node, UITransform } from 'cc';
import { CellView } from './CellView';
import { ReelAnimation } from './animtions/ReelAnimation';
import { SymbolDefine } from '../models/SymbolDefine';
const { ccclass, property } = _decorator;

@ccclass('CellLineView')
export class CellLineView extends Component {

    @property(ReelAnimation) 
    public  ReelAnim:ReelAnimation;   
    
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
    
    public UpdateView(time:number):void{

        this.ReelAnim.GameUpdate(time);
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

    public SartMove():void {
        this.celllines.forEach(element => {
            element.StartMove();
            element.ToBlur(true);
        });
    }

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
        let height = 146;//cell.node.getComponent(UITransform).height / 2;
        cell.node.setPosition(0, maxy + height);
    }

    public ReSort(){
        this.celllines.sort((a, b) => b.node.position.y - a.node.position.y);
    }


}


