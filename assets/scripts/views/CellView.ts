import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, tween, UITransform, Vec3 } from 'cc';
import { CellData } from '../models/CellData';
import { CellAnimationController } from './animtions/CellAnimationController';
import { SymbolDefine } from '../models/SymbolDefine';
import { WobbleTween } from './animtions/tweenanims/WobbleTween';
const { ccclass, property } = _decorator;

@ccclass('CellView')
export class CellView extends Component {

    @property(Label) 
    public lable:Label;

    @property(WobbleTween) 
    public WobbleAnim:WobbleTween;

    @property(Sprite) 
    public icon:Sprite;   
    
    public IsEnd():boolean{
        return this._isEnd;
    }

    //是否转动结束
    private _isEnd:boolean = false;
    private _isMoveing:boolean = false;
    private _anim:CellAnimationController;
    
    private _icon_name:string;
    private _icon_name_blur:string;
    private _data:CellData;
    private _topPosition:number = 584;

    private _defaultPosition:number;
    public SetData(value:CellData, index:number)
    {
        //数据双向绑定UI
        this._data = value;
        this._data.BingdCellView = this;
        if(index == 0){
            this._defaultPosition =  584.402;
        }

        if(index == 1){
            this._defaultPosition =  437.736;
        }

        if(index == 2){
            this._defaultPosition =  291.58;
        }

        if(index == 3){
            this._defaultPosition =  146;
        }
        this.lable.string = value.GridRow.toString();
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
            this.PlayDefault(this._icon_name);
        }  
    }

    public StartMove(){
        this._isEnd = false;
        this._isMoveing = true;
    }

    public SetIcon(name:string, blur:string):void
    {
        this._icon_name = name;
        this._icon_name_blur = blur;

        let curName = this._isMoveing ? this._icon_name_blur : this._icon_name;

        let frame:SpriteFrame = this.icon.spriteAtlas.getSpriteFrame(curName);
        this.icon.spriteFrame = frame;
        this.icon.node.active = true;
        this._anim.Reset();
        //这2个动画需要播放idle
        this.PlayDefault(name);
    }

    public Move(speed:number):void
    {
        this.node.setPosition(0,  this.node.position.y - speed);
        if(this.node.position.y <= 0) {
            this.node.setPosition(0, this._topPosition + this.node.position.y);     
            //这里随机更换ICON 
            let names:string[] = SymbolDefine.GetRandomIcon();
            this.SetIcon(names[0], names[1]);
        }
    }

    
    public MoveFixed(speed:number):void
    {
        if(!this._isEnd){
            if(this.node.position.y <= this._defaultPosition){

                this._isMoveing = false;
                this.SetIcon(SymbolDefine.GetNameByIndex(this._data.CardID_Index), SymbolDefine.GetNameBlurByIndex(this._data.CardID_Index));
                this.node.setPosition(0, this._defaultPosition);
                this.ToBlur(false);
                this._isEnd = true;
              
            } 
            else{

                this.Move(speed);
            }    
        }    
    }


    private PlayDefault(name:string){
        
        if((name == SymbolDefine.Number_8 || name == SymbolDefine.Number_7) && !this._isMoveing){
            this.icon.node.active = false;
            this._anim.InitView(name, SymbolDefine.Play_spawn);
            this.scheduleOnce(() => {
                 this._anim.InitView(name, SymbolDefine.Play_idle, true);
         }, 0.6);
         }
    }


    public PlayAnim(animName:string){
 
        this.icon.node.active = false;
        this._anim.InitView(this._icon_name, animName);          
    }

    public PlayWobble(value:boolean){
        
        if(value){
            this.WobbleAnim.wobble();
        }
        else{
            this.WobbleAnim.StopWobble();
        }
    }

  
   
}


