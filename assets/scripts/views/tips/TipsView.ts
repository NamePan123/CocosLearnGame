import { _decorator, Button, Component, Label, Node } from 'cc';
import { ITpisView } from './ITpisView';
const { ccclass, property } = _decorator;

@ccclass('TipsView')
export class TipsView extends Component  implements ITpisView {

        
    @property(Button) 
    public btn1:Button;   

    @property(Button) 
    public btn2:Button;   

    @property(Label) 
    public contentLabel:Label;   

    @property(Label) 
    public titleLabel:Label;   

    public get Btn1():Button{

        return this.btn1;
    }

    public get Btn2():Button{

        return this.btn2;
    }
    
    public Visible(value:boolean):void{
        this.node.active =  value;
    }

    public SetLable(value1:string, value2:string){

        this.titleLabel.string = value1;
        this.contentLabel.string = value2;
    }

}


