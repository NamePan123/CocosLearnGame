import { _decorator, Component, Node } from 'cc';
import { CellView } from '../views/CellView';
import { SymbolDefine } from './SymbolDefine';
const { ccclass, property } = _decorator;

@ccclass('CellData')
export class CellData  {
   
    //数据绑定UI
    public BingdCellView:CellView;

    public get CardID_Index():number{
        return this._index;
    }

    private _gridRow:number;//所在行
    private _gridCol:number;//所在列
    private _id:number;//ID
    private _index:number = -1;
    //所在行
    public get GridRow()
    {
        return this._gridRow;
    }

    //所在列
    public get GridCel()
    {
        return this._gridCol;
    }

 

    public constructor(GridRow:number, GridCol:number, id:number) {
        
        this._gridCol = GridCol;
        this._gridRow = GridRow;
        this._id = id;
     }

     
     public SetIndex(index:number,refulshView:boolean){
        
        this._index = index;
        if(refulshView){
            this.BingdCellView.SetIcon(SymbolDefine.GetNameByIndex(index), SymbolDefine.GetNameBlurByIndex(index));  
        }
     }


     public SetWin(){
        this.BingdCellView.PlayAnim(SymbolDefine.Play_win);
     }
}   


