import { _decorator, Component, Node, SkeletalAnimation, SkeletalAnimationComponent, Skeleton, sp } from 'cc';
import { SymbolDefine } from '../../models/SymbolDefine';
const { ccclass, property } = _decorator;

@ccclass('CellAnimationController')
export class CellAnimationController extends Component {

  
    @property([sp.Skeleton]) 
    public Animations:sp.Skeleton[] = Array<sp.Skeleton>();   

    start() {
        this.Reset();
    }

    update(deltaTime: number) {
        
    }

    public InitView(name:string, parent:Node):void
    {
        let animIndex = SymbolDefine.GetIndexByName(name);
        if(animIndex < this.Animations.length){

            let selectedAnim:sp.Skeleton = this.Animations[animIndex];
            selectedAnim.node.active = true;
            selectedAnim.node.parent = parent;
            selectedAnim.node.setPosition(0,0);
            selectedAnim.loop = false;
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


