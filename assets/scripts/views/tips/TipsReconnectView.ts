import { _decorator, Button, Component, Label, Node } from 'cc';
import { TipsView } from './TipsView';
import { ITpisView } from './ITpisView';
const { ccclass, property } = _decorator;

@ccclass('TipsReconnectView')
export class TipsReconnectView extends Component implements ITpisView {


    @property(Label) 
    public contentLabel:Label;   
    
    public get Btn1():Button{

        return null;
    }

    public get Btn2():Button{

        return null;
    }
    
    public Visible(value:boolean):void{
        this.node.active =  value;
    }

    public SetLable(value1:string, value2:string){

        this.contentLabel.string = value1;
    }
}


