import { _decorator, Component, Node } from 'cc';
import { CellLineView } from '../CellLineView';
import { ReelRuleData } from '../../models/ReelRuleData';
const { ccclass, property } = _decorator;

@ccclass('ReelAnimation')
export class ReelAnimation extends Component{

    @property(CellLineView) 
    public lineView:CellLineView;

    @property({ type: Number })
    public LineIndex:number;

    private _reel:ReelRuleData;
    
    
    public Init(reel:ReelRuleData)
    {
        this._reel = reel;
    }
    
    public GameUpdate(gametime:number){
       
        //经过这个时间停止
        if(gametime <= this._reel.Duration +  this._reel.Delay){
              //模拟向上
            if(gametime >= this._reel.Delay + this._reel.UPReelTime){
                   //初始化
                if(!this._reel.Start){
                    this.lineView.SartMove();
                    this._reel.Start = true;
                }
                this.lineView.Move(this._reel.Speed);
            }
            else if(gametime >= this._reel.Delay - this._reel.UPReelTime){
                //回弹效果
                this.lineView.Move(-this._reel.UpwardSpeed);
            }
         
        }  
        else{
            //等待最后一轮转弯
            this.lineView.MoveFixed(this._reel.Speed);
        }
        

  
    }
}


