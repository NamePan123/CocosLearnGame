import { _decorator, Component, Node } from 'cc';
import { CellView } from './CellView';
import { ReelAnimation } from './animtions/ReelAnimation';
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
    public  celllines:CellView[] = Array<CellView>();   
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
}


