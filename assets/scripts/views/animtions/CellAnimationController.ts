import { _decorator, Component, Node, SkeletalAnimation, SkeletalAnimationComponent, Skeleton, sp } from 'cc';
import { SymbolDefine } from '../../models/SymbolDefine';
const { ccclass, property } = _decorator;

@ccclass('CellAnimationController')
export class CellAnimationController extends Component {

  
  
    @property([sp.Skeleton]) 
    public Animations:sp.Skeleton[] = Array<sp.Skeleton>();   

    start() {
       
    }

    update(deltaTime: number) {
        
    }
   
    //playanim 定义在 SymbolDefine
    public InitView(name:string, playanim:string, loop:boolean = false):void
    {
        this.Reset();
        let animIndex = SymbolDefine.GetIndexByName(name);
        if(animIndex < this.Animations.length){

            let selectedAnim:sp.Skeleton = this.Animations[animIndex];
            selectedAnim.node.active = true;
            selectedAnim.loop = loop;
            selectedAnim.setAnimation(0, playanim, loop);
        }
    }

    public Reset():void
    {
        this.Animations.forEach(element => {
            element.node.active = false
            element.node.setPosition(0,0)
        });
    }
}


