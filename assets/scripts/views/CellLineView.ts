import { _decorator, Component, Node } from 'cc';
import { CellView } from './CellView';
const { ccclass, property } = _decorator;

@ccclass('CellLineView')
export class CellLineView extends Component {

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


}


