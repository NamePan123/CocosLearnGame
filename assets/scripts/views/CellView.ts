import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { CellData } from '../models/CellData';
const { ccclass, property } = _decorator;

@ccclass('CellView')
export class CellView extends Component {

    @property(Sprite) 
    public icon:Sprite;   
    private _data:CellData;
    private _topPosition:number = 584;
    public set data(value:CellData)
    {
        //数据双向绑定UI
        this._data = value;
        this._data.BingdCellView = this;
    }


    start() {

    }

    update(deltaTime: number) {
        this.Move(20);
    }


    public SetIcon(name:string):void
    {

        let frame:SpriteFrame = this.icon.spriteAtlas.getSpriteFrame(name);
        this.icon.spriteFrame = frame;
    }

    public Move(speed:number):void
    {
        this.node.setPosition(0,  this.node.position.y - speed);
        if( this.node.position.y <= 0) {
            this.node.setPosition(0, this._topPosition);       
        }
    }
}


