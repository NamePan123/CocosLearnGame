import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameLoadingView')
export class GameLoadingView extends Component {

    @property(Node) 
    public ScreenBg:Node; 


    @property(Button) 
    public StartBtn:Button; 

    @property(Node) 
    public LoadingBar:Node; 

    start() {
        
        this.StartBtn.node.active = false;
        this.LoadingBar.active = true;
    }

    update(deltaTime: number) {
        
    }


    public InitShow(){
        setTimeout(() => {
            this.ScreenBg.active = false;
        }, 2000);
    }

    public ShowStart(){
        this.StartBtn.node.active = true;
        this.LoadingBar.active = false;
    }
}


