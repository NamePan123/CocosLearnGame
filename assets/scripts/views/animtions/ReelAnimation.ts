import { _decorator, Component, Node, tween, Tween, Vec3 } from 'cc';
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
    
    private _reelEnd = false;
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
                    this._reelEnd = false;
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
            if(!this._reelEnd  && this.lineView.IsEnd){
                this._reelEnd = true;
                tween(this.node)
                .to(0.2, { position: new Vec3(this.lineView.node.position.x, 2, 0) }, { easing: 'sineInOut' })
                .start();

                 this.scheduleOnce(() => {
                                 
                    tween(this.node)
                    .to(0.2, { position: new Vec3(this.lineView.node.position.x, -2, 0) }, { easing: 'sineInOut' })
                    .start();
                         }, 0.2);

            }
        }
        
    }

}


