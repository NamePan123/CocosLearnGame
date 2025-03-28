import { _decorator, Component, instantiate, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { CellData } from '../models/CellData';
import { CellAnimationController } from './animtions/CellAnimationController';
import { SymbolDefine } from '../models/SymbolDefine';
const { ccclass, property } = _decorator;

@ccclass('CellView')
export class CellView extends Component {

    start() {

    }

    update(deltaTime: number) {
       //this.Move(10);
    }

    @property(Sprite) 
    public icon:Sprite;   
    
    private _anim:CellAnimationController;

    private _data:CellData;
    private _topPosition:number = 584;
    public set data(value:CellData)
    {
        //数据双向绑定UI
        this._data = value;
        this._data.BingdCellView = this;
    }
    
    public SetAnimPrefab(prefab:Prefab):void
    {
        let anim = instantiate(prefab);
        anim.parent = this.node;
        anim.setPosition(105,-105);
        this._anim = anim.getComponent(CellAnimationController);
        this._anim.Reset();
    }

    public SetIcon(name:string):void
    {

        let frame:SpriteFrame = this.icon.spriteAtlas.getSpriteFrame(name);
        this.icon.spriteFrame = frame;
        this.icon.node.active = true;
        //这2个动画需要播放idle
        if(name == SymbolDefine.Number_8 || name == SymbolDefine.Number_7){

           this._anim.InitView(name, SymbolDefine.Play_spawn);
           this.scheduleOnce(() => {
            this._anim.InitView(name, SymbolDefine.Play_idle);
        }, 1);
        }
    }

    public Move(speed:number):void
    {
        this.node.setPosition(0,  this.node.position.y - speed);
        if( this.node.position.y <= 0) {
            this.node.setPosition(0, this._topPosition);       
        }
    }
}


