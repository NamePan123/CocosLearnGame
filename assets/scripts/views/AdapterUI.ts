import { _decorator, CCInteger, Component, Node, Sprite, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AdapterUI')
export class AdapterUI extends Component {
    
    @property(Sprite) 
    public fillBg:UITransform;   
    @property(CCInteger) 
    public ContentWitdh:number;
    @property(CCInteger) 
    public ContentHeight:number;

    start() {
        window.addEventListener('resize', this.WindowReze.bind(this));
        this.WindowReze();
    }



    private WindowReze(){

        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        let Ratio =  newHeight / this.ContentHeight;
        if(Ratio <= 1){
            Ratio = 1;
        }
        this.fillBg.node.scale = new Vec3( Ratio, Ratio );

    }

}


