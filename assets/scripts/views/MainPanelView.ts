import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainPanelView')
export class MainPanelView extends Component {

    @property(Label) 
    public MoneyAssetsLabel:Label;   

    @property(Label) 
    public BettingLabel:Label;   

    @property(Label) 
    public RankRecordLabel:Label;  


    @property(Button) 
    public MoneyAssetsBtn:Button;   

    @property(Button) 
    public BettingBtn:Button;   

    @property(Button) 
    public RankRecordBtn:Button;  
    start() {

    }

    update(deltaTime: number) {
        
    }


    public SetMoney(value:number){
        this.MoneyAssetsLabel.string = value.toString();
    }

    public SetBet(value:number){
        this.BettingLabel.string = value.toString();
    }

    public SetRank(value:number){
        this.RankRecordLabel.string = value.toString();
    }


}


