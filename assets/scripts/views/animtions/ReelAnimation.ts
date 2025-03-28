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
       
        //经过这个时间启动
        if(gametime >= this._reel.Delay){
            
            this.lineView.Move(this._reel.Speed);
            if(!this._reel.Start){
                this.lineView.SartMove();
                this._reel.Start = true;
            }
        }
  
    }
}


