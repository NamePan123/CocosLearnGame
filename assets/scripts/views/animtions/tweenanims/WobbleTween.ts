import { _decorator, Component, Node, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WobbleTween')
export class WobbleTween extends Component {
    
   // @property
    maxAngle: number = 0.5;   // 晃动最大角度
   // @property
    duration: number = 0.1;  // 每次晃动的时间

    private wobbleTween: Tween<Node> | null = null; // 存储 Tween 对象
    start() {
        //this.wobble();
        //this.scheduleOnce(() => this.stopWobble(), 2); 
    }

    public wobble(dur:number) {
        this.wobbleTween = tween(this.node)
            .repeatForever(
                tween()
                    .to(this.duration, { eulerAngles: new Vec3(0, 0, this.maxAngle) }, { easing: "sineInOut" })
                    .to(this.duration, { eulerAngles: new Vec3(0, 0, -this.maxAngle) }, { easing: "sineInOut" })
            )
            .start();

            setTimeout(() => {
                   // this.stopWobble();
            }, dur);
    }

    stopWobble() {
        if (this.wobbleTween) {
            this.wobbleTween.stop();  // 停止 Tween
            this.wobbleTween = null;  // 清空引用，防止重复执行
        }
    }
}


