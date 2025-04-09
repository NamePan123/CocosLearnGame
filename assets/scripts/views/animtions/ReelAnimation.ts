import { _decorator, CCInteger, Component, Node, tween, Tween, Vec3 } from 'cc';
import { ReelRuleData } from '../../models/ReelRuleData';
import { GameModel } from '../../models/GameModel';
import { CellData } from '../../models/CellData';
import { CellView } from '../CellView';
import { SymbolDefine } from '../../models/SymbolDefine';
import { CellLineView } from '../CellLineView';
const { ccclass, property } = _decorator;

@ccclass('ReelAnimation')
export class ReelAnimation extends Component{

    @property(CellLineView) 
    public lineView:CellLineView;

    @property(CCInteger) 
    public LineIndex:number;

    private _reel:ReelRuleData;
    
    private _reelEnd = false;
    public Init(reel:ReelRuleData)
    {
        this._reel = reel;
    }
    private _DropCount:number = 0;

    public StartDrop():void{

        let celllines:CellView[] = Array<CellView>();   
        this._DropCount = 0;   
        //计算移动的数量和移动到顶部
        for(let i:number = 0; i < this.lineView.Length; i++){
            //判断是否获奖
             let c:CellData = GameModel.Instance.GetCellDataByIndex(i, this.LineIndex);
             if(c.IsWin){

                this._DropCount ++;    
                let view:CellView = this.lineView.GetCellViewByIndex(i);
                //将它上面的都纳入移动的数组中，等下做动画处理
                this.CollectionDropUI(view, celllines);          
                //移动到顶部
                this.lineView.MoveToTop(i);
             }
        }

        //因为位置变了，数据从新根据位置绑定UI
        if(this._DropCount > 0){
            //把隐藏的也加入到掉落队列中
            celllines.unshift(this.lineView.GetCellViewByIndex(0));
            //整理位置，重新绑定UI和数据
            this.lineView.BingDataToUI(GameModel.Instance);         
        }
      
        celllines.forEach(element => {
            let sourceY = element.GetPositionByIndex(element.CellIndex);
            this.dropWithBounce(element.node, 0, sourceY);      
        });

       
    }

    //收集要掉落的UI资源
    private CollectionDropUI(view:CellView, cells:CellView[]):void{

        cells.push(view);
        for(let j:number = 0; j < this.lineView.Length; j++){
                  
            let otherView = this.lineView.GetCellViewByIndex(j);
            if(view != otherView && view.node.position.y < otherView.node.position.y){
                if(cells.indexOf(otherView) == -1){
                    cells.push(otherView);
                }
            }
        }          
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
        if(gametime >= this._reel.Delay + this._reel.UPReelTime)
        {
            //初始化
            if(!this._reel.Start){
                this.lineView.ReadyToMove();
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

    //弹起动画
    private PlayPopUpAnim(){
      
        this._reelEnd = true;
        tween(this.node)
        .to(0.15, { position: new Vec3(this.lineView.node.position.x, -30, 0) }, { easing: 'sineInOut' })
        .start();

            this.scheduleOnce(() => {
                            
            tween(this.node)
            .to(0.15, { position: new Vec3(this.lineView.node.position.x, 0, 0) }, { easing: 'sineInOut' })
            .start();
                    }, 0.15);
    }

    //掉落反弹动画
    private dropWithBounce(node, delay, toPos) {
        let startY = node.position.y;  // 记录初始 Y 轴
        tween(node)
        .delay(delay) // 先等待一段时间
        .to(0.3, { position: new Vec3(node.position.x, toPos, 0) }, { easing: "quadIn" }) // 模拟掉落
        .to(0.2, { position: new Vec3(node.position.x, toPos + 20, 0) }, { easing: "bounceOut" }) // 反弹
        .to(0.1, { position: new Vec3(node.position.x, toPos , 0) }, { easing: "quadIn" }) // 模拟掉落
        .start();
    }


}


