import { _decorator, Component, Node } from 'cc';
import { TipsView } from '../views/tips/TipsView';
import { TipsReconnectView } from '../views/tips/TipsReconnectView';
import { TpisViewBase } from '../views/tips/TpisViewBase';


const { ccclass, property } = _decorator;

@ccclass('TipsManager')
export class TipsManager extends Component {

    private static _instance:TipsManager = null;

    public static COMMON_TIPS:number = 0;
    public static RECONNECT_TIPS:number = 1;
  
    private _tipsViews:TpisViewBase[] = [];


    @property(TipsView) 
    public TipsView:TipsView;

    @property(TipsReconnectView) 
    public TipsReconnectView:TipsReconnectView;

    private _prefabPaths:string[] = Array();
    private _callBack1:Function;
    private _callBack2:Function;
    start() {

        TipsManager._instance = this;

        this._tipsViews.push(this.TipsView);
        this._tipsViews.push(this.TipsReconnectView);
        
        this._tipsViews.forEach(view => {
            view.Visible(false);
            if(view.Btn1 != null) view.Btn1.node.on(Node.EventType.TOUCH_END, this.onConfrimBtnClick, this);  
            if(view.Btn2 != null) view.Btn1.node.on(Node.EventType.TOUCH_END, this.onCancelBtnClick, this);    
        });

    }

    public static get Instance(){

        return TipsManager._instance;
    }


    public ShowTips(type:number, title:string, content:string, callback1:Function = null, callback2:Function = null){
        
        let tip = this.GetTipsByType(type);
        tip.Visible(true);
        tip.SetLable(title, content);
        this._callBack1 = callback1;
        this._callBack2 = callback2;
    }

    public HideAllTips(){
        this._tipsViews.forEach(element => {
            element.Visible(false);
        });
    }

    public ShowSimpleTips(type:number, content:string){
        
        let tip = this.GetTipsByType(type);
        tip.Visible(true);
        tip.SetLable(content, content);

    }

    private onConfrimBtnClick(){
        if(this._callBack1 != null && this._callBack1 != undefined){
          this._callBack1();
        }
        this._callBack1 = null;
        this._callBack2 = null;
        this._tipsViews.forEach(element => {
            element.Visible(false);
        });
    }

    private onCancelBtnClick(){


        if(this._callBack2 != null && this._callBack2 != undefined){
            this._callBack2();
        }
        this._callBack1 = null;
        this._callBack2 = null;

        this._tipsViews.forEach(element => {
            element.Visible(false);
        });
    }   


    private GetTipsByType(type:number):TpisViewBase{

        return this._tipsViews[type];
    }
    
    
}


