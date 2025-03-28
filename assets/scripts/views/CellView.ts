import { _decorator, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, UITransform } from 'cc';
import { CellData } from '../models/CellData';
import { CellAnimationController } from './animtions/CellAnimationController';
import { SymbolDefine } from '../models/SymbolDefine';
const { ccclass, property } = _decorator;

@ccclass('CellView')
export class CellView extends Component {


    @property(Sprite) 
    public icon:Sprite;   
    
    private _anim:CellAnimationController;
    
    private _icon_name:string;
    private _icon_name_blur:string;
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

    public ToBlur(value:boolean):void{
        let iconName = value ? this._icon_name_blur : this._icon_name;
        let frame:SpriteFrame = this.icon.spriteAtlas.getSpriteFrame(iconName);
        this.icon.spriteFrame = frame;
        this.icon.node.active = true;
        if(value){
             this._anim.Reset();
        }else{
            this.PlayAnim(this._icon_name);
        }  
    }


    public SetIcon(name:string, blur:string):void
    {
        this._icon_name = name;
        this._icon_name_blur = blur;
        let frame:SpriteFrame = this.icon.spriteAtlas.getSpriteFrame(name);
        this.icon.spriteFrame = frame;
        this.icon.node.active = true;
        //这2个动画需要播放idle
        this.PlayAnim(name);
    }

    public Move(speed:number):void
    {
        this.node.setPosition(0,  this.node.position.y - speed);
        if( this.node.position.y <= 0) {
            this.node.setPosition(0, this._topPosition + this.node.position.y);       
        }
    }


    private PlayAnim(name:string){
        if(name == SymbolDefine.Number_8 || name == SymbolDefine.Number_7){
            this.icon.node.active = false;
            this._anim.InitView(name, SymbolDefine.Play_spawn);
            this.scheduleOnce(() => {
             this._anim.InitView(name, SymbolDefine.Play_idle, true);
         }, 0.6);
         }
    }
}


