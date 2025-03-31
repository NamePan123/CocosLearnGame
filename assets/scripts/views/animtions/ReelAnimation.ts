import { _decorator, Component, Node, tween, Tween, Vec3 } from 'cc';
import { CellLineView } from '../CellLineView';
import { ReelRuleData } from '../../models/ReelRuleData';
import { GameModel } from '../../models/GameModel';
import { CellData } from '../../models/CellData';
import { CellView } from '../CellView';
import { SymbolDefine } from '../../models/SymbolDefine';
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
    private _DropCount:number = 0;
    private _isDrop = false;
    public StartDrop():void{

        let celllines:CellView[] = Array<CellView>();   
       
        this._DropCount = 0;   
        //计算移动的数量和移动到顶部
        for(let i:number = 0; i < this.lineView.Length; i++){
             let c:CellData = GameModel.Instance().GetCellDataByIndex(i, this.LineIndex);
             if(c.IsWin){
                this._DropCount ++;
                //移动到顶部
                this.lineView.MoveToTop(i);
                celllines.push(this.lineView.GetCellViewByIndex(i));
             }
        }

        //数据重新绑定
        if(this._DropCount > 0){
            celllines.push(this.lineView.GetCellViewByIndex(0));
            this.lineView.ReSort();
            //重新绑定资源
            for(let i:number = 0; i < this.lineView.Length - 1; i++){     
                let view:CellView = this.lineView.GetCellViewByIndex(i);
                let data:CellData = GameModel.Instance().GetCellDataByIndex(i, this.LineIndex);
                view.SetData(data, i);         
            }
        }

       // let names:string[] = SymbolDefine.GetRandomIcon();
        //const randomNumber = Math.floor(Math.random() * 9);
        //data.SetIndex(randomNumber, true);




        //开始模拟往下掉的动画
        this._isDrop = true;
        celllines.forEach(element => {
            this.dropWithBounce(element.node, 0, element.node.position.y - 146);    
        });
       
    }



    public GameUpdate(gametime:number){
       
       
        //经过这个时间停止
        if(gametime <= this._reel.Duration +  this._reel.Delay){
           
            this.PlayMove(gametime);
        }  
        else{
           
            //等待最后一轮转弯
            this.lineView.MoveFixed(this._reel.Speed);
            if(!this._reelEnd  && this.lineView.IsEnd){
                 this.PlayPopUpAnim();
            }
        }
        
    }


    private PlayMove(gametime:number){
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


    private PlayPopUpAnim(){
      
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


    dropWithBounce(node, delay, toPos) {
        let startY = node.position.y;  // 记录初始 Y 轴
        tween(node)
        .delay(delay) // 先等待一段时间
        .to(0.3, { position: new Vec3(node.position.x, toPos, 0) }, { easing: "quadIn" }) // 模拟掉落
        .to(0.3, { position: new Vec3(node.position.x, toPos + 2, 0) }, { easing: "bounceOut" }) // 反弹
        //.to(0.3, { position: new Vec3(node.position.x, toPos - 2, 0) }, { easing: "quadIn" }) // 模拟掉落
        //.to(0.3, { position: new Vec3(node.position.x, toPos, 0) }, { easing: "bounceOut" }) // 反弹
        .start();
    }


}


